import * as React from 'react';
import { connect } from 'react-redux';
import { Stores, mapStateToProps } from '../lib/Interface';

class Header extends React.Component<Stores, any> {
    render () {
        return (
            <h1 
                style={{color: this.props.themeColor, fontSize: this.props.fontSize}}
            >
                React.js 小书
            </h1>
        );
    }
}

export default connect(mapStateToProps, {})(Header);
