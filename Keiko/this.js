const obj = {
  a: 'obj.a',
  e: 'obj.e',
  b () {
    return this.a
  },
  c: () => {
    return this.a
  },
  d: () => {
    return this.e
  }
}

var a = 'global.a'
const e = 'e'

console.log(global.a === 'global.a')
console.log(global.e === undefined)

console.log(obj.b() === 'obj.a')
console.log(obj.c() === 'global.a')
console.log(obj.d() === undefined)

console.log(obj.b.call(global) === 'global.a')
console.log(obj.c.call(global) === 'global.a')
console.log(obj.d.call(global) === undefined)


console.log(obj.b.call(obj) === 'obj.a')
console.log(obj.c.call(obj) === 'global.a')
console.log(obj.d.call(obj) === undefined)

const {b, c, d} = obj
console.log(b() === 'global.a')
console.log(c() === 'global.a')
console.log(d() === undefined)