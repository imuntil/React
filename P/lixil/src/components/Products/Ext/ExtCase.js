import React from 'react'
import CaseGenerator from '../CaseGenerator'
import Case from '../Case'
import { base, pics, names } from '../../../utils/case-pic'

const ExtCase = CaseGenerator(Case, {
  cases: ['庭院门', '围栏', '车棚', '车库门', '阳光房'],
  images: pics.ext,
  keys: names.ext,
  base
})
export default ExtCase