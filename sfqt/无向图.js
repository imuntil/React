class Graph {
  constructor(input) {
    this.init(input)
  }
  init = (input) => {
    const [V, E, ...rest] = input.split('\n').filter((v) => v !== '')
    this.V = +V
    this.adj = Array(+V)
      .fill('')
      .map(() => [])
    this.E = 0
    rest.forEach((v) => {
      this.addEdge(...v.split(' '))
    })
  }

  addEdge = (v, w) => {
    this.adj[+v].push(+w)
    this.adj[+w].push(+v)
    this.E++
  }
}
