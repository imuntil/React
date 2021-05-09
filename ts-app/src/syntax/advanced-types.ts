// 高级类型

interface AnyObject {
  [prop: string]: any
}

export function extendx<T extends AnyObject, U extends AnyObject>(
  first: T,
  second: U
): T & U {
  let res: Partial<T & U> = {}
  for (let key in first) {
    ;(res as any)[key] = first[key]
  }
  for (let key in second) {
    if (!res.hasOwnProperty(key)) {
      ;(res as any)[key] = second[key]
    }
  }
  return res as T & U
}

// ******************8

export function paddingLeft(value: string, padding: number | string) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  return value
}

type Scores = 1 | 2 | 3 | 4 | 5
export function logScore(score: Scores) {
  console.log(score)
}

logScore(1)
logScore(5)
// logScore(6)

// ****************

interface Bird {
  fly(): void
  layEggs(): void
}
interface Fish {
  swim(): void
  layEggs(): void
}

class MyFish implements Fish {
  swim () {}
  layEggs () {}
}

function getSmallPet(): Fish | Bird {
  let cost: number = Math.random()
  if (cost > 0.5) {
    return { fly() {}, layEggs() {} }
  }
  return new MyFish()
}


let pet = getSmallPet()
// if (pet.swim) {}
if ('swim' in pet) {
  pet.swim()
}

if ((pet as Fish).swim) {
  (pet as Fish).swim()
}

if (pet instanceof MyFish) {

}