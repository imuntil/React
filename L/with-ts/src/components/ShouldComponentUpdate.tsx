import * as React from 'react';

interface CBState {
    count: number;
}
interface CBProps {
    color: string;
}
export class CounterButton extends React.Component<CBProps, CBState> {
    constructor (props: CBProps) {
        super(props);
        this.state = {count: 1};
    }
    shouldComponentUpdate (nextProps: CBProps, nextState: CBState): boolean {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }
    render () {
        return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({count: state.count + 1}))}
            >
                Count: {this.state.count}
            </button>
        );
    }
}

export class CounterButton2 extends React.PureComponent<CBProps, CBState> {
    constructor(props: CBProps) {
        super(props);
        this.state = {count: 1};
    }
    render () {
       return (
        <button
            color={this.props.color}
            onClick={() => this.setState(state => ({count: state.count + 1}))}
        >
                Count: {this.state.count}
        </button> 
       );
    }
}

export class ListOfWords extends React.PureComponent<{words: string[]}, null> {
    render () {
        return <div>{this.props.words.join(',')}</div>;
    }
}
export class WordAdder extends React.Component<{}, {words: string[]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            words: ['marklar']
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {
        this.setState(prevState => ({
            words: [...prevState.words, 'marklar'],
        }));
    }
    render () {
        return (
            <div>
                <button onClick={this.handleClick}>click</button>
                <ListOfWords words={this.state.words}/>
            </div>
        );
    }
}