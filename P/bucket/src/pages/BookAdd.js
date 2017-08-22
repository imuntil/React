import React from 'react'
import BookEditor from '../components/BookEditor'
import { connect } from 'react-redux'
import { addBook } from '../reducers/book'

class BookAdd extends React.Component {
  render () {
    return (
      <BookEditor {...this.props} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBook: values => dispatch(addBook(values))
  }
}
BookAdd = connect(null, mapDispatchToProps)(BookAdd)
export default BookAdd