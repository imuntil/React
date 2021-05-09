export let myAdd: (x: number, y: number) => number

myAdd = function (x, y) {
  return x + y
}

function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`
  }
  return firstName
}

buildName('tom')
buildName('tom', 'jack')
// buildName('tom', 'jac', 's')

function buildName2(firstName: string, lastName = 'bob'): string {
  return `${firstName} ${lastName}`
}

buildName2('abc', 'efg')
buildName2('abc')
buildName2('abc', undefined)
// buildName2('abc', 'xbf', 'dd')
// buildName2('abc', 2)

function buildName3(firstName: string, ...restName: string[]): string {
  return `${firstName} ${restName.join(' ')}`
}

buildName3('xd')
buildName3('abc', 'dd', 'ee')

interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  carts: number[]
  createCardPicker(this: Deck): () => Card
}

export let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  carts: Array(52),
  createCardPicker(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  },
}

document.querySelector('#click')?.addEventListener(
  'click',
  function (this: Element, event) {
    console.log(this)
  },
  false
)

let suits = ['hearts', 'spades', 'clubs', 'diamonds']
interface card {
  suit: string,
  card: number
}
function pickCard(x: card[]): number
function pickCard(x: number): { suit: string; card: number }
function pickCard(x: number | card[]): any {
  if (typeof x === 'object') {
    return Math.floor(Math.random() * x.length)
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

pickCard(10);