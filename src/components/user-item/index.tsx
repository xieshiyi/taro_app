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
  item: IListItem
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
       	<AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
