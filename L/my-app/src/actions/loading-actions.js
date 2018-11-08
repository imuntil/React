export const LOADING_START = 'LOADING_START'
export const loadingStart = name => ({
  type: LOADING_START,
  name
})

export const LOADING_END = 'LOADING_END'
export const loadingEnd = name => ({
  type: LOADING_END,
  name
})
