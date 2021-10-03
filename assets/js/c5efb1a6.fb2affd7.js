"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[870],{3905:function(t,e,n){n.d(e,{Zo:function(){return d},kt:function(){return m}});var l=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,l)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,l,r=function(t,e){if(null==t)return{};var n,l,r={},a=Object.keys(t);for(l=0;l<a.length;l++)n=a[l],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(l=0;l<a.length;l++)n=a[l],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var i=l.createContext({}),p=function(t){var e=l.useContext(i),n=e;return t&&(n="function"==typeof t?t(e):u(u({},e),t)),n},d=function(t){var e=p(t.components);return l.createElement(i.Provider,{value:e},t.children)},y={inlineCode:"code",wrapper:function(t){var e=t.children;return l.createElement(l.Fragment,{},e)}},s=l.forwardRef((function(t,e){var n=t.components,r=t.mdxType,a=t.originalType,i=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),s=p(n),m=r,c=s["".concat(i,".").concat(m)]||s[m]||y[m]||a;return n?l.createElement(c,u(u({ref:e},d),{},{components:n})):l.createElement(c,u({ref:e},d))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=n.length,u=new Array(a);u[0]=s;var o={};for(var i in e)hasOwnProperty.call(e,i)&&(o[i]=e[i]);o.originalType=t,o.mdxType="string"==typeof t?t:r,u[1]=o;for(var p=2;p<a;p++)u[p]=n[p];return l.createElement.apply(null,u)}return l.createElement.apply(null,n)}s.displayName="MDXCreateElement"},6831:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return o},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return d},default:function(){return s}});var l=n(7462),r=n(3366),a=(n(7294),n(3905)),u=["components"],o={id:"youtube.js"},i=void 0,p={unversionedId:"code/utility/youtube.js",id:"code/utility/youtube.js",isDocsHomePage:!1,title:"youtube.js",description:"youtube",source:"@site/docs/code/utility/youtube.js.md",sourceDirName:"code/utility",slug:"/code/utility/youtube.js",permalink:"/code/utility/youtube.js",editUrl:"https://github.com/librenotebot/librenote/edit/main/docs/docs/code/utility/youtube.js.md",tags:[],version:"current",frontMatter:{id:"youtube.js"},sidebar:"mySidebar",previous:{title:"track.js",permalink:"/code/utility/track.js"}},d=[{value:"youtube",id:"youtube",children:[{value:"youtube~isVideoURL(URL) \u21d2 <code>boolean</code>",id:"youtubeisvideourlurl--boolean",children:[]},{value:"youtube~isPlaylistURL(URL) \u21d2 <code>boolean</code>",id:"youtubeisplaylisturlurl--boolean",children:[]},{value:"youtube~getPlaylistId(URL) \u21d2 <code>string</code> | <code>null</code>",id:"youtubegetplaylistidurl--string--null",children:[]},{value:"youtube~getPlaylistItems(playlistId) \u21d2 <code>Array</code>",id:"youtubegetplaylistitemsplaylistid--array",children:[]},{value:"youtube~searchByQuery(query) \u21d2 <code>Promise.&lt;(string|null)&gt;</code>",id:"youtubesearchbyqueryquery--promisestringnull",children:[]}]}],y={toc:d};function s(t){var e=t.components,n=(0,r.Z)(t,u);return(0,a.kt)("wrapper",(0,l.Z)({},y,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("a",{name:"module_youtube"}),(0,a.kt)("h2",{id:"youtube"},"youtube"),(0,a.kt)("p",null,"Module to handle communication with YouTube APIs"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#module_youtube"},"youtube"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#module_youtube..isVideoURL"},"~isVideoURL(URL)")," \u21d2 ",(0,a.kt)("code",null,"boolean")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#module_youtube..isPlaylistURL"},"~isPlaylistURL(URL)")," \u21d2 ",(0,a.kt)("code",null,"boolean")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#module_youtube..getPlaylistId"},"~getPlaylistId(URL)")," \u21d2 ",(0,a.kt)("code",null,"string")," ","|"," ",(0,a.kt)("code",null,"null")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#module_youtube..getPlaylistItems"},"~getPlaylistItems(playlistId)")," \u21d2 ",(0,a.kt)("code",null,"Array")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#module_youtube..searchByQuery"},"~searchByQuery(query)")," \u21d2 ",(0,a.kt)("code",null,"Promise.","<","(string","|","null)",">"))))),(0,a.kt)("a",{name:"module_youtube..isVideoURL"}),(0,a.kt)("h3",{id:"youtubeisvideourlurl--boolean"},"youtube~isVideoURL(URL) \u21d2 ",(0,a.kt)("code",null,"boolean")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": inner method of ",(0,a.kt)("a",{parentName:"p",href:"#module_youtube"},(0,a.kt)("code",null,"youtube")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"boolean")," - ",(0,a.kt)("p",null,"If the URL is a YouTube Video URL or not"),"  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"URL"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The URL you want to test"))))),(0,a.kt)("a",{name:"module_youtube..isPlaylistURL"}),(0,a.kt)("h3",{id:"youtubeisplaylisturlurl--boolean"},"youtube~isPlaylistURL(URL) \u21d2 ",(0,a.kt)("code",null,"boolean")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": inner method of ",(0,a.kt)("a",{parentName:"p",href:"#module_youtube"},(0,a.kt)("code",null,"youtube")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"boolean")," - ",(0,a.kt)("p",null,"If the URL is a YouTube Playlist URL or not"),"  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"URL"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The URL you want to test"))))),(0,a.kt)("a",{name:"module_youtube..getPlaylistId"}),(0,a.kt)("h3",{id:"youtubegetplaylistidurl--string--null"},"youtube~getPlaylistId(URL) \u21d2 ",(0,a.kt)("code",null,"string")," ","|"," ",(0,a.kt)("code",null,"null")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": inner method of ",(0,a.kt)("a",{parentName:"p",href:"#module_youtube"},(0,a.kt)("code",null,"youtube")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"string")," ","|"," ",(0,a.kt)("code",null,"null")," - ",(0,a.kt)("p",null,"The playlist id, if one could be found."),"  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"URL"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The URL you want get the playlist ID from"))))),(0,a.kt)("a",{name:"module_youtube..getPlaylistItems"}),(0,a.kt)("h3",{id:"youtubegetplaylistitemsplaylistid--array"},"youtube~getPlaylistItems(playlistId) \u21d2 ",(0,a.kt)("code",null,"Array")),(0,a.kt)("p",null,"Get playlist items"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": inner method of ",(0,a.kt)("a",{parentName:"p",href:"#module_youtube"},(0,a.kt)("code",null,"youtube")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Array")," - ",(0,a.kt)("p",null,"Array of the playlist items"),"  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"playlistId"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The ID of the YouTube playlist"))))),(0,a.kt)("a",{name:"module_youtube..searchByQuery"}),(0,a.kt)("h3",{id:"youtubesearchbyqueryquery--promisestringnull"},"youtube~searchByQuery(query) \u21d2 ",(0,a.kt)("code",null,"Promise.","<","(string","|","null)",">")),(0,a.kt)("p",null,"Searches for a track by the query provided"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Kind"),": inner method of ",(0,a.kt)("a",{parentName:"p",href:"#module_youtube"},(0,a.kt)("code",null,"youtube")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Returns"),": ",(0,a.kt)("code",null,"Promise.","<","(string","|","null)",">")," - ",(0,a.kt)("p",null,"The found tracks YouTube URL, if any."),"  "),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Param"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"query"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("code",null,"string")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("p",null,"The query you would like to search with"))))))}s.isMDXComponent=!0}}]);