import './style.scss'

const btn = document.createElement('button')
btn.innerHTML = '新增'
document.body.append(btn)

btn.onclick = function () {
  const item = document.createElement('div')
  item.innerHTML = 'item'
  document.body.append(item)
}