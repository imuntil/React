import * as React from 'react';
import WrappedCommentInput from './CommentInput';
import CommentList from './CommentList';
import wrapWithLoadDate from './wrapWithLoadData';
import '../style/comment.css';

interface CommentAppProps {
    data: any;
    saveData (data: any): void;
}
interface CommentAppState {
    comments: Comments[];
}
interface Comments {
    username: string;
    content: string;
    createdTime: number;
    onDeleteComment (index: number): void;
}
class CommentApp extends React.Component<CommentAppProps, CommentAppState> {
    constructor (props: CommentAppProps) {
        super(props);
        this.state = {
            comments: props.data
        };
    }
    handleSubmitCommit (comment: Comments) {
        let _comments = this.state.comments;
        _comments.unshift(comment);
        this.setState({
            comments: _comments
        });
        this.props.saveData(_comments);
    }
    handleDeleteComment (index: number): void {
        let _comments = this.state.comments;
        _comments.splice(index, 1);
        this.setState({
            comments: _comments
        });
        this.props.saveData(_comments);
    }
    render () {
        return (
            <div className="wrapper">
                <WrappedCommentInput onSubmit={this.handleSubmitCommit.bind(this)} />
                <CommentList 
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                />
            </div>
        );
    }
}
const WrappedCommentApp = wrapWithLoadDate(CommentApp, 'comments');
export default WrappedCommentApp;