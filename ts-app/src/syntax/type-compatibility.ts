// 类型兼容性

export interface Named {
  name: string
}

let x: Named
let y = { name: 'xya', location: 'shanghai' }

x = y

function greet(n: Named): void {
  console.log(n.name)
}

greet(x)
greet(y)

// ****************

let xf = (a: number) => 0
let yf = (a: number, b: string) => 0
let zf = (m: number, n: number) => ''
// xf = yf
yf = xf
// xf = zf
// zf = xf

let items = [1, 2, 3]
items.forEach((item, index, arr) => {})
items.forEach((item) => {})

let cb1: (item: number, index: number, arr: number[]) => void = (
  item,
  index,
  arr
) => {}
let cb2: (item: number) => void = (item) => {}

cb1 = cb2

// forEach的参数cb，实际是需要三个参数的函数，但是依然可以传入一个或者两个参数。这也就说明了函数参数的类型兼容性
// 这点和上面的貌似name貌似相反。但是函数返回值的兼容性逻辑和name是一致的

let rx = () => ({ name: 'xx' })
let ry = () => ({ name: 'yy', location: '10' })

rx = ry

// ****************

enum EventType {
  Mouse,
  Keyboard,
}

interface Events {
  timestamp: number
}

interface MouseEvents extends Events {
  x: number
  y: number
}
interface KeyEvents extends Events {
  keyCode: number
}

function listenEvent(eventType: EventType, handler: (n: Events) => void) {}

// listenEvent(EventType.Mouse, (e: MouseEvents) => {
//   console.log(e.x, e.y)
// })

// listenEvent(EventType.Keyboard, (e: KeyEvents) => {
//   console.log(e.keyCode)
// })

listenEvent(EventType.Mouse, (e: Events) =>
  console.log((e as MouseEvents).x + ',' + (e as MouseEvents).y)
)

listenEvent(EventType.Keyboard, (e: Events) => {
  console.log((e as KeyEvents).keyCode)
})

// ****************

function invokeLater(args: any[], callback: (...args: any[]) => void) {}

invokeLater([1, 2], function (x, y) {
  console.log(x + y)
})

// ****************

enum Status {
  Ready,
  Waiting,
}
enum Color {
  Red,
  Blue,
  Green,
}

let myStatus = Status.Ready
// myStatus = Color.Red

// ****************

class Animal {
  feet: number
  constructor(name: string, feet: number) {
    this.feet = feet
  }
}

class Size {
  feet: number
  constructor(feet: number) {
    this.feet = feet
  }
}


let ani: Animal = new Animal('a', 1)
let siz: Size = new Size(2)

// ani = siz; ok
siz = ani
