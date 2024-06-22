(()=>{var e={};e.id=409,e.ids=[409],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},8978:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>l,pages:()=>c,routeModule:()=>f,tree:()=>d}),r(7352),r(5866),r(8154);var s=r(3191),n=r(8716),o=r(7922),i=r.n(o),a=r(5231),u={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>a[e]);r.d(t,u);let d=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,8154)),"E:\\codingcommentary\\admin\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=[],l="/_not-found/page",p={require:r,loadChunk:()=>Promise.resolve()},f=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},4248:(e,t,r)=>{Promise.resolve().then(r.bind(r,7146)),Promise.resolve().then(r.bind(r,9489)),Promise.resolve().then(r.bind(r,381))},7934:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},7146:(e,t,r)=>{"use strict";r.d(t,{Custom:()=>m,Providers:()=>x});var s=r(326),n=r(7577),o=r(8497),i=r(2863),a=r(1725),u=r(495);let d=(0,i.xC)({reducer:{[a.gk.reducerPath]:a.gk.reducer,auth:u.ZP},devTools:!1,middleware:e=>e().concat(a.gk.middleware)});(async()=>{await d.dispatch(a.gk.endpoints.loadUser.initiate({},{forceRefetch:!0}))})(),r(5574);let c=()=>s.jsx("div",{className:"flex justify-center items-center h-screen",children:s.jsx("div",{className:"loader"})});var l=r(4174),p=r(7109);let f=(0,l.ZP)("http://localhost:8000/",{transports:["websocket"]});function x({children:e}){return s.jsx(o.zt,{store:d,children:e})}let m=({children:e})=>{let{isLoading:t}=(0,a.Ac)({}),[r,o]=(0,n.useState)(!1);if((0,n.useEffect)(()=>{f.on("connection",()=>{}),o(!0)},[]),r)return s.jsx("div",{children:t?s.jsx(c,{}):s.jsx("div",{children:s.jsx(p.SessionProvider,{children:e})})})}},9489:(e,t,r)=>{"use strict";r.d(t,{ThemeProvider:()=>o});var s=r(326);r(7577);var n=r(3574);function o({children:e,...t}){return s.jsx(n.f,{...t,children:e})}},1725:(e,t,r)=>{"use strict";r.d(t,{Ac:()=>d,gk:()=>a});var s=r(1884),n=r(8032),o=r(495),i=r(6562);let a=(0,s.LC)({reducerPath:"api",baseQuery:(0,n.ni)({baseUrl:"http://localhost:8000/api/v1",prepareHeaders:e=>{let t=i.Z.get("accessToken"),r=i.Z.get("refreshToken");return t&&e.set("access-token",t),r&&e.set("refresh-token",r),e}}),endpoints:e=>({refreshToken:e.query({query:e=>({url:"refresh",method:"GET",credentials:"include"})}),loadUser:e.query({query:e=>({url:"me",method:"GET",credentials:"include"}),async onQueryStarted(e,{queryFulfilled:t,dispatch:r}){try{let e=await t;r((0,o.nD)({accessToken:e.data.accessToken,refreshToken:e.data.refreshToken,user:e.data.user}))}catch(e){console.log(e)}}})})}),{useRefreshTokenQuery:u,useLoadUserQuery:d}=a},495:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>a,_e:()=>i,f0:()=>n,nD:()=>o});let s=(0,r(2863).oM)({name:"auth",initialState:{token:"",user:""},reducers:{userRegistration:(e,t)=>{e.token=t.payload.token},userLoggedIn:(e,t)=>{e.token=t.payload.accessToken,e.refreshToken=t.payload.refreshToken,e.user=t.payload.user},userLoggedOut:e=>{e.token="",e.user=""}}}),{userRegistration:n,userLoggedIn:o,userLoggedOut:i}=s.actions,a=s.reducer},8154:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>y});var s=r(9510),n=r(2763),o=r.n(n),i=r(8169),a=r.n(i);r(7272);var u=r(8570);let d=(0,u.createProxy)(String.raw`E:\codingcommentary\admin\app\utils\theme-provider.tsx`),{__esModule:c,$$typeof:l}=d;d.default;let p=(0,u.createProxy)(String.raw`E:\codingcommentary\admin\app\utils\theme-provider.tsx#ThemeProvider`);var f=r(9125);let x=(0,u.createProxy)(String.raw`E:\codingcommentary\admin\app\Provider.tsx`),{__esModule:m,$$typeof:h}=x;x.default;let g=(0,u.createProxy)(String.raw`E:\codingcommentary\admin\app\Provider.tsx#Providers`),v=(0,u.createProxy)(String.raw`E:\codingcommentary\admin\app\Provider.tsx#Custom`);function y({children:e}){return s.jsx("html",{lang:"en",suppressHydrationWarning:!0,children:s.jsx("body",{className:`${o().variable} ${a().variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`,children:s.jsx(g,{children:(0,s.jsxs)(p,{attribute:"class",defaultTheme:"system",enableSystem:!0,children:[s.jsx(v,{children:s.jsx("div",{children:e})}),s.jsx(f.x7,{position:"top-center",reverseOrder:!1})]})})})})}},6399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isNotFoundError:function(){return n},notFound:function(){return s}});let r="NEXT_NOT_FOUND";function s(){let e=Error(r);throw e.digest=r,e}function n(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7352:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return n},default:function(){return o}});let s=r(6399),n="next/dist/client/components/parallel-route-default.js";function o(){(0,s.notFound)()}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5574:()=>{},7272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[948,370],()=>r(8978));module.exports=s})();