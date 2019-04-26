export interface IListItem extends IRepo {
  id: number
  author: string
  language: string         // 语言类型
  languageColor: string
  stars: number          // 星数
  forks: number          // fork数
  currentPeriodStars: number    // 今日星数
}
export type IRepo = {
  name: string
  description: string
  url: string
}