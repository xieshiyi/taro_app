import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { IListItem, IUserItem, IRange, ILanguage } from './types/index.t'
import RepoItem from '../../components/repo-item'
import UserItem from '../../components/user-item'
import Empty from '../../components/empty/index'
import { get as getGlobalData, set as setGlobalData  } from '../../utils/global_data'
import { languages } from '../../utils/language'
import { GLOBAL_CONFIG } from '../../constants/globalConfig'
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
  fixed: boolean,
  isHidden: boolean,
  current: number,
  category: {
    name: string,
    value: string
  }
  language: ILanguage,
  repos: IListItem[],
  developers: IUserItem[],
  range: [IRange[], ILanguage[]]
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
      fixed: false,
      isHidden: false,
      current: 0,
      category: {
        'name': 'Today',
        'value': 'daily'
      },
      language: {
        'name': 'All',
        'urlParam': ''
      },
      repos: [],
      developers: [],
      range: [
        [{'name': 'Today',
        'value': 'daily'},
        {'name': 'Week',
          'value': 'weekly'},
        {'name': 'Month',
          'value': 'monthly'}],
        languages
      ]
    }
  }
  changeCurrent(index: number){
    this.setState({
      current: index
    })
    Taro.pageScrollTo({
      scrollTop: 0
    })
  }
  componentDidMount(){
    Taro.showLoading({ title: GLOBAL_CONFIG.LOADING_TEXT })
    this.loadItemList()
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPageScroll(obj) {
    const { fixed } = this.state
    if (obj.scrollTop > 0) {
      if (!fixed) {
        this.setState({
          fixed: true
        })
      }
    } else {
      this.setState({
        fixed: false
      })
    }
  }
  onScroll(e) {
    if (e.detail.scrollTop < 0) return;
    if (e.detail.deltaY > 0) {
      let animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      }).bottom(25).step().export()
      this.setState({
        isHidden: false,
        animation: animation
      })
    } else {
      //向下滚动
      if (!this.state.isHidden) {
        let animation = Taro.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        }).bottom(-95).step().export()
        this.setState({
          isHidden: true,
          animation: animation
        })
      }
    }
  }
  loadLanguages() {
    let that = this
    const db = wx.cloud.database()
    let openid = getGlobalData('openid')
    if (!openid) {
      openid = Taro.getStorageSync('openid')
    }
    db.collection('languages')
      .where({
        _openid: openid, // 当前用户 openid
      })
      .get()
      .then(res => {
        console.log(res)
        if (res.data.length > 0) {
          setGlobalData('favoriteLanguages', res.data[0].languages)
          // that.updateLanguages()
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
  loadItemList () {
    const { current } = this.state
    let that = this
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'trend',
      // 传递给云函数的event参数
      data: {
        type: 'repositories',
        language: that.state.language.urlParam,
        since: that.state.category.value
      }
    }).then(res => {
      that.setState({
        repos: res.result.data
      }, ()=>{
        Taro.pageScrollTo({
          scrollTop: 0
        })
        if (current === 0) {
          Taro.hideLoading()
          Taro.stopPullDownRefresh()
        }
      })
    }).catch(err => {
      Taro.hideLoading()
      Taro.stopPullDownRefresh()
    })

    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'trend',
      // 传递给云函数的event参数
      data: {
        type: 'developers',
        language: that.state.language.urlParam,
        since: that.state.category.value
      }
    }).then(res => {
      that.setState({
        developers: res.result.data
      }, ()=>{
        Taro.pageScrollTo({
          scrollTop: 0
        })
        if (current === 1) {
          Taro.stopPullDownRefresh()
          Taro.hideLoading()
        }
      })
    }).catch(err => {
      Taro.hideLoading()
      Taro.stopPullDownRefresh()
    })
  }
  render () {
    const { current, repos, developers, fixed }  = this.state
    return (
      <View className='index'>
        <View className={`top-nav ${fixed ? 'segment-fixed' : ''}`}>
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
          {
            repos.length > 0 ?
            <View className='repo-list'>
              {
                repos.map(item=>{
                  return <RepoItem item={item} key={item.id} categoryType={1}></RepoItem>
                })
              }
            </View>
            :
            <Empty />
          }
        </View>
        <View 
          className='tab-pane'
          style={`display: ${current === 1 ? 'block' : 'none'}`}>
          {
            developers.length > 0 ?
            <View className="user-list">
            {
              developers.map(item=>{
                return <UserItem item={item} key={item.id}></UserItem>
              })
            }
            </View>
            :
            <Empty />
          }
          
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
