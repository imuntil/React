import React from 'react';
import { connect } from 'dva'
import styles from './RepliesList.css';

function ReplieList({ list, count }) {
  return (
    <div className={styles.normal}>
      <p className="replies-count">{count}个回复</p>
      <div className="replies">
        {
          list.map((reply, index) => (
            <div className={styles.reply_item}>
              <div className={styles.avatar}>
                <img src={reply.author.avatar_url} alt="avatar" />
              </div>
              <div className={styles.right_part}>
                <p>
                  <a href="javascript:;">{reply.author.loginname}</a>
                  <span>{index + 1}楼-xx天前</span>
                </p>
                <div className="reply-content" dangerouslySetInnerHTML={{ __html: reply.content }} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    list: state.comment.replies,
    count: state.comment.repliesCount
  }
}
export default connect(mapStateToProps)(ReplieList);
