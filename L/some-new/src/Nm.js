import React, { Component } from 'react'
import { normalize, schema, denormalize } from 'normalizr'
import data from './data.json'
console.log('data', data)

export default class Nm extends Component {
  componentDidMount() {
    this.normalize(data)
  }

  normalize = data => {
    const fieldSchema = new schema.Entity('fields', undefined, {
      idAttribute: 'fieldInstanceId',
      processStrategy: (value, parent) => ({ ...value, pageId: parent.pageId })
    })
    const moduleSchema = new schema.Entity(
      'modules',
      {
        filedInstanceList: [fieldSchema]
      },
      { idAttribute: 'templateInstanceId' }
    )
    const buttonSchema = new schema.Entity('buttons', undefined, {
      idAttribute: 'buttonId'
    })
    const pageSchema = new schema.Entity(
      'pages',
      { moudeInstList: [moduleSchema], buttonList: [buttonSchema] },
      { idAttribute: 'pageId' }
    )
    const pageListSchema = [pageSchema]
    const result = normalize(data, pageListSchema)
    console.log('result', result)

    this.result = result
    this.pageListSchema = pageListSchema
  }

  denormalize = () => {
    const { result, entities } = this.result
    const origin = denormalize(result, this.pageListSchema, entities)
    console.log('origin', origin)
  }

  render() {
    return (
      <div>
        data
        <button onClick={this.denormalize}>denormalize</button>
      </div>
    )
  }
}
