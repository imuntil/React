import * as React from 'react';
import './App.css';
import {NameForm} from './components/Form';
import { Calculator, TemperatureInput } from './components/Calculator';
import { Calculator2 } from './components/Calculator2';
import { Pane } from './components/Pane';
import { Dialog, SignUpDialog } from './components/Dialog';
import { FilterableProductTable } from './components/FilterableProductTable';
import { ListOfTenThings, AutoFoucsTextInput, Parent } from './components/InDepth';
import { UCNameForm } from './components/Uncontrolled';
import { CounterButton, CounterButton2, WordAdder } from './components/ShouldComponentUpdate';
// import any = jasmine.any;

const logo = require('./logo.svg');

interface State {
    isLoggedIn: boolean;
}
interface ButtonProps {
    onClick(): void;
}
function LoginButton (props: ButtonProps) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}
function LogoutButton (props: ButtonProps) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component<{}, State> {
    constructor (props: {}) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }
    handleLoginClick (): void {
        this.setState({isLoggedIn: true});
    }
    handleLogoutClick (): void {
        this.setState({isLoggedIn: false});
    }
    render (): JSX.Element {
        const isLoggedIn = this.state.isLoggedIn;
        let button: JSX.Element;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return (
            <div>
                {button}
            </div>
        );
    }
}

class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
          <LoginControl />
          <NameForm />
          <Calculator />
          <TemperatureInput scale="Celsius"/>
          <TemperatureInput scale="Fahrenheit"/>
          <Calculator2 />
          <Pane />
          <Dialog title="hello" message="world" />
          <SignUpDialog />
          <FilterableProductTable />
          <ListOfTenThings />
          <AutoFoucsTextInput />
          <Parent />
          <UCNameForm />
          <CounterButton color={'red'}/>
          <CounterButton2 color={'blue'} />
          <WordAdder />
      </div>
    );
  }
}

export default App;
