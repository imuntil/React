import React from 'react'
import { connect } from 'dva'
import { List, Toast } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import Form from '@/components/Common/Form'
import InputItem from '@/components/Form/InputItem'
import UInput from '@/components/Form/UInput'
import { modifyPwd } from '@/services'
import { delay } from '@/utils/cts'
import './ModifyPage.scss'

const Item = List.Item

const mapStateToProps = state => {
  return { user: state.user }
}

@connect(mapStateToProps)
export default class ModifyPwdPage extends Form {
  state = { submitted: false, nPwd: '' }

  handleChange = ({ name, value, $valid: { valid } }) => {
    this.form[name] = { value, valid }
    name === 'nPwd' && this.setState({ nPwd: value })
  }

  handle = async () => {
    if (!this.formValid) return
    const { oPwd, nPwd } = this.form
    if (oPwd.value === nPwd.value) {
      Toast.info('新密码不能和原密码一样', 1.5)
      return
    }
    const { user: { phone }, history } = this.props
    Toast.loading('', 100)
    const { fail, err } = await modifyPwd({
      nPwd: nPwd.value,
      oPwd: oPwd.value,
      phone
    })
    if (err) {
      Toast.info('出错了，请稍后重试', 2)
      return
    }
    if (fail) {
      Toast.info(fail.msg, 2)
      return
    }
    Toast.success('操作成功', 1.5)
    await delay(800)
    history.push('/user')
  }

  render() {
    const { submitted, nPwd } = this.state
    return (
      <div className="container modify-pwd-sl92w">
        <div className="am-list">
          <QueueAnim className="am-list-body">
            <Item key={0}>
              <p className="list-item flex">
                <span>手机号</span>
                <span className="gray">135****6765</span>
              </p>
            </Item>
            <InputItem
              key={1}
              label="登陆密码"
              mode="left"
              className="bb no-bt wider-label"
              noColon
            >
              <UInput
                name="oPwd"
                type="password"
                reg="password"
                onInputChange={this.handleChange}
                shake={submitted}
                placeholder="填写当前登录密码"
                required
              />
            </InputItem>
            <Item key={2}>
              <p className="list-item gray">请重新设置登录密码</p>
            </Item>
            <InputItem
              key={3}
              label="设置新密码"
              mode="left"
              className="no-bt wider-label"
              noColon
            >
              <UInput
                name="nPwd"
                type="password"
                reg="password"
                onInputChange={this.handleChange}
                shake={submitted}
                placeholder="6-20位字母、数字组合"
                required
              />
            </InputItem>
            <InputItem
              key={4}
              label="确认新密码"
              mode="left"
              className="wider-label"
              noColon
            >
              <UInput
                name="confirm"
                type="password"
                reg="password"
                onInputChange={this.handleChange}
                shake={submitted}
                confirm={nPwd}
                placeholder="再次填写密码"
                required
              />
            </InputItem>
            <p className="form-btn-box" key={5}>
              <a
                onClick={this.handleClick}
                href="javascript:;"
                className="form-btn"
              >
                保存
              </a>
            </p>
          </QueueAnim>
        </div>
      </div>
    )
  }
}
