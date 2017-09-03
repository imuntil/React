import { normalize, schema } from 'normalizr'

export const normalizes = (data) => {
  const proSchema = new schema.Entity('list')
  const proListSchema = new schema.Array(proSchema)
  const { result: idList, entities: { list } } = normalize(data, proListSchema)
  return { idList, list }
}
