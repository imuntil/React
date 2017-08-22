import React from 'react'
import Box from '../components/Title'
import { Form, Input, message, Icon, Button } from 'antd'
import FormItem from '../components/FormItem'
const TextArea = Input.TextArea

class Contact extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      wrapperCol: {
        sm: {offset: 2, span: 12},
        xs: {offset: 2, span: 12},
        md: {offset: 2, span: 6}
      }
    }
    const formTextAreaLayout = {
      wrapperCol: {
        sm: {offset: 2, span: 18},
        xs: {offset: 2, span: 18},
        md: {offset: 2, span: 12}
      }
    }
    return (
      <div className="row">
        <Box>
          <img style={{marginBottom: '4rem'}} src={require('../assets/contact-title.png')} alt=""/>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator(
                'company',
                {
                  rules: [
                    { required: true, message: 'please input your company name '},
                    { pattern: /^.{1,25}/, message: '公司名称不得超过25个字符'}
                    ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder="客户公司名称" />
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator(
                'address',
                {
                  rules: [
                    { required: true, message: 'please input address'},
                    { pattern: /^.{1,50}/, message: '地址不得超过50个字符'}
                    ]
                }
              )(
                <Input prefix={<Icon type="environment-o" />} placeholder="地址"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator(
                'phone',
                {
                  rules: [
                    { required: true, message: 'please input your tel or phone'},
                    { pattern: /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$|^0\d{2,3}-\d{7,8}(-\d{1,4})?$/, message: '请输入正确的电话号码或者手机号码'}
                    ]
                }
              )(
                <Input prefix={<Icon type="tablet" />} placeholder="电话" type="tel"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator(
                'fax',
                {
                  rules: [
                    {pattern: /^0\d{2,3}-\d{7,8}(-\d{1,4})?$/, message: '请输入正确的传真号码'}
                  ]
                }
              )(
                <Input prefix={<Icon type="laptop" />} placeholder="传真" type="tel"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator(
                'email',
                {
                  rules: [
                    { required: true, message: 'please input your email '},
                    { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱'}
                    ]
                }
              )(
                <Input prefix={<Icon type="mail" />} placeholder="邮箱" type="email"/>
              )}
            </FormItem>
            <FormItem {...formTextAreaLayout}>
              {getFieldDecorator(
                'detail',
                {
                  rules: [
                    { required: true, message: '请输入联系事项'},
                    {  pattern: /^.{1,50}/, message: '联系事项不得超过50个字符'}
                    ]
                }
              )(
                <TextArea placeholder="联系事项" />
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </Form>
        </Box>
      </div>
    )
  }
}
Contact = Form.create()(Contact)
export default Contact
