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
// import(/* webpackChunkName: 'test' */ './test').then(({default: test}) => {
//   test.run()
// })

document.addEventListener(
  'click',
  () => {
    import(/* webpackPrefetch: true */ './test').then(({ default: res }) => {
      res.run()
    })
  },
  false
)
