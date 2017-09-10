import md5 from 'md5'
import request from '../utils/request';
import { BASEURL } from '../constant'

export async function login({ phone, password }) {
  return request(`${BASEURL}loginUsersUsr.action?phone=${phone}&password=${md5(password)}`)
}
