import {login, fetchUserPoints} from '@/services'
import {reduxKey, pointsCDTime} from '@/services/config'
import {delay} from '../utils/cts';

/*
  积分，points，不缓存在本地。在不考虑用户手动刷新积分以及使用积分兑换礼品的的情况下，积分只在/user页面获取一次
  当用户使用积分兑换礼品时，手动修改积分即可（暂定）
*/
export default {
  namespace : 'user',
  state : {
    openID: '',
    phone: '',
    nick: '',
    userID: '',
    avatar: '',
    ran: '',
    points: {
      value: 0,
      cd: false
    },
    reg: {
      phone: '',
      code: ''
    }
  },
  effects : {
    *login({
      payload
    }, {call, put, select}) {
      const {data, fail, err} = yield call(login, payload)
      if (err || fail) {
        return err || fail
      }
      const {name: nick, imgname: avatar, phone, usersid: userID} = data.result
      const {openID} = yield select(state => state.wx)
      console.log(openID)
      yield put({
        type: 'setUser',
        payload: {
          nick,
          avatar,
          phone,
          userID,
          ran: Math.random(),
          openID
        }
      })
      return true
    },
    *logout({
      payload
    }, {put}) {
      yield put({type: 'adr/expiredStore'})
      yield put({type: 'cart/setLocalExpired'})
      yield put({type: 'col/setLocalExpired'})
      yield put({type: 'orderList/setLocalExpired'})
      yield put({type: 'order/clearOrder'})
      yield put({
        type: 'setUser',
        payload: {
          openID: '',
          phone: '',
          nick: '',
          userID: '',
          avatar: '',
          ran: ''
        }
      })
    },
    *fetchUserPoints(empty, {put, select, call}) {
      const {
        phone,
        points: {
          value,
          cd
        }
      } = yield select(state => state.user)
      if (!phone || cd) 
        return
      const {data, fail} = yield call(fetchUserPoints, phone)
      if (!data) {
        throw new Error(fail && fail.msg || '未能获取积分，请稍后再试')
      }
      const points = data.result.scoreSum
      yield put({
        type: 'setPoints',
        points: {
          value: points,
          cd: true
        }
      })
      // 技能冷却（大雾），一段时间后可以重新调用
      yield put({type: 'setFUPAbleAfter2Mins'})
    },
    *setFUPAbleAfter2Mins(empty, {put, call, select}) {
      yield call(delay, pointsCDTime)
      const {points} = yield select(state => state.user)
      yield put({
        type: 'setPoints',
        points: {
          ...points,
          cd: false
        }
      })
    }
  },

  reducers : {
    setUser(state, {payload}) {
      const newState = {
        ...state,
        ...payload
      }
      delete newState.reg
      delete newState.points
      window
        .localStorage
        .setItem(reduxKey, JSON.stringify(newState))
      return {
        ...state,
        ...payload
      }
    },
    setReg(state, {payload}) {
      return {
        ...state,
        reg: {
          ...payload
        }
      }
    },
    setPoints(state, {points}) {
      return {
        ...state,
        points
      }
    }
  },

  subscriptions : {
    setup({dispatch, history}) {
      // 同步local用户数据到redux
      const redux = window
        .localStorage
        .getItem(reduxKey)
      if (redux) {
        const user = JSON.parse(redux)
        dispatch({type: 'setUser', payload: user})
      }
      history.listen(({pathname}) => {
        if (pathname === '/user') {
          // 获取用户积分
          dispatch({type: 'fetchUserPoints'})
        }
      })
    }
  }
}
