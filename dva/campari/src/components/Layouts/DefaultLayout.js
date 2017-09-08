import React from 'react';
import QueueAnim from 'rc-queue-anim'
import { Link, IndexLink } from 'dva/router'
import styles from './DefaultLayout.css';

function DefaultLayout({ children, location }) {
  return (
    <div className={styles.normal}>
      <div className={styles.main}>
        <QueueAnim type={'bottom'} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div key={location.pathname} style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
            {children}
          </div>
        </QueueAnim>
      </div>
      <nav className={styles.tabbar}>
        <IndexLink activeClassName={styles.active} to="/">
          <img src={require('../../assets/ig-dir/nav-1.jpg')} alt="" />
          <img className="active-icon" src={require('../../assets/ig-dir/nav-1-a.jpg')} alt="" />
        </IndexLink>
        <Link activeClassName={styles.active} to={'/product/all'}>
          <img src={require('../../assets/ig-dir/nav-2.jpg')} alt="" />
          <img className="active-icon" src={require('../../assets/ig-dir/nav-2-a.jpg')} alt="" />
        </Link>
        <Link activeClassName={styles.active} to="/cocktail">
          <img src={require('../../assets/ig-dir/nav-3.jpg')} alt="" />
          <img className="active-icon" src={require('../../assets/ig-dir/nav-3-a.jpg')} alt="" />
        </Link>
        <Link activeClassName={styles.active} to="/cart">
          <img src={require('../../assets/ig-dir/nav-4.jpg')} alt="" />
          <img className="active-icon" src={require('../../assets/ig-dir/nav-4-a.jpg')} alt="" />
        </Link>
        <Link activeClassName={styles.active} to="/user/login">
          <img src={require('../../assets/ig-dir/nav-5.jpg')} alt="" />
          <img className="active-icon" src={require('../../assets/ig-dir/nav-5-a.jpg')} alt="" />
        </Link>
      </nav>
    </div>
  );
}

export default DefaultLayout;
