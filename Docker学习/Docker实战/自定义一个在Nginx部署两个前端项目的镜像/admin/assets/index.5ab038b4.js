import{a3 as b,d as Ce,r as P,e as Q,N as ke,A as Fe,v as G,O as Ee,o as c,c as T,Q as H,R as Ve,x as u,i as a,w as o,k as we,F as j,C as J,J as C,z as r,S as k,j as A,t as W,K as X,aM as Be,aN as xe,B as Ne,U as w,T as Z,E as Re,f as Se,V as Ue,W as Te,g as Ae,h as Le,G as Ke,H as Ie,X as $e,a0 as Me,Z as ze,a1 as qe,a2 as Oe,al as Pe,am as Qe,aO as Ge,an as He}from"./index.96097f3e.js";/* empty css                   *//* empty css                 *//* empty css                        *//* empty css               */import{a as je}from"./date.f8742d84.js";function Je(d){return b({url:"/admin/role/list",method:"get",params:d})}function We(d){return b({url:"/admin/role/delete",method:"delete",data:d})}function Xe(d){return b({url:"/admin/role/add",method:"post",data:d})}function Ze(d){return b({url:"/admin/role/update",method:"put",data:d})}function Ye(d){return b({url:"/admin/role/changeStatus",method:"put",data:d})}function el(d){return b({url:`/admin/role/menu/${d}`,method:"get"})}const ll={class:"app-container"},al={class:"create-time"},tl={style:{"margin-left":"10px"}},ul={class:"dialog-footer"},ml=Ce({__name:"index",setup(d){const m=P(),B=P(),Y=Q({roleName:[{required:!0,message:"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0",trigger:"blur"}]}),ee={children:"children",label:"label"},le=Q({menuExpand:!1,menuNodeAll:!1,menuCheckStrictly:!1,count:0,showSearch:!0,loading:!1,title:"",addOrUpdate:!1,queryParams:{current:1,size:10},status:[{value:0,label:"\u6B63\u5E38"},{value:1,label:"\u7981\u7528"}],treeData:[],roleForm:{},roleIdList:[],roleList:[]}),{menuExpand:g,menuNodeAll:y,menuCheckStrictly:p,count:x,showSearch:F,loading:N,title:R,addOrUpdate:f,queryParams:i,status:L,treeData:E,roleForm:n,roleIdList:S,roleList:K}=ke(le),ae=()=>{let t=E.value;for(let e=0;e<t.length;e++)m.value.store.nodesMap[t[e].id].expanded=g.value},te=()=>{m.value.setCheckedNodes(y.value?E.value:[])},ue=()=>{p.value=!!p.value},oe=t=>{S.value=t.map(e=>e.id)},ne=()=>{var t;m.value!==void 0&&m.value.setCheckedKeys([]),g.value=!1,y.value=!1,p.value=!1,(t=B.value)==null||t.clearValidate()},I=async t=>{ne(),await xe().then(({data:e})=>{E.value=e.data}),t!==void 0?(R.value="\u4FEE\u6539\u89D2\u8272",n.value.id=t.id,n.value.roleName=t.roleName,n.value.isDisable=t.isDisable,n.value.roleDesc=t.roleDesc,el(t.id).then(({data:e})=>{e.data.forEach(s=>{Ne(()=>{m.value.setChecked(s,!0,!1)})})})):(R.value="\u6DFB\u52A0\u89D2\u8272",n.value={id:void 0,roleName:"",roleDesc:"",isDisable:0,menuIdList:[]}),f.value=!0},se=()=>{var t;(t=B.value)==null||t.validate(e=>{e&&(n.value.id!==void 0?(n.value.menuIdList=$(),Ze(n.value).then(({data:s})=>{s.flag&&(w(s.msg),v()),f.value=!1})):(n.value.menuIdList=$(),Xe(n.value).then(({data:s})=>{s.flag&&(w(s.msg),v()),f.value=!1})))})},$=()=>{let t=m.value.getCheckedKeys(),e=m.value.getHalfCheckedKeys();return t.unshift.apply(t,e),t},M=t=>{let e=[];t==null?e=S.value:e=[t],Z("\u786E\u8BA4\u5220\u9664\u5DF2\u9009\u4E2D\u7684\u6570\u636E\u9879?").then(()=>{We(e).then(({data:s})=>{s.flag&&(w(s.msg),v())})}).catch(()=>{})},v=()=>{N.value=!0,Je(i.value).then(({data:t})=>{K.value=t.data.recordList,x.value=t.data.count,N.value=!1})},de=t=>{let e=t.isDisable===0?"\u542F\u7528":"\u7981\u7528";Z("\u786E\u5B9A\u8981"+e+t.roleName+"\u89D2\u8272\u5417?").then(()=>{Ye({id:t.id,isDisable:t.isDisable}).then(({data:s})=>{s.flag?w(s.msg):t.isDisable=t.isDisable===0?1:0})}).catch(()=>{t.isDisable=t.isDisable===0?1:0})},z=()=>{i.value.current=1,v()};return Fe(()=>{v()}),(t,e)=>{const s=Re,_=Se,ie=Ue,re=Te,h=Ae,q=Le,O=Ke,me=G("right-toolbar"),ce=Ie,D=$e,pe=Me,fe=G("clock"),ve=ze,_e=qe,he=Oe,De=Pe,be=Qe,U=Ge,ge=He,ye=Ee;return c(),T("div",ll,[H(a(q,{ref:"queryFormRef",model:u(i),inline:!0},{default:o(()=>[a(_,{label:"\u89D2\u8272\u540D\u79F0"},{default:o(()=>[a(s,{modelValue:u(i).keyword,"onUpdate:modelValue":e[0]||(e[0]=l=>u(i).keyword=l),style:{width:"200px"},placeholder:"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0",clearable:"",onKeyup:we(z,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),a(_,{label:"\u72B6\u6001"},{default:o(()=>[a(re,{modelValue:u(i).isDisable,"onUpdate:modelValue":e[1]||(e[1]=l=>u(i).isDisable=l),placeholder:"\u89D2\u8272\u72B6\u6001",clearable:"",style:{width:"200px"}},{default:o(()=>[(c(!0),T(j,null,J(u(L),l=>(c(),C(ie,{key:l.value,label:l.label,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(_,null,{default:o(()=>[a(h,{type:"primary",icon:"Search",onClick:z},{default:o(()=>[r("\u641C\u7D22")]),_:1})]),_:1})]),_:1},8,["model"]),[[Ve,u(F)]]),a(ce,{gutter:10,class:"mb15"},{default:o(()=>[a(O,{span:1.5},{default:o(()=>[a(h,{type:"primary",plain:"",icon:"Plus",onClick:e[2]||(e[2]=l=>I(void 0))},{default:o(()=>[r("\u65B0\u589E")]),_:1})]),_:1}),a(O,{span:1.5},{default:o(()=>[a(h,{type:"danger",plain:"",disabled:u(S).length===0,icon:"Delete",onClick:e[3]||(e[3]=l=>M(void 0))},{default:o(()=>[r("\u6279\u91CF\u5220\u9664")]),_:1},8,["disabled"])]),_:1}),a(me,{showSearch:u(F),"onUpdate:showSearch":e[4]||(e[4]=l=>k(F)?F.value=l:null),onQueryTable:v},null,8,["showSearch"])]),_:1}),H((c(),C(_e,{border:"",data:u(K),onSelectionChange:oe},{default:o(()=>[a(D,{type:"selection",width:"55",align:"center"}),a(D,{prop:"roleName",width:"280",label:"\u89D2\u8272\u540D",align:"center"}),a(D,{prop:"roleDesc",width:"300",label:"\u89D2\u8272\u63CF\u8FF0",align:"center"}),a(D,{prop:"isDisable",label:"\u72B6\u6001",align:"center"},{default:o(l=>[a(pe,{modelValue:l.row.isDisable,"onUpdate:modelValue":V=>l.row.isDisable=V,"active-color":"#13ce66","inactive-color":"#ff4949","active-value":0,"inactive-value":1,onChange:V=>de(l.row)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),a(D,{prop:"createTime",width:"270",label:"\u521B\u5EFA\u65F6\u95F4",align:"center"},{default:o(l=>[A("div",al,[a(ve,null,{default:o(()=>[a(fe)]),_:1}),A("span",tl,W(u(je)(l.row.createTime)),1)])]),_:1}),a(D,{width:"270",label:"\u64CD\u4F5C",align:"center"},{default:o(l=>[a(h,{type:"primary",icon:"Edit",link:"",onClick:V=>I(l.row)},{default:o(()=>[r(" \u7F16\u8F91 ")]),_:2},1032,["onClick"]),l.row.id!=="1"?(c(),C(h,{key:0,type:"danger",icon:"Delete",link:"",onClick:V=>M(l.row.id)},{default:o(()=>[r(" \u5220\u9664 ")]),_:2},1032,["onClick"])):X("",!0)]),_:1})]),_:1},8,["data"])),[[ye,u(N)]]),u(x)>0?(c(),C(he,{key:0,total:u(x),page:u(i).current,"onUpdate:page":e[5]||(e[5]=l=>u(i).current=l),limit:u(i).size,"onUpdate:limit":e[6]||(e[6]=l=>u(i).size=l),onPagination:v},null,8,["total","page","limit"])):X("",!0),a(ge,{title:u(R),modelValue:u(f),"onUpdate:modelValue":e[14]||(e[14]=l=>k(f)?f.value=l:null),width:"500px","append-to-body":""},{footer:o(()=>[A("div",ul,[a(h,{type:"primary",onClick:se},{default:o(()=>[r("\u786E \u5B9A")]),_:1}),a(h,{onClick:e[13]||(e[13]=l=>f.value=!1)},{default:o(()=>[r("\u53D6 \u6D88")]),_:1})])]),default:o(()=>[a(q,{ref_key:"roleFormRef",ref:B,model:u(n),rules:Y,"label-width":"100px"},{default:o(()=>[a(_,{label:"\u89D2\u8272\u540D\u79F0",prop:"roleName"},{default:o(()=>[a(s,{placeholder:"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0",modelValue:u(n).roleName,"onUpdate:modelValue":e[7]||(e[7]=l=>u(n).roleName=l)},null,8,["modelValue"])]),_:1}),a(_,{label:"\u72B6\u6001"},{default:o(()=>[a(be,{modelValue:u(n).isDisable,"onUpdate:modelValue":e[8]||(e[8]=l=>u(n).isDisable=l)},{default:o(()=>[(c(!0),T(j,null,J(u(L),l=>(c(),C(De,{key:l.value,label:l.value},{default:o(()=>[r(W(l.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(_,{label:"\u83DC\u5355\u6743\u9650"},{default:o(()=>[a(U,{modelValue:u(g),"onUpdate:modelValue":e[9]||(e[9]=l=>k(g)?g.value=l:null),onChange:ae},{default:o(()=>[r("\u5C55\u5F00/\u6298\u53E0")]),_:1},8,["modelValue"]),a(U,{modelValue:u(y),"onUpdate:modelValue":e[10]||(e[10]=l=>k(y)?y.value=l:null),onChange:te},{default:o(()=>[r("\u5168\u9009/\u5168\u4E0D\u9009")]),_:1},8,["modelValue"]),a(U,{modelValue:u(p),"onUpdate:modelValue":e[11]||(e[11]=l=>k(p)?p.value=l:null),onChange:ue},{default:o(()=>[r("\u7236\u5B50\u8054\u52A8")]),_:1},8,["modelValue"]),a(u(Be),{class:"tree-border",data:u(E),"show-checkbox":"",ref_key:"treeRef",ref:m,"node-key":"id","default-expand-all":!1,"check-strictly":!u(p),"empty-text":"\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u5019",props:ee},null,8,["data","check-strictly"])]),_:1}),a(_,{label:"\u89D2\u8272\u63CF\u8FF0"},{default:o(()=>[a(s,{modelValue:u(n).roleDesc,"onUpdate:modelValue":e[12]||(e[12]=l=>u(n).roleDesc=l),autosize:{minRows:2,maxRows:4},resize:"none",type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"])])}}});export{ml as default};
