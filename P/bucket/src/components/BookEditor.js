import React from 'react'
import request, {get} from '../utils/request'
import { Input, InputNumber, Form, Button, AutoComplete, message } from 'antd'

const FormItem = Form.Item
const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

class BookEditor extends React.Component {
  timer = 0
  constructor (props) {
    super(props)
    this.state = {
      recommendUsers: []
    }
  }
  componentDidMount () {
    const {editTarget, form} = this.props
    console.log(editTarget);
    if (editTarget) {
      form.setFieldsValue(editTarget)
    }
  }
  getRecommendUsers (partialUserID) {
    get('http://localhost:3000/user?id_like=' + partialUserID)
      .then(res => {
        if (res.length === 1 && res[0].id === partialUserID) {
          return
        }
        this.setState({
          recommendUsers: res.map(user => {
            return {
              text: `${user.id}/${user.name}`,
              value: user.id
            }
          })
        })
      })
  }
  handleOwnerIdChange (value) {
    // this.props.onFormChange('owner_id', value)
    this.setState({recommendUsers: []})

    if (this.timer) {
      clearTimeout(this.timer)
    }
    if (value) {
      this.timer = setTimeout(() => {
        this.getRecommendUsers(value)
        this.timer = null
      }, 200)
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const {form, editTarget, history, addBook, onEdit} = this.props
    form.validateFields((err, values) => {
      if (err) {
        message.warn(err)
        return
      }
      if (!editTarget || !editTarget.id) {
        return addBook(values)
          .then(() => {
            message.success('新增书籍成功')
            history.push('/book/list')
          })
          .catch(err => {
            console.log(err);
            message.error('新增书籍失败')
          })
      } else {
        onEdit(editTarget.id, values)
          .then(() => {
            message.success('编辑书籍成功')
            history.goBack()
          })
          .catch(err => {
            console.log(err);
            message.error('编辑书籍失败')
          })
      }
    })
  }
  render () {
    const {form} = this.props
    const {recommendUsers} = this.state
    const {getFieldDecorator} = form
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} style={{width: '400px'}}>
        <FormItem label="书名：" {...formLayout}>
          {
            getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入书名'
                }
              ]
            })(
              <Input type="text"/>
            )
          }
        </FormItem>
        <FormItem label={'价格'} {...formLayout}>
          {
            getFieldDecorator('price', [
              {
                required: true,
                message: '请输入价格',
                type: 'number'
              },
              {
                min: 1,
                max: 99999,
                type: 'number',
                message: '请输入1~99999的数字'
              }
            ])(
              <InputNumber />
            )
          }
        </FormItem>
        <FormItem label="所有者：" {...formLayout}>
          {
            getFieldDecorator('owner_id', {
              rules: [
                {
                  required: true,
                  message: '请输入所有者id'
                },
                {
                  pattern: /^\d*$/,
                  message: '请输入正确的ID'
                }
              ]
            })(
              <AutoComplete
                dataSource={recommendUsers}
                onSearch={this.handleOwnerIdChange.bind(this) }
              />
            )
          }
        </FormItem>
        <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    )
  }
}

BookEditor = Form.create()(BookEditor)
export default  BookEditor

// <AutoComplete
// dataSource={recommendUsers}
// onSearch={this.handleOwnerIdChange.bind(this) }
// />