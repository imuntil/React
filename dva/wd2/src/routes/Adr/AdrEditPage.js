import React from 'react'
import { connect } from 'dva'
import { WhiteSpace } from 'antd-mobile'
import Form from '@/components/Common/Form'
import UInput from '@/components/Form/UInput'
import InputItem from '@/components/Form/InputItem'
import './AdrEditPage.scss'

@connect()
export default class AdrEditPage extends Form {
  render() {
    const { submitted } = this.state
    return (
      <div className="container adr-j203r">
        <div className="content-j203r">
          <InputItem label="收货人">
            <UInput
              maxL={20}
              minL={2}
              name="lala"
              onInputChange={this.handleChange}
              shake={submitted}
              placeholder="请输入收货人姓名"
              required
            />
          </InputItem>
          <InputItem label="手机号码">
            <UInput
              name="phone"
              onInputChange={this.handleChange}
              shake={submitted}
              placeholder="请输入收货人手机号"
              required
              reg="phone"
            />
          </InputItem>
          <InputItem label="标签" className="bb">。。</InputItem>
          <WhiteSpace size="lg" />
          <InputItem label="所在地区">请选择</InputItem>
        </div>
        ..
      </div>
    )
  }
}
