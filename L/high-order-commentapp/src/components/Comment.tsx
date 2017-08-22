import * as React from 'react';

interface CommentProps {
    index: number;
    comment: {
        username: string,
        content: string,
        createdTime: number
    };
    onDeleteComment (index: number): void;
}
class Comment extends React.Component<CommentProps, {timeString: string}> {
    constructor (props: CommentProps) {
        super(props);
        this.state = {
            timeString: ''
        };
    }
    componentWillMount () {
        this.updateTimeString();
    }
    handleDeleteComment () {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index);
        }
    }
    render () {
        const comment = this.props.comment;
        return (
            <div className="comment">
                <div className="comment-user">
                    <span className="comment-username">
                        {comment.username}
                    </span>&nbsp;: &nbsp;
                </div>
                <p>{comment.content}</p>
                <span className="comment-createdtime">
                    {this.state.timeString}
                </span>
                <span onClick={this.handleDeleteComment.bind(this)} className="comment-delete">
                    删除
                </span>
            </div>
        );
    }
    private updateTimeString () {
        const comment = this.props.comment;
        const duration = (+Date.now() - comment.createdTime) / 1000;
        this.setState({
            timeString: duration > 60
                ? `${Math.round(duration / 60)}分钟前`
                : `${Math.round(Math.max(duration, 1))}秒前`
        });
    }
}

export default Comment;