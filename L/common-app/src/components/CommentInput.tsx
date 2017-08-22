import * as React from 'react';

interface CIState {
    username: string;
    content: string;
}
interface CIProps {
    onSubmit (arg: {username: string, content: string, createdTime: number}): void;
}
interface EventType {
    target: {
        value: string
    };
}
class CommentInput extends React.Component<CIProps, CIState> {
    public textarea: HTMLTextAreaElement;
    constructor (props: CIProps) {
        super(props);
        this.state = {
            username: '',
            content: ''
        };
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.persistenceUser = this.persistenceUser.bind(this);
    }
    componentWillMount () {
        let user = localStorage.getItem('username');
        if (user && typeof(user) === 'string') {
            this.setState({
                username: user
            });
        }
    }
    componentDidMount () {
        this.textarea.focus();
    }
    handleUsernameChange (event: EventType): void {
        this.setState({
            username: event.target.value
        });
    }
    handleContentChange (event: EventType): void {
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
        this.props.onSubmit({
            username, 
            content,
            createdTime: +new Date()
        });
        this.setState({
            content: ''
        });
    }
    persistenceUser (event: EventType): void {
        this._persistenceUser(event.target.value);
    }
    _persistenceUser (username: string): void {
        localStorage.setItem('username', username);
    }
    render () {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名:</span>
                    <div className="comment-field-input">
                        <input 
                            onBlur={this.persistenceUser.bind(this)}
                            value={this.state.username} 
                            onChange={this.handleUsernameChange}
                            type="text"
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容:</span>
                    <div className="comment-field-input">
                        <textarea
                            onChange={this.handleContentChange} 
                            value={this.state.content} 
                            ref={textarea => this.textarea = textarea}
                        />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit}>发布</button>
                </div>
            </div>
        );
    }
}

export default CommentInput;