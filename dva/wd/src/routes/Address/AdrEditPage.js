import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, WingBlank, Picker, Icon, Toast } from 'antd-mobile'
import arrayTreeFilter from 'array-tree-filter'
import _ from 'lodash'
import { modifyAdr, addAdr } from '../../services/user'
import ZInput from '../../components/Form/ZInput.js'
import ZTextarea from '../../components/Form/ZTextarea.js'
import Shake from '../../components/Animate/Shake.js'
import { regexp } from '../../services/ct'
import district from '../../services/china-division'
import { delay } from '../../services/tools-fun'
import routeLoading from '../../components/HighComponent/routeLoading'
import styles from './AdrEditPage.css'

const labelData = [
  { label: '-', value: '' },
  { label: '家', value: '家' },
  { label: '公司', value: '公司' }
]
class AdrEditPage extends React.Component {
  state = {
    submit: false,
    name: { v: '', valid: false },
    phone: { v: '', valid: false },
    detail: { v: '', valid: false },
    isDefault: 0,
    apVisible: false,
    apValue: [],
    apValueStr: '',
    lpVisible: false,
    lpValue: []
  }
  componentWillMount() {
    const { params: { id } } = this.props
    this.status = +id || 0
    if (id) this.setInitStatus(id)
  }
  setInitStatus = (id) => {
    const { list, history } = this.props
    if (!list || _.isEmpty(list)) {
      history.go(-1)
      return false
    }
    const { address, city: province, label, name, phone, status } = list[id]
    const [city, detail] = address.split('-')
    const apValue = this.adr2Value([province, city])

    this.setState({
      name: { v: name, valid: true },
      phone: { v: phone, valid: true },
      detail: { v: detail, valid: true },
      isDefault: +status,
      lpValue: [label],
      apValue,
      apValueStr: `${province} ${city}`
    })
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
  handleDefaultClick = () => {
    const { isDefault } = this.state
    this.setState({ isDefault: !isDefault })
  }
  handleAPChange = v => {
    const str = this.value2Adr(v)
    this.setState({ apValue: v, apValueStr: str })
  }
  pushToServer = async (payload) => {
    const { dispatch, history } = this.props
    let fun = addAdr
    let p = payload
    if (this.status) {
      fun = modifyAdr
      p = { ...p, id: this.status }
    }
    const { data = {}, err } = await fun(p)
    const msg = this.status ? '更新' : '新增'
    if (err || +data.code !== 0) {
      dispatch({
        type: 'error/dataOperationError',
        payload: {
          msg: `${msg}地址失败`,
          code: data.code
        }
      })
      return false
    }
    Toast.success(`${msg}地址成功`, 1)
    dispatch({ type: 'adr/updateList' })
    await delay(1000)
    history.go(-1)
    return true
  }
  handleSaveClick = () => {
    if (submit) return false
    const {
      submit, isDefault, name, phone, lpValue, apValueStr, detail
    } = this.state
    const { uid } = this.props
    const [province, city] = apValueStr.split(' ')
    this.setSubmit()
    if (!name.v || !phone.v || !detail.v || !apValueStr) return false
    const payload = {
      isDefault: +isDefault,
      province,
      city,
      detail: detail.v,
      name: name.v,
      phone: phone.v,
      label: lpValue,
      uid
    }
    this.pushToServer(payload)
  }
  value2Adr = (value) => {
    if (!value || !value.length) return ''
    const treeChildren =
      arrayTreeFilter(district, (c, level) => c.value === value[level])
    return treeChildren.map(v => v.label).join(' ')
  }
  adr2Value = ([p, c]) => {
    const province = district.filter(pro => pro.label === p || pro.label.indexOf(p) >= 0)
    if (!province.length) return ''
    const ct = province[0]
      .children
      .filter(city => city.label === c || city.label.indexOf(c) >= 0)
    if (!ct.length) return ''
    return [province[0].value, ct[0].value]
  }
  status = 0
  render() {
    const {
      submit, name, phone, label, detail, isDefault,
      apValue, apVisible, lpValue, lpVisible, apValueStr
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
          <p onClick={() => this.setState({ lpVisible: true })} className={styles.group}>
            <label htmlFor="label">标&nbsp;&nbsp;&nbsp;&nbsp;签</label>
            <span className={styles.label}>
              {lpValue[0] || '-'}
            </span>
          </p>
        </div>
        <WhiteSpace size="lg" />
        <div className={styles.section}>
          <div onClick={() => this.setState({ apVisible: true })} className={styles.group}>
            <label htmlFor="adr">所在地区</label>
            <Shake shake={submit && !apValueStr} className={styles.shake}>
              <a href="javascript:;" style={apValueStr ? null : { padding: '8px 5px' }}>
                {
                  apValueStr
                    ? `${apValueStr}`
                    : <Icon type="right" />
                }
              </a>
            </Shake>
          </div>
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
        <Picker
          visible={apVisible}
          data={district.slice(0, -3)}
          value={apValue} cols={2}
          onChange={v => this.handleAPChange(v)}
          onOk={() => this.setState({ apVisible: false })}
          onDismiss={() => this.setState({ apVisible: false })}
        />
        <Picker
          visible={lpVisible}
          data={labelData}
          value={lpValue} cols={1}
          onChange={v => this.setState({ lpValue: v })}
          onOk={() => this.setState({ lpVisible: false })}
          onDismiss={() => this.setState({ lpVisible: false })}
        />
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { list } = state.adr
  const { _id } = state['user-info']
  return { list, uid: _id }
}

export default connect(mapStateToProps)(routeLoading(AdrEditPage))
