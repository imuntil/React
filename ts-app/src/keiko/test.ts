import member from './common.module'

let n: number
n = 100
// n = null
// n = undefined

function getNumber(): number | null | undefined {
  let r = Math.random()
  if (r > 0.6) {
    return r
  } else if (r > 0.3) {
    return null
  }
  return undefined
}

// let xx: number
// if (xx === undefined) {
//   // xxx
// }

let weight: number | undefined = undefined

if (weight === undefined) {
  // todo
}

console.log(member)

interface Student {
  [x: string]: number | string
}

const key = 'name'
const student: Student = {}
student[key] = 'lalala'

const arr1 = ['ybc', 'ybc', 'ybc', '', 'ybc']

function add1(x: number, y: number): number
function add1(x: string, y: string): string
function add1(x: any, y: any): any {
  return x + y
}

add1(1, 1)
add1('x', 'h')
// add1(1, 'x')

function add2<T>(x: T, y: T): T {
  return x + y
}

add2<number>(1, 2)
add2<string>('x', 'y')

interface GenAdder {
  <T>(x: T, y: T): T
}

let add3: GenAdder
// add3 = add2
// add3<number>(1, 2)

add3 = function <T>(x: T, y: T): T {
  return x + y
}

add3<number>(1, 2)

interface GenAdder2<T> {
  (x: T, y: T): T
}

let add4: GenAdder2<number>

add4 = (x: number, y: number) => {
  return x + y
}
add4(1, 2)

class Adder<T> {
  add: (x: T, y: T) => T = (x, y) => x + y
}

const add5 = new Adder<number>()
add5.add(1, 2)
// add5.add('1', '2')

const add6 = new Adder<string>()
add6.add('a', 'b')

function getLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length)
  return arg
}

// getLength<boolean>(true)
getLength<string>('dk')
getLength<number[]>([1, 2, 3])

let people = { name: 'zz', age: 15, other: { x: 1, y: 2 } }
let keys: keyof typeof people

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

getProperty(people, 'name')
// getProperty(people, 'xxx')

type Name = 1 | 2 | 3
enum Name2 {
  A = 1,
  B,
  C,
  D,
}

function sayName(name: Name): void {
  console.log(name)
}
function sayName2(name: Name2): void {
  console.log(name)
}

let say: (name: Name) => void
// say = sayName
// say = sayName2
// say(4)
// sayName2(4)

type Words = 'a'|'b'|"c";

type W<T> = T extends Words ? true : false;

type WA = W<'a'>; // -> true
type WD = W<'d'>; // -> false

// const wa: WA = true

type obj = {
  // [p in Name]: string
  [k in Name2]: string
}