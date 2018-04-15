import React from 'react'
import ProGrid from './ProGrid'
import { SA } from '@/services'
import './RecommendPro.scss'

export default ({ title, pros, className = '', gridClass = '' }) => {
  return (
    <section className={`recommend-29sdj ${className}`}>
      <h2 className="section-titles">{title}</h2>
      <div>
        {pros.map((v = {}) => (
          <ProGrid
            className={`recommend-pro ${gridClass}`}
            src={`${SA}${v.image1}`}
            price={v.proprice}
            en={v.englishname}
            cn={v.proname}
            key={v.id}
            id={v.id}
          />
        ))}
      </div>
    </section>
  )
}
