import * as React from 'react';
// import * as PropTypes from 'prop-types';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import { Provider } from './components/react-redux';

const logo = require('./logo.svg');

interface Func {
  (...args: any[]): any;
}
let createStore: (func: Func) => any;
createStore = function (reducer: Func) {
  let state: any = null;
  const listeners: Func[] = [];
  const subscribe = (listener: Func) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action: any) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  dispatch({});
  return { getState, dispatch, subscribe };
};

interface ThemeInterface {
  type: string;
  themeColor: string;
  fontSize: string;
}
let themeReducer: (state: {}, action: ThemeInterface) => {};
themeReducer = function(state: {}, action: ThemeInterface) {
  if (!state) {
    return {
      themeColor: 'red',
      fontSize: '25px'
    };
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.themeColor};
    case 'CHANGE_FONTSIZE':
      return {...state, fontSize: action.fontSize};
    default:
      return state;
  }
};

const store = createStore(themeReducer);

class App extends React.Component<{}, null> {
  // static childContextTypes = {
  //   store: PropTypes.object
  // };
  // getChildContext () {
  //   return {store};
  // }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Provider store={store}>
          <Header xx={'xx'}/>
          <Content />
        </Provider>
      </div>
    );
  }
}

export default App;
