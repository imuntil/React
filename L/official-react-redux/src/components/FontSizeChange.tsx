import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, Stores } from '../lib/Interface';

interface FZProps extends Stores {
    onChangeFontSize (arg: string): any;
}
class FontSizeChange extends React.Component<FZProps, {}> {
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

export default connect(mapStateToProps, mapDispatchToProps)(FontSizeChange);