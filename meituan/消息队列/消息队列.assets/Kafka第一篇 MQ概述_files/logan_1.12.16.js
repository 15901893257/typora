!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.Logan=n():t.Logan=n()}("undefined"!=typeof self?self:this,function(){return function(t){function n(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var e=window.webpackJsonpLogan;window.webpackJsonpLogan=function(n,o,i){for(var c,a,u=0,s=[];u<n.length;u++)a=n[u],r[a]&&s.push(r[a][0]),r[a]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(t[c]=o[c]);for(e&&e(n,o,i);s.length;)s.shift()()};var o={},r={7:0,6:0};return n.e=function(t){function e(){a.onerror=a.onload=null,clearTimeout(u);var n=r[t];0!==n&&(n&&n[1](new Error("Loading chunk "+t+" failed.")),r[t]=void 0)}var o=r[t];if(0===o)return new Promise(function(t){t()});if(o)return o[2];var i=new Promise(function(n,e){o=r[t]=[n,e]});o[2]=i;var c=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript",a.charset="utf-8",a.async=!0,a.timeout=12e4,a.crossOrigin="anonymous",n.nc&&a.setAttribute("nonce",n.nc),a.src=n.p+""+({0:"owl",1:"savelog",2:"reportlog",3:"envchecker",4:"rsa",5:"aes"}[t]||t)+"."+{0:"cdf5d48565318bdea306",1:"608e01d520f25005c84f",2:"1ed8636811ebea3b1d42",3:"1623c9eb520386e4eb9f",4:"9618aa53411c527f0f46",5:"486d277202ebfec74be2"}[t]+".js";var u=setTimeout(e,12e4);return a.onerror=a.onload=e,c.appendChild(a),i},n.m=t,n.c=o,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="//www.dpfile.com/app/dp-logan-web/",n.oe=function(t){throw console.error(t),t},n(n.s=54)}([function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n,e){var o=e(34)("wks"),r=e(35),i=e(0).Symbol,c="function"==typeof i;(t.exports=function(t){return o[t]||(o[t]=c&&i[t]||(c?i:r)("Symbol."+t))}).store=o},function(t,n){var e=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=e)},function(t,n,e){var o=e(0),r=e(2),i=e(11),c=e(5),a=e(13),u=function(t,n,e){var s,f,l,p=t&u.F,h=t&u.G,d=t&u.S,v=t&u.P,g=t&u.B,y=t&u.W,_=h?r:r[n]||(r[n]={}),m=_.prototype,w=h?o:d?o[n]:(o[n]||{}).prototype;h&&(e=n);for(s in e)(f=!p&&w&&void 0!==w[s])&&a(_,s)||(l=f?w[s]:e[s],_[s]=h&&"function"!=typeof w[s]?e[s]:g&&f?i(l,o):y&&w[s]==l?function(t){var n=function(n,e,o){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,o)}return t.apply(this,arguments)};return n.prototype=t.prototype,n}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((_.virtual||(_.virtual={}))[s]=l,t&u.R&&m&&!m[s]&&c(m,s,l)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,n,e){var o=e(7);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var o=e(9),r=e(30);t.exports=e(6)?function(t,n,e){return o.f(t,n,r(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){t.exports=!e(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){t.exports={}},function(t,n,e){var o=e(4),r=e(58),i=e(59),c=Object.defineProperty;n.f=e(6)?Object.defineProperty:function(t,n,e){if(o(t),n=i(n,!0),o(e),r)try{return c(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){var o=e(12);t.exports=function(t,n,e){if(o(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,o){return t.call(n,e,o)};case 3:return function(e,o,r){return t.call(n,e,o,r)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,e){var o=e(7),r=e(0).document,i=o(r)&&o(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},function(t,n,e){var o=e(33),r=e(15);t.exports=function(t){return o(r(t))}},function(t,n){var e=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:e)(t)}},function(t,n,e){var o=e(34)("keys"),r=e(35);t.exports=function(t){return o[t]||(o[t]=r(t))}},function(t,n){t.exports=!0},function(t,n,e){var o=e(9).f,r=e(13),i=e(1)("toStringTag");t.exports=function(t,n,e){t&&!r(t=e?t:t.prototype,i)&&o(t,i,{configurable:!0,value:n})}},function(t,n,e){"use strict";function o(t){var n,e;this.promise=new t(function(t,o){if(void 0!==n||void 0!==e)throw TypeError("Bad Promise constructor");n=t,e=o}),this.resolve=r(n),this.reject=r(e)}var r=e(12);t.exports.f=function(t){return new o(t)}},function(t,n,e){t.exports=e(56)},function(t,n,e){"use strict";var o=function(t,n){return{code:t,msg:n,data:{},setData:function(e){return{code:t,msg:n,data:e}}}},r={DB_NOT_SUPPORT:o(100,"该浏览器不支持IndexedDB"),INVALID_PARAM:o(101,"无效的参数"),SAVE_SUCC:o(200,"存储成功"),SAVE_LOG_FAIL:o(201,"存储日志失败"),GET_LOG_FAIL:o(202,"获取日志失败"),KEY_PROCESS_FAIL:o(203,"密钥处理过程失败"),DELETE_DB_FAIL:o(204,"删除DB失败"),EXCEED_SINGLE_LOG_LIMIT:o(301,"超出单条日志容量限额"),EXCEED_DAY_LIMIT:o(302,"超出当天日志容量限额"),NO_LOG:o(303,"没有日志"),REPORT_SUCC:o(400,"上报成功"),ASYNC_IMPORT_ERROR:o(401,"异步加载失败"),REPORT_AJAX_ERROR:o(402,"上报接口失败"),REPORT_SERVER_ERROR:o(403,"上报服务端有错"),REPORT_UNKNOWN_ERROR:o(404,"上报未知错误"),REPORT_ENCRYPT_ERROR:o(405,"上报加密错误"),ENCRYPT_ERROR:o(501,"加密失败"),UNKNOWN_ERROR:o(666,"未知错误"),KNB_SAVE_SUCC:o(700,"桥接存储成功"),KNB_SAVE_FAIL:o(701,"桥接存储失败")};n.a=r},function(t,n,e){var o=e(15);t.exports=function(t){return Object(o(t))}},function(t,n,e){var o=e(61),r=e(36);t.exports=Object.keys||function(t){return o(t,r)}},function(t,n,e){t.exports=e(66)},function(t,n,e){"use strict";var o={devMode:!1,enableShake:!0,onReportFinished:function(){}};n.a={set:function(t){var n=t||{};o.devMode="boolean"==typeof n.devMode?n.devMode:o.devMode,o.enableShake="boolean"==typeof n.disableShake?!n.disableShake:o.enableShake,o.onReportFinished="function"==typeof n.onReportFinished?n.onReportFinished:o.onReportFinished},get:function(t){if(o.hasOwnProperty(t))return o[t];throw new Error("globalConfig do not have property named as: ".concat(t))}}},function(t,n,e){"use strict";n.a=function(t){return t.then(function(t){return t.default||t})}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){var o=e(18),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},function(t,n,e){"use strict";var o=2,r=function(){o>0&&o--},i=function(){return o>0},c=function(){o=2},a={errorTrigger:r,canSave:i,resetQuota:c};n.a=a},function(t,n,e){var o=e(14);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},function(t,n,e){var o=e(2),r=e(0),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,n){return i[t]||(i[t]=void 0!==n?n:{})})("versions",[]).push({version:o.version,mode:e(20)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,n){var e=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+o).toString(36))}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,n,e){"use strict";var o=e(20),r=e(3),i=e(77),c=e(5),a=e(8),u=e(78),s=e(21),f=e(81),l=e(1)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,n,e,d,v,g,y){u(e,n,d);var _,m,w,O=function(t){if(!p&&t in S)return S[t];switch(t){case"keys":case"values":return function(){return new e(this,t)}}return function(){return new e(this,t)}},E=n+" Iterator",x="values"==v,R=!1,S=t.prototype,b=S[l]||S["@@iterator"]||v&&S[v],L=b||O(v),T=v?x?O("entries"):L:void 0,P="Array"==n?S.entries||b:b;if(P&&(w=f(P.call(new t)))!==Object.prototype&&w.next&&(s(w,E,!0),o||"function"==typeof w[l]||c(w,l,h)),x&&b&&"values"!==b.name&&(R=!0,L=function(){return b.call(this)}),o&&!y||!p&&!R&&S[l]||c(S,l,L),a[n]=L,a[E]=h,v)if(_={values:x?L:O("values"),keys:g?L:O("keys"),entries:T},y)for(m in _)m in S||i(S,m,_[m]);else r(r.P+r.F*(p||R),n,_);return _}},function(t,n,e){var o=e(0).document;t.exports=o&&o.documentElement},function(t,n,e){var o=e(14),r=e(1)("toStringTag"),i="Arguments"==o(function(){return arguments}()),c=function(t,n){try{return t[n]}catch(t){}};t.exports=function(t){var n,e,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=c(n=Object(t),r))?e:i?o(n):"Object"==(a=o(n))&&"function"==typeof n.callee?"Arguments":a}},function(t,n,e){var o=e(4),r=e(12),i=e(1)("species");t.exports=function(t,n){var e,c=o(t).constructor;return void 0===c||void 0==(e=o(c)[i])?n:r(e)}},function(t,n,e){var o,r,i,c=e(11),a=e(89),u=e(39),s=e(16),f=e(0),l=f.process,p=f.setImmediate,h=f.clearImmediate,d=f.MessageChannel,v=f.Dispatch,g=0,y={},_=function(){var t=+this;if(y.hasOwnProperty(t)){var n=y[t];delete y[t],n()}},m=function(t){_.call(t.data)};p&&h||(p=function(t){for(var n=[],e=1;arguments.length>e;)n.push(arguments[e++]);return y[++g]=function(){a("function"==typeof t?t:Function(t),n)},o(g),g},h=function(t){delete y[t]},"process"==e(14)(l)?o=function(t){l.nextTick(c(_,t,1))}:v&&v.now?o=function(t){v.now(c(_,t,1))}:d?(r=new d,i=r.port2,r.port1.onmessage=m,o=c(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(o=function(t){f.postMessage(t+"","*")},f.addEventListener("message",m,!1)):o="onreadystatechange"in s("script")?function(t){u.appendChild(s("script")).onreadystatechange=function(){u.removeChild(this),_.call(t)}}:function(t){setTimeout(c(_,t,1),0)}),t.exports={set:p,clear:h}},function(t,n){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,n,e){var o=e(4),r=e(7),i=e(22);t.exports=function(t,n){if(o(t),r(n)&&n.constructor===t)return n;var e=i.f(t);return(0,e.resolve)(n),e.promise}},function(t,n,e){"use strict";var o=e(67),r=e.n(o),i=function(t,n){var e,o,r,i=0;if("utf-16"===(n=n?n.toLowerCase():"")||"utf16"===n)for(o=0,r=t.length;o<r;o++)e=t.charCodeAt(o),i+=e<=65535?2:4;else for(o=0,r=t.length;o<r;o++)e=t.charCodeAt(o),i+=e<=127?1:e<=2047?2:e<=65535?3:4;return i},c=function(t,n){return n=n||0,t>=s?(t/s).toFixed(n)+"G":t>=u?(t/u).toFixed(n)+"M":t>=a?(t/a).toFixed(n)+"K":(t||0)+"B"},a=1024,u=1048576,s=1073741824,f=function(t){if(t<=0)throw new Error("byteLength is invalid when generateRandomBytes");for(var n="";n.length<t;)n+=Math.random().toString(36).substr(2,1);return n},l=function(t,n){if("string"==typeof t&&"string"==typeof n){for(var e,o=t.split("."),i=n.split("."),c=0;void 0===e&&c<o.length;){var a=r()(o[c])||-1,u=r()(i[c])||-1;a<u?e=-1:a>u?e=1:c===o.length-1?c<i.length-1?e=-1:c===i.length-1&&(e=0):c++}return e}return console.warn("versionCompare fail, all params must be string."),-1};n.a={sizeOf:i,readableByte:c,K_BYTE:a,M_BYTE:u,G_BYTE:s,generateRandomBytes:f,versionCompare:l}},function(t,n,e){"use strict";var o,r=e(27),i=e.n(r),c=e(23),a=e.n(c),u=e(32),s=e(24),f=e(28),l=e(29),p=1,h={project:"logan-web",devMode:!1,resource:{sampleApi:1,delay:100},metric:{sample:1}},d=function(t){var n=a()({},h,{devMode:f.a.get("devMode")});o?t(o):window.Owl?(o=new window.Owl.OWL(n),t(o)):Object(l.a)(e.e(0).then(e.bind(null,98))).then(function(e){o=new e.OWL(n),t(o)}).catch(function(t){console.log("import dynamic owl error:"+t.stack)})},v=function(t,n,e){if(n<1)throw new Error("invalid actionType");return 1e4*t+1e3*n+e},g=function(t,n,e){d(function(o){var r=o.metricManager;r.setTags(t),r.setMetric(n,e),r.report()})},y=function(t,n,e,o){var r={name:n||"",statusCode:t,content:i()(a()({link:location.href,userAgent:window.navigator&&window.navigator.userAgent},e)),responseTime:o||0};d(function(t){t.addApi(r)})},_=function(t,n,e,o){if(f.a.get("devMode")&&console.log("[Logan]".concat(n)),[s.a.DB_NOT_SUPPORT.code,s.a.INVALID_PARAM.code,s.a.SAVE_LOG_FAIL.code,s.a.GET_LOG_FAIL.code,s.a.KEY_PROCESS_FAIL.code,s.a.EXCEED_DAY_LIMIT.code,s.a.ASYNC_IMPORT_ERROR.code,s.a.ENCRYPT_ERROR.code,s.a.UNKNOWN_ERROR.code,s.a.KNB_SAVE_FAIL.code].indexOf(t)>=0&&u.a.errorTrigger(),p>0){var r={name:n||"",statusCode:t,content:i()(a()({link:location.href,userAgent:window.navigator&&window.navigator.userAgent},e)),responseTime:o||0};d(function(t){t.addApi(r)}),p--}};n.a={codeFormatter:v,metricReport:g,catWithNoLimit:y,cat:_}},function(t,n,e){"use strict";var o={LOGAN_REPORT_PAGE_PATH:"/loganreport",UNIONID_LENGTH_MAX:256,ENV_LENGTH_MAX:256,CUSTOM_REPORT_LENGTH_MAX:1024,COOKIENAME_CUSTOM_REPORT:"logan_custom_report",COOKIENAME_SESSION_TOKEN:"logan_session_token",LOG_TYPE_MAP:{default:14,owl:15,redux:16,vuex:17,zaku:22,archer:25,mtgame:30,tracker:31}};n.a=o},function(t,n,e){"use strict";var o=function(t){if(!(document.cookie.length>0))return"";var n=document.cookie.indexOf(t+"=");if(-1!==n){n=n+t.length+1;var e=document.cookie.indexOf(";",n);return-1===e&&(e=document.cookie.length),unescape(document.cookie.substring(n,e))}},r=function(t,n){return document.cookie=t+"="+escape(n)+";path=/",n};n.a={get:o,set:r}},function(t,n,e){"use strict";var o=e(76)(!0);e(38)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,e=this._i;return e>=n.length?{value:void 0,done:!0}:(t=o(n,e),this._i+=t.length,{value:t,done:!1})})},function(t,n,e){var o=e(4);t.exports=function(t,n,e,r){try{return r?n(o(e)[0],e[1]):n(e)}catch(n){var i=t.return;throw void 0!==i&&o(i.call(t)),n}}},function(t,n,e){var o=e(8),r=e(1)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||i[r]===t)}},function(t,n,e){var o=e(40),r=e(1)("iterator"),i=e(8);t.exports=e(2).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||i[o(t)]}},function(t,n,e){var o=e(1)("iterator"),r=!1;try{var i=[7][o]();i.return=function(){r=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!r)return!1;var e=!1;try{var i=[7],c=i[o]();c.next=function(){return{done:e=!0}},i[o]=function(){return c},t(i)}catch(t){}return e}},function(t,n,e){t.exports=e(55)},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),e.d(n,"config",function(){return m}),e.d(n,"log",function(){return w}),e.d(n,"report",function(){return O}),e.d(n,"info",function(){return E}),e.d(n,"warn",function(){return x}),e.d(n,"error",function(){return R}),e.d(n,"showShakeLayer",function(){return S}),e.d(n,"hideShakeLayer",function(){return b}),e.d(n,"__version__",function(){return A});var o=e(23),r=e.n(o),i=e(27),c=e.n(i),a=e(45),u=e(46),s=e(48),f=e(47),l=e(24),p=e(32),h=e(72),d=e(28),v=e(29),g=e(73),y=e.n(g);window.Promise||(window.Promise=y.a);var _,m,w,O,E,x,R,S,b,L,T=e(96),P=[],A="1.12.16";if(window.Logan&&window.Logan.__version__&&a.a.versionCompare(window.Logan.__version__,A)>=0){console.warn("当前页面引入了多个版本的Logan，统一处理为最新版："+window.Logan.__version__);var M=function(t){return window.Logan[t]};m=M("config"),w=M("log"),O=M("report"),E=M("info"),x=M("warn"),R=M("error"),S=M("showShakeLayer"),b=M("hideShakeLayer"),A=M("__version__"),L=window.Logan}else{var k=function(t,n,o){p.a.canSave()?Object(v.a)(e.e(1).then(e.bind(null,99))).then(function(e){e(t,n,o)}).catch(function(t){u.a.cat(l.a.ASYNC_IMPORT_ERROR.code,"异步加载saveLog失败",{error:t.stack||t.toString()})}):d.a.get("devMode")&&console.log("Can not save because of LogManager error limit")},I=function(t){return t.map(function(t){if("string"==typeof t)return t;try{return c()(t)}catch(n){return t.toString()}}).join(" ")};S=function(){h.a.showShakeLayer(function(){h.a.showReportLayer(function(t,n,e){O(t,n,e)})})},b=function(){h.a.hideShakeLayer()},m=function(t){if(t){if(d.a.set(t),t.reportTrigger&&t.reportTrigger.addEventListener&&t.reportTrigger.addEventListener("click",function(){h.a.showReportLayer(function(t,n,e){O(t,n,e)})}),t.customReport){var n=t.customReport,e=n.unionId,o=n.biz;e&&!o&&(console.error("Logan config customReport 缺少biz字段，unionId配置无效"),e="",o=""),e&&o&&"".concat(o,"|").concat(e).length>f.a.UNIONID_LENGTH_MAX&&(console.error("Logan config customReport biz|unionId长度超出限长".concat(f.a.UNIONID_LENGTH_MAX,"，unionId与biz配置无效")),e="",o=""),s.a.set(f.a.COOKIENAME_CUSTOM_REPORT,c()(r()({},t.customReport,{unionId:e,biz:o})))}return L}return L},w=function(t,n,e){document.readyState?"complete"==document.readyState?k(t,n,e):P.push({logString:t,logType:n,logLevel:e}):k(t,n,e)},O=function(t,n,o){var r=o||{};Object(v.a)(e.e(2).then(e.bind(null,100))).then(function(e){e(t,n,{unionId:r.unionId||"".concat(location.protocol,"//").concat(location.host).concat(location.pathname),environment:r.environment,uploadSource:r.uploadSource||"bizReport",webSource:r.webSource,showProgressElement:r.showProgressElement,customReport:r.customReport,onReportFinished:"function"==typeof r.onReportFinished?r.onReportFinished:d.a.get("onReportFinished")})}).catch(function(t){u.a.cat(l.a.ASYNC_IMPORT_ERROR.code,"异步加载reportLog失败",{error:t.stack||t.toString()})})},E=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];w(I(n),"default","info")},x=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];w(I(n),"default","warn")},R=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];w(I(n),"default","error")},function(){s.a.set(f.a.COOKIENAME_SESSION_TOKEN,a.a.generateRandomBytes(20)),location.href.indexOf(f.a.LOGAN_REPORT_PAGE_PATH)<=0&&s.a.set(f.a.COOKIENAME_CUSTOM_REPORT,""),location.href.indexOf("loganshake=1")>=0&&S(),Object(v.a)(e.e(3).then(e.bind(null,97))).then(function(t){_=t}).catch(function(t){u.a.cat(l.a.ASYNC_IMPORT_ERROR.code,"异步加载checkEnv失败",{error:t.stack||t.toString()})}),new T({threshold:15,timeout:1e3}).start(),window.addEventListener("shake",function(){d.a.get("enableShake")&&(_&&_.isValidApp||S())},!1),window.addEventListener("load",function(){P.forEach(function(t){k(t.logString,t.logType,t.logLevel)}),P=[]},!1)}(),L={config:m,log:w,report:O,info:E,warn:x,error:R,showShakeLayer:S,hideShakeLayer:b,__version__:A},window.Logan=L}n.default=L},function(t,n,e){e(57),t.exports=e(2).Object.assign},function(t,n,e){var o=e(3);o(o.S+o.F,"Object",{assign:e(60)})},function(t,n,e){t.exports=!e(6)&&!e(10)(function(){return 7!=Object.defineProperty(e(16)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var o=e(7);t.exports=function(t,n){if(!o(t))return t;var e,r;if(n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;if("function"==typeof(e=t.valueOf)&&!o(r=e.call(t)))return r;if(!n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,n,e){"use strict";var o=e(26),r=e(64),i=e(65),c=e(25),a=e(33),u=Object.assign;t.exports=!u||e(10)(function(){var t={},n={},e=Symbol(),o="abcdefghijklmnopqrst";return t[e]=7,o.split("").forEach(function(t){n[t]=t}),7!=u({},t)[e]||Object.keys(u({},n)).join("")!=o})?function(t,n){for(var e=c(t),u=arguments.length,s=1,f=r.f,l=i.f;u>s;)for(var p,h=a(arguments[s++]),d=f?o(h).concat(f(h)):o(h),v=d.length,g=0;v>g;)l.call(h,p=d[g++])&&(e[p]=h[p]);return e}:u},function(t,n,e){var o=e(13),r=e(17),i=e(62)(!1),c=e(19)("IE_PROTO");t.exports=function(t,n){var e,a=r(t),u=0,s=[];for(e in a)e!=c&&o(a,e)&&s.push(e);for(;n.length>u;)o(a,e=n[u++])&&(~i(s,e)||s.push(e));return s}},function(t,n,e){var o=e(17),r=e(31),i=e(63);t.exports=function(t){return function(n,e,c){var a,u=o(n),s=r(u.length),f=i(c,s);if(t&&e!=e){for(;s>f;)if((a=u[f++])!=a)return!0}else for(;s>f;f++)if((t||f in u)&&u[f]===e)return t||f||0;return!t&&-1}}},function(t,n,e){var o=e(18),r=Math.max,i=Math.min;t.exports=function(t,n){return t=o(t),t<0?r(t+n,0):i(t,n)}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,e){var o=e(2),r=o.JSON||(o.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},function(t,n,e){t.exports=e(68)},function(t,n,e){e(69),t.exports=e(2).parseInt},function(t,n,e){var o=e(3),r=e(70);o(o.G+o.F*(parseInt!=r),{parseInt:r})},function(t,n,e){var o=e(0).parseInt,r=e(71).trim,i=e(37),c=/^[-+]?0[xX]/;t.exports=8!==o(i+"08")||22!==o(i+"0x16")?function(t,n){var e=r(String(t),3);return o(e,n>>>0||(c.test(e)?16:10))}:o},function(t,n,e){var o=e(3),r=e(15),i=e(10),c=e(37),a="["+c+"]",u="​",s=RegExp("^"+a+a+"*"),f=RegExp(a+a+"*$"),l=function(t,n,e){var r={},a=i(function(){return!!c[t]()||u[t]()!=u}),s=r[t]=a?n(p):c[t];e&&(r[e]=s),o(o.P+o.F*a,"String",r)},p=l.trim=function(t,n){return t=String(r(t)),1&n&&(t=t.replace(s,"")),2&n&&(t=t.replace(f,"")),t};t.exports=l},function(t,n,e){"use strict";var o={product:"//h5.dianping.com/app/dp-logan-web/",beta:"//h5.51ping.com/app/dp-logan-web/",dev:location.origin+"/dist/"}.product||"//h5.dianping.com/app/dp-logan-web/",r=function(t){var n=document.createElement("script");n.src=t,n.crossOrigin="anonymous",document.body.appendChild(n)},i=function(t){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.href=t,document.head.appendChild(n)},c=function(t){var n=document.getElementById("loganShakeLayer");n?n.style.display="block":(window.loganShakeReportBtnAction=t,i(o+"shake_layer.css"),r(o+"shake_layer.js"))},a=function(){var t=document.getElementById("loganShakeLayer");t&&(t.style.display="none")},u=function(t){var n=document.getElementById("loganReportLayer");n?n.style.display="block":(window.loganReportBtnAction=t,i(o+"report_layer.css"),r(o+"report_layer.js"))};n.a={showShakeLayer:c,hideShakeLayer:a,showReportLayer:u}},function(t,n,e){t.exports=e(74)},function(t,n,e){e(75),e(49),e(82),e(86),e(94),e(95),t.exports=e(2).Promise},function(t,n){},function(t,n,e){var o=e(18),r=e(15);t.exports=function(t){return function(n,e){var i,c,a=String(r(n)),u=o(e),s=a.length;return u<0||u>=s?t?"":void 0:(i=a.charCodeAt(u),i<55296||i>56319||u+1===s||(c=a.charCodeAt(u+1))<56320||c>57343?t?a.charAt(u):i:t?a.slice(u,u+2):c-56320+(i-55296<<10)+65536)}}},function(t,n,e){t.exports=e(5)},function(t,n,e){"use strict";var o=e(79),r=e(30),i=e(21),c={};e(5)(c,e(1)("iterator"),function(){return this}),t.exports=function(t,n,e){t.prototype=o(c,{next:r(1,e)}),i(t,n+" Iterator")}},function(t,n,e){var o=e(4),r=e(80),i=e(36),c=e(19)("IE_PROTO"),a=function(){},u=function(){var t,n=e(16)("iframe"),o=i.length;for(n.style.display="none",e(39).appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),u=t.F;o--;)delete u.prototype[i[o]];return u()};t.exports=Object.create||function(t,n){var e;return null!==t?(a.prototype=o(t),e=new a,a.prototype=null,e[c]=t):e=u(),void 0===n?e:r(e,n)}},function(t,n,e){var o=e(9),r=e(4),i=e(26);t.exports=e(6)?Object.defineProperties:function(t,n){r(t);for(var e,c=i(n),a=c.length,u=0;a>u;)o.f(t,e=c[u++],n[e]);return t}},function(t,n,e){var o=e(13),r=e(25),i=e(19)("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),o(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,n,e){e(83);for(var o=e(0),r=e(5),i=e(8),c=e(1)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<a.length;u++){var s=a[u],f=o[s],l=f&&f.prototype;l&&!l[c]&&r(l,c,s),i[s]=i.Array}},function(t,n,e){"use strict";var o=e(84),r=e(85),i=e(8),c=e(17);t.exports=e(38)(Array,"Array",function(t,n){this._t=c(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,r(1)):"keys"==n?r(0,e):"values"==n?r(0,t[e]):r(0,[e,t[e]])},"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},function(t,n){t.exports=function(){}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n,e){"use strict";var o,r,i,c,a=e(20),u=e(0),s=e(11),f=e(40),l=e(3),p=e(7),h=e(12),d=e(87),v=e(88),g=e(41),y=e(42).set,_=e(90)(),m=e(22),w=e(43),O=e(91),E=e(44),x=u.TypeError,R=u.process,S=R&&R.versions,b=S&&S.v8||"",L=u.Promise,T="process"==f(R),P=function(){},A=r=m.f,M=!!function(){try{var t=L.resolve(1),n=(t.constructor={})[e(1)("species")]=function(t){t(P,P)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(P)instanceof n&&0!==b.indexOf("6.6")&&-1===O.indexOf("Chrome/66")}catch(t){}}(),k=function(t){var n;return!(!p(t)||"function"!=typeof(n=t.then))&&n},I=function(t,n){if(!t._n){t._n=!0;var e=t._c;_(function(){for(var o=t._v,r=1==t._s,i=0;e.length>i;)!function(n){var e,i,c,a=r?n.ok:n.fail,u=n.resolve,s=n.reject,f=n.domain;try{a?(r||(2==t._h&&C(t),t._h=1),!0===a?e=o:(f&&f.enter(),e=a(o),f&&(f.exit(),c=!0)),e===n.promise?s(x("Promise-chain cycle")):(i=k(e))?i.call(e,u,s):u(e)):s(o)}catch(t){f&&!c&&f.exit(),s(t)}}(e[i++]);t._c=[],t._n=!1,n&&!t._h&&j(t)})}},j=function(t){y.call(u,function(){var n,e,o,r=t._v,i=N(t);if(i&&(n=w(function(){T?R.emit("unhandledRejection",r,t):(e=u.onunhandledrejection)?e({promise:t,reason:r}):(o=u.console)&&o.error&&o.error("Unhandled promise rejection",r)}),t._h=T||N(t)?2:1),t._a=void 0,i&&n.e)throw n.v})},N=function(t){return 1!==t._h&&0===(t._a||t._c).length},C=function(t){y.call(u,function(){var n;T?R.emit("rejectionHandled",t):(n=u.onrejectionhandled)&&n({promise:t,reason:t._v})})},F=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),I(n,!0))},D=function(t){var n,e=this;if(!e._d){e._d=!0,e=e._w||e;try{if(e===t)throw x("Promise can't be resolved itself");(n=k(t))?_(function(){var o={_w:e,_d:!1};try{n.call(t,s(D,o,1),s(F,o,1))}catch(t){F.call(o,t)}}):(e._v=t,e._s=1,I(e,!1))}catch(t){F.call({_w:e,_d:!1},t)}}};M||(L=function(t){d(this,L,"Promise","_h"),h(t),o.call(this);try{t(s(D,this,1),s(F,this,1))}catch(t){F.call(this,t)}},o=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},o.prototype=e(92)(L.prototype,{then:function(t,n){var e=A(g(this,L));return e.ok="function"!=typeof t||t,e.fail="function"==typeof n&&n,e.domain=T?R.domain:void 0,this._c.push(e),this._a&&this._a.push(e),this._s&&I(this,!1),e.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new o;this.promise=t,this.resolve=s(D,t,1),this.reject=s(F,t,1)},m.f=A=function(t){return t===L||t===c?new i(t):r(t)}),l(l.G+l.W+l.F*!M,{Promise:L}),e(21)(L,"Promise"),e(93)("Promise"),c=e(2).Promise,l(l.S+l.F*!M,"Promise",{reject:function(t){var n=A(this);return(0,n.reject)(t),n.promise}}),l(l.S+l.F*(a||!M),"Promise",{resolve:function(t){return E(a&&this===c?L:this,t)}}),l(l.S+l.F*!(M&&e(53)(function(t){L.all(t).catch(P)})),"Promise",{all:function(t){var n=this,e=A(n),o=e.resolve,r=e.reject,i=w(function(){var e=[],i=0,c=1;v(t,!1,function(t){var a=i++,u=!1;e.push(void 0),c++,n.resolve(t).then(function(t){u||(u=!0,e[a]=t,--c||o(e))},r)}),--c||o(e)});return i.e&&r(i.v),e.promise},race:function(t){var n=this,e=A(n),o=e.reject,r=w(function(){v(t,!1,function(t){n.resolve(t).then(e.resolve,o)})});return r.e&&o(r.v),e.promise}})},function(t,n){t.exports=function(t,n,e,o){if(!(t instanceof n)||void 0!==o&&o in t)throw TypeError(e+": incorrect invocation!");return t}},function(t,n,e){var o=e(11),r=e(50),i=e(51),c=e(4),a=e(31),u=e(52),s={},f={},n=t.exports=function(t,n,e,l,p){var h,d,v,g,y=p?function(){return t}:u(t),_=o(e,l,n?2:1),m=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(i(y)){for(h=a(t.length);h>m;m++)if((g=n?_(c(d=t[m])[0],d[1]):_(t[m]))===s||g===f)return g}else for(v=y.call(t);!(d=v.next()).done;)if((g=r(v,_,d.value,n))===s||g===f)return g};n.BREAK=s,n.RETURN=f},function(t,n){t.exports=function(t,n,e){var o=void 0===e;switch(n.length){case 0:return o?t():t.call(e);case 1:return o?t(n[0]):t.call(e,n[0]);case 2:return o?t(n[0],n[1]):t.call(e,n[0],n[1]);case 3:return o?t(n[0],n[1],n[2]):t.call(e,n[0],n[1],n[2]);case 4:return o?t(n[0],n[1],n[2],n[3]):t.call(e,n[0],n[1],n[2],n[3])}return t.apply(e,n)}},function(t,n,e){var o=e(0),r=e(42).set,i=o.MutationObserver||o.WebKitMutationObserver,c=o.process,a=o.Promise,u="process"==e(14)(c);t.exports=function(){var t,n,e,s=function(){var o,r;for(u&&(o=c.domain)&&o.exit();t;){r=t.fn,t=t.next;try{r()}catch(o){throw t?e():n=void 0,o}}n=void 0,o&&o.enter()};if(u)e=function(){c.nextTick(s)};else if(!i||o.navigator&&o.navigator.standalone)if(a&&a.resolve){var f=a.resolve(void 0);e=function(){f.then(s)}}else e=function(){r.call(o,s)};else{var l=!0,p=document.createTextNode("");new i(s).observe(p,{characterData:!0}),e=function(){p.data=l=!l}}return function(o){var r={fn:o,next:void 0};n&&(n.next=r),t||(t=r,e()),n=r}}},function(t,n,e){var o=e(0),r=o.navigator;t.exports=r&&r.userAgent||""},function(t,n,e){var o=e(5);t.exports=function(t,n,e){for(var r in n)e&&t[r]?t[r]=n[r]:o(t,r,n[r]);return t}},function(t,n,e){"use strict";var o=e(0),r=e(2),i=e(9),c=e(6),a=e(1)("species");t.exports=function(t){var n="function"==typeof r[t]?r[t]:o[t];c&&n&&!n[a]&&i.f(n,a,{configurable:!0,get:function(){return this}})}},function(t,n,e){"use strict";var o=e(3),r=e(2),i=e(0),c=e(41),a=e(44);o(o.P+o.R,"Promise",{finally:function(t){var n=c(this,r.Promise||i.Promise),e="function"==typeof t;return this.then(e?function(e){return a(n,t()).then(function(){return e})}:t,e?function(e){return a(n,t()).then(function(){throw e})}:t)}})},function(t,n,e){"use strict";var o=e(3),r=e(22),i=e(43);o(o.S,"Promise",{try:function(t){var n=r.f(this),e=i(t);return(e.e?n.reject:n.resolve)(e.v),n.promise}})},function(t,n,e){var o;!function(r,i){void 0!==(o=function(){return i(r,r.document)}.call(n,e,n,t))&&(t.exports=o)}("undefined"!=typeof window?window:this,function(t,n){"use strict";function e(e){if(this.hasDeviceMotion="ondevicemotion"in t,this.options={threshold:15,timeout:1e3},"object"==typeof e)for(var o in e)e.hasOwnProperty(o)&&(this.options[o]=e[o]);if(this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null,"function"==typeof n.CustomEvent)this.event=new n.CustomEvent("shake",{bubbles:!0,cancelable:!0});else{if("function"!=typeof n.createEvent)return!1;this.event=n.createEvent("Event"),this.event.initEvent("shake",!0,!0)}}return e.prototype.reset=function(){this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null},e.prototype.start=function(){this.reset(),this.hasDeviceMotion&&t.addEventListener("devicemotion",this,!1)},e.prototype.stop=function(){this.hasDeviceMotion&&t.removeEventListener("devicemotion",this,!1),this.reset()},e.prototype.devicemotion=function(n){var e,o=n.accelerationIncludingGravity,r=0,i=0,c=0;if(null===this.lastX&&null===this.lastY&&null===this.lastZ)return this.lastX=o.x,this.lastY=o.y,void(this.lastZ=o.z);r=Math.abs(this.lastX-o.x),i=Math.abs(this.lastY-o.y),c=Math.abs(this.lastZ-o.z),(r>this.options.threshold&&i>this.options.threshold||r>this.options.threshold&&c>this.options.threshold||i>this.options.threshold&&c>this.options.threshold)&&(e=new Date,e.getTime()-this.lastTime.getTime()>this.options.timeout&&(t.dispatchEvent(this.event),this.lastTime=new Date)),this.lastX=o.x,this.lastY=o.y,this.lastZ=o.z},e.prototype.handleEvent=function(t){if("function"==typeof this[t.type])return this[t.type](t)},e})}])});