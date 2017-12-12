import React from 'react';
import { WhiteSpace, WingBlank, Modal } from 'antd-mobile'
import { Link } from 'dva/router'
import { formatPhone } from '../../services/ct'
import styles from './Section.css';

const alert = Modal.alert
function Section({ adr = {}, onDefaultClick, onDeleteClick, onChosen, chosen }) {
  return (
    <div className={styles.normal}>
      <div className={styles.section_box} style={chosen ? { background: '#e1f5ff' } : null}>
        <WingBlank size="lg">
          <div onClick={() => onChosen(adr.id)} className={styles.up}>
            <p className={styles.g_1}>
              <span className={styles.name}>
                <em>{adr.name}</em>
                <em>{formatPhone(adr.phone)}</em>
              </span>
              <span className={styles.label}>{adr.label}</span>
            </p>
            <p className={styles.g_2}>
              {`${adr.province} ${adr.city} ${adr.detail}`}
            </p>
          </div>
          <div className={styles.down}>
            <div className={styles.d_left}>
              <a
                onClick={() => { onDefaultClick(adr._id, adr.isDefault) }}
                href="javascript:;"
              >
                {
                  adr.isDefault
                    ? <em className={styles.checked} />
                    : <em className={styles.default} />
                }
                默认地址
              </a>
            </div>
            <div className={styles.d_right}>
              <Link to={`/adr/edit/${adr._id}`}>编辑</Link>
              <a
                onClick={() => {
                  alert('删除', '确定删除这条地址么', [
                    { text: '取消' },
                    { text: '确定', onPress: () => { onDeleteClick(adr._id) }}
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
