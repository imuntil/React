import React from 'react';
import _ from 'lodash'
import { connect } from 'dva';
import styles from './Detail.css';

class Detail extends React.Component {
  componentWillMount() {
    const { params: { id }, dispatch } = this.props
    dispatch({
      type: 'detail/fetchDetail',
      payload: { id }
    })
  }
  render() {
    return (
      <div className={styles.normal}>
        Route Component: Product/Detail
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Detail);
