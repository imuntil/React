import * as React from 'react';

interface BoilingVerdictProps {
    celsius: number;
}
function BoilingVerdict (props: BoilingVerdictProps): JSX.Element {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}
interface CalculatorState {
    temperature: string;
}
export interface ValueEvent {
    target: {
        value: string
    };
}
export class Calculator extends React.Component<{scale?: string}, CalculatorState> {
    constructor (props: {}) {
        super(props);
        this.state = {temperature: ''};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (e: ValueEvent) {
        this.setState({temperature: e.target.value});
    }
    render () {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input type="text" value={temperature} onChange={this.handleChange}/>
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

export let toCelsius: (a: number) => number;
toCelsius = function(fahrenheit: number): number {
    return (fahrenheit - 32) * 8 / 9;
};
export let toFahrenheit: (celsius: number) => number;
toFahrenheit = function (celsius: number): number {
    return (celsius * 9 / 5) + 32;
};

export let tryConvert: (temperature: number | string, convert: (x: number) => number) => string;
tryConvert = function (temperature: number | string, convert: (x: number) => number): string {
    let input: number;
    if (typeof temperature === 'string') {
        input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
    } else {
        input = temperature;
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
};

export class TemperatureInput extends Calculator {
    render (): JSX.Element {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scale}</legend>
                <input type="text" value={temperature} onChange={this.handleChange}/>
            </fieldset>
        );
    }
}