import React from 'react'
import {Col, Row} from 'antd'
import './ProductsLayout.css'
import {NavLink, withRouter} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
function ProductsLayout({location, banner, tabs, routes, custom = ''}) {
  return (
    <div className="products-layout">
      {banner}
      <div className="products-tabs">
        <div className="tab-bar">
          <div className="common-section">
            <Row className={custom}>
              {
                tabs.map((tab, index) => (
                  <Col key={index}
                       className={'tab-btn'}
                       xs={8} sm={4}>
                    <NavLink to={`/products/${tab.path}`} exact activeClassName={'active-link'}>
                      {tab.title}
                    </NavLink>
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'fade-in-left',
            enterActive: 'fade-in-left-active',
            leave: 'fade-out-right',
            leaveActive: 'fade-out-right-active'
          }}
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          component="div"
          className="bar-content"
        >
          <div key={location.pathname}>
            {routes}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    </div>
  )
}
export default withRouter(ProductsLayout)