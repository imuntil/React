import React from 'react'
import Box from '../components/Title'
import SubSlick from '../components/SubSlick'
import * as sim from '../lib/simulateData'
import styles from './Products.less'

function Products() {
  return (
    <div className="row">
      <Box>
        <img src={require('../assets/product-page-title.png')} alt=""/>
        <p className={styles.t1}>水平多关节机器人</p>
        <SubSlick source={sim.sps} />
        <p className={styles.t2}>直交型机器人</p>
        <SubSlick source={sim.gxs} />
        <p className={styles.t3}>单轴机器人</p>
        <SubSlick source={sim.dzs} />
        <p className={styles.t4}>高性能控制器</p>
        <SubSlick source={sim.zjs} />
      </Box>
    </div>
  )
}

export default Products