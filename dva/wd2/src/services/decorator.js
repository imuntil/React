export const add2Cart_buyNow = target => {
  target.prototype.toLogin = function() {
    const { history, location } = this.props
    history.push({
      pathname: '/user/login',
      state: { from: location }
    })
  }
}
