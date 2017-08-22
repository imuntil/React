import * as　React from 'react';
// import * as PropTypes from 'prop-types';
import {mapStateToProps, mapDispatchToProps, connect} from './react-redux';

interface TSProps {
    themeColor: string;
    onSwitchColor (arg: string): any;
}
class ThemeSwitch extends React.Component<TSProps, null> {
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
                    onClick={this.handleSwitchColor.bind(this, 'blue')}
                    style={{color: this.props.themeColor}}
                >
                    blue
                </button>
            </div>
        );
    }
}

const WrappedThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);
export default WrappedThemeSwitch;
