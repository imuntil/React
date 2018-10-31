import dayjs from 'dayjs'

export const delay = timer => new Promise(resolve => setTimeout(resolve, timer))

export const weeks = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]
export const getDays = () => {
  const today = dayjs()
  const days = [
    today.subtract(3, 'day'),
    today.subtract(2, 'day'),
    today.subtract(1, 'day'),
    today,
    today.add(1, 'day'),
    today.add(2, 'day'),
    today.add(3, 'day')
  ]
  return days.map((d, i) => ({
    week: weeks[d.day()],
    date: d.format('MM-DD'),
    isToday: i === 3
  }))
}
