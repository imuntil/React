import request from '../utils/request'

export async function mockTest() {
  return request('/users', {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  })
}
export async function fetchQuestions(type /* word | pic */) {
  return request(`/questions/${type}`)
}