import * as React from 'react';

export interface CProps {
    comment: {
        username: string, 
        content: string, 
        createdTime: number
    };
    index: number;
    onDeleteComment (index: number): void;
}
export class Comment extends React.Component<CProps, null> {
    updateTimeString (timestring: number): string {
        let duration = (+Date.now() - timestring) / 1000;
        return duration > 60 ? `${Math.round(duration / 60)}分钟前` : `${Math.round(Math.max(duration, 1))}秒前`;
    }
    handleDeleteComment () {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index);
        }
    }
    render () {
        return (
            <div className="comment">
                <div className="comment-user">
                    <span>{this.props.comment.username} </span>:
                </div>
                <p> {this.props.comment.content}</p>
                <span className="comment-createdtiem">
                    {this.updateTimeString(this.props.comment.createdTime)}
                </span>
                <span className="comment-delete" onClick={this.handleDeleteComment.bind(this)}>
                    删除
                </span>
            </div>
        );
    }
}
