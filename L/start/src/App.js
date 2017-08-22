import React, { Component } from 'react';
import logo from './logo.svg';
import { findDOMNode } from 'react-dom'
import './App.css';

let props = {
  'data-a': 1,
  'data-b': 'x',
  'data-c': 'vv'
}
const list = [
  {
    id: 0,
    data: {text: 'aaa'}
  },
  {
    id: 1,
    data: {text: 'bbb'}
  }
]

const ChildOne = (props) => {
  return (
    <p>
      <a href="javascript:;">get start</a>
      <br/>
      <a href="javascript:;">{props.name}</a>
    </p>
  )
}
const ListItemWrapper = (props) => <li>{props.data.text}</li>
const MyComponent = props => {
  return (
    <ul>
      {props.results.map(result => {
        return <ListItemWrapper key={result.id} data={result.data}/>
      })}
    </ul>
  )

}
class App extends Component {
  constructor (props) {
    super(props)
    this.state = { liked: false }
  }
  handleClick (args, e) {
    console.log(args);
    this.setState({ liked: !this.state.liked })
  }
  componentWillMount () {
    console.log('componentWillMount');
  }
  componentDidMount () {
    console.log('componentDidMount');
    const el = findDOMNode(this)
    console.log(el);
  }
  componentWillReceiveProps () {
    console.log('componentWillReceiveProps');
  }
  shouldComponentUpdate () {
    console.log('shouldComponentUpdate');
    return true
  }
  componentWillUpdate () {
    console.log('componentWillUpdate');
  }
  componentDidUpdate () {
    console.log('componentDidUpdate');
  }
  render() {
    const text = this.state.liked ? 'like' : 'haven\'t liked'
    return (
      <div className="App">
        <div className="App-header" data-xx="xx">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <h2 onClick={this.handleClick.bind(this, 'args')}>{text}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ChildOne name="zhin"></ChildOne>
        <MyComponent results={list}></MyComponent>
      </div>
    );
  }
}

export default App;
