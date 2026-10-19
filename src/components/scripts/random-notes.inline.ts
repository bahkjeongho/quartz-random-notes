import { pickNotes } from "./pick";
import type { Category } from "./pick";

const LABELS: Record<Category, string> = {
  wiki: "Wiki",
  music: "Music",
  architecture: "Architecture",
};

function encodeSlug(slug: string): string {
  return slug.split("/").map(encodeURIComponent).join("/");
}

async function render() {
  const containers = document.querySelectorAll<HTMLElement>(".random-notes");
  if (containers.length === 0) return;

  let index;
  try {
    index = await fetchData;
  } catch (error) {
    console.error("[RandomNotes] 색인을 불러오지 못했습니다:", error);
    return;
  }

  containers.forEach((container) => {
    const list = container.querySelector<HTMLElement>(".random-notes__list");
    if (!list) return;

    const notes = pickNotes(index, {
      total: Number(container.dataset.total) || 15,
      wikiRatio: Number(container.dataset.wikiRatio) || 0.7,
      musicShare: Number(container.dataset.musicShare) || 0.5,
    });

    const items = notes.map((note) => {
      const li = document.createElement("li");
      li.className = "random-notes__item";

      const link = document.createElement("a");
      link.className = "internal random-notes__title";
      link.href = "./" + encodeSlug(note.slug);
      link.textContent = note.title;

      const label = document.createElement("span");
      label.className = "random-notes__label";
      label.textContent = LABELS[note.category];

      li.append(link, label);
      return li;
    });

    list.replaceChildren(...items);
  });
}

// 홈에 들어올 때마다(페이지 이동 포함) 새로 뽑는다.
document.addEventListener("nav", render);
