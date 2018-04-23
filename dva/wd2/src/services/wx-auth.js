import fetch from '../utils/request'

export async function fetchOpenID() {
  const { data, err } = await fetch(
    'http://api.jtuntech.com/event/2017/wd/campari/wx/output.php',
    {
      method: 'GET',
      credentials: 'include'
    }
  )
  if (err) return
  const { status, msg } = data
  if (+status === 1 && msg.UserOpenId) {
    return msg.UserOpenId
  }
  window.location.href = `http://api.jtuntech.com/event/2017/wd/campari/wx/login.php?url=${
    window.location.href
  }`
}
