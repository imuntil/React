import * as React from 'react';
// import * as PropTypes from 'prop-types';
import ThemeSwitch from './ThemeSwitch';
import FontSizeChange from './FontSizeChange';
import {mapStateToProps, connect} from './react-redux';

class Content extends React.Component<{themeColor: string}, null> {
    render () {
        return (
            <div>
                <p style={{color: this.props.themeColor}}>React.js 小书内容</p>
                <ThemeSwitch handle={() => 5} />
                <FontSizeChange />
            </div>
        );
    }
}

const WrappedContent = connect(mapStateToProps)(Content);
export default WrappedContent;