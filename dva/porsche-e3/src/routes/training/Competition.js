import React, { Component } from 'react'
import { connect } from 'dva'
import { ActionSheet } from 'antd-mobile'
import TopBanner from '@/components/TopBanner'
import models from '@/utils/models'
import './Competition.scss'

const cayenneModels = []
const cptModels = []
Object.keys(models).forEach(v => {
  v.indexOf('Cayenne') > -1 ? cayenneModels.push(v) : cptModels.push(v)
})

class Competition extends Component {
  state = {
    current: { cayenne: cayenneModels[0], cpt: cptModels[0] }
  }
  handleClick = v => {
    const cms = v ? cptModels : cayenneModels
    ActionSheet.showActionSheetWithOptions(
      {
        options: cms,
        message: '请选择',
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex < 0) return
        const current = { ...this.state.current }
        current[v ? 'cpt' : 'cayenne'] = cms[buttonIndex]
        this.setState({ current })
      }
    )
  }
  render() {
    const { current } = this.state
    const { [current.cayenne]: model = [], [current.cpt]: cpt = [] } = models
    return (
      <section className="container cpt-page-d8ej74">
        <div className="main-body flex">
          <TopBanner title="竞品对比" type>
            <img
              src={require('../../assets/tr/competition-title.jpg')}
              width="100%"
              alt=""
            />
          </TopBanner>
          <div className="content-area">
            <div className="table-content">
              <table width="100%">
                <colgroup>
                  <col style={{ width: '30%' }} />
                  <col style={{ width: '35%' }} />
                  <col style={{ width: '35%' }} />
                </colgroup>
                <tbody>
                  <tr className="table-header">
                    <td>技术数据</td>
                    <td>
                      <a
                        href="javascript:;"
                        onClick={() => {
                          this.handleClick(0)
                        }}
                      >
                        {current.cayenne}
                        <img
                          src={require('../../assets/select-icon.png')}
                          alt=""
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        href="javascript:;"
                        onClick={() => {
                          this.handleClick(1)
                        }}
                      >
                        {current.cpt}
                        <img
                          src={require('../../assets/select-icon.png')}
                          alt=""
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>价格</td>
                    <td dangerouslySetInnerHTML={{ __html: model[0] }} />
                    <td dangerouslySetInnerHTML={{ __html: cpt[0] }} />
                  </tr>
                  <tr>
                    <td>车长</td>
                    <td>{model[1]}</td>
                    <td>{cpt[1]}</td>
                  </tr>
                  <tr>
                    <td>车宽</td>
                    <td>{model[2]}</td>
                    <td>{cpt[2]}</td>
                  </tr>
                  <tr>
                    <td>车高</td>
                    <td>{model[3]}</td>
                    <td>{cpt[3]}</td>
                  </tr>
                  <tr>
                    <td>轴距</td>
                    <td>{model[4]}</td>
                    <td>{cpt[4]}</td>
                  </tr>
                  <tr>
                    <td>风阻系数</td>
                    <td>{model[5]}</td>
                    <td>{cpt[5]}</td>
                  </tr>
                  <tr>
                    <td>
                      气缸布置<br />形式/气缸数
                    </td>
                    <td>{model[6]}</td>
                    <td>{cpt[6]}</td>
                  </tr>
                  <tr>
                    <td>排量</td>
                    <td>{model[7]}</td>
                    <td>{cpt[7]}</td>
                  </tr>
                  <tr>
                    <td>
                      发动机位置/<br />驱动形式
                    </td>
                    <td dangerouslySetInnerHTML={{ __html: model[8] }} />
                    <td dangerouslySetInnerHTML={{ __html: cpt[8] }} />
                  </tr>
                  <tr>
                    <td>功率</td>
                    <td>{model[9]}</td>
                    <td>{cpt[9]}</td>
                  </tr>
                  <tr>
                    <td>最大扭矩 (Nm) /对应转速</td>
                    <td dangerouslySetInnerHTML={{ __html: model[10] }} />
                    <td dangerouslySetInnerHTML={{ __html: cpt[10] }} />
                  </tr>
                  <tr>
                    <td>最高时速</td>
                    <td>{model[11]}</td>
                    <td>{cpt[11]}</td>
                  </tr>
                  <tr>
                    <td>
                      0-100 km/h <br />加速时间
                    </td>
                    <td>{model[12]}</td>
                    <td>{cpt[12]}</td>
                  </tr>
                  <tr>
                    <td>
                      0-160 km/h <br />加速时间
                    </td>
                    <td>{model[13]}</td>
                    <td>{cpt[13]}</td>
                  </tr>
                  <tr>
                    <td>
                      80-120 km/h <br />中间加速时间
                    </td>
                    <td>{model[14]}</td>
                    <td>{cpt[14]}</td>
                  </tr>
                  <tr>
                    <td>变速箱</td>
                    <td dangerouslySetInnerHTML={{ __html: model[15] }} />
                    <td>{cpt[15]}</td>
                  </tr>
                  <tr>
                    <td>
                      空载重量<br />(中国)
                    </td>
                    <td>{model[16]}</td>
                    <td>{cpt[16]}</td>
                  </tr>
                  <tr>
                    <td>行李箱容积</td>
                    <td>{model[17]}</td>
                    <td>{cpt[17]}</td>
                  </tr>
                  <tr>
                    <td>油箱</td>
                    <td>{model[18]}</td>
                    <td>{cpt[18]}</td>
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

export default connect()(Competition)
