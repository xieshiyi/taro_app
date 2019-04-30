import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import configStore from './store'
import {set as setGlobalData} from './utils/global_data'
import './app.less'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import 'ionicons/dist/scss/ionicons.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/activity/index',
      'pages/git/index',
      'pages/account/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/index/index',
        text: 'Trending',
        iconPath: './assets/images/tab_trend.png',
        selectedIconPath: './assets/images/tab_trend_s.png'
      }, {
        pagePath: 'pages/activity/index',
        text: 'Activity',
        iconPath: './assets/images/tab_news.png',
        selectedIconPath: './assets/images/tab_news_s.png'
      }, {
        pagePath: 'pages/git/index',
        text: 'Git',
        iconPath: './assets/images/tab_git.png',
        selectedIconPath: './assets/images/tab_git_s.png'
      }, {
        pagePath: 'pages/account/index',
        text: 'Me',
        iconPath: './assets/images/tab_me.png',
        selectedIconPath: './assets/images/tab_me_s.png'
      }],
      color: '#8a8a8a',
      selectedColor: '#2d8cf0',
      backgroundColor: '#ffffff',
      borderStyle: 'white'
    }
  }

  componentDidMount () {
    this.updateApp()
    wx.cloud.init({
      env: 'my-gitte-1a9486',
      traceUser: true
    })
    this.loadOpenId()
    this.loadConfig()
  }

  loadOpenId() {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'openid',
    }).then(res => {
      const openid = res.result.openid
      setGlobalData('openid', openid || null)
      if (openid) {
        Taro.setStorageSync('openid', openid)
      }
    }).catch(err => {
      console.log('openid err', err)
    })
  }

  loadConfig() {
    const db = wx.cloud.database()
    db.collection('config')
      .where({})
      .get()
      .then(res => {
        console.log(res)
        if (res.data.length > 0) {
          Taro.setStorage({
            key: 'config_gitter',
            data: res.data[0]
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
  /*更新小程序*/
  updateApp() {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log('hasUpdate', res.hasUpdate)
      })
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新版本下载失败
      })
    }
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
