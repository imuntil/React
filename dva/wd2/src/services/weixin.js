import wx from 'weixin-js-sdk'
import fetch from '../utils/request'

const ready = async () => {
  const { data, err } = await fetch(
    'http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config'
  )
  if (err) return err
  wx.config({
    debug: false,
    appId: data.AppId,
    timestamp: data.Stamp,
    nonceStr: data.NonceStr,
    signature: data.Signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
      // 'onMenuShareQQ',
      // 'onMenuShareWeibo',
      // 'onMenuShareQZone',
      // 'startRecord',
      // 'stopRecord',
      // 'onVoiceRecordEnd',
      // 'playVoice',
      // 'pauseVoice',
      // 'stopVoice',
      // 'onVoicePlayEnd',
      // 'downloadVoice',
      // 'chooseImage',
      // 'previewImage',
      // 'uploadImage',
      // 'downloadImage',
      // 'translateVoice',
      // 'getLocation',
      // 'hideOptionMenu',
      // 'showOptionMenu',
      // 'openLocation',
      // 'hideMenuItems',
      // 'showMenuItems',
      // 'hideAllNonBaseMenuItem',
      // 'showAllNonBaseMenuItem',
      // 'closeWindow',
      // 'scanQRCode',
      // 'chooseWXPay'
      // 'openProductSpecificView',
      // 'addCard',
      // 'chooseCard'
    ]
  })
  wx.ready(() => {
    return true
  })
  wx.error(() => {
    return false
  })
}

export default class Wx {
  static content = {}

  /**
   * 分享到朋友圈
   * @param {object} content title.desc.link.imgUrl
   */
  static shareTimeLine(content = {}) {
    return new Promise((resolve, reject) => {
      const ct = { ...Wx.content, ...content }
      wx.onMenuShareTimeline({
        success: resolve,
        cancel: reject,
        ...ct
      })
    })
  }

  /**
   * 分享给好友
   * @param {object} content title.desc.link.imgUrl
   */
  static shareAppMessage(content = {}) {
    return new Promise((resolve, reject) => {
      const ct = { ...Wx.content, ...content }
      wx.onMenuShareAppMessage({
        type: 'link',
        dataUrl: '',
        success: resolve,
        cancel: reject,
        ...ct
      })
    })
  }

  /**
   * 微信支付（公众号支付）
   */
  static chooseWXPay() {
    return Promise((resolve, reject) => {
      wx.chooseWXPay({ success: resolve })
    })
  }

  /**
   * 默认分享
   * @param {object} content
   */
  static defaultShare(content = {}) {
    Wx.content = { ...Wx.content, ...content }
    Wx.shareAppMessage()
    Wx.shareTimeLine()
  }

  /**
   * 调用微信内置地图
   * @param {object} location
   * latitude longitude name? address? scale? infoUrl?
   */
  static openLocation(location = {}) {
    wx.openLocation({ scale: 15, ...location })
  }

  static wxReady() {
    ready()
      .then(res => {
        res && console.log('ready')
      })
      .catch(e => console.log(e))
  }
}
