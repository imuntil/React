import React from 'react'
// import formProvider from '../utils/formProvider'
// import FormItem from '../components/FormItem'
// import PropTypes from 'prop-types'
// import HomeLayout from '../layouts/HomeLayout'
import request from '../utils/request'
import { Form, Input, InputNumber, Select, Button, message } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

class UserEditor extends React.Component {
  componentDidMount () {
    const {editTarget, form} = this.props
    if (editTarget) {
      form.setFieldsValue(editTarget)
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const {form, editTarget, history, onAddUser, onEdit} = this.props
    form.validateFields((err, values) => {
      if (!err) {
        if (!editTarget) {
          onAddUser(values)
            .then(() => {
              message.success('新增用户成功')
              history.push('/user/list')
            })
            .catch(err => {
              message.error('新增用户失败')
            })
        } else {
          onEdit(editTarget.id, values)
            .then(() => {
              message.success('编辑用户成功')
              history.goBack()
            })
            .catch(err => {
              console.log(err);
              message.error('编辑用户失败')
            })
        }
      }
    })
  }
  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div style={{width: '400px'}}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label="用户名:" {...formLayout}>
            {
              getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名'
                  },
                  {
                    pattern: /^.{1,4}$/,
                    message: '用户名最多4个字符'
                  }
                ]
              })(
                <Input type="text"/>
              )
            }
          </FormItem>
          <FormItem label="年龄：" {...formLayout}>
            {
              getFieldDecorator('age', {
                rules: [
                  {
                    required: true,
                    message: '请输入年龄',
                    type: 'number'
                  },
                  {
                    min:1,
                    max: 100,
                    message: '请输入1~100的年龄',
                    type: 'number'
                  }
                ]
              })(
                <InputNumber />
              )
            }
          </FormItem>
          <FormItem label="性别：" {...formLayout}>
            {
              getFieldDecorator('gender', {
                rules: [
                  {
                    required: true,
                    message: '请选这性别'
                  }
                ]
              })(
                <Select placeholder="请选择">
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem wrapperCol={{...formLayout.wrapperCol, offset: formLayout.labelCol.span}}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

UserEditor = Form.create()(UserEditor)

export default UserEditor