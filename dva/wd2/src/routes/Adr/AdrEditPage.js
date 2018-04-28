import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, Picker, Icon, Toast } from 'antd-mobile'
import arrayTreeFilter from 'array-tree-filter'
import { delay } from '@/utils/cts.ts'
import Form from '@/components/Common/Form'
import Shake from '@/components/Common/Shake'
import UInput from '@/components/Form/UInput'
import AdrRadio from '@/components/Form/AdrRadio'
import InputItem from '@/components/Form/InputItem'
import district from '@/services/china-division'
import './AdrEditPage.scss'

const labelData = [
  { label: '-', value: '' },
  { label: '家', value: '家' },
  { label: '公司', value: '公司' }
]

const mapStateToProps = state => {
  return { dic: state.adr.dic }
}

@connect(mapStateToProps)
export default class AdrEditPage extends Form {
  state = {
    checked: false,
    submitted: false,
    labelValue: [],
    lpVisible: false,
    apVisible: false,
    adrValue: [],
    adrValueStr: '',
    forceRender: false
  }

  constructor(props) {
    super(props)
    const { edit } = this.props.match.params
    // edit => -1 新增模式，其他为编辑模式
    if (+edit === -1) return
    this.setEditState(edit)
  }

  setEditState = adrID => {
    const { dic, history } = this.props
    if (!dic || !dic[adrID]) {
      history.go(-1)
      return
    }
    const { address, city: province, label, name, phone, status } = dic[adrID]
    const [city, detail] = address.split('-')
    const adrValue = this.adr2Value([province, city])
    this.state = {
      checked: !!status,
      labelValue: [label],
      adrValue,
      adrValueStr: `${province} ${city}`,
      submitted: false,
      lpVisible: false,
      apVisible: false,
      forceRender: false
    }
    this.form = {
      name: { value: name, valid: true },
      phone: { value: phone, valid: true },
      detail: { value: detail, valid: true }
    }
  }

  /* 重写handleChange */
  handleChange = ({ value, name, $valid: { valid } }) => {
    this.form[name] = { value, valid }
    this.setState(({ forceRender }) => ({ forceRender: !forceRender }))
  }

  handleRadioChange = value => {
    this.setState({ checked: value })
    this.handleChange({
      value: +value,
      name: 'status',
      $valid: { valid: true }
    })
  }

  handleApChange = v => {
    this.setState({ adrValue: v, adrValueStr: this.value2Adr(v) })
  }

  /* 将省市 code 转换为文字 */
  value2Adr = v => {
    if (!v || !v.length) return ''
    return arrayTreeFilter(district, (c, level) => c.value === v[level])
      .map(val => val.label)
      .join(' ')
  }

  /* 将省市转换为对应的 code */
  adr2Value = ([p, c]) => {
    const province = district.filter(
      pro => pro.label === p || pro.label.indexOf(p) >= 0
    )
    if (!province.length) return ''
    const ct = province[0].children.filter(
      city => city.label === c || city.label.indexOf(c) >= 0
    )
    if (!ct.length) return ''
    return [province[0].value, ct[0].value]
  }

  handle = async () => {
    if (!this.formValid) return
    const { checked, labelValue, adrValueStr } = this.state
    const { match, history } = this.props
    if (!adrValueStr) return
    const { name, phone, detail } = this.form
    const adr = adrValueStr.split(' ')
    const payload = {
      status: +checked,
      label: labelValue[0],
      city: adr[0],
      name: name.value,
      phone: phone.value,
      address: adr[1] + '-' + detail.value,
      id: match.params.edit
    }
    const res = await this.props.dispatch({ type: 'adr/editAdr', payload })
    if (res) {
      Toast.success('操作成功', 1)
    } else {
      Toast.info('操作失败了，请稍后重试', 1)
    }
    await delay(500)
    history.go(-1)
  }

  render() {
    const {
      submitted,
      checked,
      labelValue,
      lpVisible,
      apVisible,
      adrValue,
      adrValueStr
    } = this.state
    const { name, phone, detail } = this.form
    return (
      <div className="container adr-j203r">
        <div className="content-j203r">
          <InputItem label="收货人">
            <UInput
              maxL={20}
              minL={2}
              name="name"
              onInputChange={this.handleChange}
              shake={submitted}
              placeholder="请输入收货人姓名"
              required
              value={(name && name.value) || ''}
            />
          </InputItem>
          <InputItem label="手机号码">
            <UInput
              name="phone"
              onInputChange={this.handleChange}
              shake={submitted}
              placeholder="请输入收货人手机号"
              required
              type="tel"
              reg="phone"
              value={(phone && phone.value) || ''}
            />
          </InputItem>
          <InputItem label="标签" className="bb">
            <a
              href="javascript:;"
              className="picker-btn left"
              onClick={() => this.setState({ lpVisible: true })}
            >
              {labelValue[0] || '-'}
            </a>
          </InputItem>
          <WhiteSpace size="lg" />
          <InputItem label="所在地区" className="bb small-padding">
            <Shake shake={submitted && !adrValueStr}>
              <a
                href="javascript:;"
                className="picker-btn"
                onClick={() => this.setState({ apVisible: true })}
              >
                <span>{adrValueStr || '请选择'}</span>
                <Icon type="right" />
              </a>
            </Shake>
          </InputItem>
          <div className="text-area-j203r">
            <UInput
              el="textarea"
              rows={5}
              placeholder="请填写详细地址"
              maxL={75}
              name="detail"
              onInputChange={this.handleChange}
              shake={submitted}
              required
              value={(detail && detail.value) || ''}
            />
          </div>
          <WhiteSpace size="lg" />
          <p className="set-default-j203r">
            <AdrRadio
              text="设为默认地址"
              onChange={this.handleRadioChange}
              checked={checked}
            />
          </p>
          <p className="form-btn-box">
            <a
              href="javascript:;"
              className="form-btn"
              onClick={this.handleClick}
            >
              保存
            </a>
          </p>
        </div>
        <Picker
          visible={lpVisible}
          data={labelData}
          value={labelValue}
          cols={1}
          onChange={v => this.setState({ labelValue: v })}
          onOk={() =>
            this.setState({
              lpVisible: false
            })
          }
          onDismiss={() => this.setState({ lpVisible: false })}
        />
        <Picker
          visible={apVisible}
          data={district.slice(0, -3)}
          value={adrValue}
          cols={2}
          onChange={this.handleApChange}
          onOk={() =>
            this.setState({
              apVisible: false
            })
          }
          onDismiss={() => this.setState({ apVisible: false })}
        />
      </div>
    )
  }
}
