import React, {PureComponent} from 'react'
import {connect} from 'dva'
import Yozora from '../components/Yozora'
import './LoginPage.scss'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd'
import {login} from '../services/index'
const FormItem = Form.Item

@connect()
class LoginPage extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault()
    const {form, dispatch, history} = this.props
    form.validateFields(async(error, values) => {
      if (error) {
        return
      }
      const {data, err, fail} = await login(values.userName, values.password)
      if (!data) {
        message.error((fail && fail.message) || err.message || '出错了，请稍后再试')
        return
      }
      dispatch({type: 'user/setUser', payload: data})
      history.push('/')
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Yozora className="page">
        <div className="login-ui83">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    message: '请输入邮箱账号!'
                  }
                ]
              })(
                <Input
                  autoComplete="off"
                  prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                  placeholder="Email"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!'
                  }
                ]
              })(
                <Input
                  prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                  type="password"
                  placeholder="Password"/>
              )}
            </FormItem>
            <FormItem>
              <p className="last-item">
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住我</Checkbox>
                )}
                <a className="login-form-forgot" href="">忘记密码</a>
              </p>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <a href="">前往注册</a>
            </FormItem>
          </Form>
        </div>
      </Yozora>
    )
  }
}

export default Form.create()(LoginPage)
