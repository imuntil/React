import React from 'react'
import { Link } from 'dva/router'
import './AdrChosen.scss'

export default ({ adr = {} }) => {
  return (
    <section className="adr-box-d820s">
      <div className="content">
        <p>收货人</p>
        <p>
          <span>姓&nbsp;&nbsp;名:&nbsp;{adr.name}</span>
          <span>手机号:&nbsp;{adr.phone}</span>
        </p>
        <p>
          <span>
            地&nbsp;&nbsp;址:&nbsp;{adr.city}
            {adr.address}
          </span>
        </p>
        <p>
          <Link to={`/adr${adr.id ? `?id=${adr.id}` : ''}`}>编辑></Link>
        </p>
      </div>
    </section>
  )
}