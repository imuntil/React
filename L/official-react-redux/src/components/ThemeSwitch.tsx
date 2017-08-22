import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, Stores } from '../lib/Interface';
interface TSProps extends Stores {
    onSwitchColor (arg: string): any;
}

class ThemeSwitch extends React.Component<TSProps, {}> {
    handleSwitchColor (color: string) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color);
        }
    }
    render () {
        return (
            <div>
                <button
                    onClick={this.handleSwitchColor.bind(this, 'red')}
                    style={{color: this.props.themeColor}}
                >
                    Red
                </button>
                <button
                    onClick={this.handleSwitchColor.bind(this, 'greed')}
                    style={{color: this.props.themeColor}}
                >
                    Green
                </button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);