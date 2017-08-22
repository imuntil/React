import * as React from 'react';
import { toCelsius, toFahrenheit, tryConvert} from './Calculator';

interface TIProps {
    temperature: string;
    scale: string;
    onTemperatureChange(arg: string): void;
}
class TemperatureInput extends React.Component<TIProps, null> {
    constructor (props: TIProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (e: {target: { value: string } }) {
        this.props.onTemperatureChange(e.target.value);
    }
    render (): JSX.Element {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scale}:</legend>
                <input type="number" value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}
interface CState {
    temperature: string;
    scale: string;
}
export class Calculator2 extends React.Component<{}, CState> {
    constructor (props: {}) {
        super(props);
        this.state = {temperature: '', scale: ''};
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }
    handleCelsiusChange (temperature: string): void {
        this.setState({scale: 'c', temperature});
    }
    handleFahrenheitChange (temperature: string): void {
        this.setState({scale: 'f', temperature});
    }
    render (): JSX.Element {
        let scale = this.state.scale;
        let temperature = this.state.temperature;
        let celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        let fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput 
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} 
                />
                <TemperatureInput 
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
            </div>
        );
    }
}