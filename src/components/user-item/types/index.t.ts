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