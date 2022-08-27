(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();function i(t){const n=document.createElement("template");return n.innerHTML=t.trim(),n.content}const c=`<style>
  @import url('/index.css');

  #dropdown-icons:checked ~ * .menu-icon {
    display: none;
    visibility: hidden;
  }
  #dropdown-icons:checked ~ * .close-icon {
    display: block;
    visibility: visible;
  }
  #dropdown-icons:checked ~ .dropdown {
    display: block;
    visibility: visible;
  }
</style>
<div class="relative">
  <input id="dropdown-icons" type="checkbox" class="hidden" />
  <button
    id="toggle-btn"
    class="absolute top-4 right-4 z-10 block text-white xs:hidden cursor-pointer"
  >
    <label for="dropdown-icons" class="cursor-pointer">
      <img data-type="svg" src="/svg/menu.svg" class="menu-icon" style="filter: invert(1)" />
      <img
        data-type="svg"
        src="/svg/close.svg"
        class="hidden close-icon"
        style="filter: invert(1)"
      />
    </label>
  </button>
  <div class="dropdown fixed inset-0 h-full w-full block hidden bg-black opacity-90 cursor-default">
    <nav class="absolute w-full pt-[95px] z-11">
      <ul>
        <li class="text-left cursor-pointer hover:underline hover:bg-opacity-5 hover:bg-gray-400">
          <a href="/" class="block w-full h-full px-8 py-4 text-white">FRONTPAGE</a>
        </li>
        <li class="text-left cursor-pointer hover:underline hover:bg-opacity-5 hover:bg-gray-400">
          <a href="/blog" class="block w-full h-full px-8 py-4 text-white">BLOG</a>
        </li>
        <li class="px-8 py-4">
          <icon-links class="items-center xs:items-start"></icon-links>
        </li>
      </ul>
    </nav>
  </div>
</div>
`;customElements.define("nav-bar-dropdown",class extends HTMLElement{constructor(){super();const t=i(c);this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0))}connectedCallback(){var t;(t=this.shadowRoot)==null||t.querySelector("#toggle-btn").addEventListener("click",function(){const n=document.querySelector("html");n!=null&&n.classList.contains("scroll-lock")?n.classList.remove("scroll-lock"):n==null||n.classList.add("scroll-lock")})}});const a=`<style>
  @import url('/index.css');
</style>
<div class="items-center xs:items-start flex flex-col">
  <div class="flex">
    <a
      class="flex mr-2 text-white cursor-pointer"
      href="mailto:teemukoivisto.xyz@gmail.com"
      aria-label="Send an email"
    >
      <img src="/svg/mail.svg" style="filter: invert(1)" />
    </a>
    <a
      class="flex mr-2 text-white cursor-pointer"
      href="https://github.com/teemukoivisto"
      aria-label="My Github profile"
    >
      <img src="/svg/github.svg" style="filter: invert(1)" />
    </a>
    <a
      class="flex mr-2 text-white cursor-pointer"
      href="https://www.linkedin.com/in/teemu-koivisto-75304b114"
      aria-label="My Linkedin profile"
    >
      <img src="/svg/linkedin.svg" style="filter: invert(1)" />
    </a>
  </div>
  <address class="p-0 m-0 text-sm not-italic text-white">teemukoivisto.xyz@gmail.com</address>
</div>
`;customElements.define("icon-links",class extends HTMLElement{constructor(){super();const t=i(a);this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0))}});const d=`<style>
  @import url('/index.css');
</style>
<nav class="flex justify-between px-8 py-6 nav-bg b-shadow">
  <div class="flex items-center">
    <a href="/" class="mr-8 leading-4 title-text text-white hover:underline">
      <div class="text-2xl leading-6">Teemu</div>
      <div class="ml-2 text-2xl">Koivisto</div>
    </a>
    <div class="items-center hidden xs:visible xs:flex">
      <a href="/blog" class="text-white hover:underline">Blog</a>
      <div class="bg-transparent xs:bg-white nav-divider-bar"></div>
      <icon-links></icon-links>
    </div>
  </div>
  <nav-bar-dropdown></nav-bar-dropdown>
</nav>
`;customElements.define("nav-bar",class extends HTMLElement{constructor(){super();const t=i(d);this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0))}});const u=`<style>
  @import url('/index.css');
</style>
<footer class="items-center xs:items-start pt-2 pb-4 footer-bg">
  <nav class="flex flex-col items-center justify-center mt-4 xs:flex-row xs:items-start">
    <a href="/" class="title-text text-white hover:underline"> Teemu Koivisto </a>
    <div aria-hidden class="bg-transparent xs:bg-white nav-divider-bar"></div>
    <a href="/blog" class="text-white hover:underline">Blog</a>
    <div aria-hidden class="bg-transparent xs:bg-white nav-divider-bar"></div>
    <icon-links class="items-center xs:items-start"></icon-links>
  </nav>
  <div class="flex flex-col items-center mt-8">
    <a
      class="text-xs text-blue-900 hover:underline"
      href="https://github.com/TeemuKoivisto/teemukoivisto.xyz"
    >
      This site&apos;s code is Open Source
    </a>
  </div>
</footer>
`;customElements.define("my-footer",class extends HTMLElement{constructor(){super();const t=i(u);this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0))}});export{i as h};
