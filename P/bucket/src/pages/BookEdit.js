import React from 'react'
import BookEditor from '../components/BookEditor'
import { connect } from 'react-redux'
import { fetchBookDetail, editBook } from '../reducers/book'
import _ from 'lodash'

class BookEdit extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    const bookId = +this.props.match.params.id
    this.props.fetchBookDetail(bookId)
  }
  render () {
    const {editingBook, editBook } = this.props
    console.log('xx', editingBook);
    return (
      !_.isEmpty(editingBook) ? <BookEditor history={this.props.history}
                                            onEdit={editBook}
                                            editTarget={editingBook} /> : <span>...loading...</span>
    )
  }
}

const mapStateToProps = state => {
  return {
    editingBook: state.bookReducer.editingBook
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchBookDetail: id => dispatch(fetchBookDetail(id)),
    editBook: (id, values) => dispatch(editBook(id, values))
  }
}

BookEdit = connect(mapStateToProps, mapDispatchToProps)(BookEdit)

export default BookEdit