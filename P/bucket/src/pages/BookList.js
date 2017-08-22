import React from 'react'
import { message, Table, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { fetchBooks, deleteBook } from '../reducers/book'

class BookList extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    this.props.fetchBooks()
  }
  handleEdit (book) {
    this.props.history.push('/book/edit/' + book.id )
  }
  handleDel (book) {
    this.props.deleteBook(book.id)
      .then(() => {
        message.success('删除书籍成功')
      })
      .catch(err => {
        console.log(err);
        message.error('删除书籍失败')
      })
  }
  render () {
    const {bookList} = this.props
    const columns = [
      {
        title: '图书ID',
        dataIndex: 'id'
      },
      {
        title: '书名',
        dataIndex: 'name'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (text, record) => <span>&yen;{record.price / 100}</span>
      },
      {
        title: '所有者ID',
        dataIndex: 'owner_id'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Button.Group type="ghost">
            <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
            <Popconfirm title="确定要删除么？" onConfirm={() => this.handleDel(record)}>
              <Button size="small">删除</Button>
            </Popconfirm>
          </Button.Group>
        )
      }
    ]
    return (
      <Table columns={columns} dataSource={bookList} rowKey={row => row.id} />
    )
  }
}

const mapStateToProps = state => {
  return {
    bookList: state.bookReducer.bookList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch(fetchBooks()),
    deleteBook: id => dispatch(deleteBook(id))
  }
}

BookList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)

export default BookList