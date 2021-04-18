export class Animal {
  private name: string
  constructor(theName: string) {
    this.name = theName
  }
}

// new Animal("Cat").name; // 错误: 'name' 是私有的.

// export class Dog extends Animal {
//   constructor(name: string) {
//     super(name)
//   }
//   say () {
//     console.log(this.name)
//   }
// }

class Octopus {
  readonly numOfLegs: number = 8
  constructor(readonly name: string) {}
}

const xo  = new Octopus('oc');
console.log(xo.name)
console.log(xo.numOfLegs)