import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import style from './Container.css';

export default class Container extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    // document.body.style.margin = '0px'
    // // 这是防止页面被拖拽
    // document.body.addEventListener('touchmove', (ev) => {
    //   ev.preventDefault();
    // })
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName='transitionWrapper'
        component='div'
        // className={style.transitionWrapper}
        transitionEnterTimeout={5000}
        transitionLeaveTimeout={3000}>
        <div
          key={this.props.location.pathname} style={{position:'absolute', width: '100%'}}>
          {
            this.props.children
          }
        </div>
      </ReactCSSTransitionGroup>
    )
  }

}