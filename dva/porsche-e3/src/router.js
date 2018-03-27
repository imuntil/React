import React from 'react'
import QueueAnim from 'rc-queue-anim'
import Bundle from './components/Bundle'
import { Router, Route, Switch } from 'dva/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/* home page */
import Main from './routes/MainPage'
import Login from './routes/Login'
import GuidePage from './routes/GuidePage'
import RulePage from './routes/RulePage'

/* pre learn */
import PreIndex from './routes/pre-learn/index'
import PreTest from './routes/pre-learn/Test'

/* activities */
import ActIndex from './routes/training/act/ActIndex'
import NoticePage from './routes/training/act/Notice'

/* training */
import TrainIndex from './routes/training/Index'
import ModelsPage from './routes/training/Models'
import CptPage from './routes/training/Competition'

/* after-learn */
import AfTestPage from './routes/af-learn/AfTest'

const PRE = () => {
  return (
    <Switch>
      <Route path="/pre/" exact component={PreIndex} />
      <Route path="/pre/test/:type?" component={PreTest} />
    </Switch>
  )
}

const Act = () => {
  return (
    <Switch>
      <Route path="/tr/act" exact component={ActIndex} />
      <Route path="/tr/act/notice" exact component={NoticePage} />
    </Switch>
  )
}

const Training = () => {
  return (
    <Switch>
      <Route path="/tr/" exact component={TrainIndex} />
      <Route path="/tr/models" component={ModelsPage} />
      <Route path="/tr/cpt" component={CptPage} />
      <Route path="/tr/act" component={Act} />
    </Switch>
  )
}

const AF = () => {
  return (
    <Switch>
      <Route path="/af/test" component={AfTestPage} />
    </Switch>
  )
}

function RouterConfig({ history, location }) {
  return (
    <Router history={history}>
      <Route
        path="/"
        render={({ location }) => (
          <TransitionGroup className="router-anim">
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={500}
            >
              <div className="xxxxxx">
                <Switch location={location}>
                  <Route exact path="/" component={Main} />
                  <Route path="/login" component={Login} />
                  <Route path="/guide" component={GuidePage} />
                  <Route path="/rule/:rule" component={RulePage} />
                  <Route path="/pre" component={PRE} />
                  <Route path="/tr" component={Training} />
                  <Route path="/af" component={AF} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  )
}

export default RouterConfig
