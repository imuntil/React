import {
  RECEIVE_YEARS,
  RECEIVE_BGMS,
  SET_CURRENT_YEAR,
  RECEIVE_ANIME_FROM_DMHY,
  SET_DMHY_PAGE,
  SET_DMHY_SORT
} from '../actions/bgm-actions'
import { SORTS } from '@/utils/constant'

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
  data: [],
  // 全部数据id列表
  name: '',
  // 已经获取的总数据量
  total: 0,
  // 总页数
  totalPages: 0,
  // 类别
  type: '',
  // 排序
  sort: SORTS.DATE_DESC
}

/**
 * 排序辅助方法
 * @param {SORTS} sort
 * @param {object} data
 */
const sortHelper = sort => {
  switch (sort) {
    case SORTS.DATE_ASC:
      return (a, b) => new Date(a.real_date) - new Date(b.real_date)
    case SORTS.SIZE_ASC:
      return (a, b) => a.real_size - b.real_size
    case SORTS.SIZE_DESC:
      return (a, b) => b.real_size - a.real_size
    case SORTS.DATE_DESC:
    default:
      return (a, b) => new Date(b.real_date) - new Date(a.real_date)
  }
}

export const dmhy = (state = initDmhyState, action) => {
  const {
    count,
    next: hasNext,
    page,
    res,
    name,
    type,
    sort = SORTS.DATE_DESC
  } = action.payload || {}
  const { data, total, totalPages } = state
  switch (action.type) {
    case RECEIVE_ANIME_FROM_DMHY:
      const oth = { page, hasNext, total: total + count, name, type, sort }
      return name === state.name && type === state.type
        ? {
            ...oth,
            data: [...data, ...res],
            totalPages: totalPages + 1
          }
        : {
            ...oth,
            data: res,
            totalPages: 1
          }

    case SET_DMHY_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    case SET_DMHY_SORT:
      const sorter = sortHelper(sort)
      const _data = data.sort(sorter)
      return {
        ...state,
        sort,
        data: _data,
        page: 1
      }
    default:
      return state
  }
}

// 设置排序
export const dmhySort = (state = SORTS.DATE_DESC, action) => {
  if (action.type === SET_DMHY_SORT) {
    return action.payload
  }
  return state
}
