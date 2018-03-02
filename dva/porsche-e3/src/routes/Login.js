import React, { Component } from 'react'
import { connect } from 'dva'
import './Login.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }
  handleAccountChange = (e) => {
    this.setState({
      account: e.target.value
    })
  }
  handleClick = () => {
    if (this.state.account) {
      this.props.history.push('/')
    }
  }
  render() {
    return (
      <section className="container login-page">
        <div className="form_box">
          <p className="logo">
            <img src={require('../assets/logo.jpg')} width="50%" alt="" />
          </p>
          <p className="c_1">
            <input
              type="text"
              className="account"
              placeholder="PPN账号登录"
              value={this.state.account}
              onChange={this.handleAccountChange}
            />
            <img src={require('../assets/user-icon.png')} alt="" />
          </p>
          <p className="c_2">
            <a
              href="javascript:;"
              className="login"
              onClick={this.handleClick}
            >
              登录
            </a>
          </p>
        </div>
        {/* <div className="loading_layer">loading...</div> */}
      </section>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Login)
