import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TestActions from '../actions/index'

function List({test, loading, actions}) {
  function handleClick() {
    actions.fetchDatas()
  }
  return (
    <div>
      <ul>
        {
          test.map((item, index) => (
            <li key={index}>{item.title} - {item.date}</li>
          ))
        }
      </ul>
      <a onClick={handleClick} href="javascript:;">fetch</a>
    </div>
  )
}

const mapStateToProps = state => ({
  test: state.test,
  loading: state.loading
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TestActions, dispatch)
})
List = connect(mapStateToProps, mapDispatchToProps)(List)
export default List