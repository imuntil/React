const container = document.querySelector('#container')
const f = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  f.appendChild(document.createElement('div'))
}
container.appendChild(f)

let html = ''
for (let i = 0; i < 1000; i++) {
  html += '<div></div>'
}
container.innerHTML = html

const divs = []
for (let i = 0; i < 1000; i++) {
  divs.push(document.createElement('div'))
}
container.append(...divs)
