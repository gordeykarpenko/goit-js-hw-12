import{a as q,S as P,i as n}from"./assets/vendor-DcHCnVjq.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const E="56090395-9f69eccaa178ff7c2ada00c96",R="https://pixabay.com/api/",B=15;async function g(e,r){return(await q.get(R,{params:{key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:B}})).data}const y=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.querySelector(".load-more-button"),I=new P(".gallery a",{captionsData:"alt",captionDelay:250});function M(e){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img
          class="gallery-image"
          src="${e.webformatURL}"
          alt="${e.tags}"
          loading="lazy"
        />
        <div class="image-info">
          <p><b>Likes</b>${e.likes}</p>
          <p><b>Views</b>${e.views}</p>
          <p><b>Comments</b>${e.comments}</p>
          <p><b>Downloads</b>${e.downloads}</p>
        </div>
      </a>
    </li>
  `}function b(e){const r=e.map(M).join("");y.insertAdjacentHTML("beforeend",r),I.refresh()}function $(){y.innerHTML=""}function L(){p.classList.add("is-visible")}function w(){p.classList.remove("is-visible")}function v(){h.classList.add("is-visible")}function f(){h.classList.remove("is-visible")}const u=document.querySelector(".form"),m=u.querySelector("button"),A=document.querySelector(".load-more-button");let d="",a=1,l=0;u.addEventListener("submit",async e=>{e.preventDefault();const r=u.elements["search-text"].value.trim();if(!r){n.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}d=r,a=1,l=0,$(),f(),L(),m.disabled=!0;try{const{hits:s,totalHits:i}=await g(d,a);if(s.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(s),l=s.length,S(i)}catch{n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{w(),m.disabled=!1}});A.addEventListener("click",async()=>{a+=1,f(),L();try{const{hits:e,totalHits:r}=await g(d,a);b(e),l+=e.length,O(),S(r)}catch{a-=1,n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),v()}finally{w()}});function S(e){if(l>=e){f(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}v()}function O(){const e=document.querySelector(".gallery-item");if(!e)return;const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
