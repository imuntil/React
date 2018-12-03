import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'
import Button from '../components/Button'
import SearchBar from '../components/SearchBar'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ))
storiesOf('Button', module).add('with text', () => <Button text={'lala'} />)

storiesOf('SearchBar', module).add('default', () => (
  <SearchBar
    typeOptions={['动画', '季度全集', 'RAW']}
    subOptions={['动漫国字幕组', '诸神Kamigami字幕组', '悠哈C9字幕社']}
    onChange={(type, v) => {
      console.log(type, v)
    }}
    onSearch={() => console.log('search')}
    onFilter={() => console.log('filter')}
  />
))
