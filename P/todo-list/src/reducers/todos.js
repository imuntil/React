const INIT_TODOS = 'INIT_TODOS'
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'COMPLETE_TODO'
const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS'
const EDIT_TODO = 'EDIT_TODO'
const DELETE_COMPLETED = 'DELETE_COMPLETED'

export default function (state, action) {
  if (!state) {
    return { todos: [] }
  }

  const { todos } = state
  const { todoIndex } = action
  console.log(action)
  switch (action.type) {
  case INIT_TODOS:
    return { todos: action.todos }
  case ADD_TODO:
    return {
      todos: [...todos, action.todo]
    }
  case TOGGLE_TODO:
    return {
      todos: [
        ...todos.slice(0, todoIndex),
        {...todos[todoIndex], complete: !todos[todoIndex].complete},
        ...todos.slice(todoIndex + 1)
      ]
    }
  case EDIT_TODO:
    return {
      todos: [
        ...todos.slice(0, todoIndex),
        {...todos[todoIndex], ...action.todo},
        ...todos.slice(todoIndex + 1)
      ]
    }
  case TOGGLE_ALL_TODOS:
    return {
      todos: todos.map(todo => {
        return {
          ...todo,
          complete: action.complete
        }
      })
    }
  case DELETE_COMPLETED:
    return {
      todos: todos.filter(todo => !todo.complete)
    }
  default:
    return state
  }
}

//actions creators
export const initTodos = todos => {
  return { type: INIT_TODOS, todos }
}
export const addTodo = todo => {
  return { type: ADD_TODO, todo }
}
export const toggleTodo = todoIndex => {
  return { type: TOGGLE_TODO, todoIndex }
}
export const editTodo = (todoIndex, todo) => {
  return { type: EDIT_TODO, todoIndex, todo}
}
export const toggleAllTodos = complete => {
  return { type: TOGGLE_ALL_TODOS, complete }
}
export const deleteCompleted = () => {
  return { type: DELETE_COMPLETED }
}