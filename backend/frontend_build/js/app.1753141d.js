(()=>{"use strict";var e={4001:(e,r,t)=>{t(5363),t(71);var o=t(8880),n=t(9592),i=t(3673);function a(e,r,t,o,n,a){const l=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(l)}const l=(0,i.aZ)({name:"App"});var c=t(4260);const s=(0,c.Z)(l,[["render",a]]),u=s;var d=t(7083),p=t(9582);const f=[{path:"/:id?",component:()=>Promise.all([t.e(736),t.e(384)]).then(t.bind(t,384)),children:[{path:"",component:()=>Promise.all([t.e(736),t.e(203)]).then(t.bind(t,1203))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([t.e(736),t.e(614)]).then(t.bind(t,5614))}],h=f,v=(0,d.BC)((function(){const e=p.r5,r=(0,p.p7)({scrollBehavior:()=>({left:0,top:0}),routes:h,history:e("")});return r}));async function b(e,r){const t="function"===typeof v?await v({}):v,o=e(u);return o.use(n.Z,r),{app:o,router:t}}var m=t(6417);const g={config:{notify:{}},plugins:{Notify:m.Z}},y="";async function w({app:e,router:r},t){let o=!1;const n=e=>{try{return r.resolve(e).href}catch(t){}return Object(e)===e?null:e},i=e=>{if(o=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const r=n(e);null!==r&&(window.location.href=r,window.location.reload())},a=window.location.href.replace(window.location.origin,"");for(let c=0;!1===o&&c<t.length;c++)try{await t[c]({app:e,router:r,ssrContext:null,redirect:i,urlPath:a,publicPath:y})}catch(l){return l&&l.url?void i(l.url):void console.error("[Quasar] boot error:",l)}!0!==o&&(e.use(r),e.mount("#q-app"))}b(o.ri,g).then((e=>Promise.all([Promise.resolve().then(t.bind(t,5474))]).then((r=>{const t=r.map((e=>e.default)).filter((e=>"function"===typeof e));w(e,t)}))))},5474:(e,r,t)=>{t.r(r),t.d(r,{default:()=>l,api:()=>a});var o=t(7083),n=t(52),i=t.n(n);const a=i().create({baseURL:"/api/city/"}),l=(0,o.xr)((({app:e})=>{e.config.globalProperties.$axios=i(),e.config.globalProperties.$api=a}))}},r={};function t(o){var n=r[o];if(void 0!==n)return n.exports;var i=r[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.m=e,(()=>{var e=[];t.O=(r,o,n,i)=>{if(!o){var a=1/0;for(u=0;u<e.length;u++){for(var[o,n,i]=e[u],l=!0,c=0;c<o.length;c++)(!1&i||a>=i)&&Object.keys(t.O).every((e=>t.O[e](o[c])))?o.splice(c--,1):(l=!1,i<a&&(a=i));if(l){e.splice(u--,1);var s=n();void 0!==s&&(r=s)}}return r}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[o,n,i]}})(),(()=>{t.n=e=>{var r=e&&e.__esModule?()=>e["default"]:()=>e;return t.d(r,{a:r}),r}})(),(()=>{t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})}})(),(()=>{t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((r,o)=>(t.f[o](e,r),r)),[]))})(),(()=>{t.u=e=>"js/"+e+"."+{203:"a7c57b70",384:"521239b4",614:"46673255"}[e]+".js"})(),(()=>{t.miniCssF=e=>"css/"+{143:"app",736:"vendor"}[e]+"."+{143:"31d6cfe0",736:"9add3052"}[e]+".css"})(),(()=>{t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r)})(),(()=>{var e={},r="didle:";t.l=(o,n,i,a)=>{if(e[o])e[o].push(n);else{var l,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var d=s[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==r+i){l=d;break}}l||(c=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,t.nc&&l.setAttribute("nonce",t.nc),l.setAttribute("data-webpack",r+i),l.src=o),e[o]=[n];var p=(r,t)=>{l.onerror=l.onload=null,clearTimeout(f);var n=e[o];if(delete e[o],l.parentNode&&l.parentNode.removeChild(l),n&&n.forEach((e=>e(t))),r)return r(t)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),c&&document.head.appendChild(l)}}})(),(()=>{t.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{t.p=""})(),(()=>{var e={143:0};t.f.j=(r,o)=>{var n=t.o(e,r)?e[r]:void 0;if(0!==n)if(n)o.push(n[2]);else{var i=new Promise(((t,o)=>n=e[r]=[t,o]));o.push(n[2]=i);var a=t.p+t.u(r),l=new Error,c=o=>{if(t.o(e,r)&&(n=e[r],0!==n&&(e[r]=void 0),n)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;l.message="Loading chunk "+r+" failed.\n("+i+": "+a+")",l.name="ChunkLoadError",l.type=i,l.request=a,n[1](l)}};t.l(a,c,"chunk-"+r,r)}},t.O.j=r=>0===e[r];var r=(r,o)=>{var n,i,[a,l,c]=o,s=0;if(a.some((r=>0!==e[r]))){for(n in l)t.o(l,n)&&(t.m[n]=l[n]);if(c)var u=c(t)}for(r&&r(o);s<a.length;s++)i=a[s],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(u)},o=self["webpackChunkdidle"]=self["webpackChunkdidle"]||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})();var o=t.O(void 0,[736],(()=>t(4001)));o=t.O(o)})();