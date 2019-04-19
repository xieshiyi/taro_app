import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ActivityItem from '../../components/activity-item'
import { IListItem } from '../../components/activity-item/types/index.t';
import './index.less'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  page_size: number,
  page_num: number,
  total: number,
  list: IListItem[]
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
    navigationBarTitleText: 'Activity'
  }
  constructor (props) {
    super(props)
    this.state = {
      page_num: 1,
      page_size: 10,
      total: 0,
      list: [{
        id: 0,
        avatar: 'https://jdc.jd.com/img/200',
        user_name: 'xsy',
        repo_name: 'taro_app',
        author: 'xsy',
        time: 5,
        category: 1
      }]
    }
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { list } = this.state
    return (
      <View className='activity'>
        {
          list.map(item=>{
            return <ActivityItem item={item} key={item.id} categoryType={item.category}></ActivityItem>
          })
        }
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
