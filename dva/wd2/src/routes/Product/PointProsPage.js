import React, {PureComponent} from 'react'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim'
import ProGrid from '@/components/ProGrid'
import './PointProsPage.scss'

@connect()
export default class PointPros extends PureComponent {
  render() {
    const list = Array(10).fill('').map(v => ({
      price: '0',
      en: '积分礼品',
      cn: '',
      src: '',
      id: Math.floor(Math.random() * 100 + 200)
    }))
    return <div className="pp-12d9f">
      <QueueAnim className="content-12d9f">
        {
          list.map((v, i) => (
            <ProGrid className="grid-12d9f" key={i} {...v}></ProGrid>
          ))
        }
      </QueueAnim>
    </div>
  }
}