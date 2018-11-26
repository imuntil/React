import $ from './index'

/**
 * 获取里世界列表
 * @param {page, size, _type} payload
 */
export const fetchLiList = async (payload, action) => {
  return $({
    url: 'li',
    method: 'get',
    params: payload,
    action
  })
}
