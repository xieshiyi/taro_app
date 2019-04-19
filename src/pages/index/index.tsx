import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { IListItem, IUserItem } from './types/index.t'
import RepoItem from '../../components/repo-item'
import UserItem from '../../components/user-item'
// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  current: number,
  page_size: number,
  page_num: number,
  total: number,
  list: IListItem[],
  user_list: IUserItem[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
  state: PageState
}
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: 'Trending'
  }
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      page_size: 10,
      page_num: 1,
      total: 0,
      list: [{
        id: 0,
        author: 'xsy',
        repo_name: 'fsf',         // 仓库名称
        desc: 'description 描述描述描述，关于仓库描述文案',              // 项目描述
        lang_type: 'javascript',        // 语言类型
        lang_color: '#F5D222',
        star_num: 10,         // 星数
        fork_num: 104,         // fork数
        today_star_num: 2043    // 今日星数
      }],
      user_list: [{
        id: 0,
        author: 'xsy',
        avatar: 'https://jdc.jd.com/img/200',
        repo_name: 'fsf',         // 仓库名称
        desc: '描述描述描述，关于仓库描述文案'    
      }]
    }
  }
  changeCurrent(index: number){
    this.setState({
      current: index
    })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { current, list, user_list }  = this.state
    return (
      <View className='index'>
        <View className="top-nav">
          {/* 过滤icon */}
          <View className='at-icon at-icon-filter'></View>
          {/* tabs标签页 */}
          <View className='tabs'>
            <Text 
              className={`tab-item ${current === 0 ? "active" : ""}`} 
              onClick={()=>this.changeCurrent(0)}>
              REPO</Text>
            <Text 
              className={`tab-item ${current === 1 ? "active" : ""}`} 
              onClick={()=>this.changeCurrent(1)}>
              USER</Text>
          </View>
          {/* 搜索icon */}
          <View className='at-icon at-icon-search'></View>
        </View>
        <View 
          className='tab-pane'
          style={`display: ${current === 0 ? 'block' : 'none'}`}>
          <View className='repo-list'>
            {
              list.map(item=>{
                return <RepoItem item={item} key={item.id} categoryType={1}></RepoItem>
              })
            }
          </View>
        </View>
        <View 
          className='tab-pane'
          style={`display: ${current === 1 ? 'block' : 'none'}`}>
          <View className="user-list">
          {
              user_list.map(item=>{
                return <UserItem item={item} key={item.id}></UserItem>
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
