import dva from 'dva'
import { Toast } from 'antd-mobile'
import 'sweetalert/dist/sweetalert.css'
import './styles/index.scss'

// 1. Initialize
const app = dva({
  onError (err) {
    Toast.info(err.message, 2)
  }
})

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/product').default)
app.model(require('./models/user').default)
app.model(require('./models/adr').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
