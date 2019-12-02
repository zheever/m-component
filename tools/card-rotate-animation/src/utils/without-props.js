import objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';

/**
 * 剔除指定 props
 * 用法: withoutProps(this.props, ['status'])
 * @param obj
 * @param keys
 */
export function withoutProps(obj, keys) {
  return objectWithoutProperties(obj, keys);
}
