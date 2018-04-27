import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import Susume from '../components/Susume'
import ProGrid from '../components/ProGrid'
import CocktailGrid from '../components/CocktailGrid'
import { cocktails } from '@/services/config'
import './IndexPage.scss'

class IndexPage extends PureComponent {
  render() {
    return (
      <QueueAnim className="container home-page-kuej8">
        <section className="header" key={0}>
          <h1 className="section-title">
            <p>
              精选指南<br />
              <span>特价福利</span>
            </p>
          </h1>
          <Susume />
        </section>
        <section className="selling" key={1}>
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
            <ProGrid
              className="selling-pro"
              src={require('../assets/home-sellings-2.jpg')}
              content={700}
              price={800}
              en="Glen Grant Single Whiskey Major Reserve"
              cn="格兰冠单一麦芽苏格兰威士忌"
              id={112}
              vHot
            />
            <ProGrid
              className="selling-pro"
              src={require('../assets/home-sellings-4.jpg')}
              content={700}
              price={300}
              en="Wild Turkey Real Kentucky Straight Bourbon Whiskey"
              cn="威凤凰波本威士忌"
              id={110}
              vHot
            />
          </div>
        </section>
        <section className="cocktail" key={2}>
          <h1 className="section-title">
            <p>
              经典鸡尾酒<br />
              <span>详细配方全知道</span>
            </p>
            <a href="javascript:;" className="more">
              查看更多<Icon type="right" />
            </a>
          </h1>
          <div className="content">
            {cocktails
              .slice(0, 3)
              .map(v => (
                <CocktailGrid
                  className="cocktail-item"
                  src={v.src}
                  cn={v.cn}
                  en={v.en}
                  more
                  key={v.key}
                  to={v.link}
                />
              ))}
          </div>
        </section>
      </QueueAnim>
    )
  }
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
