import React from 'react';
import { WhiteSpace, WingBlank, Modal } from 'antd-mobile'
import { Link } from 'dva/router'
import styles from './Section.css';

const alert = Modal.alert
function Section({ adr = {}, onDefaultClick, onDeleteClick }) {
  return (
    <div className={styles.normal}>
      <div className={styles.section_box}>
        <WingBlank size="lg">
          <div className={styles.up}>
            <p className={styles.g_1}>
              <span className={styles.name}>
                <em>{adr.name}</em>
                <em>{adr.phone}</em>
              </span>
              <span className={styles.label}>{adr.label}</span>
            </p>
            <p className={styles.g_2}>
              {adr.address}
            </p>
          </div>
          <div className={styles.down}>
            <div className={styles.d_left}>
              <a
                onClick={() => { onDefaultClick(adr.id, adr.status) }}
                href="javascript:;"
              >
                {
                  adr.status
                    ? <em className={styles.checked} />
                    : <em className={styles.default} />
                }
                默认地址
              </a>
            </div>
            <div className={styles.d_right}>
              <Link to={`/adr/edit/${adr.id}`}>编辑</Link>
              <a
                onClick={() => {
                  alert('删除', '确定删除这条地址么', [
                    { text: '取消' },
                    { text: '确定', onPress: () => { onDeleteClick(adr.id) }}
                  ])
                }}
                href="javascript:;"
              >删除</a>
            </div>
          </div>
        </WingBlank>
      </div>
      <WhiteSpace size="lg" />
    </div>
  );
}

export default Section;
