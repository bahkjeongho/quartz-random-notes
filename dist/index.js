import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/random-notes.scss
var random_notes_default = ".random-notes {\n  margin: 1.5rem 0;\n}\n.random-notes .random-notes__list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.random-notes .random-notes__item {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 1rem;\n  padding: 0.55rem 0;\n  border-bottom: 1px solid var(--lightgray);\n}\n.random-notes .random-notes__label {\n  flex-shrink: 0;\n  color: var(--gray);\n  font-size: 0.8rem;\n}";

// src/components/scripts/random-notes.inline.ts
var random_notes_inline_default = 'var x=["a_wiki/a1_hub/","a_wiki/a2_k-pop-idol/","a_wiki/a3_academic-program/","a_wiki/a4_journal/","a_wiki/a5_sports-team/"];function R(t,i){return!t||t==="index"||t.endsWith("/index")||t==="tags"||t.startsWith("tags/")||x.some(n=>t.startsWith(n))||typeof i=="string"&&i!==""&&!i.endsWith(".md")||!i&&!t.includes("/")?null:t.startsWith("c_blog/")?"thoughts":t.startsWith("b_object/b1_music/")?"music":t.startsWith("b_object/b2_architecture/")?"architecture":t.startsWith("a_wiki/")||!t.includes("/")?"wiki":null}function h(t,i,n){let e=t.slice(),s=Math.max(0,Math.min(i,e.length));for(let o=0;o<s;o++){let c=o+Math.floor(n()*(e.length-o)),r=e[o];e[o]=e[c],e[c]=r}return{picked:e.slice(0,s),rest:e.slice(s)}}function w(t,i,n=Math.random){let e={thoughts:[],wiki:[],music:[],architecture:[]};for(let[l,k]of Object.entries(t)){let g=R(l,k?.filePath);if(!g)continue;let N=k?.title||l.split("/").pop()||l;e[g].push({slug:l,title:N,category:g,filePath:k?.filePath})}let s=Math.round(i.total*i.wikiRatio),o=Math.round(i.total*i.thoughtsRatio),c=Math.max(0,i.total-s-o),r=Math.round(c*i.musicShare),m=c-r,a=h(e.thoughts,o,n),u=h(e.wiki,s,n),f=h(e.music,r,n),_=h(e.architecture,m,n),d=[...a.picked,...u.picked,...f.picked,..._.picked],y=i.total-d.length;if(y>0){let l=[...a.rest,...u.rest,...f.rest,..._.rest];d=d.concat(h(l,y,n).picked)}return h(d,d.length,n).picked}var E={thoughts:"Thoughts",wiki:"Wiki",music:"Music",architecture:"Architecture"};function p(t,i){let n=Number(t);return t===void 0||t===""||Number.isNaN(n)?i:n}function P(t){return t.split("/").map(encodeURIComponent).join("/")}var b=null;function M(){return b||(b=fetch("./random-labels.json").then(t=>t.ok?t.json():{}).catch(()=>({}))),b}async function C(){let t=document.querySelectorAll(".random-notes");if(t.length===0)return;let i;try{i=await fetchData}catch(e){console.error("[RandomNotes] \\uC0C9\\uC778\\uC744 \\uBD88\\uB7EC\\uC624\\uC9C0 \\uBABB\\uD588\\uC2B5\\uB2C8\\uB2E4:",e);return}let n=await M();t.forEach(e=>{let s=e.querySelector(".random-notes__list");if(!s)return;let c=w(i,{total:p(e.dataset.total,15),wikiRatio:p(e.dataset.wikiRatio,.6),thoughtsRatio:p(e.dataset.thoughtsRatio,.2),musicShare:p(e.dataset.musicShare,.5)}).map(r=>{let m=document.createElement("li");m.className="random-notes__item";let a=document.createElement("a");a.className="internal random-notes__title",a.href="./"+P(r.slug),a.textContent=r.title;let u=document.createElement("span");u.className="random-notes__label";let f=r.category==="wiki"&&r.filePath?n[r.filePath]:void 0;return u.textContent=f||E[r.category],m.append(a,u),m});s.replaceChildren(...c)})}document.addEventListener("nav",C);\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/RandomNotes.tsx
var RandomNotes_default = ((opts) => {
  const { total = 15, wikiRatio = 0.6, thoughtsRatio = 0.2, musicShare = 0.5 } = opts ?? {};
  const Component = (props) => {
    if (props.fileData.slug !== "index") return null;
    return /* @__PURE__ */ u2(
      "div",
      {
        class: "random-notes",
        "data-total": String(total),
        "data-wiki-ratio": String(wikiRatio),
        "data-thoughts-ratio": String(thoughtsRatio),
        "data-music-share": String(musicShare),
        children: /* @__PURE__ */ u2("ul", { class: "random-notes__list" })
      }
    );
  };
  Component.css = random_notes_default;
  Component.afterDOMLoaded = random_notes_inline_default;
  return Component;
});

export { RandomNotes_default as RandomNotes };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map