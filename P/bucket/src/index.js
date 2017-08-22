import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  HashRouter as Router,
  Switch
} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import userReducer from './reducers/user'
import reducer from './reducers/index'
import createHistory from 'history/createHashHistory'
import HomePage from './pages/Home'
import UserAdd from './pages/UserAdd'
import UserListPage from './pages/UserList'
import UserEditPage from './pages/UserEdit'
import BookListPage from './pages/BookList'
import BookAddPage from './pages/BookAdd'
import BookEditPage from './pages/BookEdit'
import LoginPage from './pages/Login'

import HomeLayout from './layouts/HomeLayout'
const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path='/' render={() => (
          <HomeLayout>
            <Route path="/" exact component={HomePage} />
            <Route path="/user/add" component={UserAdd} />
            <Route path="/user/list" component={UserListPage} />
            <Route path="/user/edit/:id" component={UserEditPage} />
            <Route path="/book/list" component={BookListPage} />
            <Route path="/book/add" component={BookAddPage} />
            <Route path="/book/edit/:id" component={BookEditPage} />
          </HomeLayout>
        )} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)