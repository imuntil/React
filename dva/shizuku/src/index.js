import dva from 'dva'
import './styles/reset.css'
import './styles/base.scss'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
console.log('run')
export const store = app._store