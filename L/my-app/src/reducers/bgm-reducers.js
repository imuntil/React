import {
  RECEIVE_YEARS,
  RECEIVE_BGMS,
  SET_CURRENT_YEAR,
  RECEIVE_ANIME_FROM_DMHY,
  SET_DMHY_PAGE,
  SET_DMHY_FILTER,
  SET_DMHY_MODE,
  SET_FILTERED_DMHY,
  SET_DMHY_SORT
} from '../actions/bgm-actions'
import { SORTS, DMHY_MODE } from '@/utils/constant'

export const years = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_YEARS:
      return action.years.reverse()
    default:
      return state
  }
}

const initBgmState = {
  anime: {},
  currentYear: `${new Date().getFullYear()}`
}

export const bgm = (state = initBgmState, action) => {
  switch (action.type) {
    case RECEIVE_BGMS:
      const { anime } = state
      return {
        anime: { ...anime, [action.year]: action.anime },
        currentYear: action.year
      }
    case SET_CURRENT_YEAR:
      return {
        ...state,
        currentYear: action.year
      }
    default:
      return state
  }
}

const initDmhyState = {
  // 当前页
  page: 1,
  // 是否有下一页
  hasNext: false,
  // id map
  data: {},
  // 全部数据id列表
  ids: [],
  name: '',
  // 已经获取的总数据量
  total: 0,
  // 总页数
  totalPages: 0,
  // 类别
  type: '',
  // subOptions
  subOptions: []
}
export const dmhy = (state = initDmhyState, action) => {
  switch (action.type) {
    case RECEIVE_ANIME_FROM_DMHY:
      const { count, next: hasNext, page, res, name, type } = action.payload
      const { data, total, totalPages, ids, subOptions } = state
      const oth = { page, hasNext, total: total + count, name, type }
      const map = {}
      const subs = []
      const _ids = res.map(v => {
        map[v.id] = v
        v.subtitle && subs.push(v.subtitle)
        return v.id
      })
      return name === state.name && type === state.type
        ? {
            ...oth,
            data: { ...data, ...map },
            ids: [...ids, ..._ids],
            totalPages: totalPages + 1,
            subOptions: [...new Set([...subOptions, ...subs])]
          }
        : {
            ...oth,
            data: map,
            totalPages: 1,
            ids: _ids,
            subOptions: [...new Set(subs)]
          }

    case SET_DMHY_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    default:
      return state
  }
}

export const dmhyMode = (state = DMHY_MODE.SEARCH, action) => {
  if (action.type === SET_DMHY_MODE) {
    return action.payload
  }
  return state
}

const filterState = {
  name: '',
  page: 0,
  type: '',
  subtitle: ''
}

export const dmhyFilter = (state = filterState, action) => {
  if (action.type === SET_DMHY_FILTER) {
    return { ...state, ...action.payload }
  }
  return state
}

// 保存筛选过的dmhy数据，减少重复删选
export const filteredDmhy = (state = [], action) => {
  if (action.type === SET_FILTERED_DMHY) {
    return action.payload
  }
  return state
}

// 设置排序
export const dmhySort = (state = SORTS.DATE_DESC, action) => {
  if (action.type === SET_DMHY_SORT) {
    return action.payload
  }
  return state
}
