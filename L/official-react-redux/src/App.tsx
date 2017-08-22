import * as React from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Content from './components/Content';
import { Stores } from './lib/Interface';

const logo = require('./logo.svg');

interface ThemeInterface extends Stores {
  type: string;
}
let themeReducer: (state: {}, action: ThemeInterface) => {};
themeReducer = function (state: {}, action: ThemeInterface) {
  if (!state) {
    return {
      themeColor: 'red',
      fontSize: '25px'
    };
  }
  switch (action.type) {
    case 'CAHNGE_COLOR':
      return {...state, themeColor: action.themeColor};
    case 'CHANGE_FONTSIZE':
      return {...state, fontSize: action.fontSize};
    default:
      return state;
  }
};

const store = createStore(themeReducer);

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Provider store={store}>
          <Header />
          <Content />
        </Provider>
      </div>
    );
  }
}

export default App;
