import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { TransitionMotion, presets, spring } from 'react-motion'
import './CollectionPage.scss'

@connect()
export default class CollectionPage extends PureComponent {
  state = {
    list: [...Array(10).keys()].map(v => ({ key: `t${v}`, data: v }))
  }

  getDefaultStyle = () => {
    return this.state.list.map(v => ({
      ...v,
      style: { maxHeight: 0, y: 10, x: 20 }
    }))
  }

  getStyles = () => {
    return this.state.list.map(v => ({
      ...v,
      style: {
        maxHeight: spring(50, presets.gentle),
        x: spring(0, presets.gentle),
        y: spring(0, presets.gentle)
      }
    }))
  }

  willEnter() {
    return {
      maxHeight: 0,
      x: 20,
      y: 10
    }
  }

  willLeave() {
    return {
      maxHeight: spring(0),
      x: spring(-20),
      y: spring(10)
    }
  }

  shuttfle = () => {
    const list = [...this.state.list]
    const fourth = list.splice(3, 1)
    list.unshift({ ...fourth[0], key: Math.random().toFixed(6) })
    this.setState({
      list: list
    })
  }

  render() {
    return (
      <div className="container col-29kdp">
        <TransitionMotion
          defaultStyles={this.getDefaultStyle()}
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
          {styles => (
            <ul>
              {/* {this.state.list.map(v => <li key={v}>{v}.XXXXXXXXXXXXXXX</li>)} */}
              {styles.map(({ data, key, style: { x, y, maxHeight } }) => (
                <li
                  key={key}
                  style={{
                    maxHeight,
                    transform: `translate3d(${x}px, ${y}px, 0)`
                  }}
                >
                  {data}.XXXXXXXXXXXX
                </li>
              ))}
            </ul>
          )}
        </TransitionMotion>
        <a href="javascript:;" onClick={this.shuttfle}>
          xx
        </a>
      </div>
    )
  }
}
