import React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import FadeInOut from '../components/Animation/FadeInOut'
import Form from '../components/End/Form'
import { connect } from 'dva'

function P3({current, dispatch, location, history, match}) {
  function handleSubmit() {
    dispatch({
      type: 'page/next',
      payload: current + 1
    })
  }
  return (
    <FadeInOut>
      <MainLayout>
        <FadeInOut>
          <Form onSubmit={handleSubmit} />
        </FadeInOut>
      </MainLayout>
    </FadeInOut>
  )
}
function mapStateToProps(state) {
  const { current } = state.page
  return { current }
}
export default connect(mapStateToProps)(P3)
