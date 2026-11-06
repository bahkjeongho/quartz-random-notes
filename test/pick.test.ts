import { describe, expect, it } from "vitest";
import { classify, pickNotes } from "../src/components/scripts/pick";

function makeIndex(thoughts = 12) {
  const index: Record<string, { filePath?: string; title?: string }> = {};
  for (let i = 0; i < thoughts; i++) index[`c_blog/t${i}`] = { filePath: `t${i}.md`, title: `T${i}` };
  for (let i = 0; i < 2019; i++) index[`b_object/b1_music/m${i}`] = { filePath: `x/m${i}.md`, title: `M${i}` };
  for (let i = 0; i < 61; i++) index[`b_object/b2_architecture/a${i}`] = { filePath: `x/a${i}.md`, title: `A${i}` };
  for (let i = 0; i < 883; i++) index[`a_wiki/w${i}`] = { filePath: `x/w${i}.md`, title: `W${i}` };
  for (let i = 0; i < 48; i++) index[`root${i}`] = { filePath: `r${i}.md`, title: `R${i}` };
  index["index"] = { filePath: "index.md", title: "Home" };
  index["tags/design"] = { title: "Tag" };
  index["b_object/b1_music"] = { title: "Music folder" };
  index["b_object"] = { title: "Object folder" };
  index["a_wiki"] = { title: "Wiki folder" };
  index["c_blog"] = { title: "Thoughts folder" };
  index["c_blog/index"] = { filePath: "t/index.md", title: "thoughts index" };
  index["b_object/b1_music/index"] = { filePath: "x/index.md", title: "folder index" };
  return index;
}

describe("classify: 숨김 폴더", () => {
  it("K-Pop 멤버 폴더는 뽑지 않는다", () => {
    expect(classify("a_wiki/a2_k-pop-idol/rm", "A_Wiki/A2_K-Pop Idol/RM.md")).toBeNull();
    expect(classify("a_wiki/a3_academic-program/ma-fashion-csm", "A_Wiki/A3_Academic Program/MA Fashion (CSM).md")).toBeNull();
    expect(classify("a_wiki/a5_sports-team/chicago-cubs", "A_Wiki/A5_Sports Team/Chicago Cubs.md")).toBeNull();
    expect(classify("a_wiki/a4_journal/antikythera", "A_Wiki/A4_Journal/Antikythera.md")).toBeNull();
    expect(classify("a_wiki/aespa", "A_Wiki/aespa.md")).toBe("wiki");
  });
});

describe("classify", () => {
  it("분야를 구분한다", () => {
    expect(classify("b_object/b1_music/x", "a.md")).toBe("music");
    expect(classify("b_object/b2_architecture/x", "a.md")).toBe("architecture");
    expect(classify("a_wiki/x", "a.md")).toBe("wiki");
    expect(classify("c_blog/x", "a.md")).toBe("thoughts");
    expect(classify("root-note", "a.md")).toBe("wiki");
  });
  it("노트가 아닌 페이지는 제외한다", () => {
    expect(classify("index")).toBeNull();
    expect(classify("tags/design")).toBeNull();
    expect(classify("b_object")).toBeNull();
    expect(classify("a_wiki")).toBeNull();
    expect(classify("c_blog")).toBeNull();
    expect(classify("c_blog/index", "i.md")).toBeNull();
    expect(classify("b_object/b1_music")).toBeNull();
    expect(classify("b_object/b1_music/index", "i.md")).toBeNull();
  });
});

describe("pickNotes", () => {
  const opts = { total: 15, wikiRatio: 0.6, thoughtsRatio: 0.2, musicShare: 0.5 };

  it("15개를 중복 없이 뽑고 비율은 Wiki 9 / Thoughts 3 / 음악 2 / 건축 1이다", () => {
    for (let run = 0; run < 50; run++) {
      const notes = pickNotes(makeIndex(), opts);
      expect(notes).toHaveLength(15);
      expect(new Set(notes.map((n) => n.slug)).size).toBe(15);
      const count = (c: string) => notes.filter((n) => n.category === c).length;
      expect(count("wiki")).toBe(9);
      expect(count("thoughts")).toBe(3);
      expect(count("music")).toBe(2);
      expect(count("architecture")).toBe(1);
      expect(notes.every((n) => classify(n.slug, "x.md") !== null)).toBe(true);
    }
  });

  it("10개(모바일)면 Wiki 6 / Thoughts 2 / 음악 1 / 건축 1이다", () => {
    const notes = pickNotes(makeIndex(), { ...opts, total: 10 });
    const count = (c: string) => notes.filter((n) => n.category === c).length;
    expect(notes).toHaveLength(10);
    expect([count("wiki"), count("thoughts"), count("music"), count("architecture")]).toEqual([6, 2, 1, 1]);
  });

  it("Thoughts가 비어 있으면 남은 노트로 채워 총 개수를 유지한다", () => {
    for (let run = 0; run < 20; run++) {
      const notes = pickNotes(makeIndex(0), opts);
      expect(notes).toHaveLength(15);
      expect(new Set(notes.map((n) => n.slug)).size).toBe(15);
      expect(notes.filter((n) => n.category === "thoughts")).toHaveLength(0);
    }
  });

  it("Thoughts 노트가 1개뿐이면 그 1개만 쓰고 나머지는 채운다", () => {
    const notes = pickNotes(makeIndex(1), opts);
    expect(notes).toHaveLength(15);
    expect(notes.filter((n) => n.category === "thoughts")).toHaveLength(1);
  });

  it("thoughtsRatio가 0이면 Thoughts는 뽑지 않는다", () => {
    const notes = pickNotes(makeIndex(), { ...opts, wikiRatio: 0.7, thoughtsRatio: 0 });
    expect(notes.filter((n) => n.category === "thoughts")).toHaveLength(0);
    expect(notes.filter((n) => n.category === "wiki")).toHaveLength(11);
  });

  it("호출마다 결과가 달라진다", () => {
    const a = pickNotes(makeIndex(), opts).map((n) => n.slug).join();
    const b = pickNotes(makeIndex(), opts).map((n) => n.slug).join();
    expect(a).not.toBe(b);
  });

  it("건축 노트가 모자라면 다른 분야로 채워 총 개수를 유지한다", () => {
    const index: Record<string, { filePath?: string; title?: string }> = {};
    for (let i = 0; i < 30; i++) index[`a_wiki/w${i}`] = { filePath: `w${i}.md`, title: `W${i}` };
    index["b_object/b2_architecture/only"] = { filePath: "a.md", title: "Only" };
    const notes = pickNotes(index, opts);
    expect(notes).toHaveLength(15);
    expect(notes.filter((n) => n.category === "architecture")).toHaveLength(1);
  });

  it("전체 노트가 15개보다 적으면 있는 만큼만 돌려준다", () => {
    const index = { "a_wiki/a": { filePath: "a.md", title: "A" } };
    expect(pickNotes(index, opts)).toHaveLength(1);
  });
});
