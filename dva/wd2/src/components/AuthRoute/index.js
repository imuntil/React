import { connect } from 'dva'
import { Route, Redirect } from 'dva/router'

function mapStateToProps(state) {
  const { phone, userID, avatar, openID, nick } = state.user
  return { user: { phone, userID, avatar, openID, nick } }
}
const AuthRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.phone ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)
export default connect(mapStateToProps)(AuthRoute)
