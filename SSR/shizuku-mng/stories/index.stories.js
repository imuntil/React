import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import Drag from '../containers/Drag'
import DndBoardCt from '../containers/DndBoardCt'
import DndItem from '../components/DndItem'

import { Button as Btn } from 'antd'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
storiesOf('Drag', module).add('default', () => <Drag />)
storiesOf('Dnd', module).add('test', () => <DndBoardCt />)
storiesOf('Dnd-items', module).add('item', () => (
  <DndItem name="兔女郎学姐" from="bilibili" />
))

storiesOf('antd', module).add('btn', () => <Btn type="primary">ceshi</Btn>)
