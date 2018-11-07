import $ from './index'

/**
 * 获取里世界列表
 * @param {page, size} payload
 */
export const fetchLiList = async payload => {
  return $({
    url: 'li',
    method: 'get',
    data: payload
  })
}
