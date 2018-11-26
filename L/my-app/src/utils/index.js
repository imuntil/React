import dayjs from 'dayjs'

export const delay = timer => new Promise(resolve => setTimeout(resolve, timer))

export const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
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

export const lvMap = {
  '0': {
    title: '无能力者',
    icon: 'icon-lv0',
    lv: 0
  },
  '1': {
    title: '低能力者',
    icon: 'icon-lv1',
    lv: 1
  },
  '2': {
    title: '异能力者',
    icon: 'icon-lv2',
    lv: 2
  },
  '3': {
    title: '强能力者',
    icon: 'icon-lv3',
    lv: 3
  },
  '4': {
    title: '大能力者',
    icon: 'icon-lv4',
    lv: 4
  },
  '5': {
    title: '超能力者',
    icon: 'icon-lv5',
    lv: 5
  },
  '6': {
    title: '绝对能力者',
    icon: 'icon-lv6',
    lv: 6
  }
}

export const mockImg = (
  w = 800,
  h = 600,
  bg = 'FFF',
  color = 'AAA',
  text = 'IMG'
) => `https://dummyimage.com/${w}x${h}/${bg}/${color}.png&text=${text}`

/* 将search字符串转换为对象 */
export const formatSearch = (search) => {
  let q = search || window.location.search
  q = decodeURIComponent(q.substring(1) || '') || ''
  const obj = {}
  q.split('&').forEach(v => {
    const [key, value] = v.split('=')
    obj[decodeURIComponent(key)] = decodeURIComponent(value)
  })
  return obj
}
