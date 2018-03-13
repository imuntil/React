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
        'answer|4': [() => Random.csentence(2, 10)]
      }
    ]
  })
  questionCache = data
  global.questionCache = questionCache
} else {
  questionCache = global.questionCache
}

export default {
  'GET /questions'(req, res) {
    setTimeout(() => {
      res.json({
        success: true,
        result: questionCache
      })
    }, 100)
  }
}
