import React from 'react';
import { Router } from 'dva/router';

import ModifyPage from "./routes/User/ModifyPage.js";

import Order from "./routes/OrderPage.js";

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
              registerModel(app, require('./models/user/userinfo'))
              cb(null, require('./routes/Product/Filter'))
            })
          }
        },
        {
          path: 'product/:id',
          layout: 'NoBarLayout',
          name: 'ProductDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '详情'
              registerModel(app, require('./models/user/userinfo'))
              registerModel(app, require('./models/product/detail'))
              registerModel(app, require('./models/product/list-store'))
              registerModel(app, require('./models/collection'))
              registerModel(app, require('./models/cart/cart'))
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
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              document.title = '购物车'
              registerModel(app, require('./models/user/userinfo'))
              registerModel(app, require('./models/product/list-store'))
              registerModel(app, require('./models/cart/cart'))
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
              registerModel(app, require('./models/user/userinfo'))
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
              registerModel(app, require('./models/user/userinfo'))
              cb(null, require('./routes/User/ModifyPage'))
            })
          }
        },
        {
          path: 'user/modify-nick',
          name: 'UserModifyNickPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '修改昵称'
              registerModel(app, require('./models/user/userinfo'))
              cb(null, require('./routes/User/ModifyNick'))
            })
          }
        },
        {
          path: 'user/modify-avatar',
          name: 'UserModifyAvatarPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '修改头像'
              registerModel(app, require('./models/user/userinfo'))
              cb(null, require('./routes/User/ModifyAvatar'))
            })
          }
        },
        {
          path: 'user/collection',
          name: 'MyCollectionPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '我的收藏'
              registerModel(app, require('./models/user/userinfo'))
              registerModel(app, require('./models/collection'))
              registerModel(app, require('./models/product/list-store'))
              cb(null, require('./routes/User/MyCollection'))
            })
          }
        },
        {
          path: 'adr/list',
          name: 'AdrListPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '地址列表'
              registerModel(app, require('./models/user/userinfo'))
              registerModel(app, require('./models/user/adr'))
              cb(null, require('./routes/Address/AdrListPage'))
            })
          }
        },
        {
          path: 'adr/edit(/:id)',
          name: 'AdrEditPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '编辑地址'
              registerModel(app, require('./models/user/adr'))
              registerModel(app, require('./models/user/userinfo'))
              cb(null, require('./routes/Address/AdrEditPage'))
            })
          }
        },
        {
          path: 'order(/:status)',
          name: 'OrderPage',
          layout: 'NoBarLayout',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              document.title = '我的订单'
              registerModel(app, require('./models/user/userinfo'))
              registerModel(app, require('./models/order/order-store'))
              registerModel(app, require('./models/order/current-orders'))
              cb(null, require('./routes/OrderPage.js'))
            })
          }
        }
      ]
    }
  ]
  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
