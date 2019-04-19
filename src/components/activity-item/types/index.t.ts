export type IListItem =  {
  id: number
  avatar: string           // 用户头像
  user_name: string        // 用户名称
  author: string           // 作者
  repo_name:string         // 仓库名称
  time: number             // 多长时间前starred
  category: number         // 时长类型： 0: hour, 1: day; 2: week
}