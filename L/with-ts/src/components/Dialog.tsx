import * as React from 'react';
import { ValueEvent } from './Calculator';

interface FBProps {
    color: string;
    children?: JSX.Element | string;
}

let FancyBorder: (props: FBProps) => JSX.Element;
FancyBorder = function (props: FBProps): JSX.Element {
    return (
        <div className={'fancy-border fancy-border-' + props.color}>
            {props.children}
        </div>
    );
};
interface DProps {
    title: string;
    message: string;
    children?: JSX.Element[] | JSX.Element | string;
}
export let Dialog: (props: DProps) => JSX.Element;
Dialog = function (props: DProps): JSX.Element {
    let color: string = 'blue';
    return (
        <FancyBorder color={color}>
            <div>
                <h1 className="dialog-title">
                    {props.title}
                </h1>
                <p className="dialog-message">
                    {props.message}
                </p>
                {props.children}
            </div>
        </FancyBorder>
    );
};

export class SignUpDialog extends React.Component<{}, {login: string}> {
    constructor (props: {}) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }
    render (): JSX.Element {
        return (
            <Dialog title="Mars Exploration Program" message="How should we refer to you">
                <input type="text" value={this.state.login} onChange={this.handleChange}/>
                <button onClick={this.handleSignUp}>
                    Sign me Up!
                </button>
            </Dialog>
        );
    }
    handleChange (e: ValueEvent): void {
        this.setState({login: e.target.value});
    }
    handleSignUp (): void {
        alert(`Welcome abord, ${this.state.login}`);
    }
}