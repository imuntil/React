import $ from './index'

export const login = async (payload) => {
  return $({
    url: 'user/login',
    method: 'post',
    data: payload
  })
}
