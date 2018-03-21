export const delay = time =>
  new Promise((resolve, rejeect) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
