import React from 'react'
import ProductsLayout from '../../layouts/ProductsLayout'
import { Route } from 'react-router-dom'
import ExtHome from '../../components/Products/Ext/Home'
import ExtCase from '../../components/Products/Ext/ExtCase'
import ExtPros from '../../components/Products/Ext/ExtPros'

function ExtPage() {
  const banner = <img className="banner-img" src={require('../../assets/carousel/ext-banner.jpg')} alt=""/>
  const tabs = [
    {path: 'ext', title: '产品首页'},
    {path: 'ext/case', title: '实景案例'},
    {path: 'ext/func', title: '功能介绍'},
    {path: 'ext/pros', title: '产品信息'},
    {path: 'ext/shops', title: '门店信息'}
  ]
  const routes = (
    <div>
      <Route path={'/products/ext'} exact component={ExtHome} />
      <Route path={'/products/ext/case'} exact component={ExtCase} />
      <Route path={'/products/ext/func'} exact render={() => <div>func</div>} />
      <Route path={'/products/ext/pros'} exact component={ExtPros} />
      <Route path={'/products/ext/shops'} exact render={() => <div>shops</div>} />
    </div>
  )
  return (
    <ProductsLayout banner={banner} tabs={tabs} routes={routes} />
  )
}
export default ExtPage