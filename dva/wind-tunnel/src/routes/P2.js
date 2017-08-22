import React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import FadeInOut from '../components/Animation/FadeInOut'
import Game from '../components/Game/Game'
import GameOver from '../components/Game/GameOver'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

function P2({current, dispatch, location, history}) {
  function nextLayer() {
    dispatch({
      type: 'page/next',
      payload: current + 1
    })
  }
  function nextPage() {
    dispatch(routerRedux.push({
      pathname: '/p3'
    }))
    nextLayer()
  }
  // function toRender() {
  //   switch (current) {
  //     case 4:
  //       return <Game onGameOver={nextLayer}/>
  //     case 5:
  //       return <GameOver onGameOver={nextPage} />
  //     default:
  //       return <div>no more</div>
  //   }
  // }
  return (
    <FadeInOut>
      <MainLayout bg2={true}>
        <FadeInOut>
          <div key={current} style={{position: 'absolute', height: '100%', width: '100%'}}>
            <Game onGameOver={nextLayer}/>
            {
              current === 5 && <GameOver onGameOver={nextPage} />
            }
          </div>
        </FadeInOut>
      </MainLayout>
    </FadeInOut>
  )
}

function mapStateToProps(state) {
  const { current } = state.page
  return { current }
}
export default connect(mapStateToProps)(P2)

