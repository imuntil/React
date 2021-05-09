import * as React from 'react'

export const App: React.FC<{ title: string }> = ({ title }) => {
  return React.useMemo(() => <div>{title}</div>, [title])
}

App.defaultProps = {
  title: 'Function Component',
}
