import * as React from 'react'

export type eventHandler = (value: number, method: '-' | '+') => void

export interface CountProps {
  count: number
  onChange: eventHandler
  step: number
}

class Count extends React.Component<CountProps, any> {
  plus = () => {
    const { onChange, count, step } = this.props
    onChange(count + step, '+')
  }

  minus = () => {
    const { onChange, count, step } = this.props
    onChange(count - step, '-')
  }

  render() {
    return (
      <div className='counter'>
        <button className='plus' onClick={this.plus}>+</button>
        <span className='count'>{this.props.count}</span>
        <button className='minus' onClick={this.minus}>-</button>
      </div>
    )
  }
}

export default Count
