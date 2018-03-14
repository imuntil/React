import React from 'react'
import { connect } from 'dva'
import TopBanner from '@/components/TopBanner'
import QueueAnim from 'rc-queue-anim'
import './Notice.scss'

const Notice = () => {
  function openMap(index) {
    console.log(index)
  }
  return (
    <div className="container notice-8u3j9d">
      <div className="main-body flex gray">
        <TopBanner title="活动现场及注意事项" type>
          <img
            src={require('../../../assets/tr/notice-title.jpg')}
            width="100%"
            alt=""
          />
        </TopBanner>
        <QueueAnim className="content-area">
          <div className="section" key={0}>
            <p className="theme">1. 基本信息</p>
            <p className="text">
              本次全新Cayenne上市培训将于2018年3月28日起，于上海保时捷体验中心举行。
            </p>
          </div>
          <div className="section" key={1}>
            <p className="theme">2. 出行清单</p>
            <p className="text">请做好以下出行准备，以确保湖州之行顺利圆满：</p>
            <p className="text">>随身携带有效身份证件</p>
            <p className="text">>随身携带有效期内的驾照</p>
            <p className="text">>试驾期间不可饮酒</p>
          </div>
          <div className="section" key={2}>
            <p className="theme">3. 着装要求</p>
            <p className="text">
              在上海保时捷体验中心参加培训时，请穿着商务正装出席，以正式场合接待客户的着装要求为标准；在参与试驾活动时，请穿着舒适且利于驾驶的平底鞋。不可穿拖鞋，女士请勿穿任何形式的高跟鞋。
            </p>
          </div>
          <div className="section" key={3}>
            <p className="theme">4. 个人物品</p>
            <p className="text">
              请将您的贵重物品、公司数据和文件放置在酒店房间的保险箱内。
            </p>
          </div>
          <div className="section" key={4}>
            <p className="theme">5. 网络连接</p>
            <p className="text">培训教室将提供无线网络连接。</p>
          </div>
          <div className="section" key={5}>
            <p className="theme">6. 场地地图导航</p>
            <p className="text">>培训场地——上海保时捷体验中心:</p>
            <p className="text text--center">
              <img
                src={require('../../../assets/map1.png')}
                width="100%"
                alt=""
                onClick={() => {
                  openMap(0)
                }}
              />
              地址：上海市嘉定区伊宁路 2000 号
            </p>
          </div>
          <div className="section" key={6}>
            <p className="theme">7.入住酒店信息</p>
            <p className="text">>本次培训期间入住酒店为嘉定颖奕皇冠假日酒店:</p>
            <p className="text text--center">
              <img
                src={require('../../../assets/map2.png')}
                width="100%"
                alt=""
                onClick={() => {
                  openMap(1)
                }}
              />
              地址：上海市嘉定区博园路 6555 号
            </p>
          </div>
        </QueueAnim>
      </div>
    </div>
  )
}

export default connect()(Notice)
