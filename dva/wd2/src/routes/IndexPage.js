import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon } from 'antd-mobile'
import Susume from '../components/Susume'
import ProGrid from '../components/ProGrid'
import CocktailGrid from '../components/CocktailGrid'
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
            <ProGrid
              className="selling-pro"
              src={require('../assets/home-sellings-2.jpg')}
              content={700}
              price={800}
              en="Glen Grant Single Whiskey Major Reserve"
              cn="格兰冠单一麦芽苏格兰威士忌"
            />
            <ProGrid
              className="selling-pro"
              src={require('../assets/home-sellings-4.jpg')}
              content={700}
              price={300}
              en="Wild Turkey Real Kentucky Straight Bourbon Whiskey"
              cn="威凤凰波本威士忌"
            />
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
          <div className="content">
            <CocktailGrid
              className="cocktail-item"
              src={require('../assets/cocktail/cocktail-1.jpg')}
              cn="NEGRONI"
              en="内格罗尼"
            />
            <CocktailGrid
              className="cocktail-item"
              src={require('../assets/cocktail/cocktail-2.jpg')}
              cn="AMERICANO"
              en="美国佬"
            />
            <CocktailGrid
              className="cocktail-item"
              src={require('../assets/cocktail/cocktail-3.jpg')}
              cn="APEROL SPRITZ"
              en="阿佩罗橙色气泡"
            />
          </div>
        </section>
      </div>
    )
  }
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
