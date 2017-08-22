import { createAsyncAction } from 'redux-action-tools'
export const FETCH_DATAS = 'FETCH_DATAS'

const maybe = data => (new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve({data}) : reject('Ops, async operation failed')
  }, 1000)
}))
const fetchedDatas = [
  {
    title: 'react',
    date: (new Date()).toLocaleDateString()
  },
  {
    title: 'redux',
    date: (new Date()).toLocaleDateString()
  },
  {
    title: 'vue',
    date: (new Date()).toLocaleDateString()
  }
]
export const fetchDatas = createAsyncAction(FETCH_DATAS, () => maybe(fetchedDatas))