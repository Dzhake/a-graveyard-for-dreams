'use strict';function h(a,b){let c=a.length();if(1E-4>c)a.x=b?1:0,a.y=0;else return a.x/=c,a.y/=c,a.clone()}function p(a){a.x=0;a.y=0}class r{constructor(a,b){this.x=void 0==a?0:a;this.y=void 0==b?0:b}length(){return Math.hypot(this.x,this.y)}clone(){return new r(this.x,this.y)}};function u(a,b){b|=0;return((a|0)%b+b)%b}function w(a,b,c){return Math.max(b,Math.min(a,c))}function x(a,b){for(let c of a)if(!c.i)return c;a.push(new b.prototype.constructor);return a[a.length-1]}function ca(a,b,c){return a<b?Math.min(b,a+c):Math.max(b,a-c)}function da(a,b,c,d,e,f,g){null==b&&(b=new r(0,0));let m=a.x+b.x-c.x/2;a=a.y+b.y-c.y/2;return m+c.x>=d&&m<d+f&&a+c.y>=e&&a<e+g};function ea(a,b,c){let d=document.createElement("div");d.setAttribute("style","position: absolute; top: 0; left: 0; z-index: -1;");a.c=document.createElement("canvas");a.c.width=b;a.c.height=c;a.c.setAttribute("style","position: absolute; top: 0; left: 0; z-index: -1;image-rendering: optimizeSpeed;image-rendering: pixelated;image-rendering: -moz-crisp-edges;");d.appendChild(a.c);document.body.appendChild(d);a.P=a.c.getContext("2d");a.P.imageSmoothingEnabled=!1;fa(a)}
function fa(a){var b=window.innerWidth,c=window.innerHeight;a=a.c;var d=Math.min(b/a.width|0,c/a.height|0);let e=a.width*d;d*=a.height;c=String(c/2-d/2|0)+"px";b=String(b/2-e/2|0)+"px";a.style.width=String(e|0)+"px";a.style.height=String(d|0)+"px";a.style.top=c;a.style.left=b}function y(a,b,c,d,e){b=void 0==b?255:b;c=void 0==c?b:c;b="rgba("+String(b|0)+","+String(c|0)+","+String((void 0==d?c:d)|0)+","+String(void 0!=e?e:1);a.P.fillStyle=b;a.P.strokeStyle=b}
function A(a,b,c,d,e,f,g,m,k,l,q){if(!(null==b||0>=e||0>=f)){var n=a.P;g+=a.b.x;m+=a.b.y;c|=0;d|=0;e|=0;f|=0;g|=0;m|=0;k|=0;l|=0;q|=0;0!=q&&n.save();0!=(q&1)&&(n.translate(k,0),n.scale(-1,1),g*=-1);0!=(q&2)&&(n.translate(0,l),n.scale(1,-1),m*=-1);n.drawImage(b,c,d,e,f,g,m,k,l);0!=q&&n.restore()}}function D(a,b,c,d,e,f,g,m){let k=b.width/16|0,l=d;m&&(l=d-=c.length*(k+f)/2);for(let q=0;q<c.length;++q)m=c.charCodeAt(q),10==m?(l=d,e+=k+g):(A(a,b,m%16*k,(m/16|0)*k,k,k,l,e,k,k,!1),l+=k+f)}
class ha{constructor(a,b,c){this.P=this.c=null;ea(this,a,b);this.width=a;this.height=b;window.addEventListener("resize",()=>fa(this));this.b=new r(0,0);this.H=null==c?{}:c}clear(a,b,c){this.P.fillStyle="rgba("+String(a|0)+","+String(b|0)+","+String(c|0)+",1";this.P.fillRect(0,0,this.width,this.height)}fillRect(a,b,c,d){a+=this.b.x;b+=this.b.y;this.P.fillRect(a|0,b|0,c|0,d|0)}moveTo(a,b){this.b=new r(a,b)}move(a,b){this.b.x+=a;this.b.y+=b}};function la(a,b){if(null==b)for(b=0;b<a.buttons.length;++b)a.buttons[b]=E;else for(let c=0;c<b.buttons.length;++c){if(c>=a.buttons.length)for(let d=0;d<c-a.buttons.length;++d)a.buttons.push(E);a.buttons[c]=b.buttons[c].pressed?a.buttons[c]==E||a.buttons[c]==I?K:L:a.buttons[c]==L||a.buttons[c]==K?I:E}}
function ma(a,b){null!=b&&(a.o.x=0,a.o.y=0,.05<Math.hypot(b.axes[0],b.axes[1])&&(a.o.x=b.axes[0],a.o.y=b.axes[1]),8<=b.axes.length&&.1>Math.hypot(a.o.x,a.o.y)&&.05<Math.hypot(b.axes[6],b.axes[7])&&(a.o.x=b.axes[6],a.o.y=b.axes[7]))}function na(a,b){return null==b||0>b||b>=a.buttons.length?E:a.buttons[b]}
class oa{constructor(){this.o=new r(0,0);this.buttons=[];this.b=null;this.index=0;window.addEventListener("gamepadconnected",a=>{console.log("Gamepad with index "+String(a.gamepad.index)+" connected.");let b=navigator.getGamepads()[a.gamepad.index];this.index=a.gamepad.index;a=this.b=b;ma(this,a);la(this,a)})}update(){this.o.x=0;this.o.y=0;if(null!=this.b){var a=navigator;a=null==a?null:a.getGamepads?a.getGamepads():a.webkitGetGamepads?a.webkitGetGamepads:null;null!=a&&(this.b=a[this.index])}a=this.b;
ma(this,a);la(this,a)}};var E=0,I=2,L=1,K=3;function M(a,b,c,d,e){a.actions[b]={state:E,key:c,ja:d,Ba:e};a.j[c]=!0;return a}
function pa(a){a.c.update();for(let b in a.actions)a.actions[b].state=a.b[a.actions[b].key]|E,a.actions[b].state==E&&(null!=a.actions[b].ja&&(a.actions[b].state=na(a.c,a.actions[b].ja)),a.actions[b].state==E&&null!=a.actions[b].Ba&&(a.actions[b].state=na(a.c,a.actions[b].Ba)));a.g=a.o.clone();p(a.o);.1<a.c.o.length()&&(a.o=a.c.o.clone());a.actions.right.state&1?a.o.x=1:a.actions.left.state&1&&(a.o.x=-1);a.actions.down.state&1?a.o.y=1:a.actions.up.state&1&&(a.o.y=-1);a.m=new r(a.o.x-a.g.x,a.o.y-a.g.y)}
function qa(a){return 0>a.o.y&&-.25<=a.g.y&&-.25>a.m.y}function ra(a){return 0<a.o.y&&.25>=a.g.y&&.25<a.m.y}
class sa{constructor(){this.b={};this.j={};this.actions={};this.c=new oa;this.o=new r(0,0);this.g=new r(0,0);this.m=new r(0,0);window.addEventListener("keydown",a=>{var b=a.code;this.b[b]!=L&&(this.b[b]=K);this.j[b]&&a.preventDefault()});window.addEventListener("keyup",a=>{var b=a.code;this.b[b]!=E&&(this.b[b]=I);this.j[b]&&a.preventDefault()});window.addEventListener("contextmenu",a=>{a.preventDefault()});window.addEventListener("mousemove",()=>{window.focus()});window.addEventListener("mousedown",
()=>{window.focus()})}xa(){var a=this.b;for(let b in a)a[b]==K?a[b]=L:a[b]==I&&(a[b]=E)}};class ta{constructor(){}refresh(){}La(){}Oa(){}};function ua(a,b,c,d){return a.da[b][u(d,a.height)*a.width+u(c,a.width)]}function va(a,b,c,d,e){c=u(c,a.width);d=u(d,a.height);a.da[b][d*a.width+c]=e}
class wa{constructor(a){a=(new DOMParser).parseFromString(a,"text/xml").getElementsByTagName("map")[0];this.width=String(a.getAttribute("width"));this.height=String(a.getAttribute("height"));let b=a.getElementsByTagName("layer");this.da=[];let c=9999;for(var d of b)d.id<c&&(c=d.id);for(let f=0;f<b.length;++f){d=b[f].id-c;var e=b[f].getElementsByTagName("data")[0].childNodes[0].nodeValue.replace(/(\r\n|\n|\r)/gm,"");e=e.split(",");this.da[d]=[];for(let g=0;g<e.length;++g)this.da[d][g]=parseInt(e[g])}this.b=
{};a=a.getElementsByTagName("properties")[0];if(void 0!=a)for(let f of a.getElementsByTagName("property"))void 0!=f.getAttribute("name")&&(this.b[f.getAttribute("name")]=f.getAttribute("value"))}};class xa{constructor(a,b){this.data=b;this.b=null;this.gain=a.createGain();this.j=this.c=this.g=0;this.loop=!1}play(a,b,c,d){null!=this.b&&(this.b.disconnect(),this.b=null);let e=a.createBufferSource();e.buffer=this.data;e.loop=!!c;b=w(b,0,1);this.gain.gain.value=b;this.g=a.currentTime-d;this.c=0;this.j=b;this.loop=c;e.connect(this.gain).connect(a.destination);e.start(0,d);this.b=e}stop(){this.b.disconnect();this.b.stop(0);this.b=null}pause(a){null!=this.b&&(this.c=a.currentTime-this.g,this.stop())}resume(a){this.play(a,
this.j,this.loop,this.c)}};function ya(a,b){za(a,b,"json",c=>{c=JSON.parse(c);for(let d in c.bitmaps)Aa(a,c.bitmaps[d].name,c.bitmapPath+c.bitmaps[d].path);for(let d in c.tilemaps)Ba(a,c.tilemaps[d].name,c.tilemapPath+c.tilemaps[d].path);for(let d in c.samples)Ca(a,c.samples[d].name,c.samplePath+c.samples[d].path)})}
function za(a,b,c,d){let e=new XMLHttpRequest;e.overrideMimeType("text/"+c);e.open("GET",b,!0);++a.total;e.onreadystatechange=()=>{4==e.readyState&&("200"==String(e.status)&&void 0!=d&&d(e.responseText),++a.loaded)};e.send(null)}function Aa(a,b,c){++a.total;let d=new Image;d.onload=()=>{++a.loaded;a.H[b]=d};d.src=c}function Ba(a,b,c){++a.total;za(a,c,"xml",d=>{a.Ma[b]=new wa(d);++a.loaded})}
function Ca(a,b,c){++a.total;let d=new XMLHttpRequest;d.open("GET",c,!0);d.responseType="arraybuffer";d.onload=()=>{a.b.P.decodeAudioData(d.response,e=>{++a.loaded;a.G[b]=new xa(a.b.P,e)})};d.send(null)}function Da(a){return 0==a.total||a.loaded>=a.total}class Ea{constructor(a){this.H={};this.Ma={};this.G={};this.loaded=this.total=0;this.b=a}load(a){ya(this,a)}};function N(a,b,c){a.c&&b.play(a.P,a.Pa*c,!1,0)}class Fa{constructor(){this.P=new AudioContext;this.b=null;this.Pa=1;this.c=!1}toggle(a){this.c=a}};function Ga(a,b){var c=b.width/4;let d=c/8;b.clear(0,0,0);a=a.u;var e=0==a.total?0:a.loaded/a.total;a=b.width/2-c/2;let f=b.height/2-d/2;a|=0;f|=0;y(b,255,255,255);b.fillRect(a-2,f-2,c+4,d+4);y(b,0);b.fillRect(a-1,f-1,c+2,d+2);c=c*e|0;y(b,255);b.fillRect(a,f,c,d)}
class Ha{constructor(a,b,c){this.c=this.K=0;this.audio=new Fa;this.u=new Ea(this.audio);this.A=new ha(a,b,this.u.H);this.b={step:c+1,u:this.u,audio:this.audio,input:M(M(M(M(new sa,"left","ArrowLeft",14,null),"up","ArrowUp",12,null),"right","ArrowRight",15,null),"down","ArrowDown",13,null),Da:d=>this.Da(d)};this.g=new ta(this.b,null);this.m=!1;this.j=this.g}loop(a){const b=16.66667*this.b.step;this.c+=a-this.K;this.c=Math.min(5*b,this.c);this.K=a;a=this.c/b|0;let c=!0,d=Da(this.u);d&&!this.m&&(this.g=
new this.j.prototype.constructor(this.b,null),this.j=null,this.m=!0);for(;0<a--;)c&&pa(this.b.input),d&&this.g.refresh(this.b),c&&(this.b.input.xa(),c=!1),this.c-=b;Da(this.u)?this.g.La(this.A):Ga(this,this.A);window.requestAnimationFrame(e=>this.loop(e))}Da(a){this.g=new a.prototype.constructor(this.b,this.g.Oa())}};function O(a,b,c,d,e,f){b|=0;c|=0;d|=0;e|=0;if(c==d)a.g=0,a.c=c,a.b=b;else{a.b!=b&&(a.g=0,a.c=d>c?c:d,a.b=b);if(c<d&&a.c<c||c>d&&a.c>c)a.c=c;a.g+=f;a.g>e&&(c<d?++a.c>d&&(a.c=c):--a.c<d&&(a.c=c),a.g-=e)}}function P(a,b,c){a.c=b;a.b=c;a.g=0}class Q{constructor(a,b){this.width=a;this.height=b;this.g=this.b=this.c=0}v(a,b,c,d,e){var f=this.width,g=this.height;A(a,b,this.width*this.c,this.height*this.b,f,g,c,d,f,g,e)}};class Ia{constructor(a,b){this.text=a;this.Na=b}}
class Ja{constructor(a,b,c){this.buttons=[];for(let d of c)this.buttons.push(d);this.width=8*(Math.max(...this.buttons.map(d=>d.text.length))+1);this.height=this.buttons.length*a;this.b=0;this.active=!!b;this.c=a}update(a){if(this.active){var b=this.b;qa(a.input)?--this.b:ra(a.input)&&++this.b;this.b=u(this.b,this.buttons.length);this.b!=b&&N(a.audio,a.u.G.next,.6);b=this.buttons[this.b];if(a.input.actions.start.state==K||a.input.actions.fire1.state==K)null!=b.Na&&b.Na(a),N(a.audio,a.u.G.accept,.6)}}v(a,
b,c){if(this.active){b-=this.width/2;c-=this.height/2;for(let e=0;e<this.buttons.length;++e){var d=this.b==e?"@":" ";d+=this.buttons[e].text;D(a,a.H.font,d,b,c+e*this.c,0,0,!1)}}}};function R(a,b,c,d,e){return da(a.a,a.s,a.B,b,c,d,e)}function Ka(a,b){return R(a,b.a.x-b.B.x/2,b.a.y-b.B.y/2,b.B.x,b.B.y)}function T(a){p(a.speed);p(a.target)}
class La{constructor(a,b){this.a=new r(a,b);this.va=this.a.clone();this.speed=new r(0,0);this.target=this.speed.clone();this.b=new r(1,1);this.s=new r(0,0);this.B=new r(0,0);this.i=!0;this.C=this.M=!1;this.f=new Q(0,0)}Ha(){}ra(){}xa(){}Ga(){return!0}update(a){this.i&&(this.C?this.M?this.Ga(a)&&(this.M=this.i=!1):(this.va=this.a.clone(),this.ra(a),this.speed.x=ca(this.speed.x,this.target.x,this.b.x*a.step),this.speed.y=ca(this.speed.y,this.target.y,this.b.y*a.step),this.a.x+=this.speed.x*a.step,this.a.y+=
this.speed.y*a.step,this.xa()):this.Ha())}v(){}};function Ma(a,b,c,d){if(!(!a.C||a.ka||!a.i||a.M||0>a.speed.y)){var e=a.a.x+a.s.x-a.D.x/2;e+a.D.x<=b+1||e>=b+16-1||(b=a.s.y+a.D.y/2,e=a.va.y+b,a.a.y+b>=c-1*d.step&&e<=c+(2+a.speed.y)*d.step&&(a.a.y=c-b,a.qa(),a.speed.y*=-a.sa))}}
function U(a,b,c,d,e,f){if(!(!a.C||a.ka||!a.i||a.M||0>a.speed.x*e)){var g=a.a.y+a.s.y-a.D.y/2;!(g+a.D.y<=c+1||g>=c+d-1)&&(c=a.s.x+a.D.x/2*e,d=a.va.x+c,g=a.a.x+c,0<e&&g>=b-1*f.step&&d<=b+(2+a.speed.x)*f.step||0>e&&g<=b+1*f.step&&d>=b-(2-a.speed.x)*f.step)&&(a.a.x=b-c,a.ca(e,f),a.speed.x*=-a.pa)}}class V extends La{constructor(a,b){super(a,b);this.D=this.B.clone();this.ka=!1;this.sa=this.pa=0}qa(){}ca(){}Ca(){}};class Na extends V{constructor(){super(0,0);this.i=!1;this.f=new Q(8,8);this.b=new r(.015,.1);this.sa=this.pa=.75;this.D=new r(4,4);this.s=new r(0,7);this.c=!0}V(a,b,c,d,e){this.a=new r(a,b);this.speed.x=c;this.speed.y=d;this.target.x=0;this.target.y=4;this.i=!0;P(this.f,4*Math.random()|0,e);this.c=!0}Ha(){this.i=!1}v(a){this.i&&this.C&&this.f.v(a,a.H.chips,this.a.x-4,this.a.y+3,0)}qa(){!this.c&&.1>this.speed.y&&(this.i=!1);this.c=!1}};const Oa=[1,4,8,2,9,6,3,5,12,10,7,13,14,11,15];class Pa{constructor(){this.a=new r(0,0);this.b=this.g=this.speed=this.c=0;this.i=!1}V(a,b,c,d,e){this.c=0;this.speed=d;this.g=c;this.b=e;this.a=new r(a,b);this.i=!0}update(a,b){this.i&&16<=(this.c+=this.speed*b.step)&&(va(a.W,this.g,this.a.x,this.a.y+1,this.b+1),this.i=!1)}v(a){this.i&&A(a,a.H.tileset,this.b%16*16,16*(this.b/16|0),16,16,16*this.a.x,16*this.a.y+this.c|0,16,16,0)}}
function X(a,b,c,d){if(b.i&&b.C&&!b.M){var e=b.a.x/16|0,f=b.a.y/16|0,g=e-2,m=f-2;e+=4;f+=4;for(let F=0;F<a.W.da.length-1;++F)for(let G=m;G<=f;++G)for(let W=g;W<=e;++W){var k=ua(a.W,F,W,G);if(0!=k){var l=a.m.da[0][k-1];if(null!=l)if(0<l&&l<=Oa.length)Qa(b,l-1,W,G,d);else{var q=a,n=b,v=l-1,aa=k-1;k=W;l=G;var S=F,ba=c,t=d,J=[2,0,2,8],B=[8,2,0,2],C=[12,8,12,8],H=[8,12,8,12];switch(v){case 15:void 0!=n.oa&&n.oa(16*k,16*l,16,16,t);break;case 16:case 17:case 18:case 19:void 0!=n.Ka&&n.Ka(16*k+J[v-16],16*
l+B[v-16],C[v-16],H[v-16],2,t);break;case 20:case 21:case 22:if(void 0!=n.Ia&&n.Ia(16*k+2,16*l,12,16,t)-1>=v-20){va(q.W,S,k,l,0);{let ia,ja;J=q;B=16*k+8;C=16*l+8;H=v-20;var z=Math.random()*Math.PI;let Ya=2*Math.PI/6;for(let ka=0;6>ka;++ka)ja=z+Ya*ka,ia=1.5*Math.random()+1,x(J.c,Na).V(B,C,Math.cos(ja)*ia,Math.sin(ja)*ia*1.75,H);N(t.audio,t.u.G["break"],.5)}20==v&&(ua(q.W,S,k,l-1)==aa+1&&(va(q.W,S,k,l-1,0),v=k,J=l-1,x(q.j,Pa).V(v,J,S,1,aa)),Ra(ba,16*k+8,16*l+8,n.a));break}Qa(n,14,k,l,t);break;case 27:void 0!=
n.oa&&n.oa(16*k+8,16*l,16,16,t);break;case 29:void 0!=n.ya&&n.ya(16*k,16*l+8,16,8,t);break;case 30:void 0!=n.ya&&n.ya(16*k,16*l,16,16,t);break;case 31:Ma(n,16*k,16*(l+1),t),void 0!=n.oa&&n.oa(16*k,16*l+8,16,8,t,4)}}}}}}
function Qa(a,b,c,d,e){b=Oa[b|0];1==(b&1)&&Ma(a,16*c,16*d,e);if(8==(b&8)){var f=16*c,g=16*(d+1);if(!(!a.C||a.ka||!a.i||a.M||0<a.speed.y)){var m=a.a.x+a.s.x-a.D.x/2;m+a.D.x<=f+1||m>=f+16-1||(f=a.s.y-a.D.y/2,m=a.va.y+f,a.a.y+f<=g+1*e.step&&m>=g-(2-a.speed.y)*e.step&&(a.a.y=g-f,a.Ca(),a.speed.y*=-a.sa))}}4==(b&4)&&U(a,16*(c+1),16*d,16,-1,e);2==(b&2)&&U(a,16*c,16*d,16,1,e)}
class Sa{constructor(a){this.W=a.Ma.base;this.m=a.Ma.collisions;this.width=this.W.width;this.height=this.W.height;this.b=this.g=0;this.c=[];this.j=[]}update(a,b){this.g=(this.g+.5*b.step)%96;this.b=(this.b+.125*b.step)%16;for(let c of this.c)c.C=Y(a,c),c.update(b),X(this,c,null,b);for(let c of this.j)c.update(this,b)}v(a,b){let c=(10*b.F.x|0)-1;b=(9*b.F.y|0)-1;let d=(a.width/16|0)+2,e=(a.height/16|0)+2;for(let t=0;t<this.W.da.length-1;++t){{var f=void 0,g=void 0,m=void 0,k=a,l=a.H.tileset,q=t,n=c,
v=b,aa=d,S=e;const J=[133];for(let B=v;B<v+S;++B)for(let C=n;C<n+aa;++C)if(m=ua(this.W,q,C,B),0!=m--)if(J.includes(m)){{let H,z;g=k;f=l;var ba=C;let F=m%16|0,G=m/16|0;switch(m){case 133:H=16*B+(1+Math.round(Math.sin(this.b/16*Math.PI*2))),z=this.b|0,z%2!=H%2&&++F,m=16-z,A(g,f,16*F+z,16*G,m,16,16*ba,H,m,16,0),0<z&&A(g,f,16*F,16*G,z,16,16*(ba+1)-z,H,z,16,0)}}}else g=m%16|0,f=m/16|0,A(k,l,16*g,16*f,16,16,16*C,16*B,16,16,0)}}for(let t of this.j)t.v(a);for(let t of this.c)t.v(a)}};function Ta(a,b){a.M=!0;T(a);N(b.audio,b.u.G.hit2,.5)}
class Ua extends V{constructor(){super(0,0);this.i=!1;this.f=new Q(16,16);this.D=new r(2,2);this.B=new r(6,6);this.c=1}V(a,b,c,d,e){this.a=new r(a,b);this.speed=new r(c,d);this.target=this.speed.clone();this.c=1;P(this.f,0,e+1);this.i=!0}Ga(a){O(this.f,0,0,4,4,a.step);return 4==this.f.c}Ha(){this.i=!1}v(a){this.i&&this.C&&this.f.v(a,a.H.bullets,this.a.x-8,this.a.y-8,0)}qa(){Ta(this,void 0)}Ca(){Ta(this,void 0)}ca(a,b){Ta(this,b)}wa(a,b){!this.i||!this.C||this.M||0<a.J||!Ka(a,this)||(a.dir=a.a.x<this.a.x?
1:-1,a.ua(this.c,b))}};class Va extends V{constructor(){super(0,0);this.i=!1;this.f=new Q(16,16);this.b=new r(.01,.05);this.sa=this.pa=.75;this.D=new r(4,8);this.B=new r(8,8);this.s.y=-1;this.id=0;this.c=!1;this.g=!0}V(a,b,c,d,e){this.a=new r(a,b);this.speed.x=c;this.speed.y=d;this.target.x=0;this.i=!0;this.id=e;P(this.f,0,e);this.c=!1;this.g=!0}ra(a){this.b.x=.01;this.b.y=.05;this.target.y=2;this.c&&(this.g&&(this.speed.x/=2,this.speed.y/=2,this.g=!1),this.b.x/=2,this.b.y/=2,this.target.y/=2);this.c=!1;O(this.f,this.f.b,
0,3,6,a.step)}v(a){this.i&&this.C&&this.f.v(a,a.H.collectibles,this.a.x-8,this.a.y-8,0)}ta(a,b){this.C=Y(a,this);this.C?a.Qa||(U(this,a.F.x*a.width,a.F.y*a.height,a.height,-1,b),U(this,(a.F.x+1)*a.width,a.F.y*a.height,a.height,1,b)):this.i=!1}wa(a,b,c){if(this.i&&Ka(a,this)){if(0==this.id){var d=a.progress;d.g+=1}else d=a.progress,d.b=Math.min(d.c,d.b+2);this.i=!1;N(c.audio,c.u.G[["coin","heal"][this.id]],.6);c=a.a.x;a=a.a.y+a.s.y-a.f.height/2;d="+"+String.fromCharCode(64+w(1,0,9))+String.fromCharCode(33+
this.id);x(b.Ea,Wa).V(c,a,1,16,30,d)}}ya(a,b,c,d){return R(this,a,b,c,d)?this.c=!0:!1}};function Xa(a,b){a.fa=b}
class Z extends V{constructor(a,b,c,d,e){super(a,b);this.ba=this.a.clone();this.f=new Q(16,16);P(this.f,0,c+1);this.Y=this.za=d;this.Ra=e;this.J=0;this.na=this.ia=-1;this.dir=1;this.c=0;this.g=!1;this.b=new r(.1,.1);this.m=1;this.B=new r(8,8);this.D=new r(8,8);this.K=new r(0,0);this.S=!1;this.fa=()=>{}}U(){}A(){}j(){}O(){}Ga(a){O(this.f,0,0,4,6,a.step);return 4<=this.f.c}ra(a){this.S||(this.A(a),this.j(a),0<this.J&&(this.J-=a.step))}xa(){this.g=!1}ua(a,b,c,d,e){this.Y-=b;this.speed.x=this.m*a;this.J=
30+this.J%2;0>=this.Y&&(this.J=0,this.M=!0,this.c=0,P(this.f,0,0),Ra(c,this.a.x,this.a.y+this.s.y,d.a));N(e.audio,e.u.G[this.M?"kill":"hit"],.6);a=this.a.x;d=this.a.y+this.s.y-this.f.height/2;x(c.Ea,Wa).V(a,d,1,16,30,"-"+String(b))}wa(a,b,c){if(this.i&&!this.M&&this.C&&!this.S)if(this.O(a),a.Ka(this.a.x+this.s.x-this.B.x/2,this.a.y+this.s.y-this.B.y/2,this.B.x,this.B.y,this.Ra,c),Za(a)&&a.Aa>this.ia&&da(this.a,this.s,this.B,a.X.x-a.ea.x/2,a.X.y-a.ea.y/2,a.ea.x,a.ea.y)){var d=2;a.R?++d:a.aa&&(d+=2);
this.ua(a.R?0:2*a.dir*(a.aa?1.5:1),d,b,a,c);this.ia=a.Aa;!this.M&&a.aa&&0<a.L&&(a.speed.x=0,a.target.x=0);a.R&&(a.R=!1,a.T=8,a.$=!1)}else a.I.i&&a.I.Ja>this.na&&Ka(this,a.I)&&(this.ua(2*(this.a.x<a.I.a.x?-1:1),1,b,a.I,c),b=a.I,b.c&&!0,T(b),b.j=0,b.c=!0,this.na=a.I.Ja)}v(a){this.S||!this.i||!this.C||0<this.J&&0==Math.floor(this.J/2)%2||this.f.v(a,a.H.enemies,this.a.x+this.K.x-this.f.width/2|0,this.a.y+this.K.y-this.f.height/2|0,this.c)}qa(){this.g=!0}ta(a,b){if(this.i){var c=this.C;this.C=Y(a,this);
if(!this.C){if(this.M){this.i=!1;return}if(this.S){this.ka=this.S=!1;this.U(this.ba.x);return}}!this.M&&this.C!=c&&c&&(this.a=this.ba.clone(),T(this),this.Y=this.za,this.J=0,a.Qa||(this.ka=this.S=!0));!a.Qa&&this.C&&(U(this,a.F.x*a.width,a.F.y*a.height,a.height,-1,b),U(this,(a.F.x+1)*a.width,a.F.y*a.height,a.height,1,b))}}ga(){}};function $a(a){const b=[ab,bb,cb,db,eb,fb,gb,hb,ib,jb];return b[w(a,0,b.length-1)|0]}
class ab extends Z{constructor(a,b){super(a,b,0,3,2);this.b.x=.025;this.h=!0;this.s.y=2;this.D=new r(4,12);this.K.y=1;this.m=.5}U(a){this.dir=2-(a/16|0)%2;this.c=0<this.dir?1:0;this.target.x=.25;this.speed.x=this.target.x;this.target.y=2}A(a){this.h&&!this.g&&0>=this.J&&(this.dir*=-1,this.speed.x*=-1,this.target.x*=-1,this.a.x+=this.speed.x*a.step);this.h=this.g}j(a){this.c=0<this.dir?1:0;this.g&&O(this.f,this.f.b,0,3,6,a.step)}ca(){this.speed.x*=-1;this.target.x*=-1;this.dir*=-1}ga(a){if(0<this.speed.x&&
a.a.x>this.a.x||0>this.speed.x&&a.a.x<this.a.x)this.target.x*=-1,this.speed.x*=-1,this.dir*=-1}}class bb extends Z{constructor(a,b){super(a,b,1,2,1);this.s.y=2;this.D=new r(4,12);this.K.y=1;this.b.y=.05;this.m=.5;this.h=0}U(a){this.target.y=2;this.h=60-(a/16|0)%2*30}A(a){this.g&&0>=(this.h-=a.step)&&(this.h+=60,this.speed.y=-1.75,N(a.audio,a.u.G.jump2,.5))}j(){this.c=0<this.dir?1:0;let a=0;.5<Math.abs(this.speed.y)&&(a=0>this.speed.y?1:2);P(this.f,a,this.f.b)}O(a){this.dir=a.a.x>this.a.x?1:-1}}
class db extends Z{constructor(a,b){super(a,b,3,2,1);this.b.x=.1;this.h=!0;this.s.y=4;this.D=new r(4,8);this.B=new r(8,6);this.K.y=1;this.m=.5;this.l=!1}U(a){this.dir=2-(a/16|0)%2;this.c=0<this.dir?1:0;this.target.y=2}A(a){this.target.x=0;0!=this.f.c%2&&(this.target.x=.6*this.dir);!this.l&&this.h&&!this.g&&0>=this.J&&(this.dir*=-1,this.speed.x*=-1,this.target.x*=-1,this.a.x+=this.speed.x*a.step);this.h=this.g}j(a){this.c=0<this.dir?1:0;this.g?O(this.f,this.f.b,0,3,0==this.f.c%2?30:6,a.step):P(this.f,
2,this.f.b)}ca(a){this.dir=-a}ga(a){if(0<this.speed.x&&a.a.x>this.a.x||0>this.speed.x&&a.a.x<this.a.x)this.dir*=-1,this.speed.x*=-1}O(a){this.l=a.a.y>this.a.y+16&&0>(this.a.x-a.a.x)*this.dir}}
class cb extends Z{constructor(a,b){super(a,b,2,3,2);this.s.y=2;this.D=new r(4,10);this.K.y=0;this.b.x=.05;this.b.y=.1;this.m=.5;this.l=60+(a/16|0)%2*30;this.h=1-(a/16|0)%2*2;this.pa=-1}U(){this.target.y=4}A(a){this.g?(this.target.x=0,0>=(this.l-=a.step)&&(this.l+=60,this.speed.y=-2.5,this.target.x=.5*this.h,this.speed.x=this.target.x,this.dir=this.h,N(a.audio,a.u.G.jump2,.5))):this.dir=0<=this.speed.x?1:-1}j(){this.c=0<this.dir?1:0;let a=0;.5<Math.abs(this.speed.y)&&(a=0>this.speed.y?1:2);P(this.f,
a,this.f.b)}O(a){this.h=a.a.x>this.a.x?1:-1;if(Za(a)||a.I.i&&!a.I.c)this.h*=-1}ca(a){this.dir=-a}ga(a){if(0<this.speed.x&&a.a.x>this.a.x||0>this.speed.x&&a.a.x<this.a.x)this.speed.x*=-1,this.dir*=-1}}
class eb extends Z{constructor(a,b){super(a,b,4,3,2);this.b.x=.05;this.s.y=2;this.D=new r(4,12);this.K.y=1;this.m=.5;this.h=60;this.l=!0;this.Z=0;this.N=1;this.ha=0}U(a){this.dir=2-(a/16|0)%2;this.c=0<this.dir?1:0;this.target.y=3;this.h=60;this.l=!0}A(a){let b=this.N;0>=(this.h-=a.step)&&(this.h+=60,this.l&&(this.N+=this.Z,this.Z=b,20<=++this.ha&&(this.ha=0,this.N=1,this.Z=0),this.dir=1-this.N%2*2,this.h+=(this.a.x|0)%60),this.l=!this.l);this.target.x=this.l?0:.5*this.dir}j(a){this.c=0<this.dir?1:
0;this.g?this.l?P(this.f,0,this.f.b):O(this.f,this.f.b,0,3,8,a.step):P(this.f,4,this.f.b)}ca(){this.l||(this.dir*=-1)}ga(a){if(0<this.speed.x&&a.a.x>this.a.x||0>this.speed.x&&a.a.x<this.a.x)this.dir*=-1,this.speed.x*=-1}}
class fb extends Z{constructor(a,b){super(a,b,5,2,1);this.b.x=.015;this.b.y=.015;this.D=new r(4,4);this.m=.5;this.l=30;this.h=!0;this.N=new r(0,0);this.sa=this.pa=1}U(){}A(a){0>=(this.l-=a.step)&&(this.l+=this.h?60:30,this.h?(this.speed.x=.5*this.N.x,this.speed.y=.5*this.N.y):p(this.target),this.h=!this.h);this.h||(this.target=this.speed.clone())}j(a){O(this.f,this.f.b,0,3,this.h?5:3,a.step)}O(a){this.h&&(this.N=h(new r(a.a.x-this.a.x,a.a.y-this.a.y),!0))}ga(a){this.h||(a=h(new r(this.a.x-a.a.x,this.a.y-
a.a.y)),this.speed.x=.5*a.x)}}
class gb extends Z{constructor(a,b){super(a,b,6,3,2);this.b.x=.033;this.b.y=.033;this.D=new r(6,6);this.m=.5;this.l=new r(0,0);this.active=!1;this.h=0}U(){this.a.y-=4;this.active=!1;this.h=0}A(a){this.active&&(0<this.h?this.h-=a.step:(this.target.x=.33*this.l.x,this.target.y=.33*this.l.y))}j(a){this.active?0<this.h?P(this.f,1,this.f.b):O(this.f,this.f.b,1,4,6,a.step):P(this.f,0,this.f.b);this.c=0<this.h?2:0}O(a){if(this.active)this.l=h(new r(a.a.x-this.a.x,a.a.y-this.a.y),!0);else if(this.active=
0<this.J||a.a.y>this.a.y&&48>Math.abs(a.a.x-this.a.x))this.h=30,this.target.y=1}}
class hb extends Z{constructor(a,b){super(a,b,7,3,2);this.b.x=.025;this.D=new r(8,8);this.B=new r(10,8);this.m=.5;this.h=0}U(a){this.dir=2-(a/16|0)%2;this.c=0<this.dir?1:0;this.target.x=.25;this.speed.x=this.target.x;this.h=(this.a.x+this.a.y)%(2*Math.PI)}A(a){this.h=(this.h+.1*a.step)%(2*Math.PI);this.a.y=this.ba.y+Math.round(2*Math.sin(this.h))}j(){this.c=0<this.dir?1:0;let a=1,b=Math.sin(this.h);-.5>b?a=0:.5<b&&(a=2);P(this.f,a,this.f.b)}ca(){this.speed.x*=-1;this.target.x*=-1;this.dir*=-1}ga(a){if(0<
this.speed.x&&a.a.x>this.a.x||0>this.speed.x&&a.a.x<this.a.x)this.dir*=-1,this.speed.x*=-1,this.target.x*=-1}}function kb(a,b){a.speed.y=-1;N(b.audio,b.u.G.jump2,.5)}
class ib extends Z{constructor(a,b){super(a,b,8,2,1);this.s.y=2;this.D=new r(4,12);this.K.y=1;this.b.y=.025;this.m=.5;this.h=0}U(a){this.target.y=2;this.h=60-(a/16|0)%2*30}A(a){const b=this.target.y/3;this.g?0>=(this.h-=a.step)&&kb(this,a):0>=this.h&&this.speed.y>=b&&kb(this,a)}j(){this.c=0<this.dir?1:0;let a=0;.25<Math.abs(this.speed.y)&&(a=0>this.speed.y?1:2);P(this.f,a,this.f.b)}Ca(){this.h=60}}
class jb extends Z{constructor(a,b){super(a,b,9,3,1);this.s.y=2;this.D=new r(4,12);this.K.y=1;this.m=.5;this.h=!1;this.l=60-(a/16|0)%2*30}U(){this.target.y=2}A(a){!this.h&&0>=(this.l-=a.step)&&(P(this.f,1,this.f.b),this.h=!0,this.l=60,this.fa(this.a.x+4*this.dir,this.a.y,2*this.dir,0,0),N(a.audio,a.u.G.snowball,.5))}j(a){this.c=0<this.dir?1:0;this.h?(O(this.f,this.f.b,1,3,1==this.f.c?6:30,a.step),3==this.f.c&&(P(this.f,0,this.f.b),this.h=!1)):P(this.f,0,this.f.b)}O(a){this.dir=a.a.x>this.a.x?1:-1}}
;class Wa{constructor(){this.a=new r(0,0);this.speed=0;this.text="";this.c=this.b=0;this.i=!1}V(a,b,c,d,e,f){this.a=new r(a,b);this.speed=c;this.b=d;this.c=e;this.text=f;this.i=!0}update(a){this.i&&(0<this.b?(this.b-=a.step,this.a.y-=this.speed):0>=(this.c-=a.step)&&(this.i=!1))}v(a){this.i&&D(a,a.H.spcfont,this.text,this.a.x|0,this.a.y-5|0,-3,0,!0)}};class lb extends V{constructor(){super(0,0);this.f=new Q(16,16);this.c=!1;this.j=0;this.m=null;this.A=0;this.b=new r(.1,.1);this.D=new r(4,4);this.B=new r(10,10);this.g=this.C=this.i=!1;this.Ja=0}V(a,b,c,d,e,f){this.a=new r(a,b);this.speed=new r(c,d);this.target=this.speed.clone();this.c=!1;this.j=e;this.m=f;this.A=this.speed.length();this.C=this.i=!0;this.g=this.ka=this.M=!1;++this.Ja}ra(a){let b=new r(this.a.x-this.m.a.x,this.a.y-this.m.a.y),c=b.length();h(b,!1);this.c?(this.target.x=-b.x*this.A,
this.target.y=-b.y*this.A,this.g||(this.g=Math.sign(this.target.x)==Math.sign(this.speed.x)&&Math.sign(this.target.y)==Math.sign(this.speed.y)),12>c&&(this.i=!1)):0>=(this.j-=a.step)&&(this.c=!0);O(this.f,5,1,4,4,a.step);this.ka=this.c&&this.g}v(a){this.i&&this.f.v(a,a.H.figure,this.a.x-8|0,this.a.y-8|0,0<=this.speed.x?0:1)}ca(){this.g=!0;this.c||(this.j=0,this.c=!0)}Ia(a,b,c,d){return this.i&&R(this,a,b,c,d)?1:0}};function Za(a){return a.R&&0<=a.speed.y||a.ba&&a.L>(a.aa?0:15)}function mb(a,b){a.m&&(a.dir*=-1,a.c=0==a.c?1:0);a.h=!1;a.L=20;T(a);b?a.g||(a.speed.x=1.25*a.dir,a.target.x=a.speed.x):a.L+=10;a.aa=b;a.T=0;a.j=0;a.ba=!0;var c=a.a.y+2;a.X.x=a.a.x+13*a.dir;a.X.y=c;a.ea.x=12;a.ea.y=b?10:4;++a.Aa}
class nb extends V{constructor(a,b,c){super(a,b);this.f=new Q(16,16);this.fa=new Q(16,16);this.c=0;this.b=new r(.1,.15);this.s=new r(0,2);this.B=new r(8,12);this.D=new r(6,12);this.K=!1;this.T=0;this.$=!1;this.l=0;this.O=this.Z=this.g=!1;this.L=this.j=0;this.Y=this.h=this.ba=!1;this.ha=0;this.aa=!1;this.X=new r(0,0);this.ea=new r(0,0);this.Aa=0;this.R=!1;this.S=0;this.m=!1;this.za=this.A=0;this.I=new lb;this.I.i=!1;this.dir=1;this.N=this.J=0;this.progress=c;this.na=this.ia=!1;this.C=!0}ra(a){this.Z&&
!this.g&&(this.Z=!1);this.dir=0==this.c?1:-1;var b=a.input.actions.fire2.state;if(b=b==I||b==E)this.Y&&b?(this.Y=!1,this.ha=0,mb(this,!0),N(a.audio,a.u.G.powerAttack,.6)):!this.aa&&0<this.L&&10>=this.L&&(this.L=0);if(!(0<this.L||this.R||(this.target.y=2,0<this.N))){this.target.x=1*a.input.o.x;this.m&&(this.target.y*=.25);this.b=new r(.1,.15);a:{if(a.input.actions.fire2.state==K){if(!this.g&&!this.O&&!this.K&&.1<a.input.o.y){T(this);this.speed.y=-3;this.target.y=4;this.b.y=.35;this.R=!0;this.S=0;b=
this.a.y+16;this.X.x=this.a.x;this.X.y=b;this.ea.x=8;this.ea.y=12;++this.Aa;N(a.audio,a.u.G.downAttack,.6);b=!0;break a}if(this.h){mb(this,!1);N(a.audio,a.u.G.sword,.5);b=!0;break a}}b=!1}if(b=!b)this.I.i?b=!1:(this.m&&(this.dir*=-1,this.c=0==this.c?1:0),a.input.actions.fire3.state==K?(this.I.V(this.a.x+4*this.dir,this.a.y+2,2*this.dir,0,24,this),this.I.va.x=this.a.x,T(this),this.L=30,this.ba=!1,this.j=this.T=0,N(a.audio,a.u.G["throw"],.6),b=!0):b=!1),b=!b;if(b&&(this.O&&(this.b.x*=.5,this.b.y*=.25,
this.target.x*=.5,this.target.y*=.25,this.m=!1,this.A=0),b=a.input.actions.fire1.state,this.g?(.1<a.input.o.x?this.c=0:-.1>a.input.o.x&&(this.c=1),this.target.y=.5*a.input.o.y,this.target.x=0,b==K&&(.1>a.input.o.y&&(this.T=14),this.Z=this.g=this.$=!1,N(a.audio,a.u.G.jump,.5)),b=!0):b=!1,!b)){b=a.input.actions.fire1.state;if(b==K)if(!this.O&&this.K&&.1<a.input.o.y)this.j=20,N(a.audio,a.u.G.jump,.5);else{if(this.K||0<this.l||!this.$||0<this.A)this.T=(this.$=!this.K&&0>=this.l&&0>=this.A)?8:14,this.K=
!1,this.l=0,0<this.A&&(this.speed.x=-2*this.za),this.m=!1,this.A=0,this.h=!0,this.na=!1,N(a.audio,a.u.G.jump,.5)}else b==I&&(0<this.T?this.T=0:0<this.j&&(this.j=0),this.na=!0);if(this.ia=this.na&&this.$&&0>=this.L&&this.$&&1==(b&1)&&0>=this.T)this.target.y=.5,this.speed.y=this.target.y}}0<this.L&&this.aa?this.X.x+=this.speed.x*a.step:this.R&&(this.X.y+=this.speed.y*a.step);0<this.T&&(this.speed.y=-2,this.O&&(this.speed.y*=.5),this.T-=a.step);0<this.j&&(this.speed.x=2*this.dir,this.target.x=this.speed.x,
this.j-=a.step);0<this.l&&(this.l-=a.step);0<this.A&&(this.A-=a.step);0<this.L&&(this.L-=a.step,!this.aa&&this.ba&&0>=this.L&&(this.Y=!0,N(a.audio,a.u.G.charge,.5)));0<this.S&&0>=(this.S-=a.step)&&(this.R=!1);this.Y&&(this.ha=(this.ha+a.step)%20);0<this.J&&(0<this.N?this.N-=a.step:this.J-=a.step);{b=this.f.c;let c=this.f.b;if(0<this.N)P(this.f,0,5);else if(this.R)P(this.fa,3,4),P(this.f,1,4);else if(0<this.L)P(this.f,0,4),this.aa?O(this.fa,4,7,8,4,a.step):P(this.fa,2,4);else if(0<this.j)P(this.f,
4,1);else if(.1<Math.abs(this.target.x)&&(this.c=0>this.target.x?1:0),this.m)P(this.f,3,1);else if(this.O)0<=this.speed.y&&.1<Math.abs(this.target.x)?O(this.f,3,0,1,10,a.step):(b=0>this.speed.y?2:0,P(this.f,b,3));else if(this.g){if(3!=this.f.b||.1<Math.abs(this.target.y))O(this.f,3,3,4,10,a.step),(this.f.b!=c||this.f.c!=b&&3==this.f.c)&&N(a.audio,a.u.G.climb,.6)}else this.ia?(O(this.f,6,0,3,3,a.step),(this.f.b!=c||this.f.c!=b&&0==this.f.c)&&N(a.audio,a.u.G.flap,.5)):this.K?.1>Math.abs(this.speed.x)&&
.1>Math.abs(this.target.x)?P(this.f,0,0):(b=12-6*Math.abs(this.speed.x),O(this.f,0,1,4,b,a.step)):this.$&&0>this.speed.y?O(this.f,2,0,4,4,a.step):(b=0,.5>Math.abs(this.speed.y)?b=1:0<this.speed.y&&(b=2),P(this.f,b,1))}this.I.update(a);this.O=this.g=!1}xa(){this.m=this.K=!1}v(a){if(!(0<this.J&&0!=Math.floor(this.J/2)%2)){var b=this.f.c;this.Y&&0==Math.floor(this.ha/2)%2&&(b+=5);var c=Math.round(this.a.x-8),d=Math.round(this.a.y-7);0<this.L&&this.ba&&this.fa.v(a,a.H.figure,c+12-24*this.c,d+1,this.c);
var e=this.f,f=e.width,g=e.height;A(a,a.H.figure,e.width*b,e.height*this.f.b,f,g,c,d,f,g,this.c);this.R&&this.fa.v(a,a.H.figure,c+3-6*this.c,d+7,this.c);this.I.v(a)}}qa(){this.K=!0;this.$=!1;this.l=12;.1<this.speed.y&&(this.Z=this.g=!1);this.h=!0;this.R&&0>=this.S&&(this.S=20);this.A=0;this.m=!1}ca(a,b){!this.g&&!this.R&&0>=this.L&&!this.O&&0<this.speed.y&&.1<b.input.o.x*a&&(this.m=!0,this.A=15,this.za=a,this.h=!0)}Ca(){this.T=0}oa(a,b,c,d,e,f){return R(this,a+4,b,c-8,d)?this.Z?(this.h=!0,void 0==
f&&(this.g=!0),!0):qa(e.input)||ra(e.input)?(this.Z=this.g=this.h=!0,this.a.x=a+8,void 0!=f&&(this.a.y=b+f),T(this),!0):!1:!1}ya(a,b,c,d){return R(this,a,b,c,d)?(this.O=!0,this.l=1,this.$=!1,this.j=0,this.h=!0):!1}ta(a,b){let c=a.a.x*a.width,d=a.a.y*a.height,e=a.target.x-a.a.x,f=a.target.y-a.a.y,g=(this.B.x+2)*a.Fa,m=(this.B.y+2)*a.Fa,k=0,l=0,q;a.la?(this.a.x+=e*g*b.step,this.a.y+=f*m*b.step):0>=this.N?(0<this.speed.x&&this.a.x+this.s.x+this.B.x/2>c+a.width?k=1:0>this.speed.x&&this.a.x+this.s.x-this.B.x/
2<c?k=-1:0<this.speed.y&&this.a.y+this.s.y+this.B.y/2>d+a.height?l=1:0>this.speed.y&&this.a.y+this.s.y-this.B.y/2<d&&(l=-1),0==k&&0==l||0==(q=a.move(k,l,.05))||(this.a.x+=q*a.width*a.ma)):(U(this,a.F.x*a.width,a.F.y*a.height,a.height,-1,b),U(this,(a.F.x+1)*a.width,a.F.y*a.height,a.height,1,b));null!=this.I&&this.I.i&&!Y(a,this.I)&&(this.I.i=!1)}ua(a,b){this.c=0<this.dir?0:1;this.J=60;this.N=30;this.target.x=0;this.speed.x=2*-this.dir;this.g=!1;this.L=0;this.ia=this.Y=this.m=this.R=!1;var c=this.progress;
c.b=Math.max(0,c.b-a);N(b.audio,b.u.G.hurt,.5)}Ka(a,b,c,d,e,f){if(!(0<this.J))return R(this,a,b,c,d)?(this.dir=this.a.x<a+c/2?1:-1,this.ua(e,f),!0):!1}Ia(a,b,c,d){return(Za(this)||0<this.S)&&da(this.X,null,this.ea,a,b,c,d)?this.aa||this.R?2:1:0}};function ob(a,b,c,d){let e=0,f=0;for(let g=0;g<d;++g)for(let m=0;m<c;++m)if(f=b[g*c+m]-512,!(0>=f)){--f;switch(f){case 0:a.b=new nb(16*m+8,16*g+8,a.progress)}if(1<=f&&15>=f){e=a.c.length;for(let k=0;k<a.c.length;++k)if(!a.c[k].i){e=k;break}a.c[e]=new ($a(f-1).prototype.constructor)(16*m+8,16*g+8);a.c[e].U(16*m+8);Xa(a.c[e],(k,l,q,n,v)=>{x(a.g,Ua).V(k,l,q,n,v)})}}}
function Ra(a,b,c,d){let e=(b-d.x)/16*.75;e=w(e,-.75,.75);d=Math.max(0,c-d.y)/16*2;d=w(d,-2,2);var f=a.b.progress;f=Math.random()<.25*(1-f.b/f.c)?1:0;x(a.j,Va).V(b,c,e,-1.5+d,f)}
class pb{constructor(a){this.b=null;this.c=[];this.Ea=[];this.j=[];this.g=[];this.progress=a}update(a,b,c){for(let g of this.c)if(g.ta(a,c),a.la||(g.update(c),g.wa(this.b,this,c),X(b,g,this,c)),g.i&&!g.M&&g.C)for(let m of this.c)if(m!=g)a:{var d=void 0,e=g,f=m;if(!f.i||f.M||!f.C||!e.i||e.M||!e.C)break a;d=Math.hypot(e.B.x/2,e.B.y/2);let k=Math.hypot(f.B.x/2,f.B.y/2),l=new r(e.a.x+e.s.x-f.a.x-f.s.x,e.a.y+e.s.y-f.a.y-f.s.y),q=l.length();h(l);q<d+k&&(d=d+k-q,e.a.x+=l.x*d/2,e.a.y+=l.y*d/2,e.ga(f),f.a.x-=
l.x*d/2,f.a.y-=l.y*d/2,f.ga(e))}a.la||(this.b.update(c),X(b,this.b,this,c),this.b.I.i&&X(b,this.b.I,this,c));this.b.ta(a,c);for(let g of this.Ea)g.update(c);for(let g of this.g)g.C=Y(a,g),g.update(c),X(b,g,this,c),g.wa(this.b,c);for(let g of this.j)g.ta(a,c),g.update(c),g.wa(this.b,this,c),X(b,g,this,c)}v(a){for(let b of this.c)b.v(a);for(let b of this.j)b.v(a);this.b.v(a);for(let b of this.g)b.v(a);for(let b of this.Ea)b.v(a)}};class qb{constructor(){this.b=this.c=6;this.g=0}};function Y(a,b){if(void 0==b.f)return!1;let c=a.F.x*a.width,d=a.F.y*a.height;return b.a.x+b.f.width/2>=c&&b.a.y+b.f.height/2>=d&&b.a.x-b.f.width/2<c+a.width&&b.a.y-b.f.height/2<d+a.height}
class rb{constructor(a,b,c,d,e,f,g){this.a=new r(a,b);this.target=this.a.clone();this.F=this.a.clone();this.width=c;this.height=d;this.la=!1;this.Fa=this.b=0;this.ma=e;this.g=f;this.c=g}move(a,b,c){if(this.la||!this.c&&(0==this.a.x&&0>a||this.a.x==this.ma-1&&0<a)||!this.j&&(0==this.a.y&&0>b||this.a.y==this.g-1&&0<b))return 0;this.b=1;this.Fa=c;this.target.x=this.a.x+a|0;this.target.y=this.a.y+b|0;this.la=!0;return this.c&&0>this.target.x?(this.a.x+=this.ma,this.target.x+=this.ma,1):this.c&&this.target.x>=
this.ma?(this.a.x-=this.ma,this.target.x-=this.ma,-1):0}update(a){this.la&&(0>=(this.b-=this.Fa*a.step)?(this.b=0,this.a=this.target.clone(),this.F=this.a.clone(),this.la=!1):(a=this.b,this.F.x=a*this.a.x+(1-a)*this.target.x,this.F.y=a*this.a.y+(1-a)*this.target.y))}setPosition(a,b){this.a=new r(a,b);this.target=this.a.clone();this.F=this.a.clone()}};class sb extends ta{constructor(a,b){super(a,b);this.c=new Sa(a.u);this.b=new rb(0,0,160,144,this.c.width/10|0,this.c.height/9|0,!0);this.progress=new qb;this.j=new pb(this.progress);b=this.c;ob(this.j,b.W.da[b.W.da.length-1],b.width,b.height);b=this.j;this.b.setPosition(b.b.a.x/160|0,b.b.a.y/144|0);this.g=!1;b=a.audio;a=a.u.G.testTrack;b.c&&(null!=b.b&&(b.b.stop(),b.b=null),a.play(b.P,.6,!0,0),b.b=a)}refresh(a){if(a.input.actions.start.state==K)if(this.g=!this.g){var b=a.audio;b.c&&null!=b.b&&b.b.pause(b.P)}else b=
a.audio,b.c&&null!=b.b&&b.b.resume(b.P);this.g||(this.c.update(this.b,a),this.j.update(this.b,this.c,a),this.b.update(a))}Oa(){}La(a){a.moveTo(0,0);var b=this.b,c=u(this.c.g+16*b.F.x,96);a.clear(85,170,255);A(a,a.H.background,16,32,48,48,96,16,48,48,0);b=16*b.F.y|0;a.move(0,-b);for(var d=0;3>d;++d)A(a,a.H.background,0,0,96,32,Math.round(-c+96*d),96,96,32,0);y(a,255,255,255);a.fillRect(0,128,a.width,16);for(c=0;c<a.width/16|0;++c)A(a,a.H.background,0,32,16,32,16*c,144,16,32,0);y(a,0,85,170);a.fillRect(0,
176,a.width,Math.max(0,a.height+b-176));a.move(0,b);c=this.b;a.moveTo(-Math.round(c.F.x*c.width),-Math.round(c.F.y*c.height));this.c.v(a,this.b);this.j.v(a);a.moveTo();b=a.H.font;for(d=0;d<this.progress.c;++d)c=9*(d/2|0),0==d%2&&A(a,b,40,0,8,8,c+3,2,8,8,void 0),this.progress.b>d&&A(a,b,32+d%2*4,0,4,8,c+3+d%2*4,2,4,8,void 0);b=String.fromCharCode(6)+String.fromCharCode(2)+String(this.progress.g);c=8*b.length+2;D(a,a.H.font,b,a.width-c,2,0,0,!1);this.g&&(y(a,0,0,0,.67),a.fillRect(0,0,a.width,a.height),
D(a,a.H.font,"PAUSED",a.width/2,a.height/2-4,0,0,!0))}};class tb extends ta{constructor(a,b){super(a,b);this.b=new Ja(12,!0,[new Ia("YES",c=>{c.audio.toggle(!0);c.audio.Pa=w(.6,0,1);c.Da(sb)}),new Ia("NO",c=>{c.audio.toggle(!1);c.Da(sb)})])}refresh(a){this.b.update(a)}La(a){a.clear(0,85,170);D(a,a.H.font,"ENABLE AUDIO?\nPRESS ENTER\nTO CONFIRM.",32,a.height/2-32,0,2,!1);this.b.v(a,a.width/2,a.height/2+16)}};window.onload=()=>{var a=new Ha(160,144,0);a.u.load("assets/assets.json");var b=[{name:"fire1",key:"KeyZ",ja:0},{name:"fire2",key:"KeyX",ja:2},{name:"fire3",key:"KeyC",ja:1},{name:"start",key:"Enter",ja:9,Ba:7},{name:"back",key:"Escape"}];for(let c of b)M(a.b.input,c.name,c.key,c.ja,c.Ba);a.j=tb;a.m=!1;a.loop(0)};
