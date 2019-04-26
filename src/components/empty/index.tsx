import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Text } from '@tarojs/components'
import './empty.less'
type PageStateProps = {
  content: string
}

type PageDispatchProps = {}

type PageOwnProps = {
  
}

type PageState = {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
  state: PageState
}
class Index extends Component {
  
  static propTypes = {
    content: PropTypes.string,
  }

  static defaultProps = {
    content: 'Oops! Nothing here...'
  }

  componentWillMount() {
  }

  render() {
    const { content } = this.props
    return (
      <View className='empty content'>
        <Image className='img' src={require('../../assets/images/octocat.png')} />
        <Text className='text'>{content}</Text>
      </View>
    )
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>
