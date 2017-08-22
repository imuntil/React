export const GET_PAGE_TOPICS = 'GET_PAGE_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'

export function getPageTopics() {
  return {
    type: GET_PAGE_TOPICS
  }
}
export function receiveTopics(topics) {
  return {
    type: RECEIVE_TOPICS,
    topics
  }
}