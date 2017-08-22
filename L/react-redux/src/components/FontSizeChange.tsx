import * as React from 'react';
// import * as PropTypes from 'prop-types';
import { mapStateToProps, mapDispatchToProps, connect } from './react-redux';

interface FZCProps {
    themeColor: string;
    fontSize: string;
    onChangeFontSize (arg: string): any;
}
class FontSizeChange extends React.Component<FZCProps, null> {
    handleChangeFontSize (size: string) {
        if (this.props.onChangeFontSize) {
            this.props.onChangeFontSize(size);
        }
    }
    render () {
        return (
            <div>
                <button
                    onClick={this.handleChangeFontSize.bind(this, '30px')}
                    style={{color: this.props.themeColor, fontSize: this.props.fontSize}}
                >
                    30px
                </button>
                <button
                    onClick={this.handleChangeFontSize.bind(this, '12px')}
                    style={{color: this.props.themeColor, fontSize: this.props.fontSize}}
                >
                    12px
                </button>
            </div>
        );
    }
}

const WrappedFontSizeChange = connect(mapStateToProps, mapDispatchToProps)(FontSizeChange);
export default WrappedFontSizeChange;