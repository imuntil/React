import * as React from 'react';
// import * as PropTypes from 'prop-types';
import {mapStateToProps, connect} from './react-redux';

class Header extends React.Component<{themeColor: string, fontSize: string}, null> {
    render () {
        return (
            <h1 style={{color: this.props.themeColor, fontSize: this.props.fontSize}}>React.js 小书</h1>
        );
    }
}
const WrapedHeader = connect(mapStateToProps)(Header);
export default WrapedHeader;