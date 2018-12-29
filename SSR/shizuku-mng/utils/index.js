import { whyDidYouUpdate } from 'why-did-you-update'

export const wdyu = React => {
  if (process.env.NODE_ENV !== 'production') {
    whyDidYouUpdate(React)
  }
}

// export mergeStragegy = () => {}