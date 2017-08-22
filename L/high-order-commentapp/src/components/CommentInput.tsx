import * as React from 'react';
import wrapWithLoadData from './wrapWithLoadData';

interface CommentInputProps {
    data: string | null;
    onSubmit (comment: any): void;
    saveData (comment: any): void;
}
interface CommentInputState {
    username: string;
    content: string;
}
interface EventType {
    target: {
        value: string
    };
}
class CommentInput extends React.Component<CommentInputProps, CommentInputState> {
    public textarea: HTMLTextAreaElement;
    constructor (props: CommentInputProps) {
        super(props);
        this.state = {
            username: props.data || '',
            content: ''
        };
    }
    componentDieMount () {
        this.textarea.focus();
    }
    handleUsernameBlur (event: EventType) {
        this.props.saveData(event.target.value);
    }
    handleUsernameChange (event: EventType) {
        this.setState({
            username: event.target.value
        });
    }
    handleContentChange (event: EventType) {
        this.setState({
            content: event.target.value
        });
    }
    handleSubmit () {
        const { username, content } = this.state;
        if (!username || !content) {
            alert('should not empty');
            return;
        }
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            });
        }
        this.setState({
            content: ''
        });
    }
    render () {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-className">用户名：</span>
                    <div className="comment-field-input">
                        <input
                            type="text"
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea 
                            ref={textarea => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        );
    }
}

const WrappedCommentInput = wrapWithLoadData(CommentInput, 'username');

export default WrappedCommentInput;