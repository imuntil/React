import { observable, computed, action } from 'mobx'

export default class UserStore {
  @observable
  name: string = ''

  @observable
  age: number = 0

  @computed
  get intro() {
    return this.name + this.age
  }

  rootStore: any = undefined

  constructor(rootStore: any) {
    this.rootStore = rootStore
  }

  @action.bound
  setName (name: string) {
    debugger
    this.name = name
  }

  @action
  setAge = (age: number) => {
    debugger
    this.age = age
  }
}