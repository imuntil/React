import React from 'react'

export const user = {
  info: {}
}

export const UserContext = React.createContext({
  ...user,
  login: () => {},
  logout: () => {}
})