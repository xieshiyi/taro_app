export type IListItem =  {
  id: number
  author: string
  repo_name:string          // 仓库名称
  desc:string               // 项目描述
  lang_type: string         // 语言类型
  lang_color: string
  star_num: number          // 星数
  fork_num: number          // fork数
  today_star_num: number    // 今日星数
}
export type IUserItem =  {
  id: number
  author: string
  avatar: string
  repo_name:string         // 仓库名称
  desc:string              // 项目描述
}