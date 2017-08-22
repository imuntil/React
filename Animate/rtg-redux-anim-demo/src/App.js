import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { createHashHistory } from 'history'
import { CSSTransitionGroup } from 'react-transition-group'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import 'animate.css'

const history = createHashHistory()
const style = {
  position: 'absolute',
  width: '100%',
  height: 200,
  textAlign: 'center',
  backgroundColor: '#aaa'
}
const Home = () => <div style={style}>Home</div>
const Search = () => <div style={style}>Search</div>
class App extends Component {
  render() {
    // console.log(this.props);
    // const { animateCls } = this.props
    return (
      <Router history={history}>
        <Route render={({ location }) => {
          return(
            <CSSTransitionGroup
              transitionName={{
                enter: 'animated',
                enterActive: 'fadeInLeft',
                leave: 'animated',
                leaveActive: 'fadeOutRight',
                appear: 'animated',
                appearActive: 'zoomIn'
              }}
              transitionEnter={true}
              transitionLeave={true}
              transitionAppear={true}
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppearTimeout={1000}
            >
              <div key={location.pathname}>
                <Route location={location} exact path="/" component={Home} />
                <Route location={location} path="/search" component={Search} />
              </div>
            </CSSTransitionGroup>
          )
        }}/>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    animateCls: state.animateCls
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangeCls: cls => dispatch({type: 'CURRENT_ANIMATE', cls})
  }
}
const initState = {
  animateCls: 'left'
}
export const global = (state = initState, action ) => {
  switch (action.type) {
  case 'CURRENT_ANIMATE':
    return {
      ...state,
      animateCls: action.cls
    }
  default:
    return state
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)