var cccp=function(){var n={root:function(e){return e.nodes.map(function(e){return n[e.type](e)}).join("")},atrule:function(e){return"@"+e.name+" "+e.params+"{"+n.root(e)+"}"},rule:function(e){return e.selector+"{"+n.root(e)+"}"},decl:function(n){return n.prop+":"+n.value+";"}},e=function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")},r=function(){function n(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}(),t=function(n){if(Array.isArray(n)){for(var e=0,r=Array(n.length);e<n.length;e++)r[e]=n[e];return r}return Array.from(n)},o=function(n,e,r){for(var t=arguments.length,o=Array(t>3?t-3:0),a=3;a<t;a++)o[a-3]=arguments[a];if(n.nodes){var u;(u=n.nodes).splice.apply(u,[e,r].concat(o))}return n},a=function(n,e,r){for(var t=arguments.length,o=Array(t>3?t-3:0),a=3;a<t;a++)o[a-3]=arguments[a];if(n.parent&&n.parent.nodes){var u;(u=n.parent.nodes).splice.apply(u,[n.parent.nodes.indexOf(n)+e,r].concat(o))}return n},u=function(){function u(n){e(this,u),Object.assign(this,n)}return r(u,[{key:"replaceWith",value:function(){for(var n=arguments.length,e=Array(n),r=0;r<n;r++)e[r]=arguments[r];return a.apply(void 0,[this,0,1].concat(t(e.map(function(n){return a(n,0,1)}))))}},{key:"before",value:function(){for(var n=arguments.length,e=Array(n),r=0;r<n;r++)e[r]=arguments[r];return a.apply(void 0,[this,-1,0].concat(t(e.map(function(n){return a(n,0,1)}))))}},{key:"after",value:function(){for(var n=arguments.length,e=Array(n),r=0;r<n;r++)e[r]=arguments[r];return a.apply(void 0,[this,1,0].concat(t(e.map(function(n){return a(n,0,1)}))))}},{key:"clone",value:function(n){return Object.assign(new u,this,n)}},{key:"prepend",value:function(){for(var n=arguments.length,e=Array(n),r=0;r<n;r++)e[r]=arguments[r];return o.apply(void 0,[this,0,0].concat(t(e.map(function(n){return a(n,0,1)}))))}},{key:"append",value:function(){for(var n=arguments.length,e=Array(n),r=0;r<n;r++)e[r]=arguments[r];return o.apply(void 0,[this,this.nodes.length,0].concat(t(e.map(function(n){return a(n,0,1)}))))}},{key:"empty",value:function(){return o(this,0,this.nodes.length)}},{key:"walk",value:function(n){return this.nodes&&this.nodes.length&&this.nodes.every(function(e){var r=n(e)!==!1;return r&&e.walk(n),r}),this}},{key:"toString",value:function(){return n[this.type](this)}}]),u}(),i=function(n,e){return n.map(function(n){return c[n[0]](n,e)})},c=[function(n,e){return new u({type:"root",nodes:i(n.slice(1),e)})},function(n,e){var r=new u({type:"atrule",name:n[1],params:n[2],parent:e});return r.nodes=i(n.slice(3),r),r},function(n,e){var r=new u({type:"rule",selector:n[1],parent:e});return r.nodes=i(n.slice(2),r),r},function(n,e){return new u({type:"decl",prop:n[1],value:n[2],parent:e})}],f=function(n,e){var r=c[n[0]](n),t={};e&&e.length&&e.forEach(function(n){return Object.keys(n).forEach(function(e){t[e]?t[e].push(n[e]):t[e]=[n[e]]})});var o=[];return r.walk(function(n){return t[n.type]&&t[n.type].forEach(function(e){o.push(Promise.resolve(e(n)))})}),Promise.all(o).then(function(){return r})},l=function(n,e){var r=f(n,e);r.then(function(n){var e=document.createElement("style");e.appendChild(document.createTextNode(n)),document.head.appendChild(e)})},p={Node:u,process:f,render:l};return p}();
//# sourceMappingURL=index.js.map