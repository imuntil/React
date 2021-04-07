'use strict'

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== 'undefined' &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left)
  } else {
    return left instanceof right
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

class TestOrigin {
  constructor() {
    // 直接挂载在实例上
    this.attr0 = 0
  }
  // 通过_defineProperty挂载在实例上
  attr1 = 1
  // 通过_defineProperty挂载在构造函数(TestOrigin)上
  static attr2 = 2

  // 通过_createClass挂载在TestOrigin.prototype上
  method1() {}
  // 通过_createClass，调用_defineProperty挂载在构造函数(TestOrigin)上
  static method2() {}
  // 通过_defineProperty挂载在实例上
  method3 = () => {}
}

var Test = /*#__PURE__*/ (function() {
  function Test() {
    _classCallCheck(this, Test)
    _defineProperty(this, 'attr1', 1)
    _defineProperty(this, 'method3', function() {})
    this.attr0 = 0
  }

  _createClass(
    Test,
    [{ key: 'method1', value: function method1() {} }],
    [{ key: 'method2', value: function method2() {} }]
  )

  return Test
})()
_defineProperty(Test, 'attr2', 2)
