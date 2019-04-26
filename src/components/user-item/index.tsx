import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { IUserItem } from "./types/index.t"
import { AtAvatar } from 'taro-ui'
import './index.less'
import "taro-ui/dist/style/components/avatar.scss"
import "taro-ui/dist/style/components/icon.scss"

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  item: IUserItem
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
    const { item }  = this.props
    return (
      <View className='user-item'>
       	<AtAvatar size="large" circle image={item.avatar}></AtAvatar>
        <View className="info">
          <View className="info-author">{item.username}</View>
          <View className="info-repo">
            <View className="at-icon at-icon-bookmark"></View>
            <Text className="info-repo-name">{item.repo.name}</Text>
          </View>
          <View className="info-desc">{item.repo.description}</View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
