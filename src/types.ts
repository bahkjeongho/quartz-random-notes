export interface RandomNotesOptions {
  /** 홈에 표시할 노트 개수 */
  total?: number;
  /** 전체 중 Wiki(2. Wiki + 폴더 없는 노트) 비율 (0~1) */
  wikiRatio?: number;
  /** Object 몫 중 음악 비율 (0~1). 나머지는 건축 */
  musicShare?: number;
}
