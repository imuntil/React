import React from 'react'
// import HomeLayout from '../layouts/HomeLayout'
// import FormItem from '../components/FormItem'
import {post} from '../utils/request'
// import formProvider from '../utils/formProvider'
import { Icon, Form, Input, Button, message } from 'antd'
import styles from './Login.less'

const FormItem = Form.Item

class Login extends React.Component {
  handleSubmit (e) {
    e.preventDefault()
    const {history, form} = this.props
    form.validateFields((err, values) => {
      if (!err) {
        post('http://localhost:3000/login', {
          account: account.value,
          password: password.value
        })
          .then(res => {
            if (res) {
              history.push('/')
            } else {
              alert('登录失败')
            }
          })
      }
    })
  }
  render () {
    const {form} = this.props
    const {getFieldDecorator} = form
    return (
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <header className={styles.header}>
            ReactManager
          </header>
          <section className={styles.form}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                {getFieldDecorator('account', {
                  rules: [
                    {
                      required: true,
                      message: '请输入管理员账号',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="text" addonBefore={<Icon type="user"/>}/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="password" addonBefore={<Icon type="lock" />}/>
                )}
              </FormItem>
              <Button className={styles.btn} type="primary" htmlType="submit">Sign In</Button>
            </Form>
          </section>
        </div>
      </div>
    )
  }
}

Login = Form.create()(Login)

export default Login