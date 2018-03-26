import React, { Component } from 'react'
import { connect } from 'dva'
import { ActionSheet } from 'antd-mobile'
import TopBanner from '@/components/TopBanner'
import models from '@/utils/models'
import './Models.scss'

const cayenneModels = Object.keys(models).filter(v => v.indexOf('Cayenne') > -1)

class Models extends Component {
  state = {
    currentModel: '全新 Cayenne'
  }

  componentWillMount = () => {
    console.log('xxxxxxxxxxx')
    console.log(this.props.history.action)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps.history, this.props.history)
    return true
  }

  getModel = cm => {
    const data = models[cm] || []
    return data.map((v, i) => {
      if (i === 0) return v.replace('<br/>', '，')
      return v.replace('<br/>', '')
    })
  }
  handleClick = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: cayenneModels,
        message: '请选择',
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex < 0) return
        this.setState({
          currentModel: cayenneModels[buttonIndex]
        })
      }
    )
  }
  render() {
    const { currentModel } = this.state
    const model = this.getModel(currentModel)
    return (
      <section className="container models-page-7ejf9">
        <div className="main-body flex">
          <TopBanner type title="车型介绍">
            <img
              src={require('../../assets/tr/models-title.jpg')}
              width="100%"
              alt=""
            />
          </TopBanner>
          <div className="content-area">
            <a
              href="javascript:;"
              className="current-model"
              onClick={this.handleClick}
            >
              {currentModel}
              <i>
                <img src={require('../../assets/select-icon.png')} alt="" />
              </i>
            </a>
            <div className="table-content">
              <table width="100%">
                <tbody>
                  <tr>
                    <td>价格</td>
                    <td>{model[0]}</td>
                  </tr>
                  <tr>
                    <td>车长</td>
                    <td>{model[1]}</td>
                  </tr>
                  <tr>
                    <td>车宽</td>
                    <td>{model[2]}</td>
                  </tr>
                  <tr>
                    <td>车高</td>
                    <td>{model[3]}</td>
                  </tr>
                  <tr>
                    <td>轴距</td>
                    <td>{model[4]}</td>
                  </tr>
                  <tr>
                    <td>风阻系数</td>
                    <td>{model[5]}</td>
                  </tr>
                  <tr>
                    <td>气缸布置形式/气缸数</td>
                    <td>{model[6]}</td>
                  </tr>
                  <tr>
                    <td>排量</td>
                    <td>{model[7]}</td>
                  </tr>
                  <tr>
                    <td>发动机位置/驱动形式</td>
                    <td>{model[8]}</td>
                  </tr>
                  <tr>
                    <td>功率</td>
                    <td>{model[9]}</td>
                  </tr>
                  <tr>
                    <td>最大扭矩 (Nm) /对应转速</td>
                    <td>{model[10]}</td>
                  </tr>
                  <tr>
                    <td>最高时速</td>
                    <td>{model[11]}</td>
                  </tr>
                  <tr>
                    <td>0-100 km/h 加速时间</td>
                    <td>{model[12]}</td>
                  </tr>
                  <tr>
                    <td>0-160 km/h 加速时间</td>
                    <td>{model[13]}</td>
                  </tr>
                  <tr>
                    <td>80-120 km/h 中间加速时间</td>
                    <td>{model[14]}</td>
                  </tr>
                  <tr>
                    <td>变速箱</td>
                    <td>{model[15]}</td>
                  </tr>
                  <tr>
                    <td>空载重量(中国)</td>
                    <td>{model[16]}</td>
                  </tr>
                  <tr>
                    <td>行李箱容积</td>
                    <td>{model[17]}</td>
                  </tr>
                  <tr>
                    <td>油箱</td>
                    <td>{model[18]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect()(Models)
