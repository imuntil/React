import _ from 'lodash'
import './style.css'
import bg from './bg.JPG'
import data from './data.xml'

function component() {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')
  const img = new Image()
  img.src = bg
  element.appendChild(img)
  console.log('data', data)
  return element
}
document.body.appendChild(component())
