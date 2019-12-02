import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { withoutProps } from './utils/without-props'
import './styles.css'

export default class CardRotateAnimation extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    /* 新增样式样式名 */
    className: PropTypes.string,
    /* 是否翻转，true为翻转，如果设置该值。则是否翻转由父组件控制 */
    isActive: PropTypes.bool,
    /* 点击卡片回调函数 */
    onCardClickCb: PropTypes.func,
    /* 再次点击是否翻转回来 */
    clickAgainRotate: PropTypes.bool,
    /* 前面图片地址 */
    imgFrontSrc: PropTypes.string,
    /* 后面图片地址 */
    imgBackSrc: PropTypes.string,
    /* 前面图片alt */
    imgFrontAlt: PropTypes.string,
    /* 后面图片alt */
    imgBackAlt: PropTypes.string,
    /* 前面内容渲染函数 */
    renderFrontContent: PropTypes.func,
    /* 后面内容渲染函数 */
    renderBackContent: PropTypes.func,
    /* 是否隐藏 */
    hide: PropTypes.bool,
    /* 是否在隐藏后恢复成正面 */
    recoveryAfterHide: PropTypes.bool,
    /* 禁止旋转 */
    disableRotate: PropTypes.bool
  }

  static defaultProps = {
    prefix: 'card-rotate',
    clickAgainRotate: false,
    imgFrontSrc: '//test-zt.xoyo.com/huangzhe/images/product-introduce-1.png?pc_hash=ILMewx',
    imgBackSrc: '//test-zt.xoyo.com/huangzhe/images/product-introduce-acticve-1.png?pc_hash=ILMewx',
    imgFrontAlt: 'front image',
    imgBackAlt: 'back image',
    hide: false,
    recoveryAfterHide: true,
    disableRotate: false
  }

  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {hide, recoveryAfterHide} = nextProps
    const {active} = this.state
    if (hide && recoveryAfterHide && active) {
      this.setState({
        active: false
      })
    }
  }

  isCardActive = () => {
    const {isActive} = this.props
    const {active} = this.state
    if (typeof isActive !== 'undefined') {
      return isActive
    }
    return active
  }

  onCardClick = () => {
    const {onCardClickCb, clickAgainRotate, disableRotate} = this.props
    onCardClickCb && onCardClickCb()
    if (disableRotate) return;
    const {active} = this.state
    if (!active) {
      this.setState({
        active: true
      })
    } else if (active && clickAgainRotate) {
      this.setState({
        active: false
      })
    }
  }

  getFrontContent = () => {
    const {renderFrontContent, imgFrontSrc, imgFrontAlt} = this.props
    if (renderFrontContent) {
      return renderFrontContent()
    }
    return <img src={imgFrontSrc} alt={imgFrontAlt} />
  }

  getBackContent = () => {
    const {renderBackContent, imgBackSrc, imgBackAlt} = this.props
    if (renderBackContent) {
      return renderBackContent()
    }
    return <img src={imgBackSrc} alt={imgBackAlt} />
  }

  render() {
    const {
      prefix,
      className,
      hide,
      ...restProps
    } = withoutProps(this.props, ['onCardClickCb', 'clickAgainRotate', 'isActive', 'renderFrontContent',
      'renderBackContent', 'imgFrontSrc', 'imgFrontAlt', 'imgBackSrc',
      'imgBackAlt', 'recoveryAfterHide', 'disableRotate'])

    return (
      <div className={cx(`${prefix}-wrapper`, {[`${prefix}-hide`]: hide}, className)} onClick={this.onCardClick} {...restProps}>
        <div className={cx(`${prefix}-item-front`, {[`${prefix}-animate-front`]: this.isCardActive()})}>
          {this.getFrontContent()}
        </div>
        <div className={cx(`${prefix}-item-back`, {[`${prefix}-animate-back`]: this.isCardActive()})}>
          {this.getBackContent()}
        </div>
      </div>
    )
  }
}
