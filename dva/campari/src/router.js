import React from 'react';
import { Router } from 'dva/router';

import ModifyPage from "./routes/User/ModifyPage.js";

/* eslint-disable no-undef */
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
        const { layout = 'DefaultLayout' } = nextState.routes[1]
        require.ensure([], (require) => {
          cb(null, require(`./components/Layouts/${layout}`))
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
          layout: 'BuyBarLayout',
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
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '我的'
              registerModel(app, require('./models/user/userinfo'))
              cb(null, require('./routes/User/IndexPage'))
            })
          }
        },
        {
          path: 'user/login',
          name: 'UserLoginPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '登录'
              registerModel(app, require('./models/user/userinfo'))
              cb(null, require('./routes/User/LoginPage'))
            })
          }
        },
        {
          path: 'user/register',
          name: 'UserRegisterPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '注册'
              cb(null, require('./routes/User/Register'))
            })
          }
        },
        {
          path: 'user/reg2',
          name: 'UserReg2Page',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '注册'
              cb(null, require('./routes/User/Reg2Page'))
            })
          }
        },
        {
          path: 'user/safe',
          name: 'UserSafePage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '账户安全'
              cb(null, require('./routes/User/SafePage'))
            })
          }
        },
        {
          path: 'user/modify',
          name: 'UserModifyPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '修改密码'
              cb(null, require('./routes/User/ModifyPage'))
            })
          }
        }
      ]
    }
  ]
  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
