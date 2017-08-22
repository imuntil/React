import * as React from 'react';

interface InputState {
    value: number;
}
interface InputProps {
    handleValue (value: number): void;
}
class Input extends React.Component<InputProps, InputState> {
    constructor (props: InputProps) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange (e: {target: {value: string}}): void {
        this.setState({
            value: +e.target.value || 0
        });
        this.props.handleValue(+e.target.value || 0);
    }
    render () {
        return (
            <div>
                <input type="number" onChange={this.handleInputChange} value={this.state.value}/>
            </div>
        );
    }
}
interface PercentageShowerProps {
    value: number;
}
class PercentageShower extends React.Component<PercentageShowerProps, null> {
    formatValue (): string {
        return (this.props.value * 100).toFixed(2) + '%';
    }
    render () {
        return (
            <div>{this.formatValue()}</div>
        );
    }
}

export class PercentageApp extends React.Component<{}, InputState> {
    constructor (props: {}) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleValue = this.handleValue.bind(this);
    }
    handleValue (value: number): void {
        this.setState({
            value: value
        });
    }
    render () {
        return (
            <div>
                <Input handleValue={this.handleValue}/>
                <PercentageShower value={this.state.value}/>
            </div>
        );
    }
}