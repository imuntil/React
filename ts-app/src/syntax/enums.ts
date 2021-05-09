// 枚举

export enum Direction {
  Up = 1,
  Right,
  Down,
  Left,
}

enum Response {
  Yes = 1,
  No = 0,
}

function respond(message: string, code: Response): void {}
respond('lalala', Response.Yes)

export enum E1 { X, Y, Z }

export enum E2 {
    A = 1, B, C
}

enum E {
  Foo,
  Bar,
}

console.log(E[0])

// function f(x: E) {
//   if (x !== E.Foo || x !== E.Bar) {
//       //             ~~~~~~~~~~~
//       // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
//   }
// }

enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

// let c: Circle = {
//   kind: ShapeKind.Square,
//   //    ~~~~~~~~~~~~~~~~ Error!
//   radius: 100,
// }

const enum Gender {
  male,
  female
}