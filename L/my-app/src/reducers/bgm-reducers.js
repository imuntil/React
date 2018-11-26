import {
  RECEIVE_YEARS,
  RECEIVE_BGMS,
  SET_CURRENT_YEAR,
  RECEIVE_ANIME_FROM_DMHY
} from '../actions/bgm-actions'

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
  next: false,
  // 二维数组，暂存爬取的数据
  chunk: [],
  name: '',
  // 已经获取的总数据量
  total: 0
}
export const dmhy = (state = initDmhyState, action) => {
  switch (action.type) {
    case RECEIVE_ANIME_FROM_DMHY:
      const { count, next, page, res, name } = action.payload
      const { chunk, total } = state
      return {
        page,
        next,
        total: total + count,
        name,
        chunk: [...chunk, res]
      }
    default:
      return state
  }
}
