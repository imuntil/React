export interface X {
  x: number | null,
  y: string,
  z: string[]
}

const x: X = { x: 1, y: '1', z: [] }
const y = { x: 1, y: undefined }

type NxN = null | undefined | string | number
type NN = NonNullable<NxN>

let nxn: NN = 'x' // ok
nxn = 1 // ok
// nxn = null // 不能将类型“null”分配给类型“NN”。
// nxn = ['x'] //不能将类型“string[]”分配给类型“NN”。不能将类型“string[]”分配给类型“string”。


function logIfHasName(something: { name?: string }) {
  if (something.name) {
    console.log(something.name);
  }
}

const person = { name: 'matt', job: 'being awesome' };
const animal = { name: 'cow', diet: 'vegan, but has milk of own species' };

logIfHasName(person); // okay
logIfHasName(animal); // okay

// logIfHasName({ neme: 'I just misspelled name to neme' }); // Error: 对象字面量只能指定已知属性，`neme` 属性不存在。