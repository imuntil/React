import $ from './index'

/**
 * 根据时间（年份）获取番剧列表
 * @param {string} year
 */
export const fetchBgmByYear = async (year, action) =>
  $({
    url: `bangumi/${year}`,
    method: 'get',
    action
  })

/**
 * 获取1990-至今
 */
export const fetchYears = async () =>
  $({
    url: 'bangumi/range',
    method: 'get'
  })

/**
 * 获取本周跟新的新番
 */
export const fetchBgmDaily = async () =>
  $({
    url: 'bangumi/daily',
    method: 'get'
  })

/**
 * 搜索番剧，「动漫花园」
 * @param {name, page, type} payload
 * @param {*} action
 */
export const fetchAnimeFromDmhy = async (payload, action) =>
  $({
    url: '/bangumi/detail',
    method: 'get',
    params: payload,
    action
  })
