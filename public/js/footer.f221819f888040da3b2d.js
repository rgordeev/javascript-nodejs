var footer=webpackJsonp_name_([3],{0:function(e,t,n){"use strict";var r=n(14),i=n(15),a=n(16);t.init=function(){r(),window.devicePixelRatio>1&&i(),window.addEventListener("scroll",a),a()},t.trackSticky=a},14:function(e,t,n){"use strict";var r=n(45);e.exports=function(){function e(e){var t=e.clientX+a;t+i.offsetWidth>document.documentElement.clientWidth&&(t=Math.max(0,e.clientX-a-i.offsetWidth)),i.style.left=t+"px";var n=e.clientY+s;n+i.offsetHeight>document.documentElement.clientHeight&&(n=Math.max(0,e.clientY-s-i.offsetHeight)),i.style.top=n+"px"}function t(t){var n=t.target.closest("a");n&&(n.closest(".toolbar")||(i=document.createElement("span"),i.className="link__type",n.getAttribute("data-tooltip")?i.setAttribute("data-tooltip",n.getAttribute("data-tooltip")):i.setAttribute("data-url",n.getAttribute("href")),document.body.appendChild(i),e(t),document.addEventListener("mousemove",e)))}function n(){i&&(document.removeEventListener("mousemove",e),i.remove(),i=null)}var i=null,a=8,s=10,o=r(t,n);document.addEventListener("mouseover",function(e){e.target.closest("a")&&o.call(this,e)}),document.addEventListener("mouseout",o)}},15:function(e){"use strict";e.exports=function(){for(var e=document.querySelectorAll('figure img[src$=".png"]'),t=0;t<e.length;t++)!function(){var n=e[t];n.onload=function(){if(delete this.onload,!this.src.match(/@2x.png$/)){var e=new Image;e.onload=function(){this.width&&this.height&&(n.src=this.src)},e.src=this.src.replace(".png","@2x.png")}},n.complete&&n.onload()}()}},16:function(e){"use strict";function t(){for(var e=document.querySelectorAll("[data-sticky]"),t=0;t<e.length;t++){var r=e[t];if(r.getBoundingClientRect().top<0){if(r.style.cssText)return;var i=r.getBoundingClientRect().left,a=n(r);r.parentNode.insertBefore(a,r),document.body.appendChild(r),r.style.position="fixed",r.style.top=0,r.style.left=i+"px",r.style.zIndex=10001,r.style.background="white",r.style.margin=0,r.style.width=a.offsetWidth+"px",r.placeholder=a}else r.placeholder&&r.placeholder.getBoundingClientRect().top>0&&(r.style.cssText="",r.placeholder.parentNode.insertBefore(r,r.placeholder),r.placeholder.remove(),r.placeholder=null)}}function n(e){var t=document.createElement("div"),n=getComputedStyle(e);return t.style.width=e.offsetWidth+"px",t.style.marginLeft=n.marginLeft,t.style.marginRight=n.marginRight,t.style.height=e.offsetHeight+"px",t.style.marginBottom=n.marginBottom,t.style.marginTop=n.marginTop,t}e.exports=t},45:function(e){"use strict";function t(e,t){function n(e){i=e.pageX,a=e.pageY}function r(e,t){return t.hoverIntentTimer=clearTimeout(t.hoverIntentTimer),Math.sqrt((s-i)*(s-i)+(o-a)*(o-a))<u.sensitivity?(t.removeEventListener("mousemove",n),t.hoverIntentState=!0,void u.over.call(t,e)):(s=i,o=a,void(t.hoverIntentTimer=setTimeout(function(){r(e,t)},u.interval)))}var i,a,s,o,u={interval:150,sensitivity:8,timeout:0,over:e,out:t};return function(e){this.hoverIntentTimer&&(clearTimeout(this.hoverIntentTimer),delete this.hoverIntentTimer),"mouseover"===e.type?(s=e.pageX,o=e.pageY,this.addEventListener("mousemove",n),this.hoverIntentState||(this.hoverIntentTimer=setTimeout(function(){r(e,this)}.bind(this),u.interval))):(this.removeEventListener("mousemove",n),this.hoverIntentState&&(this.hoverIntentTimer=setTimeout(function(){this.hoverIntentState=!1,u.out.call(this,e)}.bind(this),u.timeout)))}}e.exports=void 0===document.ontouchstart?t:function(){return function(){}}}});