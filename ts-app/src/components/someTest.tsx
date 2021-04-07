export class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

interface DogInterface {
  breed: string
  name: string
  eggs: number
  run(speed: number): void
}

export class Dog extends Animal implements DogInterface {
  breed: string
  eggs: number
  constructor(name: string, breed: string) {
    super(name)
    this.breed = breed
    this.eggs = 4
  }
  run(speed: number) {
    console.log(`this dog can run with speed ${speed} km/h`)
  }
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
export interface NotOkay {
  [x: string]: Animal
  [x: number]: Dog
}
