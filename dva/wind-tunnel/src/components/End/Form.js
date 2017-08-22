import React from 'react'
import styles from './Form.less'
import PropTypes from 'prop-types'

class Form extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      age: '00后',
      gender: '男',
      phone: ''
    }
  }
  handleNameInput (input, e) {
    this.setState({
      [input]: e.target.value
    })
  }
  submitInfos () {
    console.log(this.state);
    setTimeout(() => {
      this.props.onSubmit()
    }, 200)
  }
  render () {
    const {name, age, gender, phone} = this.state
    return (
      <div className={styles.layer}>
        <div className={styles.box}>
          <img className={styles.bg} src={require('../../assets/form-bg.png')} alt=""/>
          <form action="">
            <p className={styles.form_group}>
              <label htmlFor="name">姓名</label>
              <input
                value={name} onChange={this.handleNameInput.bind(this, 'name')}
                type="text" id="name"/>
            </p>
            <p className={styles.form_group}>
              <label htmlFor="age">年龄</label>
              <select
                value={age} onChange={this.handleNameInput.bind(this, 'age')}
                name="age" id="age">
                <option value="00后">00后</option>
                <option value="90后">90后</option>
                <option value="80后">80后</option>
                <option value="70后">70后</option>
              </select>
              <i className={styles.arrow} />
            </p>
            <p className={styles.form_group}>
              <label htmlFor="gender">性别</label>
              <select
                value={gender} onChange={this.handleNameInput.bind(this, 'gender')}
                name="gender" id="gender">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
              <i className={styles.arrow} />
            </p>
            <p className={styles.form_group}>
              <label htmlFor="phone">手机</label>
              <input
                value={phone} onChange={this.handleNameInput.bind(this, 'phone')}
                type="tel" name="phone" id="phone"/>
            </p>
            <a href="javascript:;" onClick={this.submitInfos.bind(this)} className={styles.btn}>提交</a>
          </form>
        </div>
      </div>
    )
  }
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
export default Form
