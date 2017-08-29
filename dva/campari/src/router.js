import React from 'react';
import { Router } from 'dva/router';

const cached = {}
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'Layout',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Layouts/DefaultLayout'))
        })
      },
      childRoutes: [
        {
          path: '',
          name: 'HomePage',
          getIndexRoute(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '首页精选'
              cb(null, { component: require('./routes/HomePage') })
            })
          }
        },
        {
          path: 'product/all',
          name: 'ProAllPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '全部商品'
              registerModel(app, require('./models/product/all'))
              registerModel(app, require('./models/lvStatus'))
              // registerModel(app, require('./models/all'))
              cb(null, require('./routes/Product/All'))
            })
          }
        },
        {
          path: 'product/filter',
          name: 'ProFilterPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Product/Filter'))
            })
          }
        },
        {
          path: 'cocktail',
          name: 'CocktailPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/CocktailPage'))
            })
          }
        },
        {
          path: 'cart',
          name: 'CartPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/CartPage'))
            })
          }
        },
        {
          path: 'user',
          name: 'UserIndexPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/User/IndexPage'))
            })
          }
        },
      ]
    }
  ]
  return <Router history={history} routes={routes} />
}

export default RouterConfig;
