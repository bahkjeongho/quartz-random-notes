import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/random-notes.scss
var random_notes_default = ".random-notes {\n  margin: 1.5rem 0;\n}\n.random-notes .random-notes__list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.random-notes .random-notes__item {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 1rem;\n  padding: 0.55rem 0;\n  border-bottom: 1px solid var(--lightgray);\n}\n.random-notes .random-notes__label {\n  flex-shrink: 0;\n  color: var(--gray);\n  font-size: 0.8rem;\n}";

// src/components/scripts/random-notes.inline.ts
var random_notes_inline_default = 'function N(t,i){return!t||t==="index"||t.endsWith("/index")||t==="tags"||t.startsWith("tags/")||typeof i=="string"&&i!==""&&!i.endsWith(".md")||!i&&!t.includes("/")?null:t.startsWith("3.-object/31.-music/")?"music":t.startsWith("3.-object/32.-architecture/")?"architecture":t.startsWith("2.-wiki/")||!t.includes("/")?"wiki":null}function h(t,i,c){let e=t.slice(),o=Math.max(0,Math.min(i,e.length));for(let n=0;n<o;n++){let s=n+Math.floor(c()*(e.length-n)),r=e[n];e[n]=e[s],e[s]=r}return{picked:e.slice(0,o),rest:e.slice(o)}}function y(t,i,c=Math.random){let e={wiki:[],music:[],architecture:[]};for(let[d,f]of Object.entries(t)){let p=N(d,f?.filePath);if(!p)continue;let b=f?.title||d.split("/").pop()||d;e[p].push({slug:d,title:b,category:p,filePath:f?.filePath})}let o=Math.round(i.total*i.wikiRatio),n=i.total-o,s=Math.round(n*i.musicShare),r=n-s,u=h(e.wiki,o,c),a=h(e.music,s,c),m=h(e.architecture,r,c),l=[...u.picked,...a.picked,...m.picked],g=i.total-l.length;if(g>0){let d=[...u.rest,...a.rest,...m.rest];l=l.concat(h(d,g,c).picked)}return h(l,l.length,c).picked}var w={wiki:"Wiki",music:"Music",architecture:"Architecture"};function x(t){return t.split("/").map(encodeURIComponent).join("/")}var k=null;function P(){return k||(k=fetch("./random-labels.json").then(t=>t.ok?t.json():{}).catch(()=>({}))),k}async function R(){let t=document.querySelectorAll(".random-notes");if(t.length===0)return;let i;try{i=await fetchData}catch(e){console.error("[RandomNotes] \\uC0C9\\uC778\\uC744 \\uBD88\\uB7EC\\uC624\\uC9C0 \\uBABB\\uD588\\uC2B5\\uB2C8\\uB2E4:",e);return}let c=await P();t.forEach(e=>{let o=e.querySelector(".random-notes__list");if(!o)return;let s=y(i,{total:Number(e.dataset.total)||15,wikiRatio:Number(e.dataset.wikiRatio)||.7,musicShare:Number(e.dataset.musicShare)||.5}).map(r=>{let u=document.createElement("li");u.className="random-notes__item";let a=document.createElement("a");a.className="internal random-notes__title",a.href="./"+x(r.slug),a.textContent=r.title;let m=document.createElement("span");m.className="random-notes__label";let l=r.category==="wiki"&&r.filePath?c[r.filePath]:void 0;return m.textContent=l||w[r.category],u.append(a,m),u});o.replaceChildren(...s)})}document.addEventListener("nav",R);\n';
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
  const { total = 15, wikiRatio = 0.7, musicShare = 0.5 } = opts ?? {};
  const Component = (props) => {
    if (props.fileData.slug !== "index") return null;
    return /* @__PURE__ */ u2(
      "div",
      {
        class: "random-notes",
        "data-total": String(total),
        "data-wiki-ratio": String(wikiRatio),
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