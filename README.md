# PostmanToYcbscript
Postman 脚本转换压测宝脚本

```
//var Postman = require('./postman.js');
var content = $('#asImportText').val();
var contentType = $.cTypeDetect(content);
if ( 'json' === contentType )
{
  try {
    vo = Postman.convert($.parseJSON(content), script_id);
    render(vo, true);
    $(fileImportNode).ymodal('close');
  }
  catch(e)
  {
    alert(e.message, '提示');
  }
}
else
{
  alert('脚本内容不是有效的json格式,请检查', '提示');
}
```