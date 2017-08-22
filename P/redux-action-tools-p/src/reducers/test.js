import { createReducer } from 'redux-action-tools'
import { FETCH_DATAS } from '../actions/index'

const initialState = [
  {
    title: 'redux-action-tools',
    date: (new Date()).toLocaleDateString()
  }
]
const reducer = createReducer()
  .when(FETCH_DATAS)
  .done((state, {payload}) => [
    ...payload.data
  ])
  .failed((state, {payload}) => {
    console.log(payload);
    return state
  })
  .build(initialState)

export default reducer
