'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
})();
});

var objectWithoutProperties = createCommonjsModule(function (module, exports) {

exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};
});

var objectWithoutProperties$1 = unwrapExports(objectWithoutProperties);

/**
 * 剔除指定 props
 * 用法: withoutProps(this.props, ['status'])
 * @param obj
 * @param keys
 */
function withoutProps(obj, keys) {
  return objectWithoutProperties$1(obj, keys);
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".card-rotate-wrapper{width:100%;height:100%;position:relative;-webkit-perspective:500px;perspective:500px}.card-rotate-hide{display:none}.card-rotate-item-back,.card-rotate-item-front{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff;-webkit-perspective:1000px;perspective:1000px;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-box-shadow:rgba(50,50,50,.2) 0 0 15px;box-shadow:0 0 15px rgba(50,50,50,.2)}.card-rotate-wrapper .card-rotate-animate-front,.card-rotate-wrapper .card-rotate-item-back{-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.card-rotate-wrapper .card-rotate-animate-back{-webkit-transform:rotateY(-1turn);transform:rotateY(-1turn)}";
styleInject(css);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties$2 = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var CardRotateAnimation = function (_Component) {
  inherits(CardRotateAnimation, _Component);

  function CardRotateAnimation(props) {
    classCallCheck(this, CardRotateAnimation);

    var _this = possibleConstructorReturn(this, (CardRotateAnimation.__proto__ || Object.getPrototypeOf(CardRotateAnimation)).call(this, props));

    _this.isCardActive = function () {
      var isActive = _this.props.isActive;
      var active = _this.state.active;

      if (typeof isActive !== 'undefined') {
        return isActive;
      }
      return active;
    };

    _this.onCardClick = function () {
      var _this$props = _this.props,
          onCardClickCb = _this$props.onCardClickCb,
          clickAgainRotate = _this$props.clickAgainRotate,
          disableRotate = _this$props.disableRotate;

      onCardClickCb && onCardClickCb();
      if (disableRotate) return;
      var active = _this.state.active;

      if (!active) {
        _this.setState({
          active: true
        });
      } else if (active && clickAgainRotate) {
        _this.setState({
          active: false
        });
      }
    };

    _this.getFrontContent = function () {
      var _this$props2 = _this.props,
          renderFrontContent = _this$props2.renderFrontContent,
          imgFrontSrc = _this$props2.imgFrontSrc,
          imgFrontAlt = _this$props2.imgFrontAlt;

      if (renderFrontContent) {
        return renderFrontContent();
      }
      return React__default.createElement('img', { src: imgFrontSrc, alt: imgFrontAlt });
    };

    _this.getBackContent = function () {
      var _this$props3 = _this.props,
          renderBackContent = _this$props3.renderBackContent,
          imgBackSrc = _this$props3.imgBackSrc,
          imgBackAlt = _this$props3.imgBackAlt;

      if (renderBackContent) {
        return renderBackContent();
      }
      return React__default.createElement('img', { src: imgBackSrc, alt: imgBackAlt });
    };

    _this.state = {
      active: false
    };
    return _this;
  }

  createClass(CardRotateAnimation, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var hide = nextProps.hide,
          recoveryAfterHide = nextProps.recoveryAfterHide;
      var active = this.state.active;

      if (hide && recoveryAfterHide && active) {
        this.setState({
          active: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _withoutProps = withoutProps(this.props, ['onCardClickCb', 'clickAgainRotate', 'isActive', 'renderFrontContent', 'renderBackContent', 'imgFrontSrc', 'imgFrontAlt', 'imgBackSrc', 'imgBackAlt', 'recoveryAfterHide', 'disableRotate']),
          prefix = _withoutProps.prefix,
          className = _withoutProps.className,
          hide = _withoutProps.hide,
          restProps = objectWithoutProperties$2(_withoutProps, ['prefix', 'className', 'hide']);

      return React__default.createElement(
        'div',
        _extends({ className: classnames(prefix + '-wrapper', defineProperty({}, prefix + '-hide', hide), className), onClick: this.onCardClick }, restProps),
        React__default.createElement(
          'div',
          { className: classnames(prefix + '-item-front', defineProperty({}, prefix + '-animate-front', this.isCardActive())) },
          this.getFrontContent()
        ),
        React__default.createElement(
          'div',
          { className: classnames(prefix + '-item-back', defineProperty({}, prefix + '-animate-back', this.isCardActive())) },
          this.getBackContent()
        )
      );
    }
  }]);
  return CardRotateAnimation;
}(React.Component);

CardRotateAnimation.propTypes = {
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
};
CardRotateAnimation.defaultProps = {
  prefix: 'card-rotate',
  clickAgainRotate: false,
  imgFrontSrc: '//test-zt.xoyo.com/huangzhe/images/product-introduce-1.png?pc_hash=ILMewx',
  imgBackSrc: '//test-zt.xoyo.com/huangzhe/images/product-introduce-acticve-1.png?pc_hash=ILMewx',
  imgFrontAlt: 'front image',
  imgBackAlt: 'back image',
  hide: false,
  recoveryAfterHide: true,
  disableRotate: false
};

module.exports = CardRotateAnimation;
//# sourceMappingURL=index.js.map
