import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import type { RandomNotesOptions } from "../types";
import style from "./styles/random-notes.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/random-notes.inline.ts";

export type { RandomNotesOptions };

export default ((opts?: RandomNotesOptions) => {
  const { total = 15, wikiRatio = 0.6, thoughtsRatio = 0.2, musicShare = 0.5 } = opts ?? {};

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    // 홈(index) 페이지에서만 표시한다.
    if (props.fileData.slug !== "index") return null;

    return (
      <div
        class="random-notes"
        data-total={String(total)}
        data-wiki-ratio={String(wikiRatio)}
        data-thoughts-ratio={String(thoughtsRatio)}
        data-music-share={String(musicShare)}
      >
        <ul class="random-notes__list" />
      </div>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
