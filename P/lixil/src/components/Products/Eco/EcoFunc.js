import React from 'react'
import FuncIntro from '../FuncIntro'

function EcoFunc() {
  const tabs = ['伊康家的奥秘', '湿度问题', '异味', '有害物质', '日常生活的污渍']
  const images = [
    require('../../../assets/product/eco/eco-func-0.jpg'),
    require('../../../assets/product/eco/eco-func-1.jpg'),
    require('../../../assets/product/eco/eco-func-2.jpg'),
    require('../../../assets/product/eco/eco-func-3.jpg'),
    require('../../../assets/product/eco/eco-func-4.jpg')
  ]
  return (
    <FuncIntro images={images} tabs={tabs} />
  )
}

export default EcoFunc