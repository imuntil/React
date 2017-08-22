import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UsersCom from '../components/Users/Users'
import MainLayout from '../components/MainLayout/MainLayout'
import { routerRedux } from 'dva/router'

function Users({list, total, page, loading, location, dispatch}) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page }
    }))
  }
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id
    })
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: {id, values}
    })
  }
  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values
    })
  }
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UsersCom list={list} onPageChange={pageChangeHandler}
                  onDelete={deleteHandler} onEdit={editHandler}
                  onCreate={createHandler}
                  total={+total} page={page} loading={loading} />
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users
  return {
    list,
    total,
    page,
    loading: state.loading.models.users
  }
}

export default connect(mapStateToProps)(Users);
