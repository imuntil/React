import React, { Component } from 'react'
import { connect } from 'dva'
import { SwipeAction, Toast } from 'antd-mobile'
import { TransitionMotion, presets, spring } from 'react-motion'
import ListCell from '@/components/ListCell'
import Loading from '@/components/Common/Loading'
import add2Cart_buyNow from '@/components/HOC/add2Cart_buyNow'
import './CollectionPage.scss'

const mapStateToProps = state => {
  const { col, loading, product, user } = state
  return { col, loading: loading.models.col, product, isLogin: !!user.phone }
}

const setStyle = (maxHeight, marginBottom, opacity) => ({
  maxHeight,
  marginBottom,
  opacity
})

class CollectionPage extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      col: { expired },
      product: { list }
    } = nextProps
    if (expired || !list.length) return false
    return true
  }

  handleDelete = async proID => {
    await this.props.dispatch({
      type: 'col/toggleServerLike',
      payload: { proID, status: true }
    })
    Toast.success('已取消收藏', 1)
  }

  getDefaultStyle = () => {
    return this.props.col.list.map(v => ({
      key: v,
      style: setStyle(0, 0, 0)
    }))
  }

  getStyles = () => {
    return this.props.col.list.map(v => ({
      key: v,
      style: setStyle(
        spring(180, presets.gentle),
        spring(15, presets.gentle),
        spring(1, presets.gentle)
      )
    }))
  }

  willEnter() {
    return setStyle(0, 0, 0)
  }

  willLeave() {
    return setStyle(spring(0), spring(0), spring(0))
  }

  render() {
    const {
      col: { expired },
      loading,
      product: { dic, list },
      addToCart,
      buyNow
    } = this.props
    return (
      <div className="container col-29kdp">
        {!expired ? (
          <div className="content-29kdp">
            <TransitionMotion
              defaultStyles={this.getDefaultStyle()}
              styles={this.getStyles()}
              willLeave={this.willLeave}
              willEnter={this.willEnter}
            >
              {styles => (
                <div className="scroll-box">
                  {styles.map(({ data, key, style }, index) => (
                    <div key={key} style={style}>
                      <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        className="cel-29kdp"
                        right={[
                          {
                            text: '删除',
                            onPress: () => this.handleDelete(key),
                            style: {
                              backgroundColor: '#e41035',
                              color: 'white'
                            }
                          }
                        ]}
                      >
                        <ListCell
                          pro={dic[key]}
                          onCartClick={addToCart}
                          onBuyClick={buyNow}
                        />
                      </SwipeAction>
                    </div>
                  ))}
                </div>
              )}
            </TransitionMotion>
          </div>
        ) : null}
        {loading ? <Loading /> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps)(add2Cart_buyNow(CollectionPage))
