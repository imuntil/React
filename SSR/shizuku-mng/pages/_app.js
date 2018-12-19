import App, { Container, Head } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '../store'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="//at.alicdn.com/t/font_722986_dxbjue2u6ec.css"
          />
        </Head>
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </div>
    )
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp))
