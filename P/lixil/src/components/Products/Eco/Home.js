import React from 'react'
import './Home.css'

class ProEcoHome extends React.Component {
  video = null
  constructor () {
    super()
    this.state = {
      playing: false
    }
    this.handleVideoPlay = this.handleVideoPlay.bind(this)
    this.handleVideoEnd = this.handleVideoEnd.bind(this)
  }
  handleVideoPlay () {
    this.setState({
      playing: true
    })
  }
  handleVideoEnd () {
    this.setState({
      playing: false
    })
  }
  handleClickBtn () {
    this.video.play()
  }
  render () {
    const {playing} = this.state
    return (
      <div className="pro-eco-home common-section">
        <div className="video-box">
          <video ref={video => this.video = video}
                 onPlay={this.handleVideoPlay}
                 onEnded={this.handleVideoEnd}
                 src="http://api.jtuntech.com/event/2017/Q2/lixil/case/eco/eco.mp4" controls />
          {
            playing
              ? null
              : (
                <div>
                  <img className="poster" src={require('../../../assets/product/company-video.jpg')} alt=""/>
                  <a href="javascript:;" onClick={this.handleClickBtn.bind(this)}>
                    <img width="100%" src={require('../../../assets/icon/video-btn.png')} alt=""/>
                  </a>
                </div>
            )
          }
        </div>
        <p>伊康家产品介绍</p>
      </div>
    )
  }
}
export default ProEcoHome