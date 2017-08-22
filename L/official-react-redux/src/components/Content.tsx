import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../lib/Interface';
import ThemeSwitch from './ThemeSwitch';
import FontSizeChange from './FontSizeChange';

class Content extends React.Component<{themeColor: string}, {}> {
    render () {
        return (
            <div>
                <p style={{color: this.props.themeColor}}>React.js小书内容</p>
                <ThemeSwitch />
                <FontSizeChange />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Content);