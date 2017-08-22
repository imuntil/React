import { get, del, post, put } from '../utils/request'
import _ from 'lodash'

const FETCH_USERS = 'FETCH_USERS'
const FETCH_USER_DETAIL = 'FETCH_USER_DETAIL'
const DELETE_USER = 'DELETE_USER'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'
const RESET_EDITING_USER = 'RESET_EDITING_USER'


const initState = {
  userList: [],
  user: {}
}

export default function (state = initState, action) {

  switch (action.type) {
    case FETCH_USERS:
      return { ...state, userList: action.userList }
    case FETCH_USER_DETAIL:
      return { ...state, user: action.user }
    case DELETE_USER:
      return {
        ...state,
        userList: [
          ...state.userList.slice(0, action.index),
          ...state.userList.slice(action.index + 1)
        ]
      }
    case ADD_USER:
      return {
        ...state,
        userList: [
          ...state.userList,
          action.user
        ]
      }
    case EDIT_USER:
      return {
        ...state,
        userList: [
          ...state.userList.slice(0, action.index),
          {...state.userList[action.index], ...action.values},
          ...state.userList.slice(action.index + 1)
        ]
      }
    case RESET_EDITING_USER:
      return {
        ...state,
        user: {}
      }
    default:
      return state
  }
}

export const fetchUsers = () => {
  return (dispatch, getState) => {
    let list = getState().userReducer.userList
    if (!_.isEmpty(list)) {
      dispatch({type: RESET_EDITING_USER})
      return Promise.resolve(true)
    }
    return get('http://localhost:3000/user')
      .then(res => {
        dispatch({type: FETCH_USERS, userList: res})
      })
  }
}

export const fetchUserDetail = (id) => {
  return (dispatch, getState) => {
    let user = _.find(getState().userReducer.userList, {id})
    if (user) {
      dispatch({type: FETCH_USER_DETAIL, user})
    } else {
      get('http://localhost:3000/user/' + id)
        .then(res => {
          dispatch({type: FETCH_USER_DETAIL, user: res})
        })
    }
  }
}

export const deleteUser = id => {
  return (dispatch, getState) => {
    let index = _.findIndex(getState().userReducer.userList, {id})
    if (index < 0) return Promise.reject(`没有id为${id}的用户`)
    return del('http://localhost:3000/user/' + id)
      .then(res => {
        dispatch({type: DELETE_USER, index})
      })
  }
}

export const addUser = values => {
  return (dispatch, getState) => {
    return post('http://localhost:3000/user', values)
      .then(res => {
        if (res.id) {
          dispatch({type: ADD_USER, user: res})
        } else {
          return Promise.reject('新增用户失败')
        }
      })
  }
}

export const editUser = (id, values) => {
  return (dispatch, getState) => {
    let index = _.findIndex(getState().userReducer.userList, {id})
    if (index < 0) {
      return Promise.reject(`没有id${id}的用户`)
    }
    return put('http://localhost:3000/user/' + id, values)
      .then(res => {
        if (res.id) {
          dispatch({type: EDIT_USER, index, values})
        } else {
          return Promise.reject('编辑用户失败')
        }
      })
  }
}