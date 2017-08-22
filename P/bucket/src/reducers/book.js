import { get, del, post, put } from '../utils/request'
import _ from 'lodash'

const FETCH_BOOKS = 'FETCH_BOOKS'
const FETCH_BOOK_DETAIL = 'FETCH_BOOK_DETAIL'
const DELETE_BOOK = 'DELETE_BOOK'
const ADD_BOOK = 'ADD_BOOK'
const EDIT_BOOK = 'EDIT_BOOK'
const RESET_EDITING_BOOK = 'RESET_EDITING_BOOK'

const initState = {
  books: [],
  expired: true,
  editingBook: {}
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return {...state, bookList: action.bookList, expired: false}
    case DELETE_BOOK:
      return {
        ...state,
        expired: false,
        bookList: [
          ...state.bookList.slice(0, action.index),
          ...state.bookList.slice(action.index + 1)
        ]
      }
    case ADD_BOOK:
      return {
        ...state,
        expired: true
      }
    case FETCH_BOOK_DETAIL:
      return {
        ...state,
        editingBook: action.editingBook
      }
    case EDIT_BOOK:
      return {
        ...state,
        expired: true
      }
    case RESET_EDITING_BOOK:
      return {
        ...state,
        editingBook: {}
      }
    default:
      return state
  }
}

export const fetchBooks = () => {
  return (dispatch, getState) => {
    if (!getState().bookReducer.expired) {
      dispatch({type: RESET_EDITING_BOOK})
      return
    }
    return get('http://localhost:3000/book')
      .then(res => {
        dispatch({type: FETCH_BOOKS, bookList: res})
      })
  }
}

export const deleteBook = (id) => {
  return (dispatch, getState) => {
    let index = _.findIndex(getState().bookReducer.bookList, {id})
    if (index < 0) {
      return Promise.reject(`没有id为${id}的书籍`)
    }
    return del('http://localhost:3000/book/' + id)
      .then(res => {
        dispatch({type: DELETE_BOOK, index})
      })
  }
}

export const addBook = values => {
  return (dispatch, getState) => {
    return post('http://localhost:3000/book', values)
      .then(res => {
        if (res.id) {
          dispatch({type: ADD_BOOK})
        } else {
          return Promise.reject('新增书籍失败')
        }
      })
  }
}

export const fetchBookDetail = id => {
  return (dispatch, getState) => {
    const bookList = getState().bookReducer.bookList || []
    const book = _.find(bookList, {id})
    if (book) {
      dispatch({type: FETCH_BOOK_DETAIL, editingBook: book})
      return
    }
    get('http://localhost:3000/book/' + id)
      .then(res => {
        dispatch({type: FETCH_BOOK_DETAIL, editingBook: res})
      })
  }
}

export const editBook = (id, values) => {
  return (dispatch, getState) => {
    return put('http://localhost:3000/book/' + id, values)
      .then(res => {
        if (res.id) {
          dispatch({type: EDIT_BOOK})
        } else {
          return Promise.reject('编辑书籍失败')
        }
      })
  }
}