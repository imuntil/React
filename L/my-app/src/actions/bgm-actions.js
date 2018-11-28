import {
  fetchYears as fy,
  fetchBgmByYear as fbby,
  fetchAnimeFromDmhy as fafd
} from '../request/bgm'
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

export const fetchAnimeFromDmhy = payload => async (dispatch, getState) => {
  const { chunk, name } = getState().dmhy
  if (payload.name === name && payload.page <= chunk.length) {
    dispatch(setDmhyPage(payload))
    return
  }
  dispatch(requestAnimeFromDmhy())
  const res = await fafd(payload, REQUEST_ANIME_FROM_DMHY)
  // const res = mock
  res && dispatch(receiveAnimeFromDmhy({ ...res, name: payload.name }))
}
