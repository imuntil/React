import _ from 'lodash'
import $ from 'jquery'

console.log(_.join(['a', 'b', 'c'], '***'))

// function getComponent() {
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(_ => {
//     const element = document.createElement('div')
//     element.innerHTML = _.join(['Hello', 'world'], ' ')
//     return element
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element)
// })
