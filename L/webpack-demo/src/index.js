import avatar from './assets/sos.jpg'
import style from './index.scss'
import createAvatar from './createAvatar'

createAvatar()

const img = new Image()
img.src = avatar
img.classList.add(style.avatar)

const root = document.querySelector('#root')
root.append(img)
