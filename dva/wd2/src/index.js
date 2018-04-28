import dva from 'dva'
import createLoading from 'dva-loading'
import { Toast } from 'antd-mobile'
import 'sweetalert/dist/sweetalert.css'
import './styles/index.scss'
require('@/assets/placeholder.png')

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
app.model(require('./models/cart').default)
app.model(require('./models/orderList').default)
app.model(require('./models/order').default)
app.model(require('./models/coupon').default)
// 微信
app.model(require('./models/wx').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
