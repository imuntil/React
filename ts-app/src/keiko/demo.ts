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