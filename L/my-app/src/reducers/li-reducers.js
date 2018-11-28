import { REQUEST_LIS, RECEIVE_LIS, FAIL_LI_POST } from '../actions/li-actions'

const initialState = {
  pager: { page: 1, size: 20, total: 1 },
  list: []
}

const reg = /http\:\/\/(www\.)?llss\.(cool|tw|lol)/gi

function li(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LIS:
      return state
    case RECEIVE_LIS:
      const { page, total, size } = action.pager
      return {
        list: action.data.map(v => ({
          ...v,
          link: v.link && v.link.replace(reg, 'http://llss.ms'),
          img: v.img && v.img.replace(reg, 'http://llss.ms')
        })),
        pager: { page, total, size }
      }
    case FAIL_LI_POST:
    default:
      return state
  }
}

export default li
