import _ from 'lodash'
/* eslint-disable no-undef,max-len */
/**
 * 常用正则
 * @type {{phone: {str: string, reg: RegExp}, password: {str: string, reg: RegExp}, code: {str: string, reg: string}}}
 */
export const regexp = {
  phone: { str: '^(1[3|4|5|7|8])[0-9]{9}$', reg: /'^(1[3|4|5|7|8])[0-9]{9}$'/ },
  password: { str: '^[A-z0-9_]{6,20}$', reg: /^[A-z0-9_]{6,20}$/ },
  code: { str: '^[0-9]{6}$', reg: /^[\d]{6}$/ }
}

/**
 * localStorage & sessionStorage 相关
 * @type {{ls: Storage, ss: Storage, putValue: (function(*=, *=, *)), setValue: (function(*=, *)), remove: (function(*=, *))}}
 */
export const zStorage = {
  putValue: (key, value, isSs) => {
    const s = isSs ? window.sessionStorage : window.localStorage
    s.removeItem(key)
    if (_.isObject(value)) {
      s.setItem(key, JSON.stringify(value))
    } else {
      s.setItem(key, value)
    }
  },
  setValue: (key, isSs) => {
    const s = isSs ? window.sessionStorage : window.localStorage
    let value = null
    try {
      value = JSON.parse(s.getItem(key))
    } catch (e) {
      console.log(e);
      value = s.getItem(key)
    }
    return value
  },
  remove: (key, isSs) => {
    const s = isSs ? window.sessionStorage : window.localStorage
    s.removeItem(key)
  }
}
