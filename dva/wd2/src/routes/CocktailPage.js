import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import './CocktailPage.scss'
import CocktailGrid from '../components/CocktailGrid'

const CocktailPage = () => {
  return (
    <div className="container cocktail-page-slq0v">
      <QueueAnim className="cocktail-content-slq0v">
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-1.jpg')}
          cn="NEGRONI"
          en="内格罗尼"
          more
          key={0}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-2.jpg')}
          cn="AMERICANO"
          en="美国佬"
          more
          key={1}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-3.jpg')}
          cn="APEROL SPRITZ"
          en="阿佩罗橙色气泡"
          more
          key={2}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-4.jpg')}
          cn="SWEET CAJUN"
          en="甜蜜的后裔"
          more
          key={3}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-5.jpg')}
          cn="SKYY PASSION PLAY"
          en="激情游戏"
          more
          key={4}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-6.jpg')}
          cn="GRAND MARGARITA"
          en="了不起的玛格丽特"
          more
          key={5}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-7.jpg')}
          cn="APEROL SPRITZ FLOAT"
          en="阿佩罗漂流"
          more
          key={6}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-8.jpg')}
          cn="URBAN APEROL SPRITZ"
          en="上东区阿佩罗"
          more
          key={7}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-9.jpg')}
          cn="POPCORN NEGRONI"
          en="爆米花内格罗尼"
          more
          key={8}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-10.jpg')}
          cn="C & C SPRITZ"
          en="C C 女郎 "
          more
          key={9}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-11.jpg')}
          cn="PINKY PRETTY "
          en="柚子系"
          more
          key={10}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-12.jpg')}
          cn="PINE BITTER PUNCH"
          en="黑凤梨"
          more
          key={11}
        />
        <CocktailGrid
          className="cocktail-item-slq0v"
          src={require('../assets/cocktail/cocktail-13.jpg')}
          cn="FRUITY AMERICANO"
          en="恋爱中的美国佬"
          more
          key={12}
        />
      </QueueAnim>
    </div>
  )
}

export default connect()(CocktailPage)
