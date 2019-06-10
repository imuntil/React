import _ from 'lodash'
import printMe from './print'
import './styles.css'

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')
  element.innerHTML = _.join(['Hello', 'Webpack!'], ' ')
  btn.innerHTML = '点击这里，然后查看 console'
  btn.onclick = printMe
  element.appendChild(btn)
  return element
}
document.body.appendChild(component())

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')
    printMe()
  })
}
