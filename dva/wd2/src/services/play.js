const fs = require('fs')
const path = require('path')
fs.readFile(
  path.resolve(__dirname, '../routes/CocktailPage.js'),
  'utf-8',
  (err, data) => {
    const reg = /(\<CocktailGrid.+?\/\>)/g
    data = data.replace(/\n/g, '')
    const arr = data.match(reg)
    const res = arr.map(v => {
      const cock = v
        .slice(13, -2)
        .trim()
        .replace(/\s{2,}/g, '...')
        .split('...')
      const tail = {}
      cock.forEach(v => {
        const [x, y] = v.split('=')
        x && y &&
          (tail[x] = y.replace(/\{(.+)\}|"(.+)"/, (match, p1, p2) => p1 || p2))
      })
      return tail
    })
    console.log(res)
  }
)
