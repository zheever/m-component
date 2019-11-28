import React from 'react';
import QRCode from 'qrcode.react';
import { withoutProps } from '@src/utils/data-utils';

/**
 * 二维码
 */
export default class Qr extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    if (value !== prevState.value) {
      return {
        value,
        base64: undefined
      };
    }
    return null;
  }

  rootRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      base64: undefined
    };
  }

  componentDidMount() {
    this.willRenderImageIfUnderImageTypeEnum();
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      if (this.props.value !== prevProps.value || this.props.renderAs !== prevProps.renderAs) {
        this.willRenderImageIfUnderImageTypeEnum();
      }
    }
  }

  /**
   * renderAs 是否属于 imageTypeEnum 的一员
   * 默认情况下 imageTypeEnum 为 ['png', 'jpg']
   * 如果 renderAs 是 png 或 jpg, 则当前函数返回 true
   * 反之返回 false
   *
   * @returns {boolean}
   */
  isRenderAsUnderImageTypeEnum() {
    const { renderAs, imageTypeEnum } = this.props;
    return imageTypeEnum.indexOf(renderAs) > -1;
  }

  /**
   * renderAs 是否属于 imageTypeEnum 的一员, 渲染一张独立的 qr 图片
   * @returns {undefined}
   */
  willRenderImageIfUnderImageTypeEnum() {
    const { renderAs } = this.props;

    if (!this.isRenderAsUnderImageTypeEnum()) {
      return;
    }

    /**
     * @type {HTMLCanvasElement} targetElement
     */
    const targetElement = this.rootRef.current.children[0];
    switch (targetElement.tagName) {
      case 'CANVAS':
        this.setState({ base64: targetElement.toDataURL(`image/${renderAs}`) });
        break;
      case 'SVG':
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(targetElement, 0, 0);
        this.setState({ base64: targetElement.toDataURL(`image/${renderAs}`) });
        break;
      default:
        throw new Error('Qr: invalid targetElement tagName = ' + targetElement.tagName);
    }
  }

  render() {
    const { alt, wrapperClassName, imageClassName, ...restProps } = withoutProps(this.props, ['imageTypeEnum']);
    const { base64 } = this.state;
    if (this.isRenderAsUnderImageTypeEnum()) {
      return (
        <div className={wrapperClassName} ref={this.rootRef}>
          <QRCode style={{ display: 'none' }} {...restProps} />
          {base64 && <img className={imageClassName} width="100%" height="100%" src={base64} alt={alt} />}
        </div>
      );
    } else {
      return (
        <div ref={this.rootRef}>
          <QRCode {...restProps} />
        </div>
      );
    }
  }
}

Qr.defaultProps = {
  alt: '二维码',
  imageTypeEnum: ['png', 'jpeg'],
  renderAs: 'png'
};
