## Qr 二维码

> 当前组件常用于专题业务分享使用

## 基本用法
```javascript
import React from 'react';
import { observer } from 'mobx-react';
import Qr from '../index';
import QrStore from '../store';

export default [
  'Qr 二维码',
  [
    {
      key: '基本',
      component: <Qr value="http://facebook.github.io/react/" size={256} />
    },
    {
      key: '透明背景',
      component: (
        <div style={{ backgroundColor: '#e0f1ff' }}>
          <Qr value="http://facebook.github.io/react/" bgColor="transparent" />
        </div>
      )
    },
    {
      key: '以 canvas 渲染',
      component: (
        <div>
          <Qr value="http://facebook.github.io/react/" renderAs="canvas" />
        </div>
      )
    },
    {
      key: 'react state - 实时变更',
      component: React.createElement(
        class extends React.PureComponent {
          state = {
            value: 'http://facebook.github.io/react/'
          };

          render() {
            const { value } = this.state;
            return (
              <div style={{ textAlign: 'center' }}>
                <input
                  value={value}
                  onChange={e => this.setState({ value: e.target.value })}
                  style={{
                    width: '100%',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    padding: '.5rem',
                    border: '1px solid red',
                    borderRadius: 2,
                    backgroundColor: '#f1f5fa',
                    margin: '20px 0'
                  }}
                />
                <Qr value={value} size={512} />
              </div>
            );
          }
        }
      )
    },
    {
      key: 'mobx store - 实时变更',
      component: React.createElement(
        observer(
          class extends React.PureComponent {
            qrStore = new QrStore({
              value: 'http://facebook.github.io/react/',
              size: 256
            });

            render() {
              const { value } = this.qrStore;
              return (
                <div style={{ textAlign: 'center' }}>
                  <input
                    value={value}
                    onChange={e => (this.qrStore.value = e.target.value)}
                    style={{
                      width: '100%',
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      padding: '.5rem',
                      border: '1px solid red',
                      borderRadius: 2,
                      backgroundColor: '#f1f5fa',
                      margin: '20px 0'
                    }}
                  />
                  {this.qrStore.getComponent()}
                  <Qr value={value} size={512} />
                </div>
              );
            }
          }
        )
      )
    }
  ],
  require('./README.md')
];
```

## 须知

1. 为了更好的适配业务专题, 请大家手动传入 `wrapperClassName` 属性用于如 rem 响应式适配. <br/>
2. 当发现验证码模糊时候, 可以手动设置更大的 size, 在生成阶段更大的 size 能够生成更清晰的位图 (png 或 jpeg)

## API

```javascript
import { observable } from 'mobx';
import createComponentStore from '@src/mobx-store/create-component-store';
import Qr from '@src/components/qr';
import * as React from 'react';

/**
 * 父级组件
 * @type {{new(Object=): ComponentStore, _ObserverComponent: *, prototype: ComponentStore}}
 */
const ComponentStore = createComponentStore(Qr);

/**
 * 二维码组件 store
 */
export default class QrStore extends ComponentStore {
  /**
   * @type {string} value - 二维码值
   */
  @observable value;
  /**
   * @type {'canvas'|'svg'|'png'|'jpeg'} [renderAs] - 以什么方式渲染(不建议使用 jpeg, 图片比 png 大很多)
   */
  @observable renderAs;
  /**
   * @type {number} [size] - 二维码大小, 默认 128
   */
  @observable size;
  /**
   * @type {string} [bgColor] - (CSS color) 背景色
   */
  @observable bgColor;
  /**
   * @type {string} [fgColor] - 前景色 - (CSS color) 前景色
   */
  @observable fgColor;
  /**
   * @type {'L'|'M'|'Q'|'H'} [level] - 容错级别, 默认 'L'
   * 二维码容错率用字母表示，容错能力等级分为：L、M、Q、H四级：
   * L: 7%
   * M: 15%
   * Q: 25%
   * H: 30%
   */
  @observable level;
  /**
   * @type {boolean} [includeMargin] - 是否包含边距
   */
  @observable includeMargin;
  /**
   * @type {string} [alt] - 图片 alt 提示, 仅在 renderAs 为 'png' 'jpeg' 生效, 默认: 二维码
   */
  @observable alt;
  /**
   * @type {string[]} [imageTypeEnum] - 图片类型枚举(一般不推荐修改), 默认: ['png', 'jpeg']
   */
  @observable imageTypeEnum;
  /**
   * @type {string} [className] - 内部 QR canvas 组件 css class 样式
   */
  @observable className;
  /**
   * @type {string} [wrapperClassName] - 组件最外层包裹的 div css class 样式
   */
  @observable wrapperClassName;
  /**
   * @type {string} [imageClassName] - 图片 css class 样式, 仅在 renderAs 为 'png' 'jpeg' 生效
   */
  @observable imageClassName;
}
```

## 参考
https://github.com/zpao/qrcode.react

## 作者
艾伦