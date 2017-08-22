import React from 'react'

export default (CaseComponent, {cases, images, keys, base}) => {
  class NewComponent extends React.Component {
    constructor () {
      super()
      this.state = {
        groupIndex: 0,
        currentIndex: 0,
        hdLoading: true
      }
      this.handleGroupChange = this.handleGroupChange.bind(this)
      this.handleSlickChange = this.handleSlickChange.bind(this)
      this.handleHdLoaded = this.handleHdLoaded.bind(this)
    }
    handleGroupChange (index) {
      this.setState({
        groupIndex: index,
        currentIndex: 0,
        hdLoading: true
      })
    }
    handleSlickChange (index) {
      let {currentIndex} = this.state
      if (index === currentIndex) return
      this.setState({
        currentIndex: index,
        hdLoading: true
      })
    }
    handleHdLoaded () {
      this.setState({
        hdLoading: false
      })
    }
    render () {
      const {groupIndex, currentIndex, hdLoading} = this.state
      const currentGroup = images[keys[groupIndex]]
      const HDImg = currentGroup[currentIndex].big
      const thumbs = currentGroup.map(k => k.thumb)
      const props = {
        base,
        cases,
        thumbs,
        groupIndex,
        currentIndex,
        HDImg,
        hdLoading,
        onGroupChange: this.handleGroupChange,
        onSlickChange: this.handleSlickChange,
        onHdLoaded: this.handleHdLoaded
      }
      return <CaseComponent {...props} />
    }
  }
  return NewComponent
}