import{d as x,r as z,ai as ve,aj as me,j as ne,I as ge,c as C,b as u,e as E,f as I,F as K,g as ce,h as f,o as _,N as V,D as ee,t as A,_ as le,i as ue,G as de,E as G,T as _e,z as y,s as te,u as we,X as Ce,n as be,p as Ee,L as ae,ak as ye,v as ie,x as J,A as j,y as H,al as ke,ah as Re,B as Ae,C as Me,k as se}from"./index.e34733fd.js";import{_ as Ie}from"./CommentList.a6fb4591.js";import{_ as Ne}from"./index.141961df.js";import"./index.aed2b079.js";const Fe={class:"catalog-header"},Be={class:"catalog-content"},Se=["onClick"],ze=x({__name:"index",props:{domRef:{type:Object,default:null}},setup(a){const s=a,d=z([]),l=z(0),h=()=>{const e=s.domRef.$el.querySelectorAll("h1,h2,h3"),t=Array.from(e).filter(o=>!!o.innerText.trim());t.length||(d.value=[]);const n=Array.from(new Set(t.map(o=>o.tagName))).sort();d.value=t.map((o,c)=>({title:o.innerText,lineIndex:o.getAttribute("data-v-md-line"),indent:n.indexOf(o.tagName)}))};function v(e,t){const n=s.domRef.$el.querySelector(`[data-v-md-line="${e.lineIndex}"]`);n&&(window.scrollTo({behavior:"smooth",top:n.offsetTop-40}),setTimeout(()=>l.value=t,600))}const{y:r}=ve(window);return me(r,()=>{d.value.forEach((e,t)=>{const n=s.domRef.$el.querySelector(`[data-v-md-line="${e.lineIndex}"]`);r.value>=n.offsetTop-50&&(l.value=t)})},{throttle:200}),ne(()=>{ge(()=>{h()})}),(e,t)=>{const n=le;return _(),C(K,null,[u("div",Fe,[E(n,{"icon-class":"category"}),I(" \u76EE\u5F55 ")]),u("div",Be,[(_(!0),C(K,null,ce(f(d),(o,c)=>(_(),C("div",{class:V(["catalog-item",f(l)===c?"active":""]),key:o.title,style:ee({paddingLeft:`${5+o.indent*15}px`}),onClick:i=>v(o,c)},[u("a",null,A(o.title),1)],14,Se))),128))])],64)}}});const Te=ue(ze,[["__scopeId","data-v-1512fbf5"]]);/*!
 * qrcode.vue v3.4.0
 * A Vue.js component to generate QRCode.
 * © 2017-2023 @scopewu(https://github.com/scopewu)
 * MIT License.
 */var Z=function(){return Z=Object.assign||function(s){for(var d,l=1,h=arguments.length;l<h;l++){d=arguments[l];for(var v in d)Object.prototype.hasOwnProperty.call(d,v)&&(s[v]=d[v])}return s},Z.apply(this,arguments)},P;(function(a){var s=function(){function r(e,t,n,o){if(this.version=e,this.errorCorrectionLevel=t,this.modules=[],this.isFunction=[],e<r.MIN_VERSION||e>r.MAX_VERSION)throw new RangeError("Version value out of range");if(o<-1||o>7)throw new RangeError("Mask value out of range");this.size=e*4+17;for(var c=[],i=0;i<this.size;i++)c.push(!1);for(var i=0;i<this.size;i++)this.modules.push(c.slice()),this.isFunction.push(c.slice());this.drawFunctionPatterns();var p=this.addEccAndInterleave(n);if(this.drawCodewords(p),o==-1)for(var w=1e9,i=0;i<8;i++){this.applyMask(i),this.drawFormatBits(i);var k=this.getPenaltyScore();k<w&&(o=i,w=k),this.applyMask(i)}h(0<=o&&o<=7),this.mask=o,this.applyMask(o),this.drawFormatBits(o),this.isFunction=[]}return r.encodeText=function(e,t){var n=a.QrSegment.makeSegments(e);return r.encodeSegments(n,t)},r.encodeBinary=function(e,t){var n=a.QrSegment.makeBytes(e);return r.encodeSegments([n],t)},r.encodeSegments=function(e,t,n,o,c,i){if(n===void 0&&(n=1),o===void 0&&(o=40),c===void 0&&(c=-1),i===void 0&&(i=!0),!(r.MIN_VERSION<=n&&n<=o&&o<=r.MAX_VERSION)||c<-1||c>7)throw new RangeError("Invalid value");var p,w;for(p=n;;p++){var k=r.getNumDataCodewords(p,t)*8,R=v.getTotalBits(e,p);if(R<=k){w=R;break}if(p>=o)throw new RangeError("Data too long")}for(var b=0,g=[r.Ecc.MEDIUM,r.Ecc.QUARTILE,r.Ecc.HIGH];b<g.length;b++){var M=g[b];i&&w<=r.getNumDataCodewords(p,M)*8&&(t=M)}for(var m=[],F=0,S=e;F<S.length;F++){var B=S[F];d(B.mode.modeBits,4,m),d(B.numChars,B.mode.numCharCountBits(p),m);for(var T=0,U=B.getData();T<U.length;T++){var X=U[T];m.push(X)}}h(m.length==w);var q=r.getNumDataCodewords(p,t)*8;h(m.length<=q),d(0,Math.min(4,q-m.length),m),d(0,(8-m.length%8)%8,m),h(m.length%8==0);for(var $=236;m.length<q;$^=253)d($,8,m);for(var D=[];D.length*8<m.length;)D.push(0);return m.forEach(function(Y,L){return D[L>>>3]|=Y<<7-(L&7)}),new r(p,t,D,c)},r.prototype.getModule=function(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]},r.prototype.getModules=function(){return this.modules},r.prototype.drawFunctionPatterns=function(){for(var e=0;e<this.size;e++)this.setFunctionModule(6,e,e%2==0),this.setFunctionModule(e,6,e%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);for(var t=this.getAlignmentPatternPositions(),n=t.length,e=0;e<n;e++)for(var o=0;o<n;o++)e==0&&o==0||e==0&&o==n-1||e==n-1&&o==0||this.drawAlignmentPattern(t[e],t[o]);this.drawFormatBits(0),this.drawVersion()},r.prototype.drawFormatBits=function(e){for(var t=this.errorCorrectionLevel.formatBits<<3|e,n=t,o=0;o<10;o++)n=n<<1^(n>>>9)*1335;var c=(t<<10|n)^21522;h(c>>>15==0);for(var o=0;o<=5;o++)this.setFunctionModule(8,o,l(c,o));this.setFunctionModule(8,7,l(c,6)),this.setFunctionModule(8,8,l(c,7)),this.setFunctionModule(7,8,l(c,8));for(var o=9;o<15;o++)this.setFunctionModule(14-o,8,l(c,o));for(var o=0;o<8;o++)this.setFunctionModule(this.size-1-o,8,l(c,o));for(var o=8;o<15;o++)this.setFunctionModule(8,this.size-15+o,l(c,o));this.setFunctionModule(8,this.size-8,!0)},r.prototype.drawVersion=function(){if(!(this.version<7)){for(var e=this.version,t=0;t<12;t++)e=e<<1^(e>>>11)*7973;var n=this.version<<12|e;h(n>>>18==0);for(var t=0;t<18;t++){var o=l(n,t),c=this.size-11+t%3,i=Math.floor(t/3);this.setFunctionModule(c,i,o),this.setFunctionModule(i,c,o)}}},r.prototype.drawFinderPattern=function(e,t){for(var n=-4;n<=4;n++)for(var o=-4;o<=4;o++){var c=Math.max(Math.abs(o),Math.abs(n)),i=e+o,p=t+n;0<=i&&i<this.size&&0<=p&&p<this.size&&this.setFunctionModule(i,p,c!=2&&c!=4)}},r.prototype.drawAlignmentPattern=function(e,t){for(var n=-2;n<=2;n++)for(var o=-2;o<=2;o++)this.setFunctionModule(e+o,t+n,Math.max(Math.abs(o),Math.abs(n))!=1)},r.prototype.setFunctionModule=function(e,t,n){this.modules[t][e]=n,this.isFunction[t][e]=!0},r.prototype.addEccAndInterleave=function(e){var t=this.version,n=this.errorCorrectionLevel;if(e.length!=r.getNumDataCodewords(t,n))throw new RangeError("Invalid argument");for(var o=r.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][t],c=r.ECC_CODEWORDS_PER_BLOCK[n.ordinal][t],i=Math.floor(r.getNumRawDataModules(t)/8),p=o-i%o,w=Math.floor(i/o),k=[],R=r.reedSolomonComputeDivisor(c),b=0,g=0;b<o;b++){var M=e.slice(g,g+w-c+(b<p?0:1));g+=M.length;var m=r.reedSolomonComputeRemainder(M,R);b<p&&M.push(0),k.push(M.concat(m))}for(var F=[],S=function(B){k.forEach(function(T,U){(B!=w-c||U>=p)&&F.push(T[B])})},b=0;b<k[0].length;b++)S(b);return h(F.length==i),F},r.prototype.drawCodewords=function(e){if(e.length!=Math.floor(r.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");for(var t=0,n=this.size-1;n>=1;n-=2){n==6&&(n=5);for(var o=0;o<this.size;o++)for(var c=0;c<2;c++){var i=n-c,p=(n+1&2)==0,w=p?this.size-1-o:o;!this.isFunction[w][i]&&t<e.length*8&&(this.modules[w][i]=l(e[t>>>3],7-(t&7)),t++)}}h(t==e.length*8)},r.prototype.applyMask=function(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(var t=0;t<this.size;t++)for(var n=0;n<this.size;n++){var o=void 0;switch(e){case 0:o=(n+t)%2==0;break;case 1:o=t%2==0;break;case 2:o=n%3==0;break;case 3:o=(n+t)%3==0;break;case 4:o=(Math.floor(n/3)+Math.floor(t/2))%2==0;break;case 5:o=n*t%2+n*t%3==0;break;case 6:o=(n*t%2+n*t%3)%2==0;break;case 7:o=((n+t)%2+n*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][n]&&o&&(this.modules[t][n]=!this.modules[t][n])}},r.prototype.getPenaltyScore=function(){for(var e=0,t=0;t<this.size;t++){for(var n=!1,o=0,c=[0,0,0,0,0,0,0],i=0;i<this.size;i++)this.modules[t][i]==n?(o++,o==5?e+=r.PENALTY_N1:o>5&&e++):(this.finderPenaltyAddHistory(o,c),n||(e+=this.finderPenaltyCountPatterns(c)*r.PENALTY_N3),n=this.modules[t][i],o=1);e+=this.finderPenaltyTerminateAndCount(n,o,c)*r.PENALTY_N3}for(var i=0;i<this.size;i++){for(var n=!1,p=0,c=[0,0,0,0,0,0,0],t=0;t<this.size;t++)this.modules[t][i]==n?(p++,p==5?e+=r.PENALTY_N1:p>5&&e++):(this.finderPenaltyAddHistory(p,c),n||(e+=this.finderPenaltyCountPatterns(c)*r.PENALTY_N3),n=this.modules[t][i],p=1);e+=this.finderPenaltyTerminateAndCount(n,p,c)*r.PENALTY_N3}for(var t=0;t<this.size-1;t++)for(var i=0;i<this.size-1;i++){var w=this.modules[t][i];w==this.modules[t][i+1]&&w==this.modules[t+1][i]&&w==this.modules[t+1][i+1]&&(e+=r.PENALTY_N2)}for(var k=0,R=0,b=this.modules;R<b.length;R++){var g=b[R];k=g.reduce(function(F,S){return F+(S?1:0)},k)}var M=this.size*this.size,m=Math.ceil(Math.abs(k*20-M*10)/M)-1;return h(0<=m&&m<=9),e+=m*r.PENALTY_N4,h(0<=e&&e<=2568888),e},r.prototype.getAlignmentPatternPositions=function(){if(this.version==1)return[];for(var e=Math.floor(this.version/7)+2,t=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2,n=[6],o=this.size-7;n.length<e;o-=t)n.splice(1,0,o);return n},r.getNumRawDataModules=function(e){if(e<r.MIN_VERSION||e>r.MAX_VERSION)throw new RangeError("Version number out of range");var t=(16*e+128)*e+64;if(e>=2){var n=Math.floor(e/7)+2;t-=(25*n-10)*n-55,e>=7&&(t-=36)}return h(208<=t&&t<=29648),t},r.getNumDataCodewords=function(e,t){return Math.floor(r.getNumRawDataModules(e)/8)-r.ECC_CODEWORDS_PER_BLOCK[t.ordinal][e]*r.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][e]},r.reedSolomonComputeDivisor=function(e){if(e<1||e>255)throw new RangeError("Degree out of range");for(var t=[],n=0;n<e-1;n++)t.push(0);t.push(1);for(var o=1,n=0;n<e;n++){for(var c=0;c<t.length;c++)t[c]=r.reedSolomonMultiply(t[c],o),c+1<t.length&&(t[c]^=t[c+1]);o=r.reedSolomonMultiply(o,2)}return t},r.reedSolomonComputeRemainder=function(e,t){for(var n=t.map(function(w){return 0}),o=function(w){var k=w^n.shift();n.push(0),t.forEach(function(R,b){return n[b]^=r.reedSolomonMultiply(R,k)})},c=0,i=e;c<i.length;c++){var p=i[c];o(p)}return n},r.reedSolomonMultiply=function(e,t){if(e>>>8!=0||t>>>8!=0)throw new RangeError("Byte out of range");for(var n=0,o=7;o>=0;o--)n=n<<1^(n>>>7)*285,n^=(t>>>o&1)*e;return h(n>>>8==0),n},r.prototype.finderPenaltyCountPatterns=function(e){var t=e[1];h(t<=this.size*3);var n=t>0&&e[2]==t&&e[3]==t*3&&e[4]==t&&e[5]==t;return(n&&e[0]>=t*4&&e[6]>=t?1:0)+(n&&e[6]>=t*4&&e[0]>=t?1:0)},r.prototype.finderPenaltyTerminateAndCount=function(e,t,n){return e&&(this.finderPenaltyAddHistory(t,n),t=0),t+=this.size,this.finderPenaltyAddHistory(t,n),this.finderPenaltyCountPatterns(n)},r.prototype.finderPenaltyAddHistory=function(e,t){t[0]==0&&(e+=this.size),t.pop(),t.unshift(e)},r.MIN_VERSION=1,r.MAX_VERSION=40,r.PENALTY_N1=3,r.PENALTY_N2=3,r.PENALTY_N3=40,r.PENALTY_N4=10,r.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],r.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],r}();a.QrCode=s;function d(r,e,t){if(e<0||e>31||r>>>e!=0)throw new RangeError("Value out of range");for(var n=e-1;n>=0;n--)t.push(r>>>n&1)}function l(r,e){return(r>>>e&1)!=0}function h(r){if(!r)throw new Error("Assertion error")}var v=function(){function r(e,t,n){if(this.mode=e,this.numChars=t,this.bitData=n,t<0)throw new RangeError("Invalid argument");this.bitData=n.slice()}return r.makeBytes=function(e){for(var t=[],n=0,o=e;n<o.length;n++){var c=o[n];d(c,8,t)}return new r(r.Mode.BYTE,e.length,t)},r.makeNumeric=function(e){if(!r.isNumeric(e))throw new RangeError("String contains non-numeric characters");for(var t=[],n=0;n<e.length;){var o=Math.min(e.length-n,3);d(parseInt(e.substring(n,n+o),10),o*3+1,t),n+=o}return new r(r.Mode.NUMERIC,e.length,t)},r.makeAlphanumeric=function(e){if(!r.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");var t=[],n;for(n=0;n+2<=e.length;n+=2){var o=r.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n))*45;o+=r.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n+1)),d(o,11,t)}return n<e.length&&d(r.ALPHANUMERIC_CHARSET.indexOf(e.charAt(n)),6,t),new r(r.Mode.ALPHANUMERIC,e.length,t)},r.makeSegments=function(e){return e==""?[]:r.isNumeric(e)?[r.makeNumeric(e)]:r.isAlphanumeric(e)?[r.makeAlphanumeric(e)]:[r.makeBytes(r.toUtf8ByteArray(e))]},r.makeEci=function(e){var t=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<1<<7)d(e,8,t);else if(e<1<<14)d(2,2,t),d(e,14,t);else if(e<1e6)d(6,3,t),d(e,21,t);else throw new RangeError("ECI assignment value out of range");return new r(r.Mode.ECI,0,t)},r.isNumeric=function(e){return r.NUMERIC_REGEX.test(e)},r.isAlphanumeric=function(e){return r.ALPHANUMERIC_REGEX.test(e)},r.prototype.getData=function(){return this.bitData.slice()},r.getTotalBits=function(e,t){for(var n=0,o=0,c=e;o<c.length;o++){var i=c[o],p=i.mode.numCharCountBits(t);if(i.numChars>=1<<p)return 1/0;n+=4+p+i.bitData.length}return n},r.toUtf8ByteArray=function(e){e=encodeURI(e);for(var t=[],n=0;n<e.length;n++)e.charAt(n)!="%"?t.push(e.charCodeAt(n)):(t.push(parseInt(e.substring(n+1,n+3),16)),n+=2);return t},r.NUMERIC_REGEX=/^[0-9]*$/,r.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,r.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",r}();a.QrSegment=v})(P||(P={}));(function(a){(function(s){var d=function(){function l(h,v){this.ordinal=h,this.formatBits=v}return l.LOW=new l(0,1),l.MEDIUM=new l(1,0),l.QUARTILE=new l(2,3),l.HIGH=new l(3,2),l}();s.Ecc=d})(a.QrCode||(a.QrCode={}))})(P||(P={}));(function(a){(function(s){var d=function(){function l(h,v){this.modeBits=h,this.numBitsCharCount=v}return l.prototype.numCharCountBits=function(h){return this.numBitsCharCount[Math.floor((h+7)/17)]},l.NUMERIC=new l(1,[10,12,14]),l.ALPHANUMERIC=new l(2,[9,11,13]),l.BYTE=new l(4,[8,16,16]),l.KANJI=new l(8,[8,10,12]),l.ECI=new l(7,[0,0,0]),l}();s.Mode=d})(a.QrSegment||(a.QrSegment={}))})(P||(P={}));var Q=P,he="H",oe={L:Q.QrCode.Ecc.LOW,M:Q.QrCode.Ecc.MEDIUM,Q:Q.QrCode.Ecc.QUARTILE,H:Q.QrCode.Ecc.HIGH},De=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}();function fe(a){return a in oe}function pe(a,s){s===void 0&&(s=0);var d=[];return a.forEach(function(l,h){var v=null;l.forEach(function(r,e){if(!r&&v!==null){d.push("M".concat(v+s," ").concat(h+s,"h").concat(e-v,"v1H").concat(v+s,"z")),v=null;return}if(e===l.length-1){if(!r)return;v===null?d.push("M".concat(e+s,",").concat(h+s," h1v1H").concat(e+s,"z")):d.push("M".concat(v+s,",").concat(h+s," h").concat(e+1-v,"v1H").concat(v+s,"z"));return}r&&v===null&&(v=e)})}),d.join("")}var re={value:{type:String,required:!0,default:""},size:{type:Number,default:100},level:{type:String,default:he,validator:function(a){return fe(a)}},background:{type:String,default:"#fff"},foreground:{type:String,default:"#000"},margin:{type:Number,required:!1,default:0}},Pe=Z(Z({},re),{renderAs:{type:String,required:!1,default:"canvas",validator:function(a){return["canvas","svg"].indexOf(a)>-1}}}),xe=x({name:"QRCodeSvg",props:re,setup:function(a){var s=z(0),d=z(""),l=function(){var h=a.value,v=a.level,r=a.margin,e=Q.QrCode.encodeText(h,oe[v]).getModules();s.value=e.length+r*2,d.value=pe(e,r)};return l(),de(l),function(){return G("svg",{width:a.size,height:a.size,"shape-rendering":"crispEdges",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(s.value," ").concat(s.value)},[G("path",{fill:a.background,d:"M0,0 h".concat(s.value,"v").concat(s.value,"H0z")}),G("path",{fill:a.foreground,d:d.value})])}}}),Ue=x({name:"QRCodeCanvas",props:re,setup:function(a){var s=z(null),d=function(){var l=a.value,h=a.level,v=a.size,r=a.margin,e=a.background,t=a.foreground,n=s.value;if(!!n){var o=n.getContext("2d");if(!!o){var c=Q.QrCode.encodeText(l,oe[h]).getModules(),i=c.length+r*2,p=window.devicePixelRatio||1,w=v/i*p;n.height=n.width=v*p,o.scale(w,w),o.fillStyle=e,o.fillRect(0,0,i,i),o.fillStyle=t,De?o.fill(new Path2D(pe(c,r))):c.forEach(function(k,R){k.forEach(function(b,g){b&&o.fillRect(g+r,R+r,1,1)})})}}};return ne(d),de(d),function(){return G("canvas",{ref:s,style:{width:"".concat(a.size,"px"),height:"".concat(a.size,"px")}})}}}),Le=x({name:"Qrcode",render:function(){var a=this.$props,s=a.renderAs,d=a.value,l=a.size,h=a.margin,v=a.level,r=a.background,e=a.foreground,t=l>>>0,n=h>>>0,o=fe(v)?v:he;return G(s==="svg"?xe:Ue,{value:d,size:t,margin:n,level:o,background:r,foreground:e})},props:Pe}),W=x({name:"nd-button"});const Qe={class:"nd-btn"},Oe={key:0};W.render=function(a,s,d,l,h,v){return _(),C("button",Qe,[a.$slots.default?(_(),C("span",Oe,[_e(a.$slots,"default")])):y("v-if",!0)])},W.__file="packages/button/src/button.vue",W.install=a=>{a.component(W.name,W)};var O=x({props:{QQ:{type:Boolean,default:!0},weibo:{type:Boolean,default:!0},weChat:{type:Boolean,default:!0},douban:{type:Boolean,default:!1},QZone:{type:Boolean,default:!0},linkedin:{type:Boolean,default:!1},diandian:{type:Boolean,default:!1},facebook:{type:Boolean,default:!1},twitter:{type:Boolean,default:!1},google:{type:Boolean,default:!1},url:{type:String,default:window.location.href},source:{type:String,default:""},origin:{type:String,default:window.location.origin},title:{type:String,default:document.title},description:{type:String,default:""},image:{type:String,default:""}},components:{QrcodeVue:Le},name:"Share",setup(a){z();const s=z(""),d=()=>{s.value=a.url};return{url:s,shareWeibo:()=>{window.open("http://service.weibo.com/share/share.php?url="+encodeURIComponent(a.url)+"&title="+encodeURIComponent(a.title)+"&pic="+encodeURIComponent(a.image)+"&appkey=")},shareQQ:()=>{window.open("http://connect.qq.com/widget/shareqq/index.html?url="+encodeURIComponent(a.url)+"&title="+encodeURIComponent(a.title)+"&source="+encodeURIComponent(a.source)+"&desc="+encodeURIComponent(a.description)+"&pics="+encodeURIComponent(a.image))},shareWeChat:()=>{d()},shareDouban:()=>{window.open("http://shuo.douban.com/!service/share?href="+encodeURIComponent(a.url)+"&name="+encodeURIComponent(a.title)+"&text="+encodeURIComponent(a.description)+"&image="+encodeURIComponent(a.image)+"&starid=0&aid=0&style=11")},shareQZone:()=>{window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+encodeURIComponent(a.url)+"&title="+encodeURIComponent(a.title)+"&desc"+encodeURIComponent(a.description)+"&summary="+encodeURIComponent(a.description)+"&site="+encodeURIComponent(a.source)+"&pics="+encodeURIComponent(a.image))},shareLinkedin:()=>{window.open("http://www.linkedin.com/shareArticle?mini=true&amp;ro=true&amp;title="+encodeURIComponent(a.title)+"&url="+encodeURIComponent(a.url)+"&summary="+encodeURIComponent(a.description)+"&source="+encodeURIComponent(a.source)+"&armin=armin")},shareDianDian:()=>{window.open("http://www.diandian.com/share?lo="+encodeURIComponent(a.url)+"&ti="+encodeURIComponent(a.title)+"&type=link")},shareFacebook:()=>{window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(a.url))},shareTwitter:()=>{window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(a.description)+"&url="+encodeURIComponent(a.url)+"&via="+encodeURIComponent(a.origin))},shareGoogle:()=>{window.open("https://plus.google.com/share?url="+encodeURIComponent(a.url))}}}});const qe={class:"social-share"},$e={class:"wechat-qrcode"},He=u("h4",null,"\u4E8C\u7EF4\u7801",-1),We=u("div",{class:"help"},"\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u5206\u4EAB",-1);O.render=function(a,s,d,l,h,v){const r=te("qrcode-vue");return _(),C("div",qe,[a.weibo?(_(),C("a",{key:0,class:"social-share-icon icon-weibo",style:{cursor:"pointer"},onClick:s[0]||(s[0]=(...e)=>a.shareWeibo&&a.shareWeibo(...e))})):y("v-if",!0),a.QQ?(_(),C("a",{key:1,class:"social-share-icon icon-qq",style:{cursor:"pointer"},onClick:s[1]||(s[1]=(...e)=>a.shareQQ&&a.shareQQ(...e))})):y("v-if",!0),a.weChat?(_(),C("a",{key:2,class:"social-share-icon icon-wechat",style:{cursor:"pointer"},onMouseover:s[2]||(s[2]=(...e)=>a.shareWeChat&&a.shareWeChat(...e))},[u("div",$e,[He,E(r,{value:a.url,size:120,level:"H",style:{margin:"5px"}},null,8,["value"]),We])],32)):y("v-if",!0),a.douban?(_(),C("a",{key:3,class:"social-share-icon icon-douban",style:{cursor:"pointer"},onClick:s[3]||(s[3]=(...e)=>a.shareDouban&&a.shareDouban(...e))})):y("v-if",!0),a.QZone?(_(),C("a",{key:4,class:"social-share-icon icon-qzone",style:{cursor:"pointer"},onClick:s[4]||(s[4]=(...e)=>a.shareQZone&&a.shareQZone(...e))})):y("v-if",!0),a.linkedin?(_(),C("a",{key:5,class:"social-share-icon icon-linkedin",style:{cursor:"pointer"},onClick:s[5]||(s[5]=(...e)=>a.shareLinkedin&&a.shareLinkedin(...e))})):y("v-if",!0),a.diandian?(_(),C("a",{key:6,class:"social-share-icon icon-diandian",style:{cursor:"pointer"},onClick:s[6]||(s[6]=(...e)=>a.shareDianDian&&a.shareDianDian(...e))})):y("v-if",!0),a.facebook?(_(),C("a",{key:7,class:"social-share-icon icon-facebook",style:{cursor:"pointer"},onClick:s[7]||(s[7]=(...e)=>a.shareFacebook&&a.shareFacebook(...e))})):y("v-if",!0),a.twitter?(_(),C("a",{key:8,class:"social-share-icon icon-twitter",style:{cursor:"pointer"},onClick:s[8]||(s[8]=(...e)=>a.shareTwitter&&a.shareTwitter(...e))})):y("v-if",!0),a.google?(_(),C("a",{key:9,class:"social-share-icon icon-google",style:{cursor:"pointer"},onClick:s[9]||(s[9]=(...e)=>a.shareGoogle&&a.shareGoogle(...e))})):y("v-if",!0)])},O.__file="packages/Share/src/Share.vue";(function(a,s){s===void 0&&(s={});var d=s.insertAt;if(a&&typeof document<"u"){var l=document.head||document.getElementsByTagName("head")[0],h=document.createElement("style");h.type="text/css",d==="top"&&l.firstChild?l.insertBefore(h,l.firstChild):l.appendChild(h),h.styleSheet?h.styleSheet.cssText=a:h.appendChild(document.createTextNode(a))}})(`@font-face {
    font-family: "socialshare";
    src: url("../fonts/iconfont.eot");
    src: url("../fonts/iconfont.eot?#iefix") format("embedded-opentype"), url("../fonts/iconfont.woff") format("woff"), url("../fonts/iconfont.ttf") format("truetype"), url("../fonts/iconfont.svg#iconfont") format("svg")
}

.social-share {
    font-family: "socialshare" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale
}

.social-share * {
    font-family: "socialshare" !important
}

.social-share .icon-tencent:before {
    content: "\\f07a"
}

.social-share .icon-qq:before {
    content: "\\f11a"
}

.social-share .icon-weibo:before {
    content: "\\f12a"
}

.social-share .icon-wechat:before {
    content: "\\f09a"
}

.social-share .icon-douban:before {
    content: "\\f10a"
}

.social-share .icon-heart:before {
    content: "\\f20a"
}

.social-share .icon-like:before {
    content: "\\f00a"
}

.social-share .icon-qzone:before {
    content: "\\f08a"
}

.social-share .icon-linkedin:before {
    content: "\\f01a"
}

.social-share .icon-diandian:before {
    content: "\\f05a"
}

.social-share .icon-facebook:before {
    content: "\\f03a"
}

.social-share .icon-google:before {
    content: "\\f04a"
}

.social-share .icon-twitter:before {
    content: "\\f06a"
}

.social-share a {
    position: relative;
    text-decoration: none;
    margin: 4px;
    display: inline-block;
    outline: none
}

.social-share .social-share-icon {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 20px;
    border-radius: 50%;
    line-height: 32px;
    border: 1px solid #666;
    color: #666;
    text-align: center;
    vertical-align: middle;
    transition: background 0.6s ease-out 0s
}

.social-share .social-share-icon:hover {
    background: #666;
    color: #fff
}

.social-share .icon-weibo {
    color: #ff763b;
    border-color: #ff763b
}

.social-share .icon-weibo:hover {
    background: #ff763b
}

.social-share .icon-tencent {
    color: #56b6e7;
    border-color: #56b6e7
}

.social-share .icon-tencent:hover {
    background: #56b6e7
}

.social-share .icon-qq {
    color: #56b6e7;
    border-color: #56b6e7
}

.social-share .icon-qq:hover {
    background: #56b6e7
}

.social-share .icon-qzone {
    color: #FDBE3D;
    border-color: #FDBE3D
}

.social-share .icon-qzone:hover {
    background: #FDBE3D
}

.social-share .icon-douban {
    color: #33b045;
    border-color: #33b045
}

.social-share .icon-douban:hover {
    background: #33b045
}

.social-share .icon-linkedin {
    color: #0077B5;
    border-color: #0077B5
}

.social-share .icon-linkedin:hover {
    background: #0077B5
}

.social-share .icon-facebook {
    color: #44619D;
    border-color: #44619D
}

.social-share .icon-facebook:hover {
    background: #44619D
}

.social-share .icon-google {
    color: #db4437;
    border-color: #db4437
}

.social-share .icon-google:hover {
    background: #db4437
}

.social-share .icon-twitter {
    color: #55acee;
    border-color: #55acee
}

.social-share .icon-twitter:hover {
    background: #55acee
}

.social-share .icon-diandian {
    color: #307DCA;
    border-color: #307DCA
}

.social-share .icon-diandian:hover {
    background: #307DCA
}

.social-share .icon-wechat {
    position: relative;
    color: #7bc549;
    border-color: #7bc549
}

.social-share .icon-wechat:hover {
    background: #7bc549
}

.social-share .icon-wechat .wechat-qrcode {
    display: none;
    border: 1px solid #eee;
    position: absolute;
    z-index: 9;
    top: -205px;
    left: -84px;
    width: 200px;
    height: 192px;
    color: #666;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 10px #aaa;
    transition: all 200ms;
    -webkit-tansition: all 350ms;
    -moz-transition: all 350ms
}

.social-share .icon-wechat .wechat-qrcode.bottom {
    top: 40px;
    left: -84px
}

.social-share .icon-wechat .wechat-qrcode.bottom:after {
    display: none
}

.social-share .icon-wechat .wechat-qrcode h4 {
    font-weight: normal;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    background-color: #f3f3f3;
    margin: 0;
    padding: 0;
    color: #777
}

.social-share .icon-wechat .wechat-qrcode .qrcode {
    width: 105px;
    margin: 10px auto
}

.social-share .icon-wechat .wechat-qrcode .qrcode table {
    margin: 0 !important
}

.social-share .icon-wechat .wechat-qrcode .help p {
    font-weight: normal;
    line-height: 16px;
    padding: 0;
    margin: 0
}

.social-share .icon-wechat .wechat-qrcode:after {
    content: '';
    position: absolute;
    left: 50%;
    margin-left: -6px;
    bottom: -13px;
    width: 0;
    height: 0;
    border-width: 8px 6px 6px 6px;
    border-style: solid;
    border-color: #fff transparent transparent transparent
}

.social-share .icon-wechat:hover .wechat-qrcode {
    display: block
}
`),O.install=a=>{a.component(O.name,O)};const N=a=>(Ae("data-v-c7d6ccde"),a=a(),Me(),a),Ge={key:0,class:"page-header"},Ye={class:"page-title"},Ve={class:"article-title"},Ke={class:"article-meta"},Ze={class:"first-meta"},Xe=N(()=>u("span",{class:"text"},"\u53D1\u8868\u4E8E ",-1)),Je={key:0,class:"item"},je=N(()=>u("span",{class:"text"},"\u66F4\u65B0\u4E8E ",-1)),et={class:"item"},tt=N(()=>u("span",{class:"text"},"\u9605\u8BFB\u91CF ",-1)),nt={class:"second-meta"},ot=N(()=>u("span",{class:"text"},"\u5B57\u6570\u7EDF\u8BA1 ",-1)),rt={class:"item"},at=N(()=>u("span",{class:"text"},"\u9605\u8BFB\u65F6\u957F ",-1)),it={class:"item"},st=["src"],ct={class:"bg"},lt={key:0,class:"main-container"},ut={class:"article-container"},dt={class:"article-post"},ht={class:"tag-share"},ft={class:"reward"},pt={class:"btn reward-btn"},vt={class:"reward-all"},mt={class:"reward-img"},gt=N(()=>u("div",{class:"reward-desc"},"\u5FAE\u4FE1",-1)),_t={style:{"margin-left":"0.3rem"}},wt={class:"reward-img"},Ct=N(()=>u("div",{class:"reward-desc"},"\u652F\u4ED8\u5B9D",-1)),bt={key:1,class:"tea"},Et={class:"copyright"},yt={class:"author"},kt=N(()=>u("strong",null,"\u672C\u6587\u4F5C\u8005\uFF1A ",-1)),Rt={class:"link"},At=N(()=>u("strong",null,"\u672C\u6587\u94FE\u63A5\uFF1A",-1)),Mt=["href"],It={class:"license"},Nt=N(()=>u("strong",null,"\u7248\u6743\u58F0\u660E\uFF1A ",-1)),Ft=N(()=>u("a",{href:"https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh",target:"_blank"},"CC BY-NC-SA 4.0",-1)),Bt={class:"post-nav"},St={key:0,class:"item"},zt=N(()=>u("span",{class:"post-last-next"},"\u4E0A\u4E00\u7BC7",-1)),Tt={class:"post-title"},Dt={key:1,class:"item"},Pt=N(()=>u("span",{class:"post-last-next"},"\u4E0B\u4E00\u7BC7",-1)),xt={class:"post-title"},Ut={class:"side-card"},Lt=x({__name:"Article",setup(a){const{app:s,blog:d,user:l}=we(),h=z(),v=Ce(),r=window.location.href,e=be({articleLoaded:!1,wordNum:0,readTime:0,commentType:1,article:{id:0,articleCover:"",articleTitle:"",articleContent:"",articleType:0,viewCount:0,likeCount:0,category:{},tagVOList:[],createTime:"",lastArticle:{},nextArticle:{},updateTime:""}}),{articleLoaded:t,wordNum:n,readTime:o,commentType:c,article:i}=Ee(e),p=ae(()=>g=>"background-image:url("+g+")"),w=ae(()=>g=>l.articleLikeSet.indexOf(g)!=-1?"like-btn-active":"like-btn"),k=g=>g>=1e3?(g/1e3).toFixed(1)+"k":g,R=g=>g.replace(/<\/?[^>]*>/g,"").replace(/[|]*\n/,"").replace(/&npsp;/gi,""),b=()=>{if(!l.id){s.setLoginFlag(!0);return}let g=i.value.id;ke(g).then(({data:M})=>{M.flag&&(l.articleLikeSet.indexOf(g)!=-1?i.value.likeCount-=1:i.value.likeCount+=1,l.articleLike(g))})};return ne(()=>{ye(Number(v.params.id)).then(({data:g})=>{i.value=g.data,document.title=i.value.articleTitle,n.value=R(i.value.articleContent).length,o.value=Math.round(n.value/400),t.value=!0})}),(g,M)=>{var D,Y;const m=le,F=Ne,S=te("v-md-preview"),B=te("router-link"),T=Re,U=Ie,X=Te,q=ie("viewer"),$=ie("lazy");return _(),C(K,null,[f(i)?(_(),C("div",Ge,[u("div",Ye,[u("h1",Ve,A(f(i).articleTitle),1),u("div",Ke,[u("div",Ze,[u("span",null,[E(m,{"icon-class":"calendar",style:{"margin-right":"0.15rem"}}),Xe,I(A(f(se)(f(i).createTime)),1)]),f(i).updateTime?(_(),C("span",Je,[E(m,{"icon-class":"update",style:{"margin-right":"0.15rem"}}),je,I(A(f(se)(f(i).updateTime)),1)])):y("",!0),u("span",et,[E(m,{"icon-class":"eye",style:{"margin-right":"0.15rem"}}),tt,I(A(f(i).viewCount),1)])]),u("div",nt,[u("span",null,[E(m,{"icon-class":"edit",size:"0.9rem",style:{"margin-right":"0.15rem"}}),ot,I(A(k(f(n)))+" \u5B57 ",1)]),u("span",rt,[E(m,{"icon-class":"clock",style:{"margin-right":"0.15rem"}}),at,I(A(f(o))+" \u5206\u949F ",1)]),u("span",it,[E(m,{"icon-class":"category",style:{"margin-right":"0.15rem"}}),I(A(f(i).category.categoryName),1)])])])]),u("img",{class:"page-cover",src:f(i).articleCover,alt:""},null,8,st),E(F)])):y("",!0),u("div",ct,[f(i)?(_(),C("div",lt,[u("div",{class:V(["left-container",f(s).sideFlag?"test":""])},[u("div",ut,[J(E(S,{ref_key:"articleRef",ref:h,class:"md",text:f(i).articleContent},null,8,["text"]),[[q]]),u("div",dt,[u("div",ht,[(_(!0),C(K,null,ce(f(i).tagVOList,L=>(_(),j(B,{to:`/tag/${L.id}`,class:"article-tag",key:L.id},{default:H(()=>[E(m,{"icon-class":"tag",size:"0.8rem"}),I(" "+A(L.tagName),1)]),_:2},1032,["to"]))),128)),E(f(O),{class:"share-info",url:f(r),title:f(i).articleTitle},null,8,["url","title"])]),u("div",ft,[u("button",{class:V(["btn",f(w)(f(i).id)]),onClick:b},[E(m,{"icon-class":"like",size:"0.9rem"}),I(" \u70B9\u8D5E "),u("span",null,A(f(i).likeCount),1)],2),f(d).blogInfo.siteConfig.isReward?(_(),j(T,{key:0,trigger:"click"},{trigger:H(()=>[u("button",pt,[E(m,{"icon-class":"qr_code",size:"0.9rem"}),I(" \u6253\u8D4F ")])]),default:H(()=>[u("div",vt,[u("span",null,[J(u("img",mt,null,512),[[$,f(d).blogInfo.siteConfig.weiXinCode]]),gt]),u("span",_t,[J(u("img",wt,null,512),[[$,f(d).blogInfo.siteConfig.aliCode]]),Ct])])]),_:1})):y("",!0),f(d).blogInfo.siteConfig.isReward?(_(),C("p",bt,"\u8BF7\u6211\u559D[\u8336]~(\uFFE3\u25BD\uFFE3)~*")):y("",!0)]),u("div",Et,[u("ul",null,[u("li",yt,[E(m,{"icon-class":"author",size:"0.9rem",style:{"margin-right":"0.3rem"}}),kt,I(A(f(d).blogInfo.siteConfig.siteAuthor),1)]),u("li",Rt,[E(m,{"icon-class":"article_link",size:"0.9rem",style:{"margin-right":"0.3rem"}}),At,u("a",{href:f(r)},A(f(r)),9,Mt)]),u("li",It,[E(m,{"icon-class":"article_share",size:"0.8rem",style:{"margin-right":"0.3rem"}}),Nt,I("\u672C\u7AD9\u6240\u6709\u6587\u7AE0\u9664\u7279\u522B\u58F0\u660E\u5916\uFF0C\u5747\u91C7\u7528 "),Ft,I(" \u8BB8\u53EF\u534F\u8BAE\u3002\u8F6C\u8F7D\u8BF7\u6CE8\u660E\u6587\u7AE0\u51FA\u5904\uFF01 ")])])]),u("div",Bt,[f(i).lastArticle?(_(),C("div",St,[E(B,{to:`/article/${(D=f(i).lastArticle)==null?void 0:D.id}`,class:"post-cover",style:ee(f(p)(f(i).lastArticle.articleCover))},{default:H(()=>[zt,u("h3",Tt,A(f(i).lastArticle.articleTitle),1)]),_:1},8,["to","style"])])):y("",!0),f(i).nextArticle?(_(),C("div",Dt,[E(B,{to:`/article/${(Y=f(i).nextArticle)==null?void 0:Y.id}`,class:"post-cover",style:ee(f(p)(f(i).nextArticle.articleCover))},{default:H(()=>[Pt,u("h3",xt,A(f(i).nextArticle.articleTitle),1)]),_:1},8,["to","style"])])):y("",!0)]),E(U,{"comment-type":f(c)},null,8,["comment-type"])])])],2),u("div",{class:V(["right-container",f(s).sideFlag?"temp":""])},[u("div",Ut,[f(t)?(_(),j(X,{key:0,domRef:f(h)},null,8,["domRef"])):y("",!0)])],2)])):y("",!0)])],64)}}});const Ht=ue(Lt,[["__scopeId","data-v-c7d6ccde"]]);export{Ht as default};
