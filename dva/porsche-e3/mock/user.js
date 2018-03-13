import qs from 'qs'
import mockjs from 'mockjs'

const Random = mockjs.Random

let tableListData

if (!global.tableListData) {
  const data = mockjs.mock({
    'data|100': [
      {
        'id|+1': 1,
        name: () => {
          return Random.cname()
        },
        mobile: /1(2[0-9]|4[57]|5[0-35-9]|7[01678\|8[0-9]|9[0-9])\d{8}/,
        avatar: () => {
          return Random.image('125x125')
        },
        'status|1-2': 1,
        email: () => Random.email('visiondk.com'),
        'isadmin|0-1': 1,
        created_at: () => Random.datetime('yyyy-MM-dd HH:mm:ss'),
        updated_at: () => Random.datetime('yyyy-MM-dd HH:mm:ss')
      }
    ],
    page: {
      total: 100,
      current: 1
    }
  })
  tableListData = data
  global.tableListData = tableListData
} else {
  tableListData = global.tableListData
}

export default {
  'GET /users'(req, res) {
    const { page, pageSize = 10, currentPage = 1 } = qs.parse(req.query)
    let data
    let newPage
    let newData = tableListData.data.concat()
    if (page && page.field) {
      const d = newData.filter(v => {
        return v[page.field].indexOf(page.keyword) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      newPage = {
        current: currentPage,
        total: d.length
      }
    } else {
      data = tableListData.data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
      tableListData.page.current = currentPage
      newPage = {
        current: tableListData.page.current,
        total: tableListData.page.total
      }
    }
    setTimeout(() => {
      res.json({
        success: true,
        result: data,
        page: newPage
      })
    }, 200)
  }
}
