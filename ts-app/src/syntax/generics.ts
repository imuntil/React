// 泛型

export function identity<T>(arg: T): T {
  return arg
}

const res1 = identity<string>('myname')
const res2 = identity('myString')

export let myIdentity: <T>(arg: T) => T = identity
const res3 = myIdentity(10)

interface GenericIdentityFn<T> {
  (arg: T): T
}

export let myIdentity2: GenericIdentityFn<number> = identity
// myIdentity2('ss')
myIdentity2(12)

class GenericClass<T> {
  zeroValue!: T
  add!: (x: T, y: T) => T
}

const myGenericNumber = new GenericClass<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = (x, y) => x + y

const myGenericString = new GenericClass<string>()
myGenericString.zeroValue = ''
myGenericString.add = (x, y) => x + y

interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// loggingIdentity(3)
loggingIdentity('3')
loggingIdentity([3])
loggingIdentity({ length: 1 })

// function getProperty(obj: T, key: K) {
//   return obj[key]
// }
// let x = { a: 1, b: 2, c: 3, d: 4 };
// getProperty(x, 'a')
// getProperty(x, 'm')