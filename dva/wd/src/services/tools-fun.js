import { normalize, schema } from 'normalizr'
import _ from 'lodash'

export const normalizes = (data) => {
  const proSchema = new schema.Entity('list')
  const proListSchema = new schema.Array(proSchema)
  const { result: idList, entities: { list } } = normalize(data, proListSchema)
  return { idList, list }
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function formData(payload) {
  if (_.isObject(payload) && !_.isEmpty(payload)) {
    const data = new FormData()
    for (let key in payload) {
      data.append(key, payload[key])
    }
    return data
  }
  return null
}
