!function(n){var r={};function a(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=n,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,n){n(1),n(3)},function(e,t,n){n(2)()},function(e,t,n){var r,a;a=this,void 0===(r=function(){return a.svg4everybody=function(e){var d,u=Object(e),t=window.top!==window.self;d="polyfill"in u?u.polyfill:/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent)||(navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/)||[])[1]<10547||(navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/)||[])[1]<537||/\bEdge\/.(\d+)\b/.test(navigator.userAgent)&&t;var f={},v=window.requestAnimationFrame||setTimeout,m=document.getElementsByTagName("use"),h=0;d&&function e(){for(var t=0;t<m.length;){var n=m[t],r=n.parentNode,a=p(r),o=n.getAttribute("xlink:href")||n.getAttribute("href");if(!o&&u.attributeName&&(o=n.getAttribute(u.attributeName)),a&&o){if(d)if(!u.validate||u.validate(o,a,n)){r.removeChild(n);var c=o.split("#"),i=c.shift(),l=c.join("#");if(i.length){var s=f[i];s||((s=f[i]=new XMLHttpRequest).open("GET",i),s.send(),s._embeds=[]),s._embeds.push({parent:r,svg:a,id:l}),g(s)}else b(r,a,document.getElementById(l))}else++t,++h}else++t}(!m.length||0<m.length-h)&&v(e,67)}()};function b(e,t,n){if(n){var r=document.createDocumentFragment(),a=!t.hasAttribute("viewBox")&&n.getAttribute("viewBox");a&&t.setAttribute("viewBox",a);for(var o=n.cloneNode(!0);o.childNodes.length;)r.appendChild(o.firstChild);e.appendChild(r)}}function g(r){r.onreadystatechange=function(){if(4===r.readyState){var n=r._cachedDocument;n||((n=r._cachedDocument=document.implementation.createHTMLDocument("")).body.innerHTML=r.responseText,r._cachedTarget={}),r._embeds.splice(0).map(function(e){var t=r._cachedTarget[e.id];t=t||(r._cachedTarget[e.id]=n.getElementById(e.id)),b(e.parent,e.svg,t)})}},r.onreadystatechange()}function p(e){for(var t=e;"svg"!==t.nodeName.toLowerCase()&&(t=t.parentNode););return t}}.apply(t,[]))||(e.exports=r)},function(e,t){function i(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u,n=document.querySelector(".colors"),f=document.querySelectorAll(".color"),a=document.querySelector(".btn--generate"),o=document.querySelectorAll(".field-range__input"),v=document.querySelectorAll(".color__title"),m=document.querySelector(".modal--copy"),c=document.querySelectorAll(".btn--adjust"),l=document.querySelectorAll(".btn--lock"),s=n.querySelectorAll(".btn--close"),d=document.querySelectorAll(".sliders"),h=[];function b(){u=[],f.forEach(function(e){var t=e.querySelector(".color__title"),n=chroma.random();if(e.classList.contains("locked"))u.push(t.innerText);else{u.push(n.hex()),e.style.backgroundColor=n,g(t.innerText=n,t);var r=chroma(n),a=e.querySelectorAll(".field-range__input");p(r,a[0],a[1],a[2])}}),E(),c.forEach(function(e,t){g(u[t],e),g(u[t],l[t])})}function g(e,t){.5<chroma(e).luminance()?(t.style.color="black",t.style.fill="black"):(t.style.color="white",t.style.fill="white")}function p(e,t,n,r){var a=e.set("hsl.s",0),o=e.set("hsl.s",1),c=chroma.scale([a,e,o]),i=e.set("hsl.l",.5),l=chroma.scale(["black",i,"white"]);r.style.backgroundImage="linear-gradient(to right, ".concat(c(0),", ").concat(c(1)),n.style.backgroundImage="linear-gradient(to right, ".concat(l(0),", ").concat(l(.5),", ").concat(l(1)),t.style.backgroundImage="linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204), rgb(204,75,204), rgb(204,75,75))"}function y(e){var t=e.target.getAttribute("data-bright")||e.target.getAttribute("data-sat")||e.target.getAttribute("data-hue"),n=e.target.parentElement.parentElement.querySelectorAll(".field-range__input"),r=n[0],a=n[1],o=n[2],c=u[t],i=chroma(c).set("hsl.s",o.value).set("hsl.l",a.value).set("hsl.h",r.value);p(f[t].style.backgroundColor=i,r,a,o)}function _(e){var t=f[e],n=chroma(t.style.backgroundColor),r=t.querySelector(".color__title"),a=t.querySelectorAll(".color__btn");r.innerText=n.hex(),g(n,r);var o,c=function(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=i(e))){function t(){}var n=0;return{s:t,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){c=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw a}}}}(a);try{for(c.s();!(o=c.n()).done;)btn=o.value,g(n,btn)}catch(e){c.e(e)}finally{c.f()}}function E(){document.querySelectorAll(".field-range__input").forEach(function(e){if("hue"===e.name){var t=u[e.getAttribute("data-hue")],n=chroma(t).hsl()[0];e.value=Math.floor(n)}if("brightness"===e.name){var r=u[e.getAttribute("data-bright")],a=chroma(r).hsl()[2];e.value=Math.floor(100*a)/100}if("saturation"===e.name){var o=u[e.getAttribute("data-sat")],c=chroma(o).hsl()[1];e.value=Math.floor(100*c)/100}})}a.addEventListener("click",b),o.forEach(function(e){e.addEventListener("input",y)}),f.forEach(function(e,t){e.addEventListener("change",function(){_(t)})}),v.forEach(function(e){e.addEventListener("click",function(){!function(e){var t=document.createElement("textarea");t.value=e.innerText,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t);var n=m.children[0];m.classList.add("active"),n.classList.add("active")}(e)})}),m.addEventListener("transitionend",function(){var e=m.children[0];m.classList.remove("active"),e.classList.remove("active")}),c.forEach(function(e,t){e.addEventListener("click",function(){d[t].classList.toggle("active")})}),s.forEach(function(e,t){e.addEventListener("click",function(){d[t].classList.remove("active")})}),l.forEach(function(e,r){e.addEventListener("click",function(e){var t,n;t=e,(n=f[r]).classList.toggle("locked"),n.classList.contains("locked")?t.target.children[0].children[0].setAttribute("xlink:href","img/sprite.svg#icon-lock"):t.target.children[0].children[0].setAttribute("xlink:href","img/sprite.svg#icon-unlock")})});var L=document.querySelector(".btn--save"),S=document.querySelector(".save__btn"),A=document.querySelector(".save__close-btn"),k=document.querySelector(".modal--save"),x=document.querySelector(".save__input .field-text__input"),q=document.querySelector(".modal--lib"),C=document.querySelector(".btn--library"),w=document.querySelector(".library__btn");function T(){var e=q.children[0];q.classList.remove("active"),e.classList.remove("active")}L.addEventListener("click",function(){var e=k.children[0];k.classList.add("active"),e.classList.add("active")}),A.addEventListener("click",function(){var e=k.children[0];k.classList.remove("active"),e.classList.remove("active")}),S.addEventListener("click",function(){k.classList.remove("active"),m.classList.remove("active");var e,t=x.value,n=[];v.forEach(function(e){n.push(e.innerText)});var r=JSON.parse(localStorage.getItem("palettes"));e=r?r.length:h.length;var a,o,c={name:t,colors:n,nr:e};h.push(c),a=c,(o=null===localStorage.getItem("palettes")?[]:JSON.parse(localStorage.getItem("palettes"))).push(a),localStorage.setItem("palettes",JSON.stringify(o)),x.value="";var i=document.createElement("div");i.classList.add("library__palette");var l=document.createElement("h2");l.classList.add("library__name"),l.innerText=c.name;var s=document.createElement("div");s.classList.add("library__preview"),c.colors.forEach(function(e){var t=document.createElement("div");t.style.backgroundColor=e,s.appendChild(t)});var d=document.createElement("button");d.classList.add("library__palette-btn","btn","btn--palette"),d.classList.add(c.nr),d.innerText="Выбрать",d.addEventListener("click",function(e){T();var t=e.target.classList[3];u=[],h[t].colors.forEach(function(e,t){u.push(e),g(f[t].style.backgroundColor=e,f[t].children[0]),_(t)}),E()}),i.appendChild(l),i.appendChild(s),i.appendChild(d),q.children[0].appendChild(i)}),C.addEventListener("click",function(){var e=q.children[0];q.classList.add("active"),e.classList.add("active")}),w.addEventListener("click",T),function(){if(null===localStorage.getItem("palettes"))localPalettes=[];else{var o=JSON.parse(localStorage.getItem("palettes"));h=function(e){if(Array.isArray(e))return r(e)}(e=o)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o.forEach(function(e){var t=document.createElement("div");t.classList.add("library__palette");var n=document.createElement("h2");n.classList.add("library__name"),n.innerText=e.name;var r=document.createElement("div");r.classList.add("library__preview"),e.colors.forEach(function(e){var t=document.createElement("div");t.style.backgroundColor=e,r.appendChild(t)});var a=document.createElement("button");a.classList.add("library__palette-btn","btn","btn--palette"),a.classList.add(e.nr),a.innerText="Выбрать",a.addEventListener("click",function(e){T();var t=e.target.classList[3];u=[],o[t].colors.forEach(function(e,t){u.push(e),g(f[t].style.backgroundColor=e,f[t].children[0]),_(t)}),E()}),t.appendChild(n),t.appendChild(r),t.appendChild(a),q.children[0].appendChild(t)})}var e}(),b()}]);