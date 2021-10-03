"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[151],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return c}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),p=u(n),c=l,m=p["".concat(s,".").concat(c)]||p[c]||k[c]||a;return n?r.createElement(m,i(i({ref:t},d),{},{components:n})):r.createElement(m,i({ref:t},d))}));function c(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,i=new Array(a);i[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:l,i[1]=o;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1216:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return d},default:function(){return p}});var r=n(7462),l=n(3366),a=(n(7294),n(3905)),i=["components"],o={id:"redis.js"},s=void 0,u={unversionedId:"code/utility/redis.js",id:"code/utility/redis.js",isDocsHomePage:!1,title:"redis.js",description:"Classes",source:"@site/docs/code/utility/redis.js.md",sourceDirName:"code/utility",slug:"/code/utility/redis.js",permalink:"/code/utility/redis.js",editUrl:"https://github.com/librenotebot/librenote/edit/main/docs/docs/code/utility/redis.js.md",tags:[],version:"current",frontMatter:{id:"redis.js"},sidebar:"mySidebar",previous:{title:"permissions.js",permalink:"/code/utility/permissions.js"},next:{title:"spotify.js",permalink:"/code/utility/spotify.js"}},d=[{value:"Classes",id:"classes",children:[]},{value:"Functions",id:"functions",children:[]},{value:"Redis",id:"redis",children:[{value:"new Redis()",id:"new-redis",children:[]}]},{value:"getAsync(key) \u21d2 <code>Promise.&lt;string&gt;</code>",id:"getasynckey--promisestring",children:[]},{value:"setAsync(key, value) \u21d2 <code>Promise.&lt;void&gt;</code>",id:"setasynckey-value--promisevoid",children:[]},{value:"delAsync(key) \u21d2 <code>Promise.&lt;void&gt;</code>",id:"delasynckey--promisevoid",children:[]},{value:"expireAsync(key, time) \u21d2 <code>Promise.&lt;void&gt;</code>",id:"expireasynckey-time--promisevoid",children:[]},{value:"getNumberAsync(key) \u21d2 <code>Promise.&lt;(number|null)&gt;</code>",id:"getnumberasynckey--promisenumbernull",children:[]}],k={toc:d};function p(e){var t=e.components,n=(0,l.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"classes"},"Classes"),(0,a.kt)("dl",null,(0,a.kt)("dt",null,(0,a.kt)("a",{href:"#Redis"},"Redis")),(0,a.kt)("dd",null)),(0,a.kt)("h2",{id:"functions"},"Functions"),(0,a.kt)("dl",null,(0,a.kt)("dt",null,(0,a.kt)("a",{href:"#getAsync"},"getAsync(key)")," \u21d2 ",(0,a.kt)("code",null,"Promise.<string>")),(0,a.kt)("dd",null,(0,a.kt)("p",null,"Gets a string from the redis cache by key")),(0,a.kt)("dt",null,(0,a.kt)("a",{href:"#setAsync"},"setAsync(key, value)")," \u21d2 ",(0,a.kt)("code",null,"Promise.<void>")),(0,a.kt)("dd",null,(0,a.kt)("p",null,"Sets a value with the provided key")),(0,a.kt)("dt",null,(0,a.kt)("a",{href:"#delAsync"},"delAsync(key)")," \u21d2 ",(0,a.kt)("code",null,"Promise.<void>")),(0,a.kt)("dd",null,(0,a.kt)("p",null,"Deletes the entry with the specific key")),(0,a.kt)("dt",null,(0,a.kt)("a",{href:"#expireAsync"},"expireAsync(key, time)")," \u21d2 ",(0,a.kt)("code",null,"Promise.<void>")),(0,a.kt)("dd",null,(0,a.kt)("p",null,"Set's a key's expiration")),(0,a.kt)("dt",null,(0,a.kt)("a",{href:"#getNumberAsync"},"getNumberAsync(key)")," \u21d2 ",(0,a.kt)("code",null,"Promise.<(number|null)>")),(0,a.kt)("dd",null,(0,a.kt)("p",null,"Gets a number from the redis cache by key"))),(0,a.kt)("a",{name:"Redis"}),(0,a.kt)("h2",{id:"redis"},"Redis"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": global class  "),(0,a.kt)("a",{name:"new_Redis_new"}),(0,a.kt)("h3",{id:"new-redis"},"new Redis()"),(0,a.kt)("p",null,"Creates a Redis class"),(0,a.kt)("a",{name:"getAsync"}),(0,a.kt)("h2",{id:"getasynckey--promisestring"},"getAsync(key) \u21d2 ",(0,a.kt)("code",null,"Promise.","<","string",">")),(0,a.kt)("p",null,"Gets a string from the redis cache by key"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": global function",(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Promise.","<","string",">")," - ",(0,a.kt)("p",null,"The value"),"  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"key"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The key"))))),(0,a.kt)("a",{name:"setAsync"}),(0,a.kt)("h2",{id:"setasynckey-value--promisevoid"},"setAsync(key, value) \u21d2 ",(0,a.kt)("code",null,"Promise.","<","void",">")),(0,a.kt)("p",null,"Sets a value with the provided key"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"key"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The key"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"value"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The value"))))),(0,a.kt)("a",{name:"delAsync"}),(0,a.kt)("h2",{id:"delasynckey--promisevoid"},"delAsync(key) \u21d2 ",(0,a.kt)("code",null,"Promise.","<","void",">")),(0,a.kt)("p",null,"Deletes the entry with the specific key"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"key"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The key"))))),(0,a.kt)("a",{name:"expireAsync"}),(0,a.kt)("h2",{id:"expireasynckey-time--promisevoid"},"expireAsync(key, time) \u21d2 ",(0,a.kt)("code",null,"Promise.","<","void",">")),(0,a.kt)("p",null,"Set's a key's expiration"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": global function  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"key"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The key"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"time"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"number")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"Time until the key should expire, in seconds"))))),(0,a.kt)("a",{name:"getNumberAsync"}),(0,a.kt)("h2",{id:"getnumberasynckey--promisenumbernull"},"getNumberAsync(key) \u21d2 ",(0,a.kt)("code",null,"Promise.","<","(number","|","null)",">")),(0,a.kt)("p",null,"Gets a number from the redis cache by key"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": global function",(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Promise.","<","(number","|","null)",">")," - ",(0,a.kt)("p",null,"The value or null if there is no number"),"  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"key"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The key"))))))}p.isMDXComponent=!0}}]);