class Subject {
  list = {}

  // 订阅
  on(eventType, observer) {
    const _list = this.list[eventType] || (this.list[eventType] = [])
    _list.push(observer)
  }

  // 触发
  emit(eventType, ...args) {
    const _list = this.list[eventType] || []
    _list.forEach(observer => {
      observer(...args)
    })
  }
}

// 两个 observer
const observer1 = (...args) => {
  console.log(args)
}
const observer2 = (...args) => {
  console.log('run lalala')
}
// 实例化主题
const sub = new Subject()
// 订阅主题与事件
sub.on('type-1', observer1)
sub.on('type-2', observer2)

sub.emit('type-1', 1, 2, 3)
sub.emit('type-2', 'nothing')

class Pub {
  notify() {
    cb()
  }
}

// 感觉就是 观察者 模式的主题
class Dispatcher {
  list = {}

  // 订阅
  on(eventType, observer) {
    const _list = this.list[eventType] || (this.list[eventType] = [])
    _list.push(observer)
  }

  // 触发
  emit(eventType, ...args) {
    const _list = this.list[eventType] || []
    _list.forEach(observer => {
      observer(...args)
    })
  }
}

// 实例化 发布者 和 调度中心
const pub = new Pub()
const dispatcher = new Dispatcher()

// 两个订阅者
const subscriber1 = (...args) => {
  console.log(`i'm subscribter1, `, args)
}
const subscriber2 = () => {
  console.log(`I'm subscriber2. lalalalalala`)
}

// 订阅调度中心
dispatcher.on('go', subscriber1)
dispatcher.on('say', subscriber2)

// 发布事件
// 感觉这里有点牵强
// 可能这里就是所谓的解耦吧
pub.notify(() => {
  // 调度中心 触发事件
  dispatcher.emit('go', 'run run run')
})
setTimeout(() => {
  pub.notify(() => {
    dispatcher.emit('say', 'fuck you!! world')
  })
}, 1000)
