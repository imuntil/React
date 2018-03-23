import React from 'react'
import QueueAnim from 'rc-queue-anim'
import Bundle from './components/Bundle'
import { Router, Route, Switch } from 'dva/router'
/* eslint-disable import/no-webpack-loader-syntax */
import MainPage from 'bundle-loader?lazy!./routes/MainPage'
import LoginBundle from 'bundle-loader?lazy!./routes/Login.js'
// import GuidePage from 'bundle-loader?lazy!./routes/GuidePage'
import RulePage from 'bundle-loader?lazy!./routes/RulePage'
/* pre-learn */
import PreLearn from 'bundle-loader?lazy!./routes/pre-learn/index'
import PreTest from 'bundle-loader?lazy!./routes/pre-learn/Test'

/* training */
import TrainingIndex from 'bundle-loader?lazy!./routes/training/Index'
import ModelsPage from 'bundle-loader?lazy!./routes/training/Models'
import CptPage from 'bundle-loader?lazy!./routes/training/Competition'
/* activity */
import ActIndex from 'bundle-loader?lazy!./routes/training/act/ActIndex'
import Notice from 'bundle-loader?lazy!./routes/training/act/Notice'

/* after-learn */
import AfTestPage from './routes/af-learn/AfTest'
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
          <Bundle load={PreLearn}>{Cmp => <Cmp {...props} />}</Bundle>
        )}
      />
      <Route
        path="/pre/test/:type?"
        component={props => (
          <Bundle load={PreTest}>{Cmp => <Cmp {...props} />}</Bundle>
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
          <Bundle load={ActIndex}>{Cmp => <Cmp {...props} />}</Bundle>
        )}
      />
      <Route
        path="/tr/act/notice"
        exact
        component={props => (
          <Bundle load={Notice}>{Cmp => <Cmp {...props} />}</Bundle>
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
          <Bundle load={TrainingIndex}>{Cmp => <Cmp {...props} />}</Bundle>
        )}
      />
      <Route
        path="/tr/models"
        component={props => (
          <Bundle load={ModelsPage}>{Cmp => <Cmp {...props} />}</Bundle>
        )}
      />
      <Route
        path="/tr/cpt"
        component={props => (
          <Bundle load={CptPage}>{Cmp => <Cmp {...props} />}</Bundle>
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

// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         <Route
//           path="/"
//           exact
//           component={props => (
//             <Bundle load={MainPage}>{Cmp => <Cmp {...props} />}</Bundle>
//           )}
//         />
//         <Route
//           path="/login"
//           component={props => (
//             <Bundle load={LoginBundle}>{Cmp => <Cmp {...props} />}</Bundle>
//           )}
//         />
//         <Route
//           path="/guide"
//           component={props => (
//             <Bundle load={GuidePage}>
//               {Cmp => {
//                 console.log('cmp')
//                 return <Cmp {...props} />
//               }}
//             </Bundle>
//           )}
//         />
//         <Route
//           path="/rule/:rule"
//           component={props => (
//             <Bundle load={RulePage}>{Cmp => <Cmp {...props} />}</Bundle>
//           )}
//         />
//         <Route path="/pre" component={PRE} />
//         <Route path="/tr" component={Training} />
//         <Route path="/af" component={AF} />
//       </Switch>
//     </Router>
//   )
// }

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route
        path="/"
        render={({ location }) => (
          <QueueAnim
            animConfig={[
              { opacity: [1, 0], translateX: [0, 25], translateY: [0, 25] },
              { opacity: [1, 0], translateX: [0, -25], translateY: [0, 25] }
            ]}
            duration={[500, 400]}
            delay={[200, 0]}
            className="router-anim"
          >
            <div key={location.pathname} className="xxxxxx">
              <Switch>
                <Route
                  path="/"
                  exact
                  component={props => (
                    <Bundle load={MainPage}>{Cmp => <Cmp {...props} />}</Bundle>
                  )}
                />
                <Route
                  path="/login"
                  component={props => (
                    <Bundle load={LoginBundle}>
                      {Cmp => <Cmp {...props} />}
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
                <Route
                  path="/rule/:rule"
                  component={Rule}
                />
                <Route path="/pre" component={PRE} />
                <Route path="/tr" component={Training} />
                <Route path="/af" component={AF} />
              </Switch>
            </div>
          </QueueAnim>
        )}
      />
    </Router>
  )
}

export default RouterConfig
