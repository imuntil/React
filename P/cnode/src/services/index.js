import request from '../utills/request'

export const api = {
  getPageTopics () {
    return request('https://cnodejs.org/api/v1/topics')
  }
}