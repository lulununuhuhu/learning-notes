import{R as k,d as C,n as B,p as L,w,j as I,s as z,v as D,c as _,b as e,e as i,t as u,h as s,F as m,g as N,A as S,z as V,B as $,C as q,o as r,y as v,x as A,k as F,f as T,_ as j,i as E}from"./index.e34733fd.js";import{_ as M}from"./index.141961df.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang.29bf92b5.js";function h(a){return k({url:"/archives/list",method:"get",params:a})}const g=a=>($("data-v-6fe4be24"),a=a(),q(),a),R={class:"page-header"},W=g(()=>e("h1",{class:"page-title"},"\u5F52\u6863",-1)),U=g(()=>e("img",{class:"page-cover",src:"https://ik.imagekit.io/nicexl/Wallpaper/ba41a32b219e4b40ad055bbb52935896_Y0819msuI.jpg",alt:""},null,-1)),Y={class:"bg"},G={class:"page-container"},H={class:"archive-title"},J={class:"archive-list"},K={class:"cover"},O={class:"article-info"},Q={class:"article-time"},X=C({__name:"index",setup(a){const f=B({count:0,queryParams:{current:1,size:5},archivesList:[]}),{count:c,queryParams:n,archivesList:l}=L(f);return w(()=>n.value.current,()=>{h(n.value).then(({data:o})=>{l.value=o.data.recordList,c.value=o.data.count})}),I(()=>{h(n.value).then(({data:o})=>{l.value=o.data.recordList,c.value=o.data.count})}),(o,d)=>{const b=M,p=z("router-link"),x=j,y=D("lazy");return r(),_(m,null,[e("div",R,[W,U,i(b)]),e("div",Y,[e("div",G,[e("div",H,"\u6587\u7AE0\u603B\u89C8 - "+u(s(c)),1),e("div",J,[(r(!0),_(m,null,N(s(l),t=>(r(),_("div",{class:"archive-item",key:t.id},[i(p,{class:"article-cover",to:`/article/${t.id}`},{default:v(()=>[A(e("img",K,null,512),[[y,t.articleCover]])]),_:2},1032,["to"]),e("div",O,[e("div",Q,[i(x,{"icon-class":"calendar",style:{"margin-right":"0.4rem"}}),e("time",null,u(s(F)(t.createTime)),1)]),i(p,{class:"article-title",to:`/article/${t.id}`},{default:v(()=>[T(u(t.articleTitle),1)]),_:2},1032,["to"])])]))),128))]),s(c)>0?(r(),S(P,{key:0,current:s(n).current,"onUpdate:current":d[0]||(d[0]=t=>s(n).current=t),total:Math.ceil(s(c)/5)},null,8,["current","total"])):V("",!0)])])],64)}}});const se=E(X,[["__scopeId","data-v-6fe4be24"]]);export{se as default};
