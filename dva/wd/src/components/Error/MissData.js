import React from 'react';
import PropTypes from 'prop-types'
import styles from './MissData.css';

class MissData extends React.Component {
  componentWillMount() {
    const { redirect } = this.props
    setTimeout(() => {
      if (redirect) redirect()
    }, 1000)
  }
  render() {
    return (
      <div className={styles.normal}>
        用户数据丢了-。- <br />
        将跳转至登录
      </div>
    );
  }
}

MissData.propTypes = {
  redirect: PropTypes.func.isRequired
}

export default MissData;
