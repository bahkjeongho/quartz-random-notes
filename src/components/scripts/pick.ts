export type Category = "thoughts" | "wiki" | "music" | "architecture";

export interface IndexEntry {
  filePath?: string;
  title?: string;
}

export interface PickOptions {
  total: number;
  wikiRatio: number;
  thoughtsRatio: number;
  musicShare: number;
}

export interface PickedNote {
  slug: string;
  title: string;
  category: Category;
  filePath?: string;
}

/** 홈에서 뽑지 않는 폴더(검색과 링크로는 열린다). K-Pop 그룹 멤버 개인 노트(A2)와 학교 전공·프로그램 노트(A3), 스포츠 팀 노트(A5), 학술지 노트(A4), 허브(A1)가 모여 있다. */
export const HIDDEN_PREFIXES = [
  "a_wiki/a1_hub/",
  "a_wiki/a2_k-pop-idol/",
  "a_wiki/a3_academic-program/",
  "a_wiki/a4_journal/",
  "a_wiki/a5_sports-team/",
];

/** 색인의 slug를 분야로 분류한다. 노트가 아닌 페이지(홈, 태그, 폴더 페이지)는 null. */
export function classify(slug: string, filePath?: string): Category | null {
  if (!slug || slug === "index" || slug.endsWith("/index")) return null;
  if (slug === "tags" || slug.startsWith("tags/")) return null;
  if (HIDDEN_PREFIXES.some((prefix) => slug.startsWith(prefix))) return null;
  if (typeof filePath === "string" && filePath !== "" && !filePath.endsWith(".md")) return null;
  // 폴더 페이지는 filePath가 없다. 루트 위치의 slug는 폴더 페이지일 수 있으므로 제외한다.
  if (!filePath && !slug.includes("/")) return null;
  if (slug.startsWith("c_blog/")) return "thoughts";
  if (slug.startsWith("b_object/b1_music/")) return "music";
  if (slug.startsWith("b_object/b2_architecture/")) return "architecture";
  if (slug.startsWith("a_wiki/") || !slug.includes("/")) return "wiki";
  return null;
}

/** 배열에서 n개를 중복 없이 무작위로 뽑는다. 뽑힌 것과 남은 것을 함께 돌려준다. */
export function sample<T>(items: T[], n: number, rng: () => number): { picked: T[]; rest: T[] } {
  const pool = items.slice();
  const count = Math.max(0, Math.min(n, pool.length));
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(rng() * (pool.length - i));
    const tmp = pool[i] as T;
    pool[i] = pool[j] as T;
    pool[j] = tmp;
  }
  return { picked: pool.slice(0, count), rest: pool.slice(count) };
}

/** 색인에서 분야 비율에 맞춰 노트를 뽑는다. 모자라는 분야가 있으면 남은 노트로 채운다. */
export function pickNotes(
  index: Record<string, IndexEntry>,
  opts: PickOptions,
  rng: () => number = Math.random,
): PickedNote[] {
  const pools: Record<Category, PickedNote[]> = {
    thoughts: [],
    wiki: [],
    music: [],
    architecture: [],
  };
  for (const [slug, entry] of Object.entries(index)) {
    const category = classify(slug, entry?.filePath);
    if (!category) continue;
    const title = entry?.title || slug.split("/").pop() || slug;
    pools[category].push({ slug, title, category, filePath: entry?.filePath });
  }

  // Math.round는 0.5를 올림한다. Object 몫(음악+건축)은 Wiki와 Thoughts를 뺀 나머지다.
  const wikiN = Math.round(opts.total * opts.wikiRatio);
  const thoughtsN = Math.round(opts.total * opts.thoughtsRatio);
  const objectN = Math.max(0, opts.total - wikiN - thoughtsN);
  const musicN = Math.round(objectN * opts.musicShare);
  const architectureN = objectN - musicN;

  const thoughts = sample(pools.thoughts, thoughtsN, rng);
  const wiki = sample(pools.wiki, wikiN, rng);
  const music = sample(pools.music, musicN, rng);
  const architecture = sample(pools.architecture, architectureN, rng);

  let picks = [...thoughts.picked, ...wiki.picked, ...music.picked, ...architecture.picked];

  const shortfall = opts.total - picks.length;
  if (shortfall > 0) {
    const leftovers = [...thoughts.rest, ...wiki.rest, ...music.rest, ...architecture.rest];
    picks = picks.concat(sample(leftovers, shortfall, rng).picked);
  }

  return sample(picks, picks.length, rng).picked;
}
