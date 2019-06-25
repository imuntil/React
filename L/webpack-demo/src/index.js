// import '@babel/polyfill'

const arr = [new Promise(() => 1), 1, 'ss']
arr.find(v => v === 1)
arr.some(v => v > 10)