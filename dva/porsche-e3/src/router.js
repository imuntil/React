import React from 'react'
import QueueAnim from 'rc-queue-anim'
import Bundle from './components/Bundle'
import { Router, Route, Switch } from 'dva/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
/* kiroku */
/* after-learn */
import AfTestPage from './routes/af-learn/AfTest'
import Main from './routes/MainPage'
// import AfTestPage from 'bundle-loader?lazy!./routes/af-learn/AfTest'

const Rule = props => (
  <Bundle load={() => import('./routes/RulePage')}>
    {Rule => <Rule {...props} />}
  </Bundle>
)

const PRE = () => {
  return (
    <Switch>
      <Route
        path="/pre/"
        exact
        component={props => (
          <Bundle load={() => import('./routes/pre-learn/index')}>
            {PreLearn => <PreLearn {...props} />}
          </Bundle>
        )}
      />
      <Route
        path="/pre/test/:type?"
        component={props => (
          <Bundle load={() => import('./routes/pre-learn/Test')}>
            {PreTest => <PreTest {...props} />}
          </Bundle>
        )}
      />
    </Switch>
  )
}

const Act = () => {
  return (
    <Switch>
      <Route
        path="/tr/act"
        exact
        component={props => (
          <Bundle load={() => import('./routes/training/act/ActIndex')}>
            {ActIndex => <ActIndex {...props} />}
          </Bundle>
        )}
      />
      <Route
        path="/tr/act/notice"
        exact
        component={props => (
          <Bundle load={() => import('./routes/training/act/Notice')}>
            {Notice => <Notice {...props} />}
          </Bundle>
        )}
      />
    </Switch>
  )
}

const Training = () => {
  return (
    <Switch>
      <Route
        path="/tr/"
        exact
        component={props => (
          <Bundle load={() => import('./routes/training/Index')}>
            {TrainIndex => <TrainIndex {...props} />}
          </Bundle>
        )}
      />
      <Route
        path="/tr/models"
        component={props => (
          <Bundle load={() => import('./routes/training/Models')}>
            {Models => <Models {...props} />}
          </Bundle>
        )}
      />
      <Route
        path="/tr/cpt"
        component={props => (
          <Bundle load={() => import('./routes/training/Competition')}>
            {Cpt => <Cpt {...props} />}
          </Bundle>
        )}
      />
      <Route path="/tr/act" component={Act} />
    </Switch>
  )
}

const AF = () => {
  return (
    <Switch>
      <Route path="/af/test" component={AfTestPage} />
      {/* <Route
        path="/af/test"
        component={props => (
          <Bundle load={AfTestPage}>{Cmp => <Cmp {...props} />}</Bundle>
        )}
      /> */}
    </Switch>
  )
}

const Wrap = ({ children, ...props }) => {
  console.log(
    '——————————————————————————————wrap————————————————————————————————'
  )
  console.log(props)
  return <div className="xxxxxx">{children}</div>
}

const Switchs = ({ location }) => {
  return (
    <Switch location={location}>
      <Route
        path="/"
        exact
        component={props => (
          <Bundle load={() => import('./routes/MainPage')}>
            {MainPage => <MainPage {...props} />}
          </Bundle>
        )}
      />
      <Route
        path="/login"
        component={props => (
          <Bundle load={() => import('./routes/Login')}>
            {Login => <Login {...props} />}
          </Bundle>
        )}
      />
      <Route
        path="/guide"
        component={props => (
          <Bundle load={() => import('./routes/GuidePage')}>
            {Guide => <Guide {...props} />}
          </Bundle>
        )}
      />
      <Route path="/rule/:rule" component={Rule} />
      <Route path="/pre" component={PRE} />
      <Route path="/tr" component={Training} />
      <Route path="/af" component={AF} />
    </Switch>
  )
}

const Anim = ({ children }) => {
  return (
    <QueueAnim
      animConfig={[
        { opacity: [1, 0], translateX: [0, 25], translateY: [0, 25] },
        { opacity: [1, 0], translateX: [0, -25], translateY: [0, 25] }
      ]}
      duration={[5000, 5000]}
      delay={[200, 0]}
      className="router-anim"
    >
      <Wrap key={Math.random()} xx={Math.random()}>
        {children}
      </Wrap>
    </QueueAnim>
  )
}
const Trans = ({ children, xx }) => {
  return (
    <TransitionGroup>
      <CSSTransition key={xx} classNames="fade" timeout={2500}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
}

function RouterConfig({ history, location }) {
  return (
    <Router history={history}>
      <Route
        path="/"
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={2500}
            >
              <Switch location={location}>
                {/* <Route
                  path="/"
                  exact
                  component={props => (
                    <Bundle load={() => import('./routes/MainPage')}>
                      {MainPage => <MainPage {...props} />}
                    </Bundle>
                  )}
                /> */}
                <Route exact path='/' component={Main}/>
                
                <Route
                  path="/login"
                  component={props => (
                    <Bundle load={() => import('./routes/Login')}>
                      {Login => <Login {...props} />}
                    </Bundle>
                  )}
                />
                <Route
                  path="/guide"
                  component={props => (
                    <Bundle load={() => import('./routes/GuidePage')}>
                      {Guide => <Guide {...props} />}
                    </Bundle>
                  )}
                />
                <Route path="/rule/:rule" component={Rule} />
                <Route path="/pre" component={PRE} />
                <Route path="/tr" component={Training} />
                <Route path="/af" component={AF} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  )
}

export default RouterConfig
