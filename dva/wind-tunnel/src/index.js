import dva from 'dva';
import './index.css';
import 'animate.css'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/page'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// let deviceWidth = document.documentElement.clientWidth;
// if(deviceWidth > 640) deviceWidth = 640;
// document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
