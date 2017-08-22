const FETCH_NEWS = 'FETCH_NEWS'
const FETCH_START = 'FETCH_START'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILURE = 'FETCH_FAILURE'

const initState = {
  news: [],
  loading: false
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_NEWS:
      return {...state, news: action.news}
    default:
      return state
  }
}

export const fetchNews = () => {
  return (dispatch, getState) => {
    return fetch('http://112.74.80.87:8080/enterpriseSys/selNewsTitle.action')
      .then(res => res.json())
      .then(res => {
        if (+res.reslutcode === 1) {
          dispatch({type: FETCH_NEWS, news: res.result})
        }
      })
  }
}