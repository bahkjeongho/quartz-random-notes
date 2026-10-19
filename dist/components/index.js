import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/random-notes.scss
var random_notes_default = ".random-notes {\n  margin: 1.5rem 0;\n}\n.random-notes .random-notes__list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.random-notes .random-notes__item {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 1rem;\n  padding: 0.55rem 0;\n  border-bottom: 1px solid var(--lightgray);\n}\n.random-notes .random-notes__label {\n  flex-shrink: 0;\n  color: var(--gray);\n  font-size: 0.8rem;\n}";

// src/components/scripts/random-notes.inline.ts
var random_notes_inline_default = 'function N(t,r){return!t||t==="index"||t.endsWith("/index")||t==="tags"||t.startsWith("tags/")||typeof r=="string"&&r!==""&&!r.endsWith(".md")||!r&&!t.includes("/")?null:t.startsWith("3.-object/31.-music/")?"music":t.startsWith("3.-object/32.-architecture/")?"architecture":t.startsWith("2.-wiki/")||!t.includes("/")?"wiki":null}function d(t,r,i){let e=t.slice(),o=Math.max(0,Math.min(r,e.length));for(let n=0;n<o;n++){let c=n+Math.floor(i()*(e.length-n)),s=e[n];e[n]=e[c],e[c]=s}return{picked:e.slice(0,o),rest:e.slice(o)}}function y(t,r,i=Math.random){let e={wiki:[],music:[],architecture:[]};for(let[u,k]of Object.entries(t)){let p=N(u,k?.filePath);if(!p)continue;let g=k?.title||u.split("/").pop()||u;e[p].push({slug:u,title:g,category:p})}let o=Math.round(r.total*r.wikiRatio),n=r.total-o,c=Math.round(n*r.musicShare),s=n-c,a=d(e.wiki,o,i),l=d(e.music,c,i),h=d(e.architecture,s,i),m=[...a.picked,...l.picked,...h.picked],f=r.total-m.length;if(f>0){let u=[...a.rest,...l.rest,...h.rest];m=m.concat(d(u,f,i).picked)}return d(m,m.length,i).picked}var b={wiki:"Wiki",music:"Music",architecture:"Architecture"};function x(t){return t.split("/").map(encodeURIComponent).join("/")}async function w(){let t=document.querySelectorAll(".random-notes");if(t.length===0)return;let r;try{r=await fetchData}catch(i){console.error("[RandomNotes] \\uC0C9\\uC778\\uC744 \\uBD88\\uB7EC\\uC624\\uC9C0 \\uBABB\\uD588\\uC2B5\\uB2C8\\uB2E4:",i);return}t.forEach(i=>{let e=i.querySelector(".random-notes__list");if(!e)return;let n=y(r,{total:Number(i.dataset.total)||15,wikiRatio:Number(i.dataset.wikiRatio)||.7,musicShare:Number(i.dataset.musicShare)||.5}).map(c=>{let s=document.createElement("li");s.className="random-notes__item";let a=document.createElement("a");a.className="internal random-notes__title",a.href="./"+x(c.slug),a.textContent=c.title;let l=document.createElement("span");return l.className="random-notes__label",l.textContent=b[c.category],s.append(a,l),s});e.replaceChildren(...n)})}document.addEventListener("nav",w);\n';
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