import{S as p,i as b,s as v,k as u,l as _,m as d,h as i,n as g,b as x,B as o,T as k,q,a as w,r as y,c as E,D as h,u as L}from"./index-936de8ff.js";function f(c,a,l){const e=c.slice();return e[1]=a[l],e}function m(c){let a,l=c[1]+"",e,s;return{c(){a=u("li"),e=q(l),s=w(),this.h()},l(n){a=_(n,"LI",{class:!0});var t=d(a);e=y(t,l),s=E(t),t.forEach(i),this.h()},h(){g(a,"class","px-2 mb-1 mr-1 text-sm text-white bg-red-400 rounded-md leading-6 text-base:xsm mb-2:xsm mr-2:xsm")},m(n,t){x(n,a,t),h(a,e),h(a,s)},p(n,t){t&1&&l!==(l=n[1]+"")&&L(e,l)},d(n){n&&i(a)}}}function P(c){let a,l=c[0],e=[];for(let s=0;s<l.length;s+=1)e[s]=m(f(c,l,s));return{c(){a=u("ul");for(let s=0;s<e.length;s+=1)e[s].c();this.h()},l(s){a=_(s,"UL",{class:!0});var n=d(a);for(let t=0;t<e.length;t+=1)e[t].l(n);n.forEach(i),this.h()},h(){g(a,"class","flex flex-wrap")},m(s,n){x(s,a,n);for(let t=0;t<e.length;t+=1)e[t].m(a,null)},p(s,[n]){if(n&1){l=s[0];let t;for(t=0;t<l.length;t+=1){const r=f(s,l,t);e[t]?e[t].p(r,n):(e[t]=m(r),e[t].c(),e[t].m(a,null))}for(;t<e.length;t+=1)e[t].d(1);e.length=l.length}},i:o,o,d(s){s&&i(a),k(e,s)}}}function S(c,a,l){let{tags:e}=a;return c.$$set=s=>{"tags"in s&&l(0,e=s.tags)},[e]}class B extends p{constructor(a){super(),b(this,a,S,P,v,{tags:0})}}export{B as P};
