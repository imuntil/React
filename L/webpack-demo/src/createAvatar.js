import avatar from './assets/sos.jpg'

export default function() {
  const img = new Image()
  img.src = avatar
  img.classList.add('avatar')

  const root = document.querySelector('#root')
  root.append(img)
}
