(()=>{var e={};e.id=674,e.ids=[674],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},3569:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>l,routeModule:()=>m,tree:()=>c}),t(9049),t(8154),t(5866);var s=t(3191),i=t(8716),n=t(7922),a=t.n(n),o=t(5231),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);t.d(r,d);let c=["",{children:["admin",{children:["users",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,9049)),"E:\\codingcommentary\\admin\\app\\admin\\users\\page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,8154)),"E:\\codingcommentary\\admin\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],l=["E:\\codingcommentary\\admin\\app\\admin\\users\\page.tsx"],u="/admin/users/page",p={require:t,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/admin/users/page",pathname:"/admin/users",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},4248:(e,r,t)=>{Promise.resolve().then(t.bind(t,7146)),Promise.resolve().then(t.bind(t,9489)),Promise.resolve().then(t.bind(t,381))},549:(e,r,t)=>{Promise.resolve().then(t.bind(t,131))},7934:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},7146:(e,r,t)=>{"use strict";t.d(r,{Custom:()=>h,Providers:()=>x});var s=t(326),i=t(7577),n=t(8497),a=t(2863),o=t(1725),d=t(495);let c=(0,a.xC)({reducer:{[o.gk.reducerPath]:o.gk.reducer,auth:d.ZP},devTools:!1,middleware:e=>e().concat(o.gk.middleware)});(async()=>{await c.dispatch(o.gk.endpoints.loadUser.initiate({},{forceRefetch:!0}))})(),t(5574);let l=()=>s.jsx("div",{className:"flex justify-center items-center h-screen",children:s.jsx("div",{className:"loader"})});var u=t(4174),p=t(7109);let m=(0,u.ZP)("http://localhost:8000/",{transports:["websocket"]});function x({children:e}){return s.jsx(n.zt,{store:c,children:e})}let h=({children:e})=>{let{isLoading:r}=(0,o.Ac)({}),[t,n]=(0,i.useState)(!1);if((0,i.useEffect)(()=>{m.on("connection",()=>{}),n(!0)},[]),t)return s.jsx("div",{children:r?s.jsx(l,{}):s.jsx("div",{children:s.jsx(p.SessionProvider,{children:e})})})}},131:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var s=t(326),i=t(9675);t(7577);let n=e=>(0,s.jsxs)("div",{children:[s.jsx(i.Z,{title:"EduVoyage",description:"EduVoyage is a elearning platform for students to do online courses",keywords:"EduVoyage"}),s.jsx("div",{className:"flex h-screen",children:s.jsx("div",{className:"1500px:w-[16%] w-1/5"})})]})},9675:(e,r,t)=>{"use strict";t.d(r,{Z:()=>i});var s=t(326);t(7577);let i=({title:e,description:r,keywords:t})=>(0,s.jsxs)(s.Fragment,{children:[s.jsx("title",{children:e}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),s.jsx("meta",{name:"description",content:r}),s.jsx("meta",{name:"keywords",content:t})]})},9489:(e,r,t)=>{"use strict";t.d(r,{ThemeProvider:()=>n});var s=t(326);t(7577);var i=t(3574);function n({children:e,...r}){return s.jsx(i.f,{...r,children:e})}},1725:(e,r,t)=>{"use strict";t.d(r,{Ac:()=>c,gk:()=>o});var s=t(1884),i=t(8032),n=t(495),a=t(6562);let o=(0,s.LC)({reducerPath:"api",baseQuery:(0,i.ni)({baseUrl:"http://localhost:8000/api/v1",prepareHeaders:e=>{let r=a.Z.get("accessToken"),t=a.Z.get("refreshToken");return r&&e.set("access-token",r),t&&e.set("refresh-token",t),e}}),endpoints:e=>({refreshToken:e.query({query:e=>({url:"refresh",method:"GET",credentials:"include"})}),loadUser:e.query({query:e=>({url:"me",method:"GET",credentials:"include"}),async onQueryStarted(e,{queryFulfilled:r,dispatch:t}){try{let e=await r;t((0,n.nD)({accessToken:e.data.accessToken,refreshToken:e.data.refreshToken,user:e.data.user}))}catch(e){console.log(e)}}})})}),{useRefreshTokenQuery:d,useLoadUserQuery:c}=o},495:(e,r,t)=>{"use strict";t.d(r,{ZP:()=>o,_e:()=>a,f0:()=>i,nD:()=>n});let s=(0,t(2863).oM)({name:"auth",initialState:{token:"",user:""},reducers:{userRegistration:(e,r)=>{e.token=r.payload.token},userLoggedIn:(e,r)=>{e.token=r.payload.accessToken,e.refreshToken=r.payload.refreshToken,e.user=r.payload.user},userLoggedOut:e=>{e.token="",e.user=""}}}),{userRegistration:i,userLoggedIn:n,userLoggedOut:a}=s.actions,o=s.reducer},9049:(e,r,t)=>{"use strict";t.r(r),t.d(r,{$$typeof:()=>a,__esModule:()=>n,default:()=>o});var s=t(8570);let i=(0,s.createProxy)(String.raw`E:\codingcommentary\admin\app\admin\users\page.tsx`),{__esModule:n,$$typeof:a}=i;i.default;let o=(0,s.createProxy)(String.raw`E:\codingcommentary\admin\app\admin\users\page.tsx#default`)},8154:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>f});var s=t(9510),i=t(2763),n=t.n(i),a=t(8169),o=t.n(a);t(7272);var d=t(8570);let c=(0,d.createProxy)(String.raw`E:\codingcommentary\admin\app\utils\theme-provider.tsx`),{__esModule:l,$$typeof:u}=c;c.default;let p=(0,d.createProxy)(String.raw`E:\codingcommentary\admin\app\utils\theme-provider.tsx#ThemeProvider`);var m=t(9125);let x=(0,d.createProxy)(String.raw`E:\codingcommentary\admin\app\Provider.tsx`),{__esModule:h,$$typeof:g}=x;x.default;let v=(0,d.createProxy)(String.raw`E:\codingcommentary\admin\app\Provider.tsx#Providers`),y=(0,d.createProxy)(String.raw`E:\codingcommentary\admin\app\Provider.tsx#Custom`);function f({children:e}){return s.jsx("html",{lang:"en",suppressHydrationWarning:!0,children:s.jsx("body",{className:`${n().variable} ${o().variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`,children:s.jsx(v,{children:(0,s.jsxs)(p,{attribute:"class",defaultTheme:"system",enableSystem:!0,children:[s.jsx(y,{children:s.jsx("div",{children:e})}),s.jsx(m.x7,{position:"top-center",reverseOrder:!1})]})})})})}},7481:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var s=t(6621);let i=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},5574:()=>{},7272:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[948,370,621],()=>t(3569));module.exports=s})();