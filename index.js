import{a as m,S as y,i}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const g="https://pixabay.com/api/",h="50644019-b9f34b82140387cf531c9f13f";async function L(s){const t={key:h,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await m.get(g,{params:t})).data}let b=new y(".gallery a");const u=document.querySelector(".gallery"),d=document.querySelector(".loader");function q(s){const t=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:r,views:n,comments:f,downloads:p})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${o}" alt="${e}" />
        </a>
        <div class="info">
          <span>👍 ${r}</span>
          <span>👁️ ${n}</span>
          <span>💬 ${f}</span>
          <span>⬇️ ${p}</span>
        </div>
      </li>`).join("");u.insertAdjacentHTML("beforeend",t),b.refresh()}function S(){u.innerHTML=""}function v(){d.classList.remove("is-hidden")}function c(){d.classList.add("is-hidden")}const l=document.querySelector(".form");document.querySelector(".gallery");l.addEventListener("submit",async s=>{s.preventDefault();const t=l.elements["search-text"].value.trim();if(!t){i.error({message:"Please enter a search query!",position:"topRight"});return}v(),S();try{const o=await L(t);if(c(),!o.hits.length){i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}q(o.hits)}catch{c(),i.error({message:"An error occurred. Please try again later.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
