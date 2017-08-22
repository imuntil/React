import React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import LetsGo from '../components/LetsGo/LetsGo'
import Loading from '../components/LetsGo/Loading'
import Over18 from '../components/LetsGo/Over18'
import GameGuide from '../components/LetsGo/GameGuide'
import FadeInOut from '../components/Animation/FadeInOut'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

class P1 extends React.Component {
  componentWillMount () {
    // const { location, dispatch } = this.props
    // if (location.action === 'POP') {
    //   dispatch({
    //     type: 'page/next',
    //     payload: 0
    //   })
    // }
  }
  nextLayer(layer) {
    const { dispatch } = this.props
    dispatch({
      type: 'page/next',
      payload: layer
    })
  }
  nextPage(layer) {
    const { dispatch } = this.props
    dispatch(routerRedux.push({
      pathname: '/p2'
    }))
    dispatch({
      type: 'page/next',
      payload: layer
    })
  }
  toRender() {
    const {current} = this.props
    switch (current) {
      case 0:
        return <LetsGo letsGo={this.nextLayer.bind(this, 1)} />
      case 1:
        return <Loading onLoadingEnd={this.nextLayer.bind(this, 2)} />
      case 2:
        return <Over18 onYes={this.nextLayer.bind(this, 3)} />
      case 3:
        return <GameGuide onStart={this.nextPage.bind(this, 4)} />
      default:
        return <div>no more</div>
    }
  }
  render () {
    const { current } = this.props
    return (
      <FadeInOut>
        <MainLayout>
          <FadeInOut>
            <div key={current} style={{position: 'absolute', height: '100%', width: '100%'}}>
              {
                this.toRender()
              }
            </div>
          </FadeInOut>
        </MainLayout>
      </FadeInOut>
    )
  }
}
function mapStateToProps(state) {
  const { current } = state.page
  return { current }
}
export default connect(mapStateToProps)(P1)
