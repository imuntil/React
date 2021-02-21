Function.prototype.myCall = function (thisArg, ...rest) {
  // 判断参数合法性，如果thisArg为null或者undefined，则指向window
  if (thisArg === undefined || thisArg === null) {
    thisArg = window
  } else {
    // 创建一个可包含数字/字符串/布尔值的对象，
    // thisArg 会指向一个包含该原始值的对象。
    thisArg = Object(thisArg)
  }

  // 处理this指向
  // 创建一个不重复的key
  const specialMethod = Symbol('this')
  // 如果调用myCall的函数名是func，也即以func.myCall()形式调用；
  //则myCall函数体内的this指向func
  thisArg[specialMethod] = this
  // 类型 obj.method() 的调用方式，此时method中的this指向的就是obj
  // 在当前状况下，指向的即为thisArg
  const res = thisArg[specialMethod](...rest)

  // 收尾，还原对象
  delete thisArg[specialMethod]
  // 返回结果
  return res
}
