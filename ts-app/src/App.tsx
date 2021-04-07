import logo from './logo.svg'
import BtnList from './components/BtnList'
import './App.css'

const list = [{ txt: 'abc' }, { txt: 'def', count: 100 }]
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <BtnList groupName='btns list' list={list} />
    </div>
  )
}

export default App
