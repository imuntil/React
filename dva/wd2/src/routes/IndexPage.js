import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon } from 'antd-mobile'
import Susume from '../components/Susume'
import ProGrid from '../components/ProGrid'
import './IndexPage.scss'

class IndexPage extends Component {
  render() {
    return (
      <div className="container home-page-kuej8">
        <section className="header">
          <h1 className="section-title">
            <p>
              精选指南<br />
              <span>特价福利</span>
            </p>
          </h1>
          <Susume />
        </section>
        <section className="selling">
          <h1 className="section-title">
            <p>
              热卖排行 <br />
              <span>大家都在买什么</span>
            </p>
            <a href="javascript:;" className="more">
              查看更多 <Icon type="right" />
            </a>
          </h1>
          <div className="content">
            <ProGrid className="selling-pro" />
            <ProGrid className="selling-pro" />
          </div>
        </section>
        <section className="cocktail">
          <h1 className="section-title">
            <p>
              经典鸡尾酒<br />
              <span>详细配方全知道</span>
            </p>
            <a href="javascript:;" className="more">
              查看更多<Icon type="right" />
            </a>
          </h1>
        </section>
      </div>
    )
  }
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
