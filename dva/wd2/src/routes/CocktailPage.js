import React from 'react'
import { connect } from 'dva'
import QueueAnim from 'rc-queue-anim'
import './CocktailPage.scss'
import CocktailGrid from '../components/CocktailGrid'
import { cocktails } from '@/services/config'

const CocktailPage = () => {
  return (
    <div className="container cocktail-page-slq0v">
      <QueueAnim className="cocktail-content-slq0v">
        {cocktails.map(v => (
          <CocktailGrid
            className="cocktail-item-slq0v"
            src={v.src}
            cn={v.cn}
            en={v.en}
            more
            key={v.key}
            to={v.link}
          />
        ))}
      </QueueAnim>
    </div>
  )
}

export default connect()(CocktailPage)
