import * as React from 'react';
import { Comment } from './Comment';

interface CLProps {
    username: string;
    content: string;
    createdTime: number;
}
class CommentList extends React.Component<{comments: CLProps[], handleDeleteComment (index: number): void}, null> {
    constructor (props: {comments: CLProps[], handleDeleteComment (index: number): void}) {
        super(props);
    }
    handleDeleteComment (index: number) {
        this.props.handleDeleteComment(index);
    }
    render () {
        const comments = this.props.comments;
        return (
            <div>
                {
                    comments.map((comment, i) => 
                    <Comment 
                        comment={comment} 
                        onDeleteComment={this.handleDeleteComment.bind(this)} 
                        index={i}
                        key={i}
                    />)
                    
                }
            </div>
        );
    }
}

export default CommentList;