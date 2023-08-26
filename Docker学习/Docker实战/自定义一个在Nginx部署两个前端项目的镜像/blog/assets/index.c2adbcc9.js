import{R as M,d as T,r as d,n as I,L as f,j as R,J as se,I as le,S as ue,E as oe,o as H,c as V,b as p,N as ie,T as de,u as re,x as z,U as ce,h as B,O as W,V as me,W as fe,e as ve,y as he,F as pe,B as ge,C as ye,t as F,i as _e}from"./index.e34733fd.js";function Ce(){return M({url:"/message/list",method:"get"})}function ke(n){return M({url:"/message/add",method:"post",data:n})}function we(n,r,c="modelValue",o){return f({get:()=>n[c],set:a=>{r(`update:${c}`,o?o(a):a)}})}var $=T({name:"vue3-danmaku",components:{},props:{danmus:{type:Array,required:!0,default:()=>[]},channels:{type:Number,default:0},autoplay:{type:Boolean,default:!0},loop:{type:Boolean,default:!1},useSlot:{type:Boolean,default:!1},debounce:{type:Number,default:100},speeds:{type:Number,default:200},randomChannel:{type:Boolean,default:!1},fontSize:{type:Number,default:18},top:{type:Number,default:4},right:{type:Number,default:0},isSuspend:{type:Boolean,default:!1},extraStyle:{type:String,default:""}},emits:["list-end","play-end","update:danmus"],setup(n,{emit:r,slots:c}){let o=d(document.createElement("div")),a=d(document.createElement("div"));const v=d(0),k=d(0);let w=0;const x=d(0),m=d(0),u=d(0),b=d(!1),_=d(!1),y=d({}),i=we(n,r,"danmus"),h=I({channels:f(()=>n.channels||x.value),autoplay:f(()=>n.autoplay),loop:f(()=>n.loop),useSlot:f(()=>n.useSlot),debounce:f(()=>n.debounce),randomChannel:f(()=>n.randomChannel)}),g=I({height:f(()=>m.value),fontSize:f(()=>n.fontSize),speeds:f(()=>n.speeds),top:f(()=>n.top),right:f(()=>n.right)});R(()=>{L()}),se(()=>{D()});function L(){N(),n.isSuspend&&q(),h.autoplay&&A()}function N(){v.value=o.value.offsetWidth,k.value=o.value.offsetHeight}function A(){_.value=!1,w||(w=setInterval(()=>X(),h.debounce))}function X(){if(!_.value&&i.value.length)if(u.value>i.value.length-1){const s=a.value.children.length;h.loop&&(s<u.value&&(r("list-end"),u.value=0),E())}else E()}function E(s){const l=h.loop?u.value%i.value.length:u.value,t=s||i.value[l];let e=document.createElement("div");h.useSlot?e=U(t,l).$el:(e.innerHTML=t,e.setAttribute("style",n.extraStyle),e.style.fontSize=`${g.fontSize}px`,e.style.lineHeight=`${g.fontSize}px`),e.classList.add("dm"),a.value.appendChild(e),e.style.opacity="0",le(()=>{g.height||(m.value=e.offsetHeight),h.channels||(x.value=Math.floor(k.value/(g.height+g.top)));let C=j(e);if(C>=0){const S=e.offsetWidth,ae=g.height;e.classList.add("move"),e.dataset.index=`${l}`,e.style.opacity="1",e.style.top=C*(ae+g.top)+"px",e.style.width=S+g.right+"px",e.style.setProperty("--dm-scroll-width",`-${v.value+S*2}px`),e.style.left=`${v.value}px`,e.style.animationDuration=`${v.value/g.speeds}s`,e.addEventListener("animationend",()=>{Number(e.dataset.index)===i.value.length-1&&!h.loop&&r("play-end",e.dataset.index),a.value&&a.value.removeChild(e)}),u.value++}else a.value.removeChild(e)})}function U(s,l){return ue({render(){return oe("div",{},[c.dm&&c.dm({danmu:s,index:l})])}}).mount(document.createElement("div"))}function j(s){let l=[...Array(h.channels).keys()];h.randomChannel&&(l=l.sort(()=>.5-Math.random()));for(let t of l){const e=y.value[t];if(e&&e.length)for(let C=0;C<e.length;C++){const S=K(e[C])-10;if(S<=(s.offsetWidth-e[C].offsetWidth)*.88||S<=0)break;if(C===e.length-1)return y.value[t].push(s),s.addEventListener("animationend",()=>y.value[t].splice(0,1)),t%h.channels}else return y.value[t]=[s],s.addEventListener("animationend",()=>y.value[t].splice(0,1)),t%h.channels}return-1}function K(s){const l=s.offsetWidth||parseInt(s.style.width),t=s.getBoundingClientRect().right||a.value.getBoundingClientRect().right+l;return a.value.getBoundingClientRect().right-t}function P(){clearInterval(w),w=0}function q(){let s=[];a.value.addEventListener("mousemove",l=>{let t=l.target;t.className.includes("dm")||(t=t.closest(".dm")||t),t.className.includes("dm")&&(t.classList.add("pause"),s.push(t))}),a.value.addEventListener("mouseout",l=>{let t=l.target;t.className.includes("dm")||(t=t.closest(".dm")||t),t.className.includes("dm")&&(t.classList.remove("pause"),s.forEach(e=>{e.classList.remove("pause")}),s=[])})}function D(){P(),u.value=0}function J(){m.value=0,L()}function O(){y.value={},a.value.innerHTML="",_.value=!0,b.value=!1,D()}function G(){_.value=!0}function Q(s){if(u.value===i.value.length)return i.value.push(s),i.value.length-1;{const l=u.value%i.value.length;return i.value.splice(l,0,s),l+1}}function Y(s){return i.value.push(s),i.value.length-1}function Z(){return!_.value}function ee(){b.value=!1}function te(){b.value=!0}function ne(){N();const s=a.value.getElementsByClassName("dm");for(let l=0;l<s.length;l++){const t=s[l];t.style.setProperty("--dm-scroll-width",`-${v.value+t.offsetWidth*2}px`),t.style.left=`${v.value}px`,t.style.animationDuration=`${v.value/g.speeds}s`}}return{container:o,dmContainer:a,hidden:b,paused:_,danmuList:i,getPlayState:Z,resize:ne,play:A,pause:G,stop:O,show:ee,hide:te,reset:J,add:Q,push:Y,insert:E}}});const xe={ref:"container",class:"vue-danmaku"};function be(n,r,c,o,a,v){return H(),V("div",xe,[p("div",{ref:"dmContainer",class:ie(["danmus",{show:!n.hidden},{paused:n.paused}])},null,2),de(n.$slots,"default")],512)}function Se(n,r){r===void 0&&(r={});var c=r.insertAt;if(!(!n||typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",c==="top"&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=n:a.appendChild(document.createTextNode(n))}}var Be=`.vue-danmaku {
  position: relative;
  overflow: hidden;
}
.vue-danmaku .danmus {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.vue-danmaku .danmus.show {
  opacity: 1;
}
.vue-danmaku .danmus.paused .dm.move {
  animation-play-state: paused;
}
.vue-danmaku .danmus .dm {
  position: absolute;
  font-size: 20px;
  color: #ddd;
  white-space: pre;
  transform: translateX(0);
  transform-style: preserve-3d;
}
.vue-danmaku .danmus .dm.move {
  will-change: transform;
  animation-name: moveLeft;
  animation-timing-function: linear;
  animation-play-state: running;
}
.vue-danmaku .danmus .dm.pause {
  animation-play-state: paused;
  z-index: 10;
}
@keyframes moveLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(var(--dm-scroll-width));
  }
}
@-webkit-keyframes moveLeft {
  from {
    -webkit-transform: translateX(0);
  }
  to {
    -webkit-transform: translateX(var(--dm-scroll-width));
  }
}`;Se(Be);$.render=be;$.__file="src/lib/Danmaku.vue";const Ee=n=>(ge("data-v-70ba16c2"),n=n(),ye(),n),$e={class:"message-container"},Le=Ee(()=>p("h1",{class:"message-title"},"\u7559\u8A00\u677F",-1)),Ne={class:"message-input"},Ae=["onKeyup"],De={class:"danmaku-container"},Ie={class:"danmaku-item"},ze=["src"],We={class:"ml"},Fe={class:"ml"},Me=T({__name:"index",setup(n){const{blog:r,user:c}=re(),o=d(""),a=d(!1),v=d(),k=d([]);R(async()=>{await Ce().then(({data:x})=>{k.value=x.data})});const w=()=>{var b;if(o.value.trim()=="")return(b=window.$message)==null||b.warning("\u7559\u8A00\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A"),!1;const x=c.avatar?c.avatar:r.blogInfo.siteConfig.touristAvatar,m=c.nickname?c.nickname:"\u6E38\u5BA2";let u={avatar:x,nickname:m,messageContent:o.value};ke(u).then(({data:_})=>{var y,i;_.flag&&(r.blogInfo.siteConfig.messageCheck?(y=window.$message)==null||y.warning("\u7559\u8A00\u6210\u529F\uFF0C\u6B63\u5728\u5BA1\u6838\u4E2D"):(v.value.push(u),(i=window.$message)==null||i.success("\u7559\u8A00\u6210\u529F")),o.value="")})};return(x,m)=>(H(),V(pe,null,[p("div",$e,[Le,p("div",Ne,[z(p("input",{class:"input","onUpdate:modelValue":m[0]||(m[0]=u=>W(o)?o.value=u:null),onClick:m[1]||(m[1]=u=>a.value=!0),onKeyup:me(w,["enter"]),placeholder:"\u8BF4\u70B9\u4EC0\u4E48\u5427"},null,40,Ae),[[ce,B(o)]]),z(p("button",{class:"send",onClick:w},"\u53D1\u9001",512),[[fe,B(a)]])])]),p("div",De,[ve(B($),{ref_key:"danmaku",ref:v,class:"danmaku","use-slot":"",danmus:B(k),"onUpdate:danmus":m[2]||(m[2]=u=>W(k)?k.value=u:null),"is-suspend":!0},{dm:he(({danmu:u})=>[p("span",Ie,[p("img",{src:u.avatar,width:"30",height:"30",style:{"border-radius":"50%"}},null,8,ze),p("span",We,F(u.nickname)+" :",1),p("span",Fe,F(u.messageContent),1)])]),_:1},8,["danmus"])])],64))}});const Re=_e(Me,[["__scopeId","data-v-70ba16c2"]]);export{Re as default};
