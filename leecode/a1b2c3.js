function xx(str) {
  let count = 0
  const back = (xstr) => {
    for (let i of [1, 2]) {
      if (xstr === '') {
        count++
        return
      }

      const ix = -i
      if (i > xstr) continue
      const sub = xstr.slice(ix)
      if (+sub > 26) continue
      xstr = xstr.slice(0, ix)

      back(xstr)
      xstr += sub
    }
  }
  back(str)
  return count
}


xx('1234')