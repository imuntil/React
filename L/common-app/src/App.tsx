import * as React from 'react';
import './App.css';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import {PercentageApp} from './components/PercentageApp';
import Post from './components/PostHeight';
import {BlackBorderBox, PostStyle} from './components/BlackBorderContainer';

// const logo = require('./logo.svg');

interface Comments {
  username: string;
  content: string;
  createdTime: number;
  onDeleteComment (index: number): void;
}
interface AppState {
  comments: Comments[];
}
class App extends React.Component<{}, AppState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      comments: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }
  componentWillMount () {
    this._loadComments();
  }
  _loadComments () {
    let _comments = localStorage.getItem('comments');
    if (_comments) {
      let comments: Comments[];
      comments = JSON.parse(_comments);
      this.setState({
        comments
      });
    }
  }
  _saveComment (comments: Comments[]) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  handleDeleteComment (index: number) {
    let comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments });
    this._saveComment(comments);
  }
  handleSubmit (arg: Comments): void {
    let _comments = [...this.state.comments];
    _comments.unshift(arg);
    this.setState({
      comments: _comments
    });
    this._saveComment(_comments);
  }
  render() {
    const comments = this.state.comments;
    return (
      <div className="App">
        <PercentageApp />
        <Post content={'xxxxxxxxxxxxxxxfffffffffffffffffffffffffxxxxxxxxxxxxxxxx'} />
        <BlackBorderBox />
        <PostStyle style={{fontSize: '2rem'}}/>

        <CommentInput onSubmit={this.handleSubmit}/>
        <CommentList comments={comments} handleDeleteComment={this.handleDeleteComment}/>
      </div>
    );
  }
}

export default App;
