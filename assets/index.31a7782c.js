import{h as a}from"./index.10c09ab4.js";import"./index.ea83c336.js";const o=`<style>
  @import url('/index.css');
</style>
<header class="flex flex-col">
  <slot name="title">TITLE</slot>
  <div class="flex flex-col xs:items-center xs:flex-row">
    <div class="flex items-center mr-4">
      <div class="mr-2">
        <img data-type="svg" src="/svg/tag.svg" />
      </div>
      <slot name="datePublished">DATEPUBLISHED</slot>
    </div>
    <div class="flex items-center mt-4 xs:mt-0">
      <div class="mr-2">
        <img data-type="svg" src="/svg/calendar.svg" />
      </div>
      <post-tags tags="{{ tags }}"></post-tags>
    </div>
  </div>
  <slot name="description">DESCRIPTION</slot>
</header>
`;customElements.define("blog-header",class extends HTMLElement{constructor(){super(),this.postTags=[];const t=a(o);this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0))}connectedCallback(){var e;const t=this.attributes.getNamedItem("data-post-tags");t==null||t.value.split(",").forEach(n=>{this.postTags.push(n)});const s=(e=this.shadowRoot)==null?void 0:e.querySelector("post-tags");s&&s.setAttribute("data-post-tags",this.postTags.toString())}});
