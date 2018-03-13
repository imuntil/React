import qs from 'qs'
import mockjs from 'mockjs'
const Random = mockjs.Random

let questionCache

if (!global.questionCache) {
  const data = mockjs.mock({
    'data|10': [
      {
        question: () => Random.csentence(5, 15),
        'correct|1-4': 1,
        'answer|4': [() => Random.csentence(2, 10)],
        flag: 1
      }
    ]
  })

  const picData = mockjs.mock({
    'data|10': [
      {
        flag: 2,
        'foo|1-2': 1,
        'correct|1-4': 1,
        answer: function() {
          return this.foo === 1
            ? mockjs.mock({ 'xx|4': [Random.img('300x300')] }).xx
            : mockjs.mock({ 'xx|4': [() => Random.csentence()] }).xx
        },
        question: function() {
          return (
            Random.csentence(5, 15) +
            (this.foo === 2 ? `||${Random.image('250x250')}` : '')
          )
        }
      }
    ]
  })

  questionCache = { word: data, pic: picData }
  global.questionCache = questionCache
} else {
  questionCache = global.questionCache
}

export default {
  'GET /questions/word'(req, res) {
    setTimeout(() => {
      res.json({
        code: 1,
        result: questionCache.word
      })
    }, 100)
  },
  'GET /questions/pic'(req, res) {
    setTimeout(() => {
      res.json({
        code: 1,
        result: questionCache.pic
      })
    }, 100)
  }
}
