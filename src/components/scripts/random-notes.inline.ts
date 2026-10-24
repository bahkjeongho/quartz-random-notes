import { pickNotes } from "./pick";
import type { Category } from "./pick";

const LABELS: Record<Category, string> = {
  thoughts: "Thoughts",
  wiki: "Wiki",
  music: "Music",
  architecture: "Architecture",
};

// 0도 유효한 값이다(예: thoughtsRatio 0). 숫자가 아닐 때만 기본값을 쓴다.
function num(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return value === undefined || value === "" || Number.isNaN(n) ? fallback : n;
}

function encodeSlug(slug: string): string {
  return slug.split("/").map(encodeURIComponent).join("/");
}

// 노트별 세부 분류 라벨(예: Photographer). 사이트 루트의 random-labels.json에서 읽는다.
// 파일이 없거나 읽지 못하면 기본 라벨(Wiki)로 표시한다.
let labelsPromise: Promise<Record<string, string>> | null = null;

function loadLabels(): Promise<Record<string, string>> {
  if (!labelsPromise) {
    labelsPromise = fetch("./random-labels.json")
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}));
  }
  return labelsPromise;
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

  const labels = await loadLabels();

  containers.forEach((container) => {
    const list = container.querySelector<HTMLElement>(".random-notes__list");
    if (!list) return;

    const notes = pickNotes(index, {
      total: num(container.dataset.total, 15),
      wikiRatio: num(container.dataset.wikiRatio, 0.6),
      thoughtsRatio: num(container.dataset.thoughtsRatio, 0.2),
      musicShare: num(container.dataset.musicShare, 0.5),
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
      const detail = note.category === "wiki" && note.filePath ? labels[note.filePath] : undefined;
      label.textContent = detail || LABELS[note.category];

      li.append(link, label);
      return li;
    });

    list.replaceChildren(...items);
  });
}

// 홈에 들어올 때마다(페이지 이동 포함) 새로 뽑는다.
document.addEventListener("nav", render);
