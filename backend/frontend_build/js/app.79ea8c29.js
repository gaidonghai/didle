(function(e){function t(t){for(var r,a,l=t[0],i=t[1],u=t[2],p=0,d=[];p<l.length;p++)a=l[p],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(t);while(d.length)d.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,l=1;l<n.length;l++){var i=n[l];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},c=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var s=i;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o=n("c3a1"),c=(n("7437"),{width:"200",height:"200"}),a=["points"],l=Object(r["createTextVNode"])("分享结果"),i=Object(r["createTextVNode"])("随机新局");function u(e,t,n,o,u,s){var p=Object(r["resolveComponent"])("el-option"),d=Object(r["resolveComponent"])("el-select"),b=Object(r["resolveComponent"])("el-table-column"),f=Object(r["resolveComponent"])("el-table"),j=Object(r["resolveComponent"])("el-main"),O=Object(r["resolveComponent"])("el-link"),h=Object(r["resolveComponent"])("el-button"),m=Object(r["resolveComponent"])("el-footer"),v=Object(r["resolveComponent"])("el-container");return Object(r["openBlock"])(),Object(r["createBlock"])(v,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(j,null,{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",null,[(Object(r["openBlock"])(),Object(r["createElementBlock"])("svg",c,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(u.polygons,(function(e,t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("polygon",{key:t,points:e,fill:"#111111"},null,8,a)})),128))]))]),Object(r["createElementVNode"])("div",null,[Object(r["createVNode"])(d,{modelValue:e.userInput,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.userInput=t}),filterable:"",placeholder:"输入城市名称查询",onChange:s.select},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(u.options,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(p,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"]),u.answers.length?(Object(r["openBlock"])(),Object(r["createBlock"])(f,{key:0,data:u.answers,"show-header":!1},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{prop:"attempt",label:"城市"}),Object(r["createVNode"])(b,{prop:"message",label:"目标"})]})),_:1},8,["data"])):Object(r["createCommentVNode"])("",!0)])]})),_:1}),Object(r["createVNode"])(m,null,{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",null,[Object(r["createVNode"])(O,{disabled:""},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(s.currentUrl()),1)]})),_:1})]),Object(r["createElementVNode"])("div",null,[Object(r["createVNode"])(h,{type:"success",onClick:s.copyClipboardGame},{default:Object(r["withCtx"])((function(){return[l]})),_:1},8,["onClick"]),Object(r["createVNode"])(h,{type:"primary",onClick:s.initialize},{default:Object(r["withCtx"])((function(){return[i]})),_:1},8,["onClick"])])]})),_:1})]})),_:1})}var s=n("1da1"),p=(n("96cf"),n("a15b"),n("cb29"),n("99af"),n("d81d"),n("a9e3"),n("d3b7"),n("3ca3"),n("ddb0"),n("9861"),n("ac1f"),n("841c"),n("bc3a")),d=n.n(p),b=n("3ef4"),f=n("6676"),j={name:"App",data:function(){return{cities:[],id:null,polygons:[],options:[],answers:[]}},methods:{currentUrl:function(){return window.location.origin+"/?id="+this.id},select:function(e){var t=this;d.a.get(this.apiServer+e+"/"+this.id).then((function(n){var r=t.cities[e-1],o=n.data.direction?"⬆↗➡↘⬇↙⬅↖⬆"[Math.round(n.data.direction/45)]:"",c=Math.min(Math.ceil(Math.log(n.data.distance/150+1)/Math.log(2)),5),a=Array(c).fill(o).join("")+Array(5-c).fill("✅").join("");t.answers.push({attempt:r.provCh+r.cityCh,message:a})}))},copyClipboardGame:function(){var e=[].concat("#Didle "+this.id).concat(this.answers.map((function(e){return e.message}))).concat(this.currentUrl()).join("\n");Object(f["a"])(e,void 0,(function(e){e?alert(e):b["a"].success("Game state copied!")}))},initialize:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e=Number(e),e||(e=Math.floor(1e4*Math.random())),t.polygons=[],t.answers=[],t.id=e,n.next=7,d.a.get(t.apiServer+"svgPolygons/"+t.id);case 7:t.polygons=n.sent.data;case 8:case"end":return n.stop()}}),n)})))()}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get(e.apiServer+"all/");case 2:return e.cities=t.sent.data,e.options=e.cities.map((function(e){return{value:e.id,label:e.provCh+e.cityCh+" "+e.cityEn}})),n=new URLSearchParams(window.location.search),t.next=7,e.initialize(n.get("id"));case 7:case"end":return t.stop()}}),t)})))()}},O=(n("e17f"),n("6b0d")),h=n.n(O);const m=h()(j,[["render",u]]);var v=m,g=Object(r["createApp"])(v);g.config.globalProperties.apiServer="/api/city/",g.use(o["a"]),g.mount("#app")},b07a:function(e,t,n){},e17f:function(e,t,n){"use strict";n("b07a")}});
//# sourceMappingURL=app.79ea8c29.js.map