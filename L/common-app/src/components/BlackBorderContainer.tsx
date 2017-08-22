import * as React from 'react';

export class BlackBorderContainer extends React.Component<{}, null> {
    render () {
        return (
            <div className="black-border">
                {this.props.children}
            </div>
        );
    }
}
export class BlackBorderBox extends React.Component<{}, null> {
    render () {
        return (
            <BlackBorderContainer>
                <div className="name">My Name: Lucy</div>
                <p className="age">
                    My Age: <span>12</span>
                </p>
            </BlackBorderContainer>
        );
    }
}


const getDefaultStyledPost = (defaultStyle: {}) => {
    return (
        class PostStyle extends React.Component<{style: {}}, null> {
            render () {
                const style = {...defaultStyle, ...this.props.style};
                return (
                    <p style={style}>xxxx</p>
                );
            }
        }
    );
};

export const PostStyle = getDefaultStyledPost({color: 'red'});
