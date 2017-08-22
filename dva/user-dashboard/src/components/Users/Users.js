import React from 'react';
import styles from './Users.less'
import { Table, Pagination, Popconfirm, Button } from 'antd'
import { PAGE_SIZE } from '../../constants'
import UserModal from './UserModal'

function Users({
                 list: dataSource,
                 total,
                 page: current,
                 loading,
                 onPageChange,
                 onDelete,
                 onEdit,
                onCreate
               }) {
  function deleteHandler(id) {
    onDelete(id)
  }
  function editHandler(id, values) {
    onEdit(id, values)
  }
  function createHandler(values) {
    onCreate(values)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website'
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a href="">Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ]
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Users
