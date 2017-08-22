import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/news'

import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.less'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ProductsPage from './pages/Products'
import ContactPage from './pages/Contact'
import NewsPage from './pages/News'

const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" render={() => (
          <div>
            <MainLayout>
              <Route path={'/'} exact component={HomePage}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/products" component={ProductsPage} />
              <Route path="/contact" component={ContactPage}/>
              <Route path="/news" component={NewsPage}/>
            </MainLayout>
          </div>
        )} />
      </Router>
    </Provider>
  ),
  document.getElementById('app')
)