import React from 'react'
import { Tabs } from 'antd'
const Tabpane = Tabs.TabPane
import SubSlick from './SubSlick'
import Title from './Title'
import './Products.less'
import * as sim from '../lib/simulateData'

class Products extends React.Component {
  render () {
    return (
      <div className="row">
        <Title>
          <img src={require('../assets/products-title.png')} alt=""/>
        </Title>
        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
          <Tabs>
            <Tabpane tab="水平多关节机器人" key="1">
              <SubSlick source={sim.sps} />
            </Tabpane>
            <Tabpane tab="直交型机器人" key="2">
              <SubSlick source={sim.zjs} />
            </Tabpane>
            <Tabpane tab="单轴机器人" key="3">
              <SubSlick source={sim.dzs} />
            </Tabpane>
            <Tabpane tab="高性能机器人" key="4">
              <SubSlick source={sim.gxs} />
            </Tabpane>
          </Tabs>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12 common-btn-parent">
          <a href="javascript:;" className="common-btn">查看更多</a>
        </div>
      </div>
    )
  }
}
export default Products