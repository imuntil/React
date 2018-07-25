import { connect } from 'dva'
import { Route, Redirect } from 'dva/router'

function mapStateToProps(state) {
  const { token } = state.user
  return { authed: !!token }
}
const AuthRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authed ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)
export default connect(mapStateToProps)(AuthRoute)
