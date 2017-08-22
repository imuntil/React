import React from 'react'
import CaseGenerator from '../CaseGenerator'
import Case from '../Case'
import { base, pics, names } from '../../../utils/case-pic'

const EcoCase = CaseGenerator(Case, {
  cases:  ['客厅', '玄关', '儿童房', '卧室', '办公室', '卫生间'],
  images: pics.eco,
  keys: names.eco,
  base
})
export default EcoCase