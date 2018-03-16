const origin = [
  {
    question: '全新 Cayenne 系列现已上市的车型有多少款？',
    answer: ['1 ', '2 ', '3 ', '4'],
    correct: '3'
  },
  {
    question: '全新 Cayenne 系列车型的售价区间是多少？',
    answer: [
      '888,000 ~ 1,988,000',
      '888,000 ~ 1,998,000',
      '988,000 ~ 1,998,000',
      '998,000 ~ 1,998,000'
    ],
    correct: '4'
  },
  {
    question: '以下属于全新 Cayenne 标准版车型的发动机是？ ',
    answer: [
      '水平对置式 6 缸发动机',
      'V6 发动机',
      '直列式 6 缸发动机',
      'V8 发动机'
    ],
    correct: '2'
  },
  {
    question: '全新 Cayenne 标准版车型的发动机形式是？ ',
    answer: [
      '2.9 单涡轮双涡管',
      '3.0 单涡轮双涡管',
      '3.0 双涡轮单涡管',
      '3.6 双涡轮双涡管'
    ],
    correct: '2'
  },

  {
    question: '全新 Cayenne 标准版车型的发动机输出功率是多少？',
    answer: ['324', '330', '340', '440'],
    correct: '3'
  },
  {
    question: '全新 Cayenne 标准版车型的发动机最大 扭矩是多少？',
    answer: ['420', '440', '450', '550'],
    correct: '3'
  },
  {
    question: '全新 Cayenne 标准版车型的百公里加速（配备SC组件）是多少秒？',
    answer: ['4.6', '5.2', '5.9', '6.2'],
    correct: '3'
  },
  {
    question: '全新 Cayenne 标准版车型的空载重量（德国工业标准）是多少？',
    answer: ['1895', '1945', '1985', '2020'],
    correct: '3'
  },
  {
    question: '全新 Cayenne S 车型的发动机形式是？',
    answer: [
      '2.9 单涡轮双涡管',
      '2.9 双涡轮单涡管',
      '3.0 单涡轮双涡管',
      '3.0 双涡轮单涡管'
    ],
    correct: '2'
  },
  {
    question: '全新 Cayenne S 车型的发动机输出功率是多少？',
    answer: ['340', '380', '440', '550'],
    correct: '3'
  }
]

export default origin.map(v => {
  const { correct, answer } = v
  const an = answer.map((a, i) => ({ q: a, v: +correct === i + 1 }))
  return { ...v, answer: an }
})