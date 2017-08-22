import React from 'react'
import styles from './About.less'

function About() {
  return (
    <div className={styles.j_about}>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="col-md-5 col-md-offset-7 col-sm-7 col-sm-offset-5 col-xs-10 col-xs-offset-1">
            <img style={{padding: '1rem 0'}} src={require('../assets/about-company.jpg')} alt=""/>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12 right">
          <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-10 col-xs-offset-1">
            <p className={styles.title}>关于<i>我们</i></p>
            <p>公司名称: 苏州滨松智能科技有限公司</p>
            <p>地址：苏州市吴中区木渎镇金枫路264号领峰商务广场1幢2422室 </p>
            <p>成立日期：2016年12月</p>
            <p>电话：0512-69203338</p>
            <p>传真：0512-68710908</p>
            <p>总经理：钱秀花</p>
            <p>经营产品：工业机器人，自动化设备，自动化技术咨询</p>
            <p className={styles.more}>
              <a href="javascript:;" className="common-btn">查看更多</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About