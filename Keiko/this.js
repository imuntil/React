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
  },
  x () {
    setTimeout(() => {
      console.log('this.a', this.a)
    }, 1);
  },
  y () {
    return (context => {
      console.log('this.a', context.a)
    })(this)
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

obj.x()
obj.x.call(global)
console.log('__this.a', this.a)

var name = '123'
class My {
  constructor () {
    this.name = 'zhin'
  }

  tell = () => {
    console.log('this.name', this.name)
  }
}
const my = new My()
my.tell()
my.tell.call(global)