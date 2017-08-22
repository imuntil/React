import React from 'react'
import UserEditor from '../components/UserEditor'
import { connect } from 'react-redux'
import { fetchUserDetail, editUser, fetchUsers } from '../reducers/user'
import _ from 'lodash'

class UserEdit extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount () {
    const userId = +this.props.match.params.id
    const { fetchUserDetail, fetchUsers } = this.props
    fetchUsers()
      .then(() => {
        fetchUserDetail(userId)
      })

  }
  render () {
    const { user, editUser } = this.props
    return !_.isEmpty(user) ? <UserEditor history={this.props.history}
                              onEdit={editUser}
                              editTarget={user} /> : <span>...loading...</span>
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUserDetail: id => dispatch(fetchUserDetail(id)),
    editUser: (id, values) => dispatch(editUser(id, values))
  }
}
UserEdit = connect(mapStateToProps, mapDispatchToProps)(UserEdit)
export default UserEdit