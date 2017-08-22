export default function reducer(state, action) {
  if (!state) {
    return []
  }
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user]
    case 'DELETE_USER':
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
    case 'UPDATE_USER':
      return [
        ...state.slice(0, action.index),
        {...state[action.index], ...action.user },
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}