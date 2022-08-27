import{h as l}from"./index.13485f56.js";const n=`<style>
  @import url('/index.css');
</style>
<ul class="flex flex-wrap"></ul>
`;customElements.define("post-tags",class extends HTMLElement{constructor(){super(),this.postTags=[];const t=l(n);this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0))}connectedCallback(){setTimeout(()=>{const t=this.attributes.getNamedItem("data-post-tags");t==null||t.value.split(",").forEach(e=>{this.postTags.push(e)}),this.render()})}render(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("ul");t&&(t.innerHTML=this.postTags.reduce((s,o)=>s+=`<li class="px-2 mb-1 mr-1 text-sm text-white bg-red-400 rounded-md leading-6 text-base:xsm mb-2:xsm mr-2:xsm">${o}</li>`,""))}});
