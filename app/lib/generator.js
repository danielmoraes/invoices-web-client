export const buildListColumns = (fields, options, schema) => {
  return fields.map((field, index) =>
    Object.assign({
      key: index,
      dataField: field,
      dataLabel: schema[field].label,
      headerAlign: schema[field].type === Number ? 'right' : 'left',
      dataAlign: schema[field].type === Number ? 'right' : 'left'
    }, options[field])
  )
}

export const buildStateFromSchema = (schema) => {
  let state = {}
  for (let key in schema) {
    if (schema[key].hidden) {
      continue
    }
    switch (schema[key].type) {
      case Date:
      case Array:
        state[key] = schema[key].default || ''
        break
      default:
        state[key] = schema[key].default || schema[key].type()
    }
  }
  return state
}

export const buildEntityFromState = (state, schema) => {
  let entity = {}
  for (let key in state) {
    if (!schema[key]) {
      continue
    }
    switch (schema[key].type) {
      case Array:
      case Date:
        entity[key] = state[key]
        break
      default:
        entity[key] = schema[key].type(state[key])
    }
  }
  return entity
}
