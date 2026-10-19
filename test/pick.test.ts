import { describe, expect, it } from "vitest";
import { classify, pickNotes } from "../src/components/scripts/pick";

function makeIndex() {
  const index: Record<string, { filePath?: string; title?: string }> = {};
  for (let i = 0; i < 2019; i++) index[`3.-object/31.-music/m${i}`] = { filePath: `x/m${i}.md`, title: `M${i}` };
  for (let i = 0; i < 61; i++) index[`3.-object/32.-architecture/a${i}`] = { filePath: `x/a${i}.md`, title: `A${i}` };
  for (let i = 0; i < 883; i++) index[`2.-wiki/w${i}`] = { filePath: `x/w${i}.md`, title: `W${i}` };
  for (let i = 0; i < 48; i++) index[`root${i}`] = { filePath: `r${i}.md`, title: `R${i}` };
  index["index"] = { filePath: "index.md", title: "Home" };
  index["tags/design"] = { title: "Tag" };
  index["3.-object/31.-music"] = { title: "Music folder" };
  index["3.-object"] = { title: "Object folder" };
  index["2.-wiki"] = { title: "Wiki folder" };
  index["3.-object/31.-music/index"] = { filePath: "x/index.md", title: "folder index" };
  return index;
}

describe("classify", () => {
  it("분야를 구분한다", () => {
    expect(classify("3.-object/31.-music/x", "a.md")).toBe("music");
    expect(classify("3.-object/32.-architecture/x", "a.md")).toBe("architecture");
    expect(classify("2.-wiki/x", "a.md")).toBe("wiki");
    expect(classify("root-note", "a.md")).toBe("wiki");
  });
  it("노트가 아닌 페이지는 제외한다", () => {
    expect(classify("index")).toBeNull();
    expect(classify("tags/design")).toBeNull();
    expect(classify("3.-object")).toBeNull();
    expect(classify("2.-wiki")).toBeNull();
    expect(classify("3.-object/31.-music")).toBeNull();
    expect(classify("3.-object/31.-music/index", "i.md")).toBeNull();
  });
});

describe("pickNotes", () => {
  const opts = { total: 15, wikiRatio: 0.7, musicShare: 0.5 };

  it("15개를 중복 없이 뽑고 비율은 Wiki 11 / 음악 2 / 건축 2이다", () => {
    for (let run = 0; run < 50; run++) {
      const notes = pickNotes(makeIndex(), opts);
      expect(notes).toHaveLength(15);
      expect(new Set(notes.map((n) => n.slug)).size).toBe(15);
      const count = (c: string) => notes.filter((n) => n.category === c).length;
      expect(count("wiki")).toBe(11);
      expect(count("music")).toBe(2);
      expect(count("architecture")).toBe(2);
      expect(notes.every((n) => classify(n.slug, "x.md") !== null)).toBe(true);
    }
  });

  it("호출마다 결과가 달라진다", () => {
    const a = pickNotes(makeIndex(), opts).map((n) => n.slug).join();
    const b = pickNotes(makeIndex(), opts).map((n) => n.slug).join();
    expect(a).not.toBe(b);
  });

  it("건축 노트가 모자라면 다른 분야로 채워 총 개수를 유지한다", () => {
    const index: Record<string, { filePath?: string; title?: string }> = {};
    for (let i = 0; i < 30; i++) index[`2.-wiki/w${i}`] = { filePath: `w${i}.md`, title: `W${i}` };
    index["3.-object/32.-architecture/only"] = { filePath: "a.md", title: "Only" };
    const notes = pickNotes(index, opts);
    expect(notes).toHaveLength(15);
    expect(notes.filter((n) => n.category === "architecture")).toHaveLength(1);
  });

  it("전체 노트가 15개보다 적으면 있는 만큼만 돌려준다", () => {
    const index = { "2.-wiki/a": { filePath: "a.md", title: "A" } };
    expect(pickNotes(index, opts)).toHaveLength(1);
  });
});
