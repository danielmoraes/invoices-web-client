import React from 'react'
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const inputType = (type) => {
  switch (type) {
    case String:
      return 'text'
    case Number:
      return 'number'
    case Date:
      return 'date'
    default:
      return 'text'
  }
}

const FormInput = ({ name, value, options, handleChange, inputRef }) => {
  const schema = options.schema || {}
  const label = options.label || schema.label || name
  const type = options.inputType || inputType(schema.type)
  const inputValue = options.format ? options.format(value) : value
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        name={name}
        type={type}
        placeholder={label}
        value={inputValue}
        onChange={handleChange}
        inputRef={inputRef} />
    </FormGroup>
  )
}

export default FormInput
