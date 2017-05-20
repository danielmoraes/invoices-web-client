import React from 'react'
import { FormControl } from 'react-bootstrap'

const FormInput = ({ handleChange, ...rest }) => {
  switch (rest.type) {
    case 'select':
      return (
        <FormControl {...rest} onChange={handleChange} componentClass='select'>
          { rest.values.map(v => <option key={v} value={v}>{v}</option>) }
        </FormControl>
      )
    default:
      return (
        <FormControl {...rest} onChange={handleChange} />
      )
  }
}

export default FormInput
