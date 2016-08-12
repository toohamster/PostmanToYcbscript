define([
	'extra/js/3rd/jsonschema',
	'extra/js/script/vo'
], 
function (JsonSchema,AScript) {

	var schemaV1 = {"$schema":"http://json-schema.org/draft-04/schema#","id":"https://schema.getpostman.com/json/collection/v1.0.0/","type":"object","properties":{"id":{"type":"string","description":"Every collection is identified by the unique value of this field. The value of this field is usually easiest to generate using a [UID](https://tools.ietf.org/html/rfc4122#section-4.4%29) generator function. If you already have a collection, it is recommended that you maintain the same id since changing the id usually implies that this is a different collection than it was originally."},"name":{"type":"string","description":"A collection's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this collection among a bunch of other collections, as such outlining its usage or content."},"description":{"oneOf":[{"type":"string"},{"type":"null"}],"description":"Provide a long description of this collection using this field. This field supports markdown syntax to better format the description."},"order":{"type":"array","items":{"type":"string"},"uniqueItems":true,"description":"The order array ensures that your requests and folders don't randomly get shuffled up. It holds a sequence of [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) corresponding to folders and requests.\n *Note that if a folder ID or a request ID (if the request is not already part of a folder) is not included in the order array, the request or the folder will not show up in the collection.*"},"folders":{"type":"array","items":{"$ref":"#/definitions/folder"},"description":"Folders are the way to go if you want to group your requests and to keep things organised. Folders can also be useful in sequentially requesting a part of the entire collection by using [Postman Collection Runner](https://www.getpostman.com/docs/jetpacks_running_collections) or [Newman](https://github.com/postmanlabs/newman) on a particular folder."},"timestamp":{"type":"number","multipleOf":1},"requests":{"type":"array","description":"","items":{"$ref":"#/definitions/request"}}},"required":["id","name","order","requests"],"definitions":{"folder":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/folder","title":"Folder","description":"One of the primary goals of Postman is to organize the development of APIs. To this end, it is necessary to be able to group requests together. This can be achived using 'Folders'. A folder just is an ordered set of requests.","type":"object","properties":{"id":{"type":"string","description":"In order to be able to uniquely identify different folders within a collection, Postman assigns each folder a unique ID (a [UUID](https://en.wikipedia.org/wiki/Globally_unique_identifier)). This field contains that value."},"name":{"type":"string","description":"A folder's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this folder."},"description":{"type":"string","description":"Essays about the folder go into this field!"},"order":{"type":"array","items":{"type":"string"},"uniqueItems":true,"description":"Postman preserves the order of your requests within each folder. This field holds a sequence of [UUIDs](https://en.wikipedia.org/wiki/Globally_unique_identifier), where each ID corresponds to a particular Postman request."},"collection_id":{"type":"string","description":"Postman folders are always a part of a collection. That collection's unique ID (which is a [UUID](https://en.wikipedia.org/wiki/Globally_unique_identifier)) is stored in this field."},"collection":{"type":"string","description":"Postman folders are always a part of a collection. That collection's unique ID (which is a [UUID](https://en.wikipedia.org/wiki/Globally_unique_identifier)) is stored in this field."}},"required":["id","name","description","order"]},"request":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/request","title":"Request","description":"A request represents an HTTP request.","type":"object","properties":{"folder":{"oneOf":[{"type":"string"},{"type":"null"}],"description":"Postman requests may or may not be a part of a folder. If this request belongs to a folder, that folder's unique ID (which is a [UUID](https://en.wikipedia.org/wiki/Globally_unique_identifier)) is stored in this field."},"id":{"type":"string","description":"Postman can store a number of requests in each collection. In order to preserve the order of each request, we need to be able to identify requests uniquely. This field is a UUID assigned to each request."},"name":{"type":"string","description":"Sometimes, you just need to call your request 'Bob'. Postman will let you do that, and store the name you give in this field."},"dataMode":{"type":"string","enum":["raw","urlencoded","params"],"description":"A request can have a specific data mode, and Postman supports three."},"data":{"oneOf":[{"type":"array","description":"Data is an array of key-values that the request goes with. POST data, PUT data, etc goes here.","items":{"type":"object","properties":{"key":{"type":"string"},"value":{"type":"string"},"enabled":{"type":"boolean"},"type":{"enum":["file","text"]}}}},{"type":"null"}]},"descriptionFormat":{"oneOf":[{"type":"string","enum":["html","markdown"]},{"type":"null"}],"description":"A request can have an associated description text. Since description is meant to be long, it can be in either ``html`` or ``markdown`` formats. This field specifies that format."},"description":{"type":"string","description":"The description of this request. Can be as long as you want. Postman also supports two formats for your description, ``markdown`` and ``html``."},"headers":{"type":"string","description":"No HTTP request is complete without its headers, and the same is true for a Postman request. This field contains all the HTTP Headers in a raw string format."},"method":{"type":"string","enum":["GET","PUT","POST","PATCH","DELETE","COPY","HEAD","OPTIONS","LINK","UNLINK","PURGE","LOCK","UNLOCK","PROPFIND","VIEW"],"description":"The HTTP method associated with this request."},"currentHelper":{"oneOf":[{"type":"string"},{"type":"null"}],"description":"Postman can associate helpers with a request, which help with activities such as OAuth, Basic Authentication, etc. The type of helper associated with this request is stored in this field."},"helperAttributes":{"oneOf":[{"type":"string"},{"type":"object","title":"AWS-SignatureV4","properties":{"id":{"type":"string","enum":["awsSigV4"],"description":"This field contains the type of the helper. In this case, it is ``awsSigV4``"},"accessKey":{"type":"string","description":"AWS Signature V4 calculation requires the AWS Access Key of the AWS IAM user being used. This key is stored in this field.\n *Note: Do not use your AWS root credentials here.*"},"secretKey":{"type":"string","description":"The AWS Secret key associated with the Access Key is stored in this field.\n *Note: Do not use your AWS root credentials here.*"},"region":{"type":"string","description":"The AWS region code, must be one of the ones mentioned in the [AWS Documentation](http://docs.aws.amazon.com/general/latest/gr/rande.html)"},"service":{"type":"string","description":"The AWS Service endpoint. Refer to the [AWS Documentation](http://docs.aws.amazon.com/general/latest/gr/rande.html) for possible values."}},"required":["id"]},{"type":"object","title":"DigestAuth","description":"Helper attributes for Digest Authentication","properties":{"id":{"type":"string","enum":["digest"],"description":"This field contains the type of the helper. In this case, it is ``digest``"},"algorithm":{"type":"string","description":"The hashing algorithm used in this Digest authenticated request is stored in this field."},"username":{"type":"string","description":"The username to be used for digest Authentication is stored in this field."},"realm":{"type":"string","description":"The authentication 'realm' is stored in this field. Refer to [RFC 2617](https://tools.ietf.org/html/rfc2617) for details."},"password":{"type":"string","description":"The password to be used for digest Authentication is stored in this field."},"nonce":{"type":"string","description":"The Digest server challenges clients. A nonce is a part of that challenge, stored in this field."},"qop":{"type":"string","description":"Indicates what \"quality of protection\" the client has applied to the message."},"nonceCount":{"type":"string","description":"The nonceCount is the hexadecimal count of the number of requests (including the current request) that the client has sent with the nonce value in this request."},"clientNonce":{"type":"string","description":"A client nonce enhances the security of HTTP Digest Authentication, and it is stored in this field."},"opaque":{"type":"string","description":"A string of data, specified by the server, which should be returned by the client unchanged."}},"required":["id"]},{"type":"object","title":"HawkAuth","description":"Helper attributes for Hawk Authentication","properties":{"id":{"type":"string","enum":["hawk"],"description":"This field contains the type of the Postman helper. In this case, it is ``hawk``"},"hawk_id":{"type":"string","description":"Hawk Authentication requires a client identifier to be passed to the server. This field contains that identifier."},"hawk_key":{"type":"string","description":"The secret that's shared by the server and the client. It is recommended to use an environment variable here, and set the value in your environment."},"algorithm":{"type":"string","description":"The hashing algorithm used in this Digest authenticated request is stored in this field."},"user":{"type":"string","description":"One can optionally send their username (if available) to the Hawk protected endpoint. This field holds the value, if given."},"nonce":{"type":"string","description":"The Digest server challenges clients. A nonce is a part of that challenge, stored in this field."},"ext":{"type":"string","description":"Extra data sent to the app."},"dlg":{"type":"string","description":"This field is used when Hawk auth is used as a part of a larger protocol and serves as a place for handling complex scenarios such as access delegation."},"app":{"type":"string","description":"Serves to identify the backend app in case multiple ones are supported. This field is optional."},"timestamp":{"type":"string","description":"Contains the timestamp used when signing the request."}},"required":["id"]},{"type":"object","title":"BasicAuth","description":"Helper attributes for Basic Authentication","properties":{"id":{"type":"string","enum":["basic"],"description":"This field contains the type of the helper. In this case, it is ``basic``"},"username":{"type":"string","description":"The username to be used for Basic Authentication is stored in this field."},"password":{"type":"string","description":"The password to be used for digest Authentication is stored in this field."}},"required":["id"]},{"type":"object","title":"OAuth1","description":"Helper attributes for OAuth-1 Authentication","properties":{"id":{"type":"string","enum":["oAuth1"],"description":"This field contains the type of the helper. In this case, it is ``oAuth1``"},"consumerKey":{"type":"string","description":"The oAuth1 Consumer Secret, along with the Consumer Key authenticates the client. This field holds the oAuth1 Consumer Key"},"consumerSecret":{"type":"string","description":"The oAuth1 Consumer Secret, along with the Consumer Key authenticates the client. The consumer secret is stored in this field."},"token":{"type":"string","description":"The request token is a temporary credential, and is stored by Postman in this field."},"tokenSecret":{"type":"string","description":"The request token secret is a temporary credential."},"signatureMethod":{"type":"string","description":"The name of the signature method used by the client to sign the request."},"nonce":{"type":"string","description":"A nonce is a random string, uniquely generated by the client to allow the server to verify that a request has never been made before and helps prevent replay attacks when requests are made over a non-secure channel."},"version":{"type":"string","description":"The oAuth version, usually, this is ``1.0`` for OAuth-1"},"realm":{"type":"string","description":"The realm directive is required for all authentication schemes that issue a challenge. Refer to [RFC 2617](http://tools.ietf.org/html/rfc2617#section-1.2) for more details."},"header":{"type":"boolean","description":"Set this parameter to 'true' if you want Postman to add the OAuth parameters to the request headers. If false, the query string is used instead."},"auto":{"type":"boolean","description":"This field controls whether OAuth1 parameters are automatically added to the request."},"includeEmpty":{"type":"boolean","description":"If you would like to include empty parameters in the request, set this to 'true', else set it to 'false'"}},"required":["id"]},{"type":"null"},{"type":"object","additionalProperties":false,"properties":{}}],"description":"A helper may require a number of parameters to actually be helpful. The parameters used by the helper can be stored in this field, as an object. E.g when using Basic Authentication, the username and password will be stored here."},"pathVariables":{"oneOf":[{"type":"string"},{"type":"object"},{"type":"null"}],"description":"A Postman request allows you to use Path Variables in a request, e.g: ``/search/:bookId``. This field stores these variables."},"url":{"type":"string","description":"Contains the complete URL for this request, along with the path variables, if any."},"preRequestScript":{"oneOf":[{"type":"string"},{"type":"null"}],"description":"In some use cases, it's necessary to run a bit of code or perform some tasks before sending a request. Postman implements this feature by the use of this field. Any code written to this field is run before running a request."},"tests":{"oneOf":[{"type":"string"},{"type":"null"}],"description":"Postman allows you to define a script that is run after executing the request, which may act on the response. Such a script is stored in this field."},"time":{"type":"number","multipleOf":1,"description":"The timestamp for this request."},"responses":{"type":"array","description":"A Postman request can have multiple responses associated with it. These responses are stored in this field.","items":{"$schema":"http://json-schema.org/draft-04/schema#","id":"response","title":"Response","description":"A response represents an HTTP response.","properties":{"request":{"oneOf":[{"type":"string"},{"type":"object"},{"type":"null"}],"description":"A response is associated with a request. This fields contains the UUID of the request corresponding to this response."},"id":{"type":"string","description":"In order to unambiguously identify a response, Postman assigns a UUID to it, and stores it in this field."},"name":{"type":"string","description":"A response can have a friendly name, which goes here."},"status":{"type":"string","description":""},"responseCode":{"type":"object","title":"ResponseCode","properties":{"code":{"type":"number","description":"The numeric HTTP response code."},"name":{"type":"string","description":"The textual HTTP response code."},"detail":{"type":"string","description":"Detailed explanation of the response code."}},"required":["code","name"]},"time":{"oneOf":[{"type":"string"},{"type":"number"}],"description":"The time taken by this particular HTTP transaction to complete is stored in this field."},"headers":{"type":"array","title":"Header","items":{"type":"object","properties":{"name":{"type":"string","description":"Some headers can have names associated with them, which are stored in this field."},"key":{"type":"string","description":"The left hand side (LHS) or 'key' of the header."},"value":{"type":"string","description":"Value of the header, or the right hand side (RHS)."},"description":{"type":"string","description":"An optional description about the header."}},"required":["name","key","value"]}},"cookies":{"type":"array","title":"Cookie","items":{"type":"object","properties":{"domain":{"type":"string","description":"The domain for which this cookie is valid."},"expirationDate":{"type":"number","description":"The timestamp of the time when the cookie expires."},"hostOnly":{"type":"boolean","description":"Indicates if this cookie is Host Only."},"httpOnly":{"type":"boolean","description":"Indicates if this cookie is HTTP Only."},"name":{"type":"string","description":"This is the name of the Cookie."},"path":{"type":"string","description":"The path associated with the Cookie."},"secure":{"type":"boolean","description":"Indicates if the 'secure' flag is set on the Cookie."},"session":{"type":"boolean","description":"True if the cookie is a session cookie."},"storeId":{"type":"string","description":"The ID of the cookie store containing this cookie."},"value":{"type":"string","description":"The value of the Cookie."},"expires":{"type":"string","description":"Human readable expiration time."}},"required":["domain","expirationDate","hostOnly","httpOnly","name","path","secure","session","storeId","value","expires"]}},"mime":{"type":"string","description":"Mimetype of the response."},"text":{"type":"string","description":"The raw text of the response."},"language":{"type":"string","enum":["html","javascript","xml","Text"],"description":"The language associated with the response."},"rawDataType":{"type":"string","description":"The data type of the raw response."}},"required":["id","responseCode","request"]}},"rawModeData":{"oneOf":[{"type":"string"},{"type":"null"},{"type":"array"}],"description":"Contains the raw data (parameters) that Postman sends to the server"},"collectionId":{"type":"string","description":"This field contains the unique ID of the collection to which this request belongs."},"collection":{"type":"string","description":"This field contains the unique ID of the collection to which this request belongs."}},"anyOf":[{"required":["id","method","url","headers","name","collectionId"]},{"required":["id","method","url","headers","name","collection"]}]}}};
	
	var schemaV2 = {"$schema":"http://json-schema.org/draft-04/schema#","id":"https://schema.getpostman.com/json/collection/v2.0.0/","type":"object","properties":{"info":{"$ref":"#/definitions/info"},"item":{"type":"array","description":"Items are the basic unit for a Postman collection. You can think of them as corresponding to a single API endpoint. Each Item has one request and may have multiple API responses associated with it.","items":{"title":"Items","oneOf":[{"$ref":"#/definitions/item"},{"$ref":"#/definitions/item-group"}]}},"event":{"description":"Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.","type":"array","items":{"$ref":"#/definitions/event"}},"variable":{"description":"Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*","type":"array","items":{"$ref":"#/definitions/variable"}},"auth":{"$ref":"#/definitions/auth"}},"required":["info","item"],"definitions":{"auth":{"type":"object","title":"Auth","id":"#/definitions/auth","description":"Represents authentication helpers provided by Postman","properties":{"type":{"type":"string","enum":["awsv4","basic","digest","hawk","noauth","oauth1","oauth2"]},"awsv4":{"type":"object","properties":{"accessKey":{"type":"string"},"secretKey":{"type":"string"},"region":{"type":"string"},"service":{"type":"string"}}},"basic":{"type":"object","properties":{"username":{"type":"string"},"password":{"type":"string"}}},"digest":{"type":"object","properties":{"username":{"type":"string"},"realm":{"type":"string"},"password":{"type":"string"},"nonce":{"type":"string"},"nonceCount":{"type":"string"},"algorithm":{"type":"string"},"qop":{"type":"string"},"clientNonce":{"type":"string"}}},"hawk":{"type":"object","properties":{"authId":{"type":"string"},"authKey":{"type":"string"},"algorithm":{"type":"string"},"user":{"type":"string"},"nonce":{"type":"string"},"extraData":{"type":"string"},"appId":{"type":"string"},"delegation":{"type":"string"}}},"noauth":{},"oauth1":{"type":"object","properties":{"consumerKey":{"type":"string"},"consumerSecret":{"type":"string"},"token":{"type":"string"},"tokenSecret":{"type":"string"},"signatureMethod":{"type":"string"},"timeStamp":{"type":"string"},"nonce":{"type":"string"},"version":{"type":"string"},"realm":{"type":"string"},"encodeOAuthSign":{"type":"string"}}},"oauth2":{"type":"object","properties":{"addTokenTo":{"type":"string"},"callBackUrl":{"type":"string"},"authUrl":{"type":"string"},"accessTokenUrl":{"type":"string"},"clientId":{"type":"string"},"clientSecret":{"type":"string"},"scope":{"type":"string"},"requestAccessTokenLocally":{"type":"string"}}}},"required":["type"]},"cookie":{"type":"object","title":"Cookie","id":"#/definitions/cookie","description":"A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)","properties":{"domain":{"type":"string","description":"The domain for which this cookie is valid."},"expires":{"oneOf":[{"type":"string"},{"type":"number"}],"description":"When the cookie expires."},"maxAge":{"type":"string"},"hostOnly":{"type":"boolean","description":"True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."},"httpOnly":{"type":"boolean","description":"Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"},"name":{"type":"string","description":"This is the name of the Cookie."},"path":{"type":"string","description":"The path associated with the Cookie."},"secure":{"type":"boolean","description":"Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"},"session":{"type":"boolean","description":"True if the cookie is a session cookie."},"value":{"type":"string","description":"The value of the Cookie."},"extensions":{"type":"array","description":"Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"}},"required":["domain","path"]},"description":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/description","description":"A Description can be a raw text, or be an object, which holds the description along with its format.","oneOf":[{"type":"object","title":"Description","properties":{"content":{"type":"string","description":"The content of the description goes here, as a raw string."},"type":{"type":"string","description":"Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."},"version":{"description":"Description can have versions associated with it, which should be put in this property."}}},{"type":"string"}]},"event":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/event","title":"Event","description":"An Event","type":"object","properties":{"listen":{"type":"string","description":"Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."},"script":{"$ref":"#/definitions/script"},"disabled":{"type":"boolean","description":"Indicates whether the event is disabled. If absent, the event is assumed to be enabled."}},"required":["listen"]},"header":{"type":"object","title":"Header","id":"#/definitions/header","description":"Represents a single HTTP Header","properties":{"key":{"description":"This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``","type":"string"},"value":{"type":"string","description":"The value (or the RHS) of the Header is stored in this field."}},"required":["key","value"]},"info":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/info","title":"Information","description":"Detailed description of the info block","type":"object","properties":{"name":{"type":"string","title":"Name of the collection","description":"A collection's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this collection among a bunch of other collections, as such outlining its usage or content."},"_postman_id":{"type":"string","description":"Every collection is identified by the unique value of this field. The value of this field is usually easiest to generate using a UID generator function. If you already have a collection, it is recommended that you maintain the same id since changing the id usually implies that is a different collection than it was originally.\n *Note: This field exists for compatibility reasons with Collection Format V1.*"},"description":{"$ref":"#/definitions/description"},"version":{"oneOf":[{"type":"object","title":"Version","description":"Postman allows you to version your collections as they grow, and this field holds the version number. While optional, it is recommended that you use this field to its fullest extent!","properties":{"major":{"description":"Increment this number if you make changes to the collection that changes its behaviour. E.g: Removing or adding new test scripts. (partly or completely).","type":"string"},"minor":{"description":"You should increment this number if you make changes that will not break anything that uses the collection. E.g: removing a folder.","type":"string"},"patch":{"description":"Ideally, minor changes to a collection should result in the increment of this number.","type":"string"},"identifier":{"description":"A human friendly identifier to make sense of the version numbers. E.g: 'beta-3'","type":"string","maxLength":10},"meta":{}},"required":["major","minor","patch"]},{"type":"string"}]},"schema":{"description":"This should ideally hold a link to the Postman schema that is used to validate this collection. E.g: https://schema.getpostman.com/collection/v1","type":"string"}},"required":["name","schema"]},"item-group":{"title":"Folder","id":"#/definitions/item-group","description":"One of the primary goals of Postman is to organize the development of APIs. To this end, it is necessary to be able to group requests together. This can be achived using 'Folders'. A folder just is an ordered set of requests.","type":"object","properties":{"name":{"type":"string","description":"A folder's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this folder."},"description":{"type":"string","description":"Essays about the folder go into this field!"},"item":{"description":"Items are entities which contain an actual HTTP request, and sample responses attached to it. Folders may contain many items.","type":"array","items":{"title":"Items","anyOf":[{"$ref":"#/definitions/item"},{"$ref":"#/definitions/item-group"}]}},"auth":{"$ref":"#/definitions/auth"}},"required":["item"]},"item":{"type":"object","title":"Item","id":"#/definitions/item","description":"Items are entities which contain an actual HTTP request, and sample responses attached to it.","properties":{"id":{"type":"string","description":"A unique ID that is used to identify collections internally"},"name":{"description":"A friendly name can be attached to each Item.","type":"string"},"event":{"description":"Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.","type":"array","items":{"$ref":"#/definitions/event"}},"request":{"$ref":"#/definitions/request"},"response":{"type":"array","title":"Responses","items":{"$ref":"#/definitions/response"}}},"required":["request"]},"request":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/request","title":"Request","description":"A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.","oneOf":[{"type":"object","title":"Request","properties":{"url":{"$ref":"#/definitions/url"},"auth":{"$ref":"#/definitions/auth"},"method":{"description":"The HTTP method associated with this request.","type":"string","enum":["GET","PUT","POST","PATCH","DELETE","COPY","HEAD","OPTIONS","LINK","UNLINK","PURGE","LOCK","UNLOCK","PROPFIND","VIEW"]},"header":{"oneOf":[{"type":"array","title":"Headers","description":"No HTTP request is complete without its headers, and the same is true for a Postman request. This field is an array containing all the headers.","items":{"$ref":"#/definitions/header"}},{"type":"string"}]},"body":{"type":"object","description":"This field contains the data usually contained in the request body.","properties":{"mode":{"description":"Postman stores the type of data associated with this request in this field.","enum":["raw","urlencoded","formdata"]},"raw":{"type":"string"},"urlencoded":{"type":"array","items":{"type":"object","title":"UrlEncodedParameter","properties":{"key":{"type":"string"},"value":{"type":"string"},"enabled":{"type":"boolean"}}}},"formdata":{"type":"array","items":{"type":"object","title":"FormParameter","properties":{"key":{"type":"string"},"value":{"type":"string"},"enabled":{"type":"boolean"}}}}}}}},{"type":"string"}]},"response":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/response","title":"Response","description":"A response represents an HTTP response.","properties":{"originalRequest":{"$ref":"#/definitions/request"},"responseTime":{"title":"ResponseTime","oneOf":[{"type":"string"},{"type":"number"}],"description":"The time taken by the request to complete. If a number, the unit is milliseconds."},"header":{"title":"Headers","oneOf":[{"type":"array","title":"Header","description":"No HTTP request is complete without its headers, and the same is true for a Postman request. This field is an array containing all the headers.","items":{"oneOf":[{"$ref":"#/definitions/header"},{"title":"Header","type":"string"}]}},{"type":"string"}]},"cookie":{"type":"array","items":{"$ref":"#/definitions/cookie"}},"body":{"type":"string","description":"The raw text of the response."},"status":{"type":"string","description":"The response status, e.g: '200 OK'"},"code":{"type":"integer","description":"The numerical response code, example: 200, 201, 404, etc."}}},"script":{"$schema":"http://json-schema.org/draft-04/schema#","id":"#/definitions/script","title":"Script","description":"A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.","oneOf":[{"title":"Script","type":"object","properties":{"id":{"description":"A unique, user defined identifier that can  be used to refer to this script from requests.","type":"string"},"type":{"description":"Type of the script. E.g: 'text/javascript'","type":"string"},"exec":{"oneOf":[{"type":"array","description":"This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.","items":{"type":"string"}},{"type":"string"}]},"src":{"$ref":"#/definitions/url"},"name":{"type":"string","description":"Script name"}}},{"type":"string"}]},"url":{"description":"If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.","id":"#/definitions/url","title":"Url","oneOf":[{"type":"object","properties":{"protocol":{"type":"string","description":"The protocol associated with the request, E.g: 'http'"},"domain":{"title":"Domain","description":"The domain for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.","oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"},"description":"The domain, split into subdomain strings."}]},"path":{"oneOf":[{"type":"string"},{"type":"array","description":"The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.","items":{"oneOf":[{"type":"string"},{"type":"object","properties":{"type":{"type":"string"},"value":{"type":"string"}}}]}}]},"port":{"type":"string","description":"The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."},"query":{"type":"array","description":"An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables","items":{"type":"object","title":"QueryParam","properties":{"key":{"type":"string"},"value":{"type":"string"},"description":{"type":"string"}}}},"hash":{"description":"Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.","type":"string"},"variable":{"type":"array","description":"Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.","items":{"$ref":"#/definitions/variable"}}}},{"type":"string"}]},"variable":{"id":"#/definitions/variable","title":"Variable","description":"Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.","type":"object","properties":{"id":{"description":"A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.","type":"string"},"value":{"description":"The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"},"type":{"description":"A variable may have multiple types. This field specifies the type of the variable.","type":"string"},"name":{"type":"string","description":"Variable name"}}}}};

	var Ken = {};

	Ken.convert = function(postman, scriptId){
		var version = Ken.probeVersion(postman);
		if ( 'v1' == version )
		{
			return Ken.v1(postman, scriptId);
		}
		if ( 'v2' == version )
		{
			return Ken.v2(postman, scriptId);
		}

		throw new TypeError('尚不支持此种Postman Collection格式');
	};

	Ken.probeVersion = function(postman)
	{
		if ( $.isArray(postman.requests) ) return 'v1';
		if ( $.isArray(postman.item) ) return 'v2';
		return 'Unknown';
	};

	Ken.v2 = function(postman, scriptId)
	{
		throw new TypeError('尚不支持 Postman Collection2 格式');

		// var validate = JsonSchema.validate(postman, schemaV2);
		// if (!validated)
		// {
		// 	throw new TypeError(JsonSchema.error);
		// }
	}

	Ken.v1 = function(postman, scriptId)
	{
		var validated = JsonSchema.validate(postman, schemaV1);
		if (!validated)
		{
			throw new TypeError(JsonSchema.error);
		}

		var vo = AScript.create();
		vo.data.script_id = scriptId;
		vo.data.script_name = postman.name;

		var steps = [];
		$.each(postman.requests, function(){
			var step = Ken.v1.request(this);
			if ( step && step.type == 1 )
			{
				steps.push(step);
			}			
		});
		AScript.tranSteps(vo, steps);
		return vo;
	};

	Ken.v1.request = function (o)
	{
		// var ;

		var id = null;// 自动生成
		var url = o.url;
		var method = o.method.toUpperCase();
		var name = o.name;

		/*
		 * 解析请求头参数
		 * 
		 * o.headers : {
		 * 		"headers": ""
		 * 		"headers": "Content-Type: text/plain\n"
		 * 		"headers": "Authorization: OAuth oauth_consumer_key=\"RKCGzna7bv9YD57c\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1442394747\",oauth_nonce=\"UIGipk\",oauth_version=\"1.0\",oauth_signature=\"CaeyGPr2mns1WCq4Cpm5aLvz6Gs=\"\n",
		 *   	"headers": "Authorization: Basic cG9zdG1hbjpwYXNzd29yZA==\n",
		 *   	"headers": "Authorization: Digest username=\"postman\", realm=\"Users\", nonce=\"ni1LiL0O37PRRhofWdCLmwFsnEtH1lew\", uri=\"/digest-auth\", response=\"254679099562cf07df9b6f5d8d15db44\", opaque=\"\"\n",
		 *      "headers": "my-sample-header: Lorem ipsum dolor sit amet\n",
		 * 
		 * }  
		 */
		var hd = Ken.v1.headers(o.headers);
		var headers = hd.headers;
		var authorization = hd.authorization;

		/*
		 * 解析请求参数
		 *
		 * {
		 * 		"dataMode": "params",
		 * 		"rawModeData": null,
		 * 		"data": [],
		 * }
		 *
		 * {
		 * 		"dataMode": "params", => formdata
		 * 		"method": "POST",
		 * 		"data": [
		 *			{
		 *				"key": "code",
		 *				"value": "xWnkliVQJURqB2x1",
		 *				"type": "text",
		 *				"enabled": true
		 *			},
		 *		],
		 * }
		 * 
		 * {
		 * 		"dataMode": "raw", => {
		 * 				默认是text, 
		 * 				类型= json | "headers": "Content-Type: application/json\n",
		 * 				类型= json | "headers": "Content-Type: application/xml\n",
		 * 				类型= json | "headers": "Content-Type: text/xml\n",
		 * 				类型= json | "headers": "Content-Type: text/html\n",
		 * 				
		 * 		}
		 * 		"data": [],
		 * 		"rawModeData": "Etiam mi Donec vitae velit nec metus."
		 * }
		 *
		 * {
		 * 		"dataMode": "binary",// 上传文件
		 * }
		 *
		 * {
		 * 		"dataMode": "urlencoded", 对应 x-www-form-urlencoded
		 * }
		 *
		 * 只有 PUT,POST,DELETE,OPTIONS,PATCH 支持内容体
		 * 
		 */
		var parameters = [];
		var formdata = [];
		
		// console.log(o.url, o.method, o.dataMode, o.data);
		
		// 压测宝目前仅支持 GET,POST,PUT,DELETE,HEAD,OPTIONS
		switch (method)
		{
			case 'GET':
			case 'HEAD':
				$.each(o.data, function(){

						switch(this.type)
						{
							case 'text':
								parameters.push( 
									AScript.stepParameter(null, $.trim(this.key), this.value)
								);
								break;
							default:
								// 暂不支持,忽略
								break;
						}

					});
				break;
			case 'POST':
			case 'PUT':
			case 'DELETE':
			case 'OPTIONS':

				switch (o.dataMode)
				{
					case 'params':
						formdata = AScript.stepFormFormdata();
						$.each(o.data, function(){

							switch(this.type)
							{
								case 'text':
									formdata.value.push( 
										AScript.stepFormItemFormdata(null, $.trim(this.key), this.value)
									);
									break;
								case 'file':
									// 暂不支持,忽略
									break;
							}

						});

						break;
					case 'urlencoded':
						formdata = AScript.stepFormXwww();
						$.each(o.data, function(){

							switch(this.type)
							{
								case 'text':
									formdata.value.push( 
										AScript.stepFormItemXwww(null, $.trim(this.key), this.value)
									);
									break;
								case 'file':
									// ycb暂不支持,忽略
									break;
							}

						});
						break;
					case 'raw':
						var rawType = null;
						switch ( hd["Content-Type"] )
						{
							case 'application/json':
								rawType = 'raw-json';
								break;
							case 'application/xml':
							case 'text/xml':
								rawType = 'raw-xml';
								break;
							case 'text/html':
								rawType = 'raw-html';
								break;
							default:
								rawType = 'raw-text';
								break;
						}
						
						formdata = AScript.stepFormRaw(rawType);
						formdata.value = o.rawModeData;
						
						break;
					case 'binary':
						// 暂不支持
						return false;
						break;
					default:
						// 暂不支持
						return false;
						break;
				}

				break;
			default:
				// 暂不支持
				return false;
				break;		

		}
		
		var properties = [];
		var assertions = [];

		return AScript.stepAction(id, url, method, headers, 
			parameters, formdata, properties, assertions, authorization, name);
	}

	Ken.v1.headers = function (s)
	{
		var re = {
			headers: 	[],
			authorization: {},
			"Content-Type": ''
		};

		s = $.trim(s);
		
		if ("" !== s)
		{
			s = s.split('\n');
			$.each(s, function(){
				if ( this.indexOf(': ') !== -1 )
				{
					var it = this.split(': ');
					if ( 'Authorization' !== it[0])
					{
						if ( "Content-Type" === $.trim(it[0]) )
						{
							re["Content-Type"] = $.trim(it[1]);
						}
						re.headers.push( AScript.stepHeader(null, it[0], it[1]) );
					}
					else
					{
						re.authorization = Ken.v1.authorization(it[1]);
					}
				}
			});
		}

		return re;
	}

	Ken.v1.authorization = function (s)
	{
		if ( /^Basic /.test(s) )
		{
			s = $.base64.decode( $.trim(s.replace(/^Basic /,'')) );
			s = s.split(':');

			return AScript.stepAuthorizationBasic(s[0], s[1]);
		}
		if ( /^OAuth /.test(s) )
		{
			s = $.trim(s.replace(/^OAuth /,'').replace(/"/g,''));
			var d = {};
			s = s.split(',');
			$.each(s, function(){
				var it = $.trim(this);
				if ( '' !== it )
				{
					it = it.split('=');
					if ( '' !== $.trim(it[0]) )
					{
						d[ it[0] ] = it[1];
					}
				}
			});

			return AScript.stepAuthorizationType('OAuth', d);
		}

		if ( /^Digest /.test(s) )
		{
			s = $.trim(s.replace(/^Digest /,'').replace(/"/g,''));
			var d = {};
			s = s.split(',');
			$.each(s, function(){
				var it = $.trim(this);
				if ( '' !== it )
				{
					it = it.split('=');
					if ( '' !== $.trim(it[0]) )
					{
						d[ it[0] ] = it[1];
					}
				}
			});

			return AScript.stepAuthorizationType('Digest', d);
		}

		// 暂不支持其它解析方法
		return {};
	}

	return {
		convert: Ken.convert
	};
});	