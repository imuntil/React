import React from 'react'
import UserEditor from '../components/UserEditor'
import { connect } from 'react-redux'
import { addUser, fetchUsers } from '../reducers/user'

class UserAdd extends React.Component {
  componentWillMount () {
    this.props.fetchUsers()
  }
  render () {
    return (
      <UserEditor {...this.props} />
    )
  }
}

const mapStateToProps = state => {
  return {
    userList: state.userReducer.userList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addUser: values => dispatch(addUser(values)),
    fetchUsers: () => dispatch(fetchUsers())
  }
}
UserAdd = connect(mapStateToProps, mapDispatchToProps)(UserAdd)
export default UserAdd