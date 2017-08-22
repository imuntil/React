import React from 'react'
import Title from '../components/Title'

function About() {
  return (
    <div className="j-about" style={{paddingBottom: '2rem'}}>
      <div className="row">
        <Title>
          <img src={require('../assets/company-intro-title.png')} alt=""/>
        </Title>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="col-md-5 col-md-offset-7 col-sm-7 col-sm-offset-5 col-xs-10 col-xs-offset-1">
            <img src={require('../assets/about-company.jpg')} alt=""/>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12 right">
          <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-10 col-xs-offset-1">
            <p>公司名称: 苏州滨松智能科技有限公司</p>
            <p>地址：苏州市吴中区木渎镇金枫路264号领峰商务广场1幢2422室 </p>
            <p>成立日期：2016年12月</p>
            <p>电话：0512-69203338</p>
            <p>传真：0512-68710908</p>
            <p>总经理：钱秀花</p>
            <p>经营产品：工业机器人，自动化设备，自动化技术咨询</p>
          </div>
        </div>
      </div>
      <div className="row">
        <Title>
          <img src={require('../assets/operation-policy-title.png')} alt=""/>
        </Title>
        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
          <div className="row" style={{marginBottom: '.5rem'}}>
            <div className="col-md-5 right">
              <p>依靠日本先进的生产技术，</p>
              <p>提供高质量的自动化设备、</p>
              <p>工业机器人、周边机器，</p>
              <p>为客户的生产自动化做出有力贡献。</p>
            </div>
            <div className="col-md-7">
              <img src={require('../assets/op-1.jpg')} alt=""/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <img src={require('../assets/op-4.jpg')} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About