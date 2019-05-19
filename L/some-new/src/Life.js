import React, { Component } from 'react'

export default class Life extends Component {
  // 构造函数
  constructor(props) {}

  // static proterty
  static defaultProps = {}
  static displayName = ''

  // static method
  // 替换 `componentWillReceiveProps` ，
  // 初始化和 update 时被调用
  // 静态函数，无法使用 this
  // mount
  // update
  static getDerivedStateFromProps(nextProps, prevState) {}

  // static method
  // 异常捕获
  // 在子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树
  // 仅捕获子组件
  // 在 reconciliation/render 阶段调用，不允许执行 side effect 操作
  // 返回 state 状态，类似 getDerivedStateFromProps
  static getDerivedStateFromError(error) {}

  // method
  // 判断是否需要更新组件
  // 可以用于组件性能优化
  // update
  shouldComponentUpdate(nextProps, nextState) {}

  // method
  // mount
  // update
  render() {
    return <div>Life</div>
  }

  // method
  // 替换 componentWillUpdate
  // 可以在更新之前获取最新 dom 数据
  // 返回值作为 componentDidUpdate 的第三个参数
  // update
  getSnapshotBeforeUpdate(prevProps, prevState) {}

  // method
  // 组件被挂载后触发
  // mount
  componentDidMount() {}

  // method
  // 组件更新后调用
  // update
  componentDidUpdate(prevProps, prevState, snapshot) {}

  // method
  // 组件即将销毁
  componentWillUnmount() {}

  // method
  // 异常捕获
  // 在 commit 阶段调用， 允许 side effect 操作
  componentDidCatch(error, info) {}
}
