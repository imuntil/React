import React = require('react');

export let toCelsius: (a: number) => number;

interface RProps {
    numTimes: number;
    children(a: number): JSX.Element;
}
let Repeat: (props: RProps) => JSX.Element;
Repeat = function (props: RProps): JSX.Element {
    let items = [];
    for (let i = 0; i < props.numTimes; i ++) {
        items.push(props.children(i));
    }
    return React.createElement(
        'div',
        {},
        items
    );
};

export function ListOfTenThings (): JSX.Element {
    return (
        <Repeat numTimes={10}>
            {(index: number) => <div key={index}>{index}</div>}
        </Repeat>
    );
}

export class AutoFoucsTextInput extends React.Component<{}, null> {
    public textInput: {
        focus (): void;
    };
    constructor (props: {}) {
        super(props);
        this.focus = this.focus.bind(this);
    }
    focus () {
        this.textInput.focus();
    }
    componentDidMount () {
        this.focus();
    }
    render (): JSX.Element {
        return (
            <div>
                <input type="text" ref={input => this.textInput = input}/>
                <input type="button" value="focus the text input" onClick={this.focus}/>
            </div>
        );
    }
}

class CustomTextInput extends React.Component<{inputRef (el: HTMLElement): void}, null> {
    render () {
        return (
            <div>
                <input type="text" ref={this.props.inputRef}/>
            </div>
        );
    }
}
export class Parent extends React.Component<{}, null> {
    public inputElement: HTMLElement;
    constructor (props: {}) {
        super(props);
        this.inputFocus = this.inputFocus.bind(this);
    }
    inputFocus () {
        this.inputElement.focus();
    }
    render () {
        return (
            <div>
                <CustomTextInput inputRef={el => this.inputElement = el} />
                <button type="button" onClick={this.inputFocus}>foucs</button>
            </div>
        );
    }
}