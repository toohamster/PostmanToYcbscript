define([], function () {

	function AScript(data){
		this.data = data;
	}

	AScript.prototype.setName = function(name)
	{
		this.data.script_name = name;
	};

	var ts_start = new Date().getTime();
	function ts()
    {
    	return ++ ts_start;
    }

	AScript.create = function()
	{
		var defaults = {
			script_id: '',
			script_name: '',

			trans: {

				parameters: {
					sys: [
						AScript.sysParameter(null,'timestamp', '时间戳', '$timestamp()'),
						AScript.sysParameter(null,'uuid', 'uuid', '$uuid()'),
						AScript.sysParameter(null,'base64', 'base64', '$base64(wwwwwww)'),
						AScript.sysParameter(null,'md5', 'md5', '$md5(wwwwwww)'),
						AScript.sysParameter(null,'random', '随机数', '$random(20,30)')
					],
					custom: [
						
					]
				},

				steps: []
			}
		};
		return new AScript(defaults);
	};

	/**
	 * 将服务端返回的数据转化成界面需要的格式
	 * 
	 * @param  json data 后端返回的json数据
	 * @return AScript
	 */
	AScript.decode = function(data)
	{
		// return $.parseJSON(data);
		console.info('服务端返回的数据',data);
		var as = AScript.create();
		as.data.script_id = data.script_id;
		as.data.script_name = data.script_name;

		var temp = null;// 定义一个临时变量,供作用域内使用

		// 解析初始化变量
		var customParameters = as.data.trans.parameters.custom;
		$.each( data.trans.parameters, function(){

			temp = AScript.customParameter(null,this.name,this.value);
			customParameters.push(temp);

		} );
		AScript.customParameters(as, customParameters);

		if ( data.trans.sysparameters && data.trans.sysparameters.length > 0 )
		{
			var sysParameters = as.data.trans.parameters.sys;			
			$.each( data.trans.sysparameters, function(){

				temp = AScript.sysParameter(null, this.name, this.description, this.example);
				sysParameters.push(temp);

			} );
			AScript.sysParameters(as, sysParameters);
		}

		// 解析请求列表
		var steps = [];
		$.each( data.trans.steps, function(){

			var obj = this;

			if ( obj.type == 2 )
			{
				temp = AScript.stepInterval(obj.actionId,obj.delay);
				steps.push(temp);
			}
			else if ( obj.type == 1 )
			{				

				// 处理认证
				var stepAuthorization = {};
				if ( obj.authorization ){
					stepAuthorization.authorType = obj.authorization.authorType;
					stepAuthorization.authorData = obj.authorization.authorData;
				}

				// 处理请求头
				var stepHeaders = [];
				$.each(obj.header, function(name, value){
					temp = AScript.stepHeader(null, name, value);
					stepHeaders.push(temp);
				});

				var stepParameters = [];
				$.each(obj.parameters, function(name, value){
					temp = AScript.stepParameter(null, name, value);
					stepParameters.push(temp);
				});

				var stepFormdata = {};

				if ( 'POST' == obj.method || 'PUT' == obj.method || 'DELETE' == obj.method )
				{
					if ( obj.formdata ){
						stepFormdata.type = obj.formdata.type;

						if ( 'x-www-form-urlencoded' == stepFormdata.type )
						{
							stepFormdata.value = [];
							$.each(obj.formdata.value, function(name, value){
								temp = AScript.stepFormItemXwww(null, name, value);
								stepFormdata.value.push(temp);
							});
						}
						else if ( 'formdata' == stepFormdata.type )
						{
							stepFormdata.value = [];
							$.each(obj.formdata.value, function(name, value){
								temp = AScript.stepFormItemFormdata(null, name, value);
								stepFormdata.value.push(temp);
							});
						}
						else
						{
							stepFormdata.value = obj.formdata.value;

							// 额外处理下 raw-json 可能为 json 对象的问题
							if ( 'raw-json' == stepFormdata.type )
							{
								if ( $.isPlainObject(stepFormdata.value) )
								{
									stepFormdata.value = $.toJSON(stepFormdata.value);
								}
							}
							
						}
						
					}
				}
				
				var stepProperties = [];
				var stepAssertions = [];

				$.each(obj.postProcessors, function(){

					var postProcessor = this;
					if ( postProcessor.type == 'propertyExtractor' )
					{

						$.each(postProcessor.propertyExtractor, function(){
							temp = AScript.stepPropertie(null, this.matchBody, this.propertyName, this.goalProperty);
							stepProperties.push(temp);
						});

					}
					else if ( postProcessor.type == 'assertions' )
					{
						$.each(postProcessor.assertions, function(){
							temp = AScript.stepAssertion(null, this.matchBody, this.propertyName, this.compareMethod, this.expectedVal);
							stepAssertions.push(temp);
						});
					}
				});

				var step = AScript.stepAction(obj.actionId, obj.url, obj.method, 
					stepHeaders, stepParameters, stepFormdata, stepProperties, stepAssertions, stepAuthorization, obj.actionName);

				steps.push(step);
			}

		} );
		AScript.tranSteps(as, steps);

		return as;
	};

	/**
	 * 将客户端对象转化成服务端可以接收的格式
	 * @param  AScript as
	 * @return json
	 */
	AScript.encode = function(as)
	{
		var data = {
			script_id: as.data.script_id,
			script_name: as.data.script_name,

			trans: {
				parameters: [],
				steps: []
			}
		};

		// 转化初始化参数
		var x = as.data.trans.parameters.custom;
		for(i = 0; i < x.length; i ++){
			data.trans.parameters.push( {
				name: x[i].name,
				value: x[i].value
			} );
		}
		// 转化请求
		x = as.data.trans.steps;
		for(i = 0; i < x.length; i ++){

			var step = {
					actionId: x[i].id,
					type: x[i].type
				};

			if ( x[i].type == 2 )
			{
				step.delay = x[i].delay;
			}
			else if( x[i].type == 1 )
			{
				step.actionName = x[i].name;	
				step.url = x[i].url;
				var urlparse = purl(x[i].url);
				step.protocol = urlparse.attr('protocol');
				step.method = x[i].method;
				

				// 请求头参数
				step.header = {};
				for(j = 0; j < x[i].headers.length; j ++){
					step.header[ x[i].headers[j].name ] = x[i].headers[j].value;
				}

				step.authorization = x[i].authorization || {};

				step.parameters = {};
				for(j = 0; j < x[i].parameters.length; j ++){
					step.parameters[ x[i].parameters[j].name ] = x[i].parameters[j].value;
				}

				step.formdata = {};
				if ( x[i].formdata )
				{
					step.formdata.type = x[i].formdata.type;

					if ( 'x-www-form-urlencoded' == step.formdata.type )
					{
						step.formdata.value = {};

						for(j = 0; j < x[i].formdata.value.length; j ++){
							step.formdata.value[ x[i].formdata.value[j].name ] = x[i].formdata.value[j].value;
						}
					}
					else if ( 'formdata' == step.formdata.type )
					{
						step.formdata.value = {};

						for(j = 0; j < x[i].formdata.value.length; j ++){
							step.formdata.value[ x[i].formdata.value[j].name ] = x[i].formdata.value[j].value;
						}
					}
					else
					{
						step.formdata.value = x[i].formdata.value;
					}
					
				}

				var properties = [];
				var assertions = [];

				for(j = 0; j < x[i].properties.length; j ++){
					properties.push( {
						matchBody: x[i].properties[j].matchBody,
						propertyName: x[i].properties[j].propertyName,
						goalProperty: x[i].properties[j].goalProperty
					} );
				}
				for(j = 0; j < x[i].assertions.length; j ++){
					assertions.push( {
						matchBody: x[i].assertions[j].matchBody,
						propertyName: x[i].assertions[j].propertyName,
						compareMethod: x[i].assertions[j].compareMethod,
						expectedVal: x[i].assertions[j].expectedVal
					} );
				}

				step.postProcessors = [
					{
						type: 'propertyExtractor',
						propertyExtractor: properties,
					},
					{
						type: 'assertions',
						assertions: assertions,
					}
				];

			}
			else{
				continue;
			}

			data.trans.steps.push(step);
		}

		return data;
	};

	AScript.sysParameters = function(as, list)
	{
		as.data.trans.parameters.sys = list;
	};

	AScript.sysParameter = function(id, name, description, example)
	{
		return {
			id: id || ts(),
			name: name,
			description: description,
			example: example
		};
	};

	AScript.customParameters = function(as, list)
	{
		as.data.trans.parameters.custom = list;
	};

	AScript.customParameter = function(id, name, value)
	{
		return {
			id: id || ts(),
			name: name,
			value: value
		};
	};

	AScript.tranSteps = function(as, steps)
	{
		as.data.trans.steps = steps;
	};

	AScript.stepInterval = function(id, delay)
	{
		return {
			id: id || ts(),
			type: 2,
			delay: delay
		};
	};

	AScript.stepAction = function(id, url, method, headers, parameters, formdata, properties, assertions, authorization, name){
		
		return {
			id: id || ts(),
			type: 1,
			url: url,
			host: '',
			protocol: '',
			method: method,
			headers: headers,
			parameters: parameters,
			authorization: authorization || {},
			formdata: formdata,
			properties: properties,
			assertions: assertions,
			name: name || url
		};
	};

	AScript.stepHeaders = function(step, list)
	{
		step.headers = list;
	};

	AScript.stepHeader = function(id, name, value)
	{
		return {
			id: id || ts(),
			name: name,
			value: value
		};
	};

	AScript.stepParameters = function(step, list)
	{
		step.parameters = list;
	};

	AScript.stepParameter = function(id, name, value)
	{
		return {
			id: id || ts(),
			name: name,
			value: value
		};
	};

	AScript.stepAuthorization = function(step, authorization)
	{
		step.authorization = authorization;
	};

	AScript.stepAuthorizationBasic = function(username, password)
	{
		return {
			authorType: 'basic',
			authorData: {
				username: username,
				password: password
			}
		};
	};

	AScript.stepAuthorizationType = function(type, data)
	{
		return {
			authorType: type,
			authorData: data || {}
		};
	};

	AScript.stepFormdata = function(step, list)
	{
		step.formdata = list;
	};

	AScript.stepFormRaw = function(rawtype)
	{
		return {
			type: rawtype,
			value: ''
		};
	};

	AScript.stepFormXwww = function()
	{
		return {
			type: 'x-www-form-urlencoded',
			value: []
		};
	};

	AScript.stepFormItemXwww = function(id, name, value)
	{
		return {
			id: id || ts(),
			name: name,
			value: value
		};
	};

	AScript.stepFormFormdata = function()
	{
		return {
			type: 'formdata',
			value: []
		};
	};

	AScript.stepFormItemFormdata = function(id, name, value)
	{
		return {
			id: id || ts(),
			name: name,
			value: value
		};
	};

	AScript.stepProperties = function(step, list)
	{
		step.properties = list;
	};

	AScript.stepPropertie = function(id, matchBody, propertyName, goalProperty)
	{
		return {
			id: id || ts(),
			matchBody: matchBody, 
			propertyName: propertyName, 
			goalProperty: goalProperty
		};
	};

	AScript.stepGoalPropertiesTi = function(as)
	{
		var data = [];
		var x = as.data.trans.parameters.custom;
		for(i = 0; i < x.length; i ++){
			data.push( {
				id: x[i].id, 
				name: x[i].name,
				type: 'custom'
			} );
		}
		return data;
	};

	AScript.stepGoalProperties = function(as)
	{
		var data = [];
		var x = as.data.trans.parameters.custom;
		for(i = 0; i < x.length; i ++){
			data.push( {
				id: x[i].id, 
				name: x[i].name,
				type: 'custom'
			} );
		}
		x = as.data.trans.parameters.sys;
		for(i = 0; i < x.length; i ++){
			data.push( {
				id: x[i].id, 
				name: x[i].name,
				type: 'sys'
			} );
		}
		return data;
	};

	AScript.stepAssertions = function(step, list)
	{
		step.assertions = list;
	};

	AScript.stepAssertion = function(id, matchBody, propertyName, compareMethod, expectedVal)
	{
		return {
			id: id || ts(),
			matchBody: matchBody, 
			propertyName: propertyName, 
			compareMethod: compareMethod, 
			expectedVal: expectedVal
		};
	};

	AScript.ts = ts;
	return AScript;
});
