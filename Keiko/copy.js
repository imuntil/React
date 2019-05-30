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

function test(deepFn) {
  console.log('测试方法: ', deepFn.name)
  console.log('--------------start-----------------')
  // 普通
  const ta = { x: { m: [1, 2, 3, { a: 'lalala' }] }, y: 1, z: [1, 3] }
  console.log('基本测试:', deepFn(ta).x.m[3] !== ta.x.m[3])
  // 保持引用
  const b = { m: ta, n: ta }
  const cloneB = deepFn(b)
  console.log('保持引用:', cloneB.m === cloneB.n)
  // 深度过深导致爆栈
  try {
    deepFn(createData(10000))
    console('深度过深: OK')
  } catch (error) {
    console.log('深度过深: 爆栈')
  }
  // 循环引用导致爆栈
  try {
    const tb = { x: 10 }
    tb.y = tb
    deepFn(tb)
    console.log('循环引用: OK')
  } catch (error) {
    console.log('循环引用: 爆栈')
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

test(cloneDeep_hash)
test(cloneDeep_array)
