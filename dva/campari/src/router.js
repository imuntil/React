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
        const name = nextState.routes[1].name
        require.ensure([], (require) => {
          if (name === 'ProductDetail') {
            cb(null, require('./components/Layouts/BuyBarLayout'))
          } else {
            cb(null, require('./components/Layouts/DefaultLayout'))
          }
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
              registerModel(app, require('./models/product/list-store'))
              registerModel(app, require('./models/product/all'))
              registerModel(app, require('./models/lvStatus'))
              registerModel(app, require('./models/product/filter-params'))
              cb(null, require('./routes/Product/All'))
            })
          }
        },
        {
          path: 'product/filter/:flag/:sort/:type',
          name: 'ProFilterPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '全部商品'
              registerModel(app, require('./models/product/list-store'))
              registerModel(app, require('./models/product/filter'))
              registerModel(app, require('./models/lvStatus'))
              registerModel(app, require('./models/product/filter-params'))
              cb(null, require('./routes/Product/Filter'))
            })
          }
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '详情'
              registerModel(app, require('./models/product/detail'))
              registerModel(app, require('./models/product/list-store'))
              cb(null, require('./routes/Product/Detail'))
            })
          }
        },
        {
          path: 'cocktail',
          name: 'CocktailPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '经典鸡尾酒'
              registerModel(app, require('./models/cocktail'))
              registerModel(app, require('./models/lvStatus'))
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
