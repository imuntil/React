function isObject(target) {
  return typeof target === 'object' && target !== null
}

function createData(deep, breadth) {
  const data = {}
  let temp = data
  for (let i = 0; i < deep; i++) {
    temp = temp['data'] = {}
    for (let j = 0; j < breadth; j++) {
      temp[j] = j
    }
  }
  return data
}

function runTime(fn) {
  // 针对日常开发中较长碰到的情形，广度50，深度10，这已经是很极限的情况了
  const source = createData(3, 15)
  // const source = createData(5, 20)
  // const source = createData(10, 50)
  const stime = Date.now()
  let count = 0
  while (Date.now() - stime < 2000) {
    fn(source)
    count++
  }
  return count
}

const sym = Symbol.for('sample')

function test(deepFn) {
  console.log('测试方法: ', deepFn.name)
  console.log('--------------start-----------------')
  // 普通
  const ta = {
    x: { m: [1, 2, 3, { a: 'lalala' }] },
    y: 1,
    z: [1, 3],
    [sym]: 123
  }
  console.log('基本测试:', deepFn(ta).x.m[3] !== ta.x.m[3])
  console.log(ta)
  console.log(deepFn(ta))
  // 保持引用
  const b = { m: ta, n: ta }
  const cloneB = deepFn(b)
  console.log('保持引用:', cloneB.m === cloneB.n)
  // 深度过深导致爆栈
  try {
    deepFn(createData(10000))
    console.log('深度过深: OK')
  } catch (error) {
    console.log('深度过深: ', error.message)
  }
  // 循环引用导致爆栈
  try {
    const tb = { x: 10 }
    tb.y = tb
    deepFn(tb)
    console.log('循环引用: OK')
  } catch (error) {
    console.log('循环引用: ', error.message)
  }
  console.log('--------------end-----------------')
  console.log('')
  console.log('')
}

/**
 * shadow copy
 * @param {*} source
 */
function cloneShadow(source) {
  if (!isObject(source)) return source
  const res = Array.isArray(source) ? [] : {}
  for (let key in source) {
    // Object.create(null) 产生的对象没有 hasOwnProperty 方法
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      res[key] = source[key]
    }
  }
  return res
}

/**
 * deep copy
 * 递归，不保持引用
 * 循环引用导致爆栈, 深度过深也会导致爆栈
 * @param {*} source
 */
function clone(source) {
  if (!isObject(source)) return source
  const res = Array.isArray(source) ? [] : {}
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        // 递归
        res[key] = clone(source[key])
      } else {
        res[key] = source[key]
      }
    }
  }
  return res
}

/**
 * 处理循环引用
 * 递归，保持引用，深层级依然会爆栈
 * 方案一 哈希表
 * @param {*} source
 * @param {*} hash
 */
function cloneDeep_hash(source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  // 检查 hash 表，如果存在同一个对象则直接返回
  if (hash.has(source)) return hash.get(source)
  const res = Array.isArray(source) ? [] : {}
  // 设置 hash 表
  hash.set(source, res)
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        res[key] = cloneDeep_hash(source[key], hash)
      } else {
        res[key] = source[key]
      }
    }
  }
  return res
}

/**
 * 方案二 数组
 * 同上，深度过深会爆栈
 */
function cloneDeep_array(source, uniqueList) {
  if (!isObject(source)) return source
  if (!uniqueList) uniqueList = []

  const res = Array.isArray(source) ? [] : {}

  const uniqueData = uniqueList.find(v => v.source === source)
  // 有缓存，直接返回
  if (uniqueData) {
    return uniqueData.res
  }
  // 缓存
  uniqueList.push({ source, res })

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        res[key] = cloneDeep_array(source[key], uniqueList)
      } else {
        res[key] = source[key]
      }
    }
  }

  return res
}

// test(cloneDeep_hash)
// test(cloneDeep_array)

/**
 * 广度优先？？
 * （个人感觉这是深度优先诶，明显的后入先出；把 pop 改成 shift 才是 广度优先）
 * 非递归
 * 不保持引用
 * 解决深度过深爆栈问题
 * 不能处理循环引用，会无限执行下去。。。
 * @param {*} source
 */
function cloneLoop(source) {
  if (!isObject(source)) return source
  const root = {}
  const loopList = [{ parent: root, key: undefined, data: source }]
  while (loopList.length) {
    const { parent, key, data } = loopList.pop()
    let res = parent
    // 初始化赋值目标，如果 key 为 undefined，则当前为根对象，拷贝到父对象。反之则拷贝到子对象
    // parent[key] & data
    // data 可以理解成是 source， 而 parent 则是拷贝的结果对象，data 拷贝得到的结果就是 parent[key]
    if (key !== undefined) {
      res = parent[key] = Array.isArray(data) ? [] : {}
    }
    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (isObject(data[k])) {
          loopList.push({ parent: res, key: k, data: data[k] })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}

// test(cloneLoop)

/**
 * 广度优先??
 * 解决深度过深无法处理的问题
 * 非递归，保持引用
 * 相当于上面 cloneLoop 和 cloneDeep_hash || cloneDeep_arry 的结合
 * @param {*} source
 */
function cloneForce(source) {
  if (!isObject(source)) return source
  const root = {}
  const hash = new WeakMap()
  const loopList = [{ parent: root, key: undefined, data: source }]
  while (loopList.length) {
    const { parent, key, data } = loopList.pop()
    // 查询 hash 表
    if (hash.has(data)) {
      parent[key] = hash.get(data)
      continue
    }
    const res =
      key === undefined ? parent : (parent[key] = Array.isArray(data) ? [] : {})
    // 设置 hash 表
    hash.set(data, res)
    // 如果要处理 Symbol 类型，这里可以将 for...in...data 换成 Reflect.ownKeys
    // 就像下面注释
    // 也可以使用 Object.getOwnPropertySymbols 单独遍历 Symbol 属性
    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (isObject(data[k])) {
          loopList.push({ parent: res, key: k, data: data[k] })
        } else {
          res[k] = data[k]
        }
      }
    }
    // Reflect.ownKeys(data).forEach(k => {
    //   if (isObject(data[k])) {
    //     loopList.push({ parent: res, key: k, data: data[k] })
    //   } else {
    //     res[k] = data[k]
    //   }
    // })
  }
  return root
}

// test(cloneForce)

function cloneJSON(source) {
  return JSON.parse(JSON.stringify(source))
}

const rt = {
  clone: runTime(clone),
  cloneJSON: runTime(cloneJSON),
  cloneDeep_hash: runTime(cloneDeep_hash),
  cloneDeep_array: runTime(cloneDeep_array),
  cloneLoop: runTime(cloneLoop),
  cloneForce: runTime(cloneForce)
}

console.table(rt)
