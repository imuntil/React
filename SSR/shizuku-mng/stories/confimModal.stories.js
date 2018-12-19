import React from 'react'

import { storiesOf } from '@storybook/react'
import ConfirmModal from '../components/ConfirmModal'
import AnimeSimCard from '../components/AnimeSimCard'

const origin = { id: 1, from: 'bangumi', name: '兔女郎学姐', src: 'xx1.png' }
const target = {
  id: 2414,
  from: 'bilibili',
  name: '青春兔女郎学姐',
  src: 'bb1.png'
}
storiesOf('Dnd', module).add('确认框', () => (
  <ConfirmModal
    visible={true}
    handleOk={e => {
      console.log(e)
    }}
    handleCancel={e => {
      console.log('cancel')
    }}
    origin={origin}
    target={target}
  />
))
storiesOf('Dnd', module).add('番剧信息卡片', () => <AnimeSimCard />)
