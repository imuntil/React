import React from 'react'
import PropTypes from 'prop-types'
import { selectReddit, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  handleChange (nextReddit) {
    this.props.selectReddit(nextReddit)
  }
  handleRefreshClick (e) {
    e.preventDefault()
    const { selectedReddit, invalidateReddit } = this.props
    invalidateReddit(selectedReddit)
  }

  render () {
    const {
      selectedReddit,
      posts,
      isFetching,
      lastUpdated
    } = this.props
    return (
      <div>
        <Picker value={selectedReddit}
                options={['reactjs', 'frontend']}
                onChange={this.handleChange} />
        <p>
          {
            lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {'   '}
            </span>
          }
          {
            !isFetching && <a href="#"
                              onClick={this.handleRefreshClick} >Refresh</a>
          }
        </p>
        {
          isFetching && posts.length === 0 &&
          <h2>Loading</h2>
        }
        {
          !isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {
          posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }
  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}
function mapDispatchToProps(dispatch) {
  return {
    selectReddit: reddit => dispatch(selectReddit(reddit)),
    invalidateReddit: reddit => dispatch(invalidateReddit(reddit))
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App