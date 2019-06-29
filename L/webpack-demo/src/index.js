// function getComponent() {
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(_ => {
//     const element = document.createElement('div')
//     element.innerHTML = _.join(['Hello', 'world'], ' ')
//     return element
//   })
// }
import _ from 'lodash'

document.addEventListener(
  'click',
  () => {
    // import(/* webpackPrefetch: true */ './test').then(({ default: res }) => {
    //   res.run()
    // })
    // getComponent().then(element => {
    //   document.body.appendChild(element)
    // })
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'world'], ' ')
    document.body.appendChild(element)
    import(/* webpackChunkName: 'test' */ './test').then(
      ({ default: test }) => {
        test.run()
      }
    )
  },
  false
)
