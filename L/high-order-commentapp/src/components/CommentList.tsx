import * as React from 'react';
import Comment from './Comment';

interface CommentlistProps {
    comments: Array<{
        username: string,
        content: string,
        createdTime: number
    }>;
    onDeleteComment (index: number): void;
}
class CommentList extends React.Component<CommentlistProps, null> {
    handleDeleteComment (index: number) {
        this.props.onDeleteComment(index);
    }
    render () {
        return (
            <div>
                {this.props.comments.map((comment, i) => 
                    <Comment 
                        comment={comment}
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeleteComment.bind(this)}
                    />
                )}
            </div>
        );
    }
}

export default CommentList;