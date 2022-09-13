!function(){let t,e,i={};function s(t,e){i[t]=i[t]||[],i[t].push(e)}function h(t,...e){i[t]&&i[t].map((t=>t(...e)))}function n(){return t}function r(){return e}function o(i){if(t=document.getElementById(i)||i||document.querySelector("canvas"),!t)throw Error("You must provide a canvas element for the game");return e=t.getContext("2d"),e.imageSmoothingEnabled=!1,h("init"),{canvas:t,context:e}}class a{clone(){return c(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:e,width:i=this.width,height:s=this.height,context:h=r()}={}){let n=this.frames[this._f]/this.spriteSheet._f|0,o=this.frames[this._f]%this.spriteSheet._f|0;h.drawImage(this.spriteSheet.image,o*this.width+(2*o+1)*this.margin,n*this.height+(2*n+1)*this.margin,this.width,this.height,t,e,i,s)}constructor({spriteSheet:t,frames:e,frameRate:i,loop:s=!0}={}){this.spriteSheet=t,this.frames=e,this.frameRate=i,this.loop=s;let{width:h,height:n,margin:r=0}=t.frame;this.width=h,this.height=n,this.margin=r,this._f=0,this._a=0}}function c(t){return new a(t)}c.prototype=a.prototype,c.class=a;let p=/(jpeg|jpg|gif|png)$/,d=/(wav|mp3|ogg|aac)$/,u=/^\//,l=/\/$/,g=new WeakMap,f="",m="",y="";function x(t,e){return new URL(t,e).href}function w(t,e){return[t.replace(l,""),t?e.replace(u,""):e].filter((t=>t)).join("/")}function b(t){return t.split(".").pop()}function _(t){let e=t.replace("."+b(t),"");return 2==e.split("/").length?e.replace(u,""):e}let S={},v={},A={};function P(){window.__k||(window.__k={dm:g,u:x,d:A,i:S})}function E(t){f=t}function H(t){return P(),new Promise(((e,i)=>{let s,n,r;if(s=w(f,t),S[s])return e(S[s]);n=new Image,n.onload=function(){r=x(s,window.location.href),S[_(t)]=S[s]=S[r]=this,h("assetLoaded",this,t),e(this)},n.onerror=function(){i("Unable to load image "+s)},n.src=s}))}function j(t){return new Promise(((e,i)=>{let s,n,r,o;var a;return s=new Audio,n={wav:"",mp3:(a=s).canPlayType("audio/mpeg;"),ogg:a.canPlayType('audio/ogg; codecs="vorbis"'),aac:a.canPlayType("audio/aac;")},(t=[].concat(t).reduce(((t,e)=>t||(n[b(e)]?e:null)),0))?(r=w(m,t),v[r]?e(v[r]):(s.addEventListener("canplay",(function(){o=x(r,window.location.href),v[_(t)]=v[r]=v[o]=this,h("assetLoaded",this,t),e(this)})),s.onerror=function(){i("Unable to load audio "+r)},s.src=r,void s.load())):i("cannot play any of the audio formats provided"+t)}))}function I(t){let e,i;return P(),e=w(y,t),A[e]?Promise.resolve(A[e]):fetch(e).then((t=>{if(!t.ok)throw t;return t.clone().json().catch((()=>t.text()))})).then((s=>(i=x(e,window.location.href),"object"==typeof s&&g.set(s,i),A[_(t)]=A[e]=A[i]=s,h("assetLoaded",s,t),s)))}function k(...t){return P(),Promise.all(t.map((t=>{let e=b([].concat(t)[0]);return e.match(p)?H(t):e.match(d)?j(t):I(t)})))}const W=()=>{};function T(){let t=n();r().clearRect(0,0,t.width,t.height)}function D({fps:t=60,clearCanvas:e=!0,update:i,render:s}={}){if(!i||!s)throw Error("You must provide update() and render() functions");let n,r,o,a,c,p=0,d=1e3/t,u=1/t,l=e?T:W;function g(){if(r=requestAnimationFrame(g),o=performance.now(),a=o-n,n=o,!(a>1e3)){for(h("tick"),p+=a;p>=d;)c.update(u),p-=d;l(),c.render()}}return c={update:i,render:s,isStopped:!0,start(){n=performance.now(),this.isStopped=!1,requestAnimationFrame(g)},stop(){this.isStopped=!0,cancelAnimationFrame(r)},_frame:g,set _last(t){n=t}},c}let z={},B={},M={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"left",ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",13:"enter",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down"};function O(t){let e=M[t.code||t.which];B[e]=!0,z[e]&&z[e](t)}function L(t){B[M[t.code||t.which]]=!1}function C(){B={}}function R(){let t;for(t=0;t<26;t++)M[t+65]=M["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)M[48+t]=M["Digit"+t]=""+t;window.addEventListener("keydown",O),window.addEventListener("keyup",L),window.addEventListener("blur",C)}function Y(t){return!!B[t]}let U=[],G=[],X={},F={},N={0:"left",1:"middle",2:"right"},$={x:0,y:0,radius:5};function q(t,e){const i=e||$;let s=t.x,h=t.y;t.anchor&&(s-=t.width*t.anchor.x,h-=t.height*t.anchor.y);let n=i.x-Math.max(s,Math.min(i.x,s+t.width)),r=i.y-Math.max(h,Math.min(i.y,h+t.height));return n*n+r*r<i.radius*i.radius}function K(t){const e=t||$;let i,s,h=G.length?G:U;for(let t=h.length-1;t>=0;t--)if(i=h[t],s=i.collidesWithPointer?i.collidesWithPointer(e):q(i,e),s)return i}function J(t){let e=void 0!==t.button?N[t.button]:"left";F[e]=!0,tt(t,"onDown")}function Q(t){let e=void 0!==t.button?N[t.button]:"left";F[e]=!1,tt(t,"onUp")}function V(t){tt(t,"onOver")}function Z(){F={}}function tt(t,e){let i,s,h=n();if(!h)return;let r=h.height/h.offsetHeight,o=h.getBoundingClientRect(),a=-1!==["touchstart","touchmove","touchend"].indexOf(t.type);if(a){$.touches={};for(var c=0;c<t.touches.length;c++)$.touches[t.touches[c].identifier]={id:t.touches[c].identifier,x:(t.touches[c].clientX-o.left)*r,y:(t.touches[c].clientY-o.top)*r,changed:!1};for(c=t.changedTouches.length;c--;){const h=t.changedTouches[c].identifier;void 0!==$.touches[h]&&($.touches[h].changed=!0),i=t.changedTouches[c].clientX,s=t.changedTouches[c].clientY;let n=K({id:h,x:(i-o.left)*r,y:(s-o.top)*r,radius:$.radius});n&&n[e]&&n[e](t),X[e]&&X[e](t,n)}}else i=t.clientX,s=t.clientY;if($.x=(i-o.left)*r,$.y=(s-o.top)*r,t.preventDefault(),!a){let i=K();i&&i[e]&&i[e](t),X[e]&&X[e](t,i)}}function et(){let t=n();t.addEventListener("mousedown",J),t.addEventListener("touchstart",J),t.addEventListener("mouseup",Q),t.addEventListener("touchend",Q),t.addEventListener("touchcancel",Q),t.addEventListener("blur",Z),t.addEventListener("mousemove",V),t.addEventListener("touchmove",V),s("tick",(()=>{G.length=0,U.map((t=>{G.push(t)})),U.length=0}))}function it(t){X.onDown=t}class st{get(t={}){if(this.size===this.objects.length){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.push(this._c())}let e=this.objects[this.size];return this.size++,e.init(t),e}getAliveObjects(){return this.objects.slice(0,this.size)}clear(){this.size=this.objects.length=0,this.objects.push(this._c())}update(t){let e,i=!1;for(let s=this.size;s--;)e=this.objects[s],e.update(t),e.isAlive()||(i=!0,this.size--);i&&this.objects.sort(((t,e)=>e.isAlive()-t.isAlive()))}render(){for(let t=this.size;t--;)this.objects[t].render()}constructor({create:t,maxSize:e=1024}={}){let i;if(!t||!(i=t())||!(i.update&&i.init&&i.isAlive))throw Error("Must provide create() function which returns an object with init(), update(), and isAlive() functions");this._c=t,this.objects=[t()],this.size=0,this.maxSize=e}}function ht(t){return new st(t)}function nt(t,e){let i=[],s=e.x+e.width/2,h=e.y+e.height/2,n=t.y<h&&t.y+t.height>=e.y,r=t.y+t.height>=h&&t.y<e.y+e.height;return t.x<s&&t.x+t.width>=e.x&&(n&&i.push(0),r&&i.push(2)),t.x+t.width>=s&&t.x<e.x+e.width&&(n&&i.push(1),r&&i.push(3)),i}ht.prototype=st.prototype,ht.class=st;class rt{clear(){this._s.map((function(t){t.clear()})),this._b=!1,this._o.length=0}get(t){let e,i,s=new Set;for(;this._s.length&&this._b;){for(e=nt(t,this.bounds),i=0;i<e.length;i++)this._s[e[i]].get(t).forEach((t=>s.add(t)));return Array.from(s)}return this._o.filter((e=>e!==t))}add(){let t,e,i,s;for(e=0;e<arguments.length;e++)if(i=arguments[e],Array.isArray(i))this.add.apply(this,i);else if(this._b)this._a(i);else if(this._o.push(i),this._o.length>this.maxObjects&&this._d<this.maxDepth){for(this._sp(),t=0;s=this._o[t];t++)this._a(s);this._o.length=0}}_a(t,e,i){for(e=nt(t,this.bounds),i=0;i<e.length;i++)this._s[e[i]].add(t)}_sp(t,e,i){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,i=0;i<4;i++)this._s[i]=ot({bounds:{x:this.bounds.x+(i%2==1?t:0),y:this.bounds.y+(i>=2?e:0),width:t,height:e},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[i]._d=this._d+1,this._s[i]._p=this}constructor({maxDepth:t=3,maxObjects:e=25,bounds:i}={}){this.maxDepth=t,this.maxObjects=e;let s=n();this.bounds=i||{x:0,y:0,width:s.width,height:s.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}}function ot(t){return new rt(t)}ot.prototype=rt.prototype,ot.class=rt;class at{add(t,e=1){return ct(this.x+(t.x||0)*e,this.y+(t.y||0)*e,this)}clamp(t,e,i,s){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=s}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?Math.min(Math.max(this._a,t),this._d):t}set y(t){this._y=this._c?Math.min(Math.max(this._b,t),this._e):t}constructor(t=0,e=0){this._x=t,this._y=e}}function ct(t,e,i={}){let s=new at(t,e);return i._c&&(s.clamp(i._a,i._b,i._d,i._e),s.x=t,s.y=e),s}ct.prototype=at.prototype,ct.class=at;class pt{init(t={}){let{x:e,y:i,dx:s,dy:h,ddx:n,ddy:o,width:a,height:c,image:p}=t;this.position=ct(e,i),this.velocity=ct(s,h),this.acceleration=ct(n,o),this._fx=this._fy=1,this.width=this.height=this.rotation=0,this.ttl=1/0,this.anchor={x:0,y:0},this.context=r();for(let e in t)this[e]=t[e];p&&(this.width=void 0!==a?a:p.width,this.height=void 0!==c?c:p.height),this.sx=0,this.sy=0}get x(){return this.position.x}get y(){return this.position.y}get dx(){return this.velocity.x}get dy(){return this.velocity.y}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}get animations(){return this._a}get viewX(){return this.x-this.sx}get viewY(){return this.y-this.sy}get width(){return this._w}get height(){return this._h}set x(t){this.position.x=t}set y(t){this.position.y=t}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}set animations(t){let e,i;for(e in this._a={},t)this._a[e]=t[e].clone(),i=i||this._a[e];this.currentAnimation=i,this.width=this.width||i.width,this.height=this.height||i.height}set viewX(t){}set viewY(t){}set width(t){let e=t<0?-1:1;this._fx=e,this._w=t*e}set height(t){let e=t<0?-1:1;this._fy=e,this._h=t*e}isAlive(){return this.ttl>0}collidesWith(t){if(this.rotation||t.rotation)return null;let e=this.x-this.width*this.anchor.x,i=this.y-this.height*this.anchor.y,s=t.x,h=t.y;return t.anchor&&(s-=t.width*t.anchor.x,h-=t.height*t.anchor.y),e<s+t.width&&e+this.width>s&&i<h+t.height&&i+this.height>h}update(t){this.advance(t)}render(){this.draw()}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){this.velocity=this.velocity.add(this.acceleration,t),this.position=this.position.add(this.velocity,t),this.ttl--,this.currentAnimation&&this.currentAnimation.update(t)}draw(){let t=-this.width*this.anchor.x,e=-this.height*this.anchor.y;if(this.context.save(),this.context.translate(this.viewX,this.viewY),this.rotation&&this.context.rotate(this.rotation),-1==this._fx||-1==this._fy){let i=this.width/2+t,s=this.height/2+e;this.context.translate(i,s),this.context.scale(this._fx,this._fy),this.context.translate(-i,-s)}this.image?this.context.drawImage(this.image,0,0,this.image.width,this.image.height,t,e,this.width,this.height):this.currentAnimation?this.currentAnimation.render({x:t,y:e,width:this.width,height:this.height,context:this.context}):(this.context.fillStyle=this.color,this.context.fillRect(t,e,this.width,this.height)),this.context.restore()}constructor(t){this.init(t)}}function dt(t){return new pt(t)}function ut(t){if(+t===t)return t;let e=[],i=t.split(".."),s=+i[0],h=+i[1],n=s;if(s<h)for(;n<=h;n++)e.push(n);else for(;n>=h;n--)e.push(n);return e}dt.prototype=pt.prototype,dt.class=pt;class lt{createAnimations(t){let e,i;for(i in t){let{frames:s,frameRate:h,loop:n}=t[i];if(e=[],void 0===s)throw Error("Animation "+i+" must provide a frames property");[].concat(s).map((t=>{e=e.concat(ut(t))})),this.animations[i]=c({spriteSheet:this,frames:e,frameRate:h,loop:n})}}constructor({image:t,frameWidth:e,frameHeight:i,frameMargin:s,animations:h}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:i,margin:s},this._f=t.width/e|0,this.createAnimations(h)}}function gt(t){return new lt(t)}gt.prototype=lt.prototype,gt.class=lt;class ft{generateBaseSprite(t){return dt(this.getBaseSpriteConfig(this.imageAssets,t))}getBaseSpriteConfig(t,e){return{x:"base"===e?ft.defaultX:ft.defaultWidth,y:ft.defaultY,width:ft.defaultWidth,dx:ft.baseSpeed,image:t.base,name:e}}baseSpriteUpdate(t){t.advance(),0===Math.round(t.x/ft.baseSpeed)&&("base"===t.name?this.baseSpriteExtension.x=this.baseSpriteExtension.width:this.baseSprite.x=this.baseSprite.width)}createBaseSprites(){return this.baseSprite.update=this.baseSpriteUpdate.bind(this,this.baseSprite),this.baseSpriteExtension.update=this.baseSpriteUpdate.bind(this,this.baseSpriteExtension),{baseSprite:this.baseSprite,baseSpriteExtension:this.baseSpriteExtension}}constructor(t){this.imageAssets=t,this.baseSprite=this.generateBaseSprite("base"),this.baseSpriteExtension=this.generateBaseSprite("extension")}}ft.baseSpeed=-3,ft.defaultX=0,ft.defaultY=528,ft.defaultWidth=640;const{canvas:mt,context:yt}=o(),xt={WIDTH:mt.width,HEIGHT:mt.height};class wt{static get properties(){return{width:51,height:36}}static flap(){this.rotation=-.4,this.velocity.y=-8,this.ddy=.4,this.playAnimation("flap")}createPlayer(){const t=this.createSprite();return t.collisionObjects=this.collisionObjects,t.animations=this.buildAndGetSpriteSheetAnimations(),t.update=this.onPlayerSpriteUpdate.bind(t),t.collidesWith=this.onCollision.bind(t),t}createSprite(){return dt({x:xt.WIDTH/2,y:xt.HEIGHT/2,width:wt.properties.width,height:wt.properties.height,anchor:{x:.5,y:.5}})}buildAndGetSpriteSheetAnimations(){return gt({image:S.yellowbird,frameWidth:34,frameHeight:24,animations:{idle:{frames:"1..1",frameRate:0},flap:{frames:"0..2",frameRate:15}}}).animations}onPlayerSpriteUpdate(){this.advance(),this.playAnimation("flap");for(const t of this.collisionObjects)this.collidesWith(t)&&(console.log("Bird is dead!"),h("game_over",!0));this.velocity.y>10&&this.rotation<=1.6&&(this.rotation+=.1),it((()=>{wt.flap.call(this)})),Y("space")&&wt.flap.call(this)}onCollision(t){return"top"===t.name?this.x>=t.x-t.width&&this.x<t.x&&this.y>=t.y-t.height&&this.y<t.y:"bottom"===t.name?this.x>=t.x&&this.x<t.x+t.width&&this.y>=t.y&&this.y<t.y+t.height:this.y>=t.y-this.height/2}constructor(t){this.collisionObjects=t,this.playerSprite=this.createPlayer()}}class bt{static get properties(){return{pipeGap:150,pipeWidth:73,pipeHeight:320,minPipSize:70,baseHeight:112}}static get getMinMaxPipeHeight(){return{maxY:xt.HEIGHT-bt.properties.pipeHeight-bt.properties.baseHeight,minY:xt.HEIGHT-bt.properties.baseHeight-bt.properties.minPipSize}}createPipes(){this.pipeSets.push(this.createPipeSet(0)),this.pipeSets.push(this.createPipeSet(1))}createPipeSet(t){const e=this.getConfigForPosition("top",t),i=this.getConfigForPosition("bottom",t);i.y=this.getBottomPipeHeight(e.y);this.pipeSets[t-1]&&(i.x+=xt.WIDTH/2+bt.properties.pipeWidth/2,e.x+=xt.WIDTH/2+bt.properties.pipeWidth/2);const s=dt(e);s.update=this.onPipeSpriteUpdate.bind(this,s);const h=dt(i);return h.update=this.onPipeSpriteUpdate.bind(this,h),{topPipeSprite:s,bottomPipeSprite:h}}getConfigForPosition(t,e){let i,s,h;const{pipeHeight:n,pipeWidth:r,minPipSize:o}=bt.properties;return"top"===t?(s=xt.WIDTH+r,i=this.generateRandomNumber(n,o),h=Math.PI):(s=xt.WIDTH,h=0),{y:i||0,x:s,width:r,height:n,rotation:h,dx:-3,image:this.imageAssets.greenpipe,name:t,pipeIndex:e}}getBottomPipeHeight(t){const{minY:e,maxY:i}=bt.getMinMaxPipeHeight,s=t+bt.properties.pipeGap;return s>e?e:s<i?i:s}generateRandomNumber(t,e){return Math.floor(Math.random()*(t-e+1))+e}onPipeSpriteUpdate(t){const{pipeHeight:e,pipeWidth:i,minPipSize:s}=bt.properties;t.advance(),t.x<0&&"top"===t.name?(t.y=this.generateRandomNumber(e,s),t.x=xt.WIDTH+i):t.x<-i&&"bottom"===t.name&&(t.y=this.getBottomPipeHeight(this.pipeSets[t.pipeIndex].topPipeSprite.y),t.x=xt.WIDTH)}constructor(t){this.imageAssets=t,this.pipeSets=[],this.createPipes()}}class _t{static getImageSet(){return["background-day.png","background-night.png","background-interlude.png"]}getBackgroundSpriteConfig(t,e="background-day"){return{x:0,y:0,width:xt.WIDTH,height:xt.HEIGHT,image:t[e]}}getBgImageAssetName(){const t=(new Date).getHours();let e;return e=t>=7&&t<8||t>=19&&t<20?"interlude":t>=8&&t<19?"day":"night",`background-${e}`}createBackgroundSprite(){const t=this.getBgImageAssetName();return dt(this.getBackgroundSpriteConfig(this.imageAssets,t))}constructor(t){this.imageAssets=t,this.backgroundSprite=this.createBackgroundSprite()}}yt.imageSmoothingEnabled=!1;E("assets/sprites"),k("base.png","yellowbird.png","greenpipe.png",..._t.getImageSet()).then((function(){R(),et();const t=new ft(S),{baseSprite:e,baseSpriteExtension:i}=t.createBaseSprites(),h=new bt(S),[n,r]=h.pipeSets,o=[...Object.keys(n).map((t=>n[t])),...Object.keys(r).map((t=>r[t]))],a=new wt([e,i,...o]).playerSprite,c=new _t(S).backgroundSprite,p=D({update:function(){a.update(),Object.keys(n).map((t=>n[t].update())),Object.keys(r).map((t=>r[t].update())),e.update(),i.update()},render:function(){c.render(),a.render(),Object.keys(n).map((t=>n[t].render())),Object.keys(r).map((t=>r[t].render())),e.render(),i.render()}});p.start();s("game_over",(function(){p.stop()}))}))}();
//# sourceMappingURL=index.0383ac1f.js.map
