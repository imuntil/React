import { fetchQuestions } from '../services'
export default {
  namespace: 'question',

  state: {
    word: [],
    pic: []
  },

  effects: {
    *fetchWord({ payload }, { call, put, select }) {
      const qu = yield select(state => state.question.word)
      if (qu && qu.length) return
      const { data, err } = yield call(fetchQuestions, 'word')
      if (err) {
        return
      }
      const res = data.result.data
        .map((q, i) => {
          const { answer, correct } = q
          const handled = answer
            .map((v, j) => ({ q: v, v: j === correct - 1 }))
            .sort(() => Math.random() - 0.5)
          return { ...q, answer: handled }
        })
        .sort(() => Math.random() - 0.5)
      yield put({ type: 'save', payload: { data: res, type: 'word' } })
    },
    *fetchPic({ payload }, { call, put, select }) {
      const qu = yield select(state => state.question.pic)
      if (qu && qu.length) return
      const { data, err } = yield call(fetchQuestions, 'pic')
      if (err) return
      const res = data.result.data
        .map((q, i) => {
          const { question, answer, correct } = q
          const aw = answer
            .map((v, j) => ({ q: v, v: j === correct - 1 }))
            .sort(() => Math.random() - 0.5)
          const qt = question.split('||')
          return { ...q, answer: aw, question: qt }
        })
        .sort(() => Math.random() - 0.5)
      yield put({ type: 'save', payload: { data: res, type: 'pic' } })
    }
  },

  reducers: {
    save(state, action) {
      const { type, data } = action.payload
      return { ...state, [type]: data }
    }
  }
}
