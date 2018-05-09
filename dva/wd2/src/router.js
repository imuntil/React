import React from 'react'
import {Router, Route, Switch} from 'dva/router'

import AuthRoute from './components/AuthRoute'
import NavBar from './components/NavBar'
import IndexPage from './routes/IndexPage'
/* eslint-disable no-unused-vars */
import CocktailPage from './routes/CocktailPage'
import CartPage from './routes/CartPage'
import ProIndexPage from './routes/Product/ProIndexPage'
import ProListPage from './routes/Product/ProListPage'
import ProDetailPage from './routes/Product/ProDetailPage'
import PointProsPage from './routes/Product/PointProsPage'

import LoginPage from './routes/User/LoginPage'
import Register1Page from './routes/User/Register1Page'
import Register2Page from './routes/User/Register2Page'
import UserIndex from './routes/User/UserIndex'
import ForgetPage from './routes/User/ForgetPage'
import LogoutPage from './routes/User/LogoutPage'
import CollectionPage from './routes/User/CollectionPage'

import ModifyPwdPage from './routes/User/Modify/ModifyPwdPage'
import ModifyNickPage from './routes/User/Modify/ModifyNickPage'
import ModifyAvatarPage from './routes/User/Modify/ModifyAvatarPage'

import AdrListPage from './routes/Adr/AdrListPageV2'
import AdrEditPage from './routes/Adr/AdrEditPage'

import OrderListPage from './routes/Order/OrderListPage'
import OrderPage from './routes/Order/OrderPage'

import CouponPage from './routes/User/CouponPage'

const Pro = () => {
  return (
    <Switch>
      <Route path="/pro/" exact component={ProIndexPage}/>
      <Route path="/pro/list" component={ProListPage}/>
      <AuthRoute path="/pro/points" component={PointProsPage}/>
      <Route path="/pro/:id" component={ProDetailPage}/>
    </Switch>
  )
}

const User = () => {
  return (
    <Switch>
      <AuthRoute path="/user/" exact component={UserIndex}/>
      <Route path="/user/login" component={LoginPage}/>
      <Route path="/user/reg1" component={Register1Page}/>
      <Route path="/user/reg2" component={Register2Page}/>
      <Route path="/user/forget" component={ForgetPage}/>
      <AuthRoute path="/user/logout" component={LogoutPage}/>
      <AuthRoute path="/user/modify/pwd" component={ModifyPwdPage}/>
      <AuthRoute path="/user/modify/nick" component={ModifyNickPage}/>
      <AuthRoute path="/user/modify/avatar" component={ModifyAvatarPage}/>
      <AuthRoute path="/user/col" component={CollectionPage}/>
      <AuthRoute path="/user/coupon/:mode?" component={CouponPage}/>
    </Switch>
  )
}

const Adr = () => {
  return (
    <Switch>
      <AuthRoute path="/adr" exact component={AdrListPage}/>
      <AuthRoute path="/adr/:edit" component={AdrEditPage}/>
    </Switch>
  )
}

function isVisible({pathname}) {
  return (['/', '/pro', '/cocktail'].indexOf(pathname) > -1 || pathname.indexOf('/pro/list') === 0)
}

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route
        path="/"
        render={({location}) => (
        <div className="wrapper-m028h">
          <Switch>
            <Route path="/" exact component={IndexPage}/>
            <Route path="/cocktail" component={CocktailPage}/>
            <Route path="/pro" component={Pro}/>
            <Route path="/user" component={User}/>
            <Route path="/adr" component={Adr}/>
            <AuthRoute path="/cart" component={CartPage}/>
            <AuthRoute path="/order" exact component={OrderPage}/>
            <AuthRoute path="/order/:status" component={OrderListPage}/>
          </Switch>
          {isVisible(location)
            ? <NavBar/>
            : null}
        </div>
      )}/>
    </Router>
  )
}

export default RouterConfig
