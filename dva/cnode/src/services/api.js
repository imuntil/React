import request from '../utils/request';

const prefix = 'https://cnodejs.org/api/v1'

export function queryPosts({ page = 1, tab = 'ask', limit = 20 }) {
  return request(`${prefix}/topics?page=${page}&tab=${tab}&limit=${limit}`);
}
