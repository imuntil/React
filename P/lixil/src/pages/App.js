import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import AboutPage from './About'
import HomePage from './Home'
import NewsPage from './News'
import ContactPage from './Contact'
import EcoPage from './Products/Eco'
import ExtPage from './Products/Ext'
import DetailPage from './Detail'
import Layout from '../layouts/Layout'
import FadeInOut from '../layouts/FadeInOut'

import Footer from '../layouts/Footer'

const history = createHistory()

function App() {
  function returnKey(pathname) {
    let type = pathname.match(/^\/products\/(eco|ext|wd)\w*/)
    return type ? type[1] : pathname
  }
  return (
    <Router history={history}>
      <Route path={'/'} render={(props) => (
        <Layout {...props}>
          <FadeInOut>
            <div key={returnKey(props.location.pathname)} style={{position: 'absolute', width: '100%'}}>
              <Switch>
                <Route path={'/'} exact component={HomePage} />
                <Route path={'/about'} component={AboutPage} />
                <Route path={'/news/:id'} component={NewsPage} />
                <Route path={'/contact'} component={ContactPage} />
                <Route path={'/products/eco'} component={EcoPage} />
                <Route path={'/products/ext'} component={ExtPage} />
                <Route path={'/:type/:id'} component={DetailPage} />
              </Switch>
              <Footer {...props} />
            </div>
          </FadeInOut>
        </Layout>
      )} />
    </Router>
  )
}
export default App