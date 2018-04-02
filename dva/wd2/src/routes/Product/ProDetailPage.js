import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { SA } from '@/services'
import { currency } from '@/utils/cts'
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
          <div className="more-msg-u10n1">
            p
          </div>
        </section>
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
