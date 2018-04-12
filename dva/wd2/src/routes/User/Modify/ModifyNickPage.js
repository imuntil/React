import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import { Icon } from 'antd-mobile'
import Form from '@/components/Common/Form'
import InputItem from '@/components/Form/InputItem'
import UInput from '@/components/Form/UInput'
import { modifyPwd } from '@/services'
import { delay } from '@/utils/cts'
import './ModifyPage.scss'

const mapStateToProps = state => {
  return { user: state.user }
}

@connect(mapStateToProps)
export default class ModifyNickPage extends Form {
  state = { submitted: false, forceRender: false }

  constructor(props) {
    super(props)
    this.form['nick'] = { value: this.props.user.nick, valid: true }
  }

  handleChange = ({ value, name, $valid: { valid } }) => {
    this.form[name] = { value, valid }
    this.setState(({ forceRender }) => ({ forceRender: !forceRender }))
  }

  handleClear = () => {
    // xxx
  }

  render() {
    const { submitted } = this.state
    const { nick } = this.form
    return (
      <div className="container modify-nick-dk3e8">
        <QueueAnim>
          <InputItem key={0} label="昵称" mode="left" noColon>
            <UInput
              name="nick"
              minL={2}
              maxL={20}
              shake={submitted}
              onInputChange={this.handleChange}
              value={nick && nick.value}
              required
            />
            <a
              href="javascript:;"
              className="clear-icon"
              onClick={this.handleClear}
            >
              <Icon
                type="cross-circle-o
"
              />
            </a>
          </InputItem>
          <p className="form-btn-box" key={1}>
            <a
              href="javascript:;"
              className="form-btn"
              onClick={this.handleClick}
            >
              保存
            </a>
          </p>
        </QueueAnim>
      </div>
    )
  }
}
