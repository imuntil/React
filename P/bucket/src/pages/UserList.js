import React from 'react'
// import HomeLayout from '../layouts/HomeLayout'
// import {get, del} from '../utils/request'
import { message, Table, Popconfirm, Button } from 'antd'
import { connect } from 'react-redux'
import { fetchUsers, deleteUser } from '../reducers/user'

class UserList extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    const { fetchUsers } = this.props
    fetchUsers()
  }
  handleEdit (user) {
    this.props.history.push('/user/edit/' + user.id)
  }
  handleDel (user) {
    const { deleteUser } = this.props
    deleteUser(user.id)
      .then(() => {
        message.success('删除用户成功')
      })
      .catch(err => {
        console.log(err);
        message.error('删除用户失败')
      })
  }
  render () {
    const {userList} = this.props
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Button.Group type="ghost">
            <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
            <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
              <Button size="small">删除</Button>
            </Popconfirm>
          </Button.Group>
        )
      }
    ]
    return (
      <Table columns={columns} dataSource={userList} rowKey={row => row.id}></Table>
    )
  }
}

const mapStateTopProps = state => {
  return {
    userList: state.userReducer.userList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: id => dispatch(deleteUser(id))
  }
}
UserList = connect(mapStateTopProps, mapDispatchToProps)(UserList)
export default UserList