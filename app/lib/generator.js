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

export const buildFormStateFromSchema = (schema) =>
  Object.keys(schema).reduce((obj, key) => Object.assign(obj, {[key]: ''}), {})
