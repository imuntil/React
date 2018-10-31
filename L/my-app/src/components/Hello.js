import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './Hello.module.scss'

class Hello extends Component {
  state = {
    name: 'Vue'
  }
  handleClick = () => {
    this.setState({
      name: 'React'
    })
  }
  render() {
    return (
      <div styleName="hello">
        <span styleName="asatsu">hello, {this.state.name}</span>
        <button styleName="btn" onClick={this.handleClick}>
          change
        </button>
        <button
          className={styles.btn2}
          onClick={() => this.setState({ name: 'Vue' })}
        >
          re-change
        </button>
      </div>
    )
  }
}

export default cssModules(Hello, styles)
