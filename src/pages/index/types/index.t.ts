export interface IListItem extends IRepo {
  id: number
  author: string
  language: string         // 语言类型
  languageColor: string
  stars: number          // 星数
  forks: number          // fork数
  currentPeriodStars: number    // 今日星数
}
export interface IUserItem {
  id: number
  username: string
  url: string
  author: string
  avatar: string
  repo: IRepo         // 仓库
  description: string              // 项目描述
}
export type IRepo = {
  name: string
  description: string
  url: string
}
export interface IRange{
  name: string
  value: string
}
export interface ILanguage{
  name: string
  urlParam: string
}