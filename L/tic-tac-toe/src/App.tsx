import * as React from 'react';
import './App.css';
import './Game.css';

const logo = require('./logo.svg');

function calculateWinner (squares: any[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i ++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

interface SPS {
  value: number | string | null;
}
interface SProps extends SPS {
  onClick(): void;
}
class Square extends React.Component<SProps, SPS> {
  // constructor (props: SProps) {
  //   super(props);
  //   this.state = {
  //     value: null
  //   };
  // }
  render () {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

interface BProps {
  squares: any[];
  onClick (i: number): void;
}
interface BState {
  squares: any[];
  xIsNext: boolean;
}
class Board extends React.Component<BProps, BState> {
  constructor (props: BProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }
  // handleClick (i: number) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext
  //   });
  // }
  renderSquare(i: number) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }
  render () {
    // const winner = calculateWinner(this.state.squares);
    // let status: string;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    // }
    return (
      <div>
        {/*<div className="status">{status}</div>*/}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
interface History {
  squares: (null | string)[];
}
interface GameState {
  xIsNext: boolean;
  history: History[];
  stepNumber: number;
}
class Game extends React.Component<{}, GameState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }
  handleClick (i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }
  jumpTo (move: number) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) ? false : true
    });
  }
  render () {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
      return (
        <li key={move}>
          <a href="javascript:;" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status =  `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
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
        <Game />
      </div>
    );
  }
}

export default App;
