import { observable, computed, action, makeObservable } from 'mobx'

// export default class UserStore {
//   @observable
//   name: string = ''

//   @observable
//   age: number = 0

//   @computed
//   get intro() {
//     return this.name + this.age
//   }

//   rootStore: any = undefined

//   constructor(rootStore: any) {
//     this.rootStore = rootStore
//   }

//   @action.bound
//   setName (name: string) {
//     debugger
//     this.name = name
//   }

//   @action
//   setAge = (age: number) => {
//     debugger
//     this.age = age
//   }
// }

const str = 'abcdefghijklmnopqrstuvwxyz0123456'
const random = () => {
  return Array(5)
    .fill('')
    .map(() => str[Math.floor(Math.random() * 36)])
    .join('')
}

export default class UserStore {
  name: string = ''
  age: number = 0
  todos: { name: string; complete: boolean }[] = []
  get intro() {
    return this.name + ' ' + this.age
  }
  rootStore: any = undefined
  constructor(rootStore: any) {
    makeObservable(this, {
      name: observable,
      age: observable,
      setName: action.bound,
      setAge: action.bound,
      todos: observable,
      addTodo: action.bound
    })
    this.rootStore = rootStore
  }

  setName(name: string) {
    this.name = name
  }

  setAge(age: number) {
    this.age = age
  }

  addTodo() {
    this.todos.push({ name: random(), complete: false })
  }

  togggleTodo(index: number) {
    const todo = this.todos[index]
    todo.complete = !todo.complete
  }
}
