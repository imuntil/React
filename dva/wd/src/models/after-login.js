// 遇到需要操作的情况，跳转到登陆页面，在完成登录操作后继续之前的操作

export default {
  namespace: 'afterLogin',
  state: {
    next: ''
  },
  reducers: {
    setNext(state, action) {
      return {
        next: action.payload
      }
    }
  },
  effects: {},
  subscriptions: {},
};
