import { reduxKey } from '@/services/config'
export default {
  namespace : 'user',
  state : {
    token: '',
    auth: 1,
    created: '',
    email: '',
    nick: ''
  },
  reducers : {
    setUser(state, {payload}) {
      console.log(payload)
      window
        .localStorage
        .setItem(reduxKey, JSON.stringify(payload))
      return {
        ...payload
      }
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      const redux = window
        .localStorage
        .getItem(reduxKey)
      if (redux) {
        dispatch({
          type: 'setUser',
          payload: JSON.parse(redux)
        })
      }
    }
  }
}