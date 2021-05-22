import UserStore from './user'

export default class RootStore {

  userStore: any = undefined;

  constructor() {
    this.userStore = new UserStore(this)
  }
}