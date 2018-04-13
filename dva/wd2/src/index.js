import dva from 'dva'
import createLoading from 'dva-loading'
import { Toast } from 'antd-mobile'
import 'sweetalert/dist/sweetalert.css'
import './styles/index.scss'

// 1. Initialize
const app = dva({
  onError(err) {
    Toast.info(err.message, 2)
  }
})

// 2. Plugins
app.use(
  createLoading({
    global: false
  })
)

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/product').default)
app.model(require('./models/user').default)
app.model(require('./models/adr').default)
app.model(require('./models/collection').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
