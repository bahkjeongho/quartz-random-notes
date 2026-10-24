export interface RandomNotesOptions {
  /** 홈에 표시할 노트 개수 */
  total?: number;
  /** 전체 중 Wiki(2 Wiki + 폴더 없는 노트) 비율 (0~1). 기본 0.6 */
  wikiRatio?: number;
  /** 전체 중 Thoughts(1 Thoughts) 비율 (0~1). 기본 0.2. 노트가 모자라면 다른 분야로 채운다 */
  thoughtsRatio?: number;
  /** Object 몫(전체에서 Wiki와 Thoughts를 뺀 나머지) 중 음악 비율 (0~1). 나머지는 건축 */
  musicShare?: number;
}
