export class Animal {
  protected name: string;
  constructor(theName: string) { this.name = theName; }
}

// new Animal("Cat").name; // 错误: 'name' 是私有的.
export class Dog extends Animal {
  constructor(theName: string) {
    super(theName)
    this.say()
  }

  say (): void {
    console.log(this.name)
  }
}