import userReducer from './userReducer';

function renderApp(newState, oldState = {}) {
    if (newState === oldState) return
    renderTitle(newState.title, oldState.title)
    renderContent(newState.content, oldState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return
    console.log('render title')
    const titleDOM = document.querySelector('#title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent) {
    if (newContent === oldContent) return
    console.log('render content')
    const contentDOM = document.querySelector('#content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}

function reducer(state, action) {
    if (!state) {
        return {
            title: {
                text: 'React.js 小书',
                color: 'red'
            },
            content: {
                text: 'React.js 小书内容',
                color: 'blue'
            }
        }
    }
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }
}

function createStrore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }
    dispatch({})
    return { getState, dispatch, subscribe }
}

const store = createStrore(reducer)
let oldState = store.getState()
store.subscribe(() => {
    const newState = store.getState()
    renderApp(newState, oldState)
    oldState = newState
})

renderApp(store.getState())

store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'purple' })
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' })

const userStore = createStrore(userReducer);
let oldUserState = userStore.getState()
userStore.subscribe(() => {
    const newUserState = userStore.getState()
    console.log(`old`)
    console.log(oldUserState)
    console.log(`new`)
    console.log(newUserState)
    oldUserState = newUserState
})

console.log(userStore.getState())
userStore.dispatch({
    type: 'ADD_USER',
    user: {
        username: 'tom',
        age: 20,
        gender: 'male'
    }
});
userStore.dispatch({
    type: 'ADD_USER',
    user: {
        username: 'jack',
        age: 20,
        gender: 'male'
    }
});
userStore.dispatch({
    type: 'UPDATE_USER',
    index: 1,
    user: {
        age: 22
    }
})
userStore.dispatch({
    type: 'DELETE_USER',
    index: 0
})