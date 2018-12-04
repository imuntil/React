import {
  fetchYears as fy,
  fetchBgmByYear as fbby,
  fetchAnimeFromDmhy as fafd
} from '../request/bgm'
import { TYPE_INVERSE_MAP, SORTS } from '@/utils/constant'
import mock from './bgm.mock'

export const REQUEST_BGMS = 'REQUEST_BGMS'
const requestBgms = () => ({
  type: REQUEST_BGMS
})

export const RECEIVE_BGMS = 'RECEIVE_BGMS'
const receiveBgms = ({ year, result }) => ({
  type: RECEIVE_BGMS,
  year,
  anime: result
})

export const REQUEST_YEARS = 'REQUEST_YEARS'
const requestYears = () => ({
  type: REQUEST_YEARS
})

export const RECEIVE_YEARS = 'RECEIVE_YEARS'
const receiveYears = years => ({
  type: RECEIVE_YEARS,
  years
})

export const SET_CURRENT_YEAR = 'SET_CURRENT_YEAR'
const setCurrentYear = year => ({
  type: SET_CURRENT_YEAR,
  year
})

export const REQUEST_ANIME_FROM_DMHY = 'REQUEST_ANIME_FROM_DMHY'
const requestAnimeFromDmhy = () => ({
  type: REQUEST_ANIME_FROM_DMHY
})

export const RECEIVE_ANIME_FROM_DMHY = 'RECEIVE_ANIME_FROM_DMHY'
const receiveAnimeFromDmhy = payload => ({
  type: RECEIVE_ANIME_FROM_DMHY,
  payload
})

export const SET_DMHY_PAGE = 'SET_DMHY_PAGE'
const setDmhyPage = payload => ({
  type: SET_DMHY_PAGE,
  payload
})

export const SET_DMHY_FILTER = 'SET_DMHY_FILTER'
export const setDmhyFilter = payload => ({
  type: SET_DMHY_FILTER,
  payload
})

export const SET_FILTERED_DMHY = 'SET_FILTERED_DMHY'
export const setFilteredDmhy = payload => ({
  type: SET_FILTERED_DMHY,
  payload
})

export const SET_DMHY_SORT = 'SET_DMHY_SORT'
export const setDmhySort = payload => ({
  type: SET_DMHY_SORT,
  payload
})

export const fetchYears = () => async (dispatch, getState) => {
  const { years } = getState()
  if (years && years.length) return
  dispatch(requestYears())
  const res = await fy()
  res && dispatch(receiveYears(res))
}

export const fetchBgmByYear = year => async (dispatch, getState) => {
  const { anime } = getState().bgm
  if (anime[year]) {
    dispatch(setCurrentYear(year))
    return
  }
  dispatch(requestBgms())
  const res = await fbby(year, REQUEST_BGMS)
  // { count, year, result }
  res && dispatch(receiveBgms(res))
}

const isLocal = (payload, { totalPages }) => payload.page <= totalPages
const isFilterSame = (payload, { name, type }) =>
  payload.name === name && payload.type === type

export const fetchAnimeFromDmhy = payload => async (dispatch, getState) => {
  const state = getState().dmhy
  // 筛选条件为改变
  if (isFilterSame(payload, state)) {
    // 本地有缓存，不在请求结果
    if (isLocal(payload, state)) {
      dispatch(setDmhyPage(payload))
      return
    }
    // else 本地没有缓存
  } else {
    // 筛选条件变化，页码重置为1
    payload.page = 1
  }
  dispatch(requestAnimeFromDmhy())
  // 条件变化，本地没有缓存，page至1
  const res = await fafd(payload, REQUEST_ANIME_FROM_DMHY)
  // const res = mock
  res &&
    dispatch(
      receiveAnimeFromDmhy({
        ...res,
        name: payload.name,
        type: payload.type
      })
    )
}
