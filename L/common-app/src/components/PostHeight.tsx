import * as React from 'react';

interface PostProps {
    content: string;
}
export default class Post extends React.Component<PostProps, null> {
    public p: HTMLElement;
    constructor (props: PostProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    // componentDidMount () {
    //     alert(this.p.getBoundingClientRect().height);
    // }
    handleClick () {
        alert(this.p.getBoundingClientRect().height);
    }
    render () {
        return (
            <p onClick={this.handleClick} ref={p => this.p = p}>{this.props.content}</p>
        );
    }
}