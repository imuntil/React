import dva from 'dva'
import 'sweetalert/dist/sweetalert.css'
import './styles/index.scss'

// 1. Initialize
const app = dva()

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/product').default)
app.model(require('./models/user').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
