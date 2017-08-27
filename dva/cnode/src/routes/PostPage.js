import React from 'react';
import { connect } from 'dva';
import RepliesList from '../components/Reply/RepliesList'
import styles from './PostPage.css';

function PostPage({ topic: { author = {}, title, create_at, content } }) {
  return (
    <div className={styles.normal}>
      <div className={styles.topic_title}>
        <h3>{title}</h3>
        <p>
          <span>发布于{create_at}</span>
          <span>作者 <a href="javascript:;">{author.loginname}</a></span>
        </p>
      </div>
      <div className={styles.topic_content} dangerouslySetInnerHTML={{ __html: content }} />
      <div className="comment-box">
        <RepliesList />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    topic: state.topic,
    loading: state.loading.models.topic
  };
}

export default connect(mapStateToProps)(PostPage);
