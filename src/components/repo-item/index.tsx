import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { IListItem } from "./types/index.t"

import './index.less'
import { AtIcon } from 'taro-ui'
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
      currentPeriod = item.today_star_num + ' stars today'
    }else if (categoryType === 1) {
      currentPeriod = item.today_star_num + ' stars this week'
    }else if (categoryType === 2) {
      currentPeriod = item.today_star_num + ' stars this month'
    }
    return (
      <View className='repo-item'>
        <View className='title'>
          {/* <AtIcon prefixClass='ion' value='md-bookmarks' size='25' color='#333' /> */}
          <View className="at-icon at-icon-bookmark"></View>
          <Text>{item.author}/{item.repo_name}</Text>
        </View>
        <View className='desc'>{item.desc}</View>
        <View className="info">
          {/* 语言 */}
          <View className="lang info-item">
            {/* <AtIcon prefixClass='at' value='icon bookmark' size='25' color='#333' /> */}
            <View className="at-icon at-icon-heart-2" style={`color: ${item.lang_color}; vertical-align: bottom`} ></View>
            {/* <AtIcon prefixClass='ion' value='ios-radio-button-on' size='15' color={item.lang_color} /> */}
            <Text>{item.lang_type}</Text>
          </View>
          {/* 星数 */}
          <View className="star info-item">
            {/* <AtIcon prefixClass='ion' value='ios-radio-button-on' size='15' color="#7f7f7f" /> */}
            <View className="at-icon at-icon-star-2"></View>
            <Text>{item.star_num}</Text>
          </View>
          {/* fork */}
          <View className="fork info-item">
            {/* <AtIcon prefixClass='ion' value='ios-radio-button-on' size='15' color="#7f7f7f" /> */}
            <View className="at-icon at-icon-share"></View>
            <Text>{item.fork_num}</Text>
          </View>
        </View>
        <View className="today-view">
          <View className="at-icon at-icon-star-2" style='color: #F5222D; vertical-align: baseline'></View>
          <Text>{currentPeriod}</Text>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
