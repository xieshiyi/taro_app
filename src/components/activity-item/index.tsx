import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { IListItem } from "./types/index.t"
import { AtAvatar } from 'taro-ui'
import './index.less'
import "taro-ui/dist/style/components/avatar.scss"
import "taro-ui/dist/style/components/icon.scss"

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  item: IListItem,
  categoryType: number
}
type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
  state: PageState
}
class Index extends Component {
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { item, categoryType }  = this.props
    let currentPeriod: string = ""
    if (categoryType === 0) {
      currentPeriod = item.time + ' hour(s) ago'
    }else if (categoryType === 1) {
      currentPeriod = item.time + ' day(s) ago'
    }else if (categoryType === 2) {
      currentPeriod = item.time + ' week(s) ago'
    } else if (categoryType === 3){
      currentPeriod = item.time + ''
    }
    return (
      <View className='activity-item'>
       	<AtAvatar circle image={item.avatar}></AtAvatar>
        <View className="info">
          <View className="info-user">
            <Text>{item.user_name}</Text>
            <Text style='margin: 0 10rpx; color: #000'>starred</Text> 
            <Text>{item.author}/{item.repo_name}</Text>
          </View>
          <View className="info-time">{currentPeriod}</View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
