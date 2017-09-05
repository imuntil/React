import React from 'react';
import _ from 'lodash'
import { connect } from 'dva';
import { WhiteSpace as WS } from 'antd-mobile'
import styles from './Detail.css';
import { IMGURL } from '../../constant'

class Detail extends React.Component {
  componentWillMount() {
    const { params: { id }, dispatch } = this.props
    dispatch({
      type: 'detail/fetchDetail',
      payload: { id }
    })
  }
  render() {
    const { data } = this.props
    return (
      <div className={styles.normal}>
        <div className={styles.section} style={{ paddingTop: 0 }}>
          <img src={IMGURL + data.image1} alt="" />
          <WS />
          <div className={styles.info}>
            <div className={styles.name}>
              <p className={styles.font}>{data.englishname}</p>
              <p className={styles.font}>{data.proname}</p>
            </div>
            <div className={styles.heart}>
              <a href="javascript:;">
                <img src={require('../../assets/ig-dir/not-like.png')} alt="" />
              </a>
            </div>
          </div>
          <p className={styles.content}>{data.procontent}ml</p>
          <WS />
          <p className={styles.price}>￥{data.proprice}</p>
          <WS size="lg" />
          <div className={styles.pro_params}>
            <span>酒精度:{data.proalcoholic}%</span>
            <span>来自:{data.proarea}</span>
            <span>类别:{data.prolabel}</span>
            <span>重量:{data.proweight}g</span>
            <span>饮用方式:{data.drnk}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const data = state.detail
  return { data };
}

export default connect(mapStateToProps)(Detail);
