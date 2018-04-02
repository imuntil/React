import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { SA } from '@/services'
import { drinks, mustLike } from '@/services/config'
import { currency } from '@/utils/cts'
import ProGrid from '@/components/ProGrid'
import './ProDetailPage.scss'

const Like = ({ like }) => {
  return (
    <a href="javascript:;" className={`like-btn-u10n1`}>
      {!like ? (
        <img src={require('@/assets/not-like.png')} alt="" />
      ) : (
        <img src={require('@/assets/like.png')} alt="" />
      )}
    </a>
  )
}

const MoreInfo = ({ alcoholic, origin, type, weight, method }) => {
  return (
    <div className="more-msg-u10n1">
      <p>酒精度: {alcoholic}%</p>
      <p>来自: {origin}</p>
      <p>类别: {type}</p>
      <p>重量: {weight}g</p>
      <p>引用方式: {method}</p>
    </div>
  )
}

const AfterService = ({ more }) => {
  return (
    <section className="after-service-u10n1">
      <h2 className="section-titles">配送及售后说明</h2>
      <ul>
        <li>
          关于图片：店内商品均为实物拍摄，由于显示器的不同可能会出现一些色差，请以实物为准
          <img src={require('@/assets/detail-sign.jpg')} alt="" />
        </li>
        <li>
          购买须知：配送地位于极端寒冷天气地域范围的，购买前请咨询客服人员
        </li>
        <li>
          包裹拆分：因为产品和订单较大，遇到系统拆单情况，可能需要您签收多次包裹，给您带来的不便敬请谅解
        </li>
        {more ? (
          <div>
            <li>
              快递须知：本店默认发圆通快递，不支持买家指定。如圆通不到您指定的区域，请咨询客服人员。每天16:30前的订单正常情况当天发出，余下订单会在24小时内发出
            </li>
            <li>发货范围：全国可送（不含港澳台地区）</li>
            <li>
              破损情况：本店出售商品在签收是发现有破损情况，请及时与客服联系，经核实确认后我们会给您尽快补发。请放心购买。
            </li>
            <li>商品退换：该商品不支持七天无理由退换</li>
            <li>
              开票须知：如需开具发票，请在收到宝贝7天后，联系客服提交开票申请及要求。发票将在2个工作日内为您开具。
            </li>
          </div>
        ) : null}
      </ul>
    </section>
  )
}

const Susume = ({ title }) => {
  return (
    <section className="susume-u10n1">
      <h2 className="section-titles">{title}</h2>
      <div>
        {/* <ProGrid></ProGrid> */}
      </div>
    </section>
  )
}

class ProDetailPage extends PureComponent {
  componentWillMount = () => {
    const { dic, match: { params: { id } }, dispatch } = this.props
    if (!dic[id]) {
      dispatch({ type: 'product/fetch' })
    }
  }

  render() {
    const { dic, match: { params: { id } } } = this.props
    const d = dic[id]
    return d ? (
      <div className="container detail-page-u10n1">
        <section className="top">
          <img src={`${SA}${d.image1}`} alt="" className="poster-u10n1" />
          <div className="short-msg-u10n1">
            <div>
              <p>{d.englishname}</p>
              <p>{d.proname}</p>
              <p>{d.procontent}ml</p>
              <p className="last-u10n1 color--red">{currency(d.proprice)}</p>
            </div>
            <Like like={false} />
          </div>
          <p className="separator-u10n1" />
          <MoreInfo
            alcoholic={d.proalcoholic}
            origin={d.proarea}
            type={drinks[d.prolabel]}
            weight={d.proweight}
            method={d.drnk}
          />
        </section>
        <section
          className="rich-words-u10n1"
          dangerouslySetInnerHTML={{ __html: d.prodes }}
        />
        <AfterService more />
        <Susume title={'猜你喜欢'} />
        <Susume title={'一定喜欢'} />
      </div>
    ) : (
      <p>loading</p>
    )
  }
}

function mapStateToProps(state) {
  const { dic } = state.product
  return { dic }
}

export default connect(mapStateToProps)(ProDetailPage)
