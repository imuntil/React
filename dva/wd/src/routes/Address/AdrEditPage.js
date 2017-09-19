import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, WingBlank } from 'antd-mobile'
import { modifyAdr, addAdr } from '../../services/user'
import ZInput from '../../components/Form/ZInput.js'
import ZTextarea from '../../components/Form/ZTextarea.js'
import { regexp } from '../../services/ct'
import district from '../../services/china-division'
import styles from './AdrEditPage.css'

class AdrEditPage extends React.Component {
  state = {
    submit: false,
    name: { v: '', valid: false },
    phone: { v: '', valid: false },
    label: '',
    adr: { v: '', valid: false },
    detail: { v: '', valid: false },
    isDefault: 0,
  }
  componentWillMount() {
    const { params: { id } } = this.props
    this.status = +!!id
  }
  setSubmit = () => {
    this.setState({ submit: true })
    setTimeout(() => {
      this.setState({ submit: false })
    }, 600)
  }
  handleInputChange = (status, v, msg) => {
    const { error } = msg
    if (error) {
      this.setState({ [status]: { v: '', valid: false } })
    } else {
      this.setState({ [status]: { v, valid: true } })
    }
  }
  handleSelectChange = e => {
    const v = e.target.value
    this.setState({ label: v })
  }
  handleDefaultClick = () => {
    const { isDefault } = this.state
    this.setState({ isDefault: !isDefault })
  }
  handleSaveClick = () => {
    const { submit } = this.state
    if (submit) return false
    this.setSubmit()
  }
  status = 0
  render() {
    const {
      submit, name, phone, label, adr, detail, isDefault
    } = this.state
    return (
      <div className={styles.normal}>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <p className={styles.group}>
            <label htmlFor="name">收货人</label>
            <ZInput
              name={'收货人姓名'} required value={name.v}
              onZInputChange={this.handleInputChange.bind(this, 'name')}
              type={'text'} maxL={20} minL={2}
              shake={submit && !name.valid}
            />
          </p>
          <p className={styles.group}>
            <label htmlFor="phone">手机号</label>
            <ZInput
              name={'手机号码'} required value={phone.v}
              onZInputChange={this.handleInputChange.bind(this, 'phone')}
              type={'tel'} reg={regexp.phone.str}
              shake={submit && !phone.valid}
            />
          </p>
          <p className={styles.group}>
            <label htmlFor="label">标&nbsp;&nbsp;&nbsp;&nbsp;签</label>
            <span>
              <select onClick={this.handleSelectChange}>
                <option value="">-</option>
                <option value="家">家</option>
                <option value="公司">公司</option>
              </select>
            </span>
          </p>
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <p onClick={() => { this.setState({ visible: true }) }} className={styles.group}>
            <label htmlFor="adr">所在地区</label>
            <a href="javascript:;">广西-来宾市</a>
          </p>
          <div className={styles.group}>
            <ZTextarea
              name={'详细地址'} maxL={50} minL={5} value={detail.v}
              required component={'p'} placeholder="详细地址"
              onZInputChange={this.handleInputChange.bind(this, 'detail')}
              shake={submit && !detail.valid}
            />
          </div>
        </div>
        <WhiteSpace size="lg" />
        <a
          onClick={this.handleDefaultClick}
          href="javascript:;" className={styles.set_default}
        >
          {
            !isDefault
              ? <em className={styles.default} />
              : <em className={styles.checked} />
          }
          设为默认地址
        </a>
        <WhiteSpace size="xl" />
        <WingBlank size="lg">
          <a
            onClick={this.handleSaveClick}
            href="javascript:;" className="common-btn"
          >保存</a>
        </WingBlank>
      </div>
    )
  }
}
function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(AdrEditPage)
