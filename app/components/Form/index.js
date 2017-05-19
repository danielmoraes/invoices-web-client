import { default as React, Component } from 'react'
import { ControlLabel, FormGroup, Col, Grid, Row } from 'react-bootstrap'

import { FormInput } from 'components'

import styles from './styles.css'

const inputType = (type) => {
  switch (type) {
    case String:
      return 'text'
    case Number:
      return 'number'
    case Date:
      return 'date'
    case Array:
      return 'select'
    default:
      return 'text'
  }
}

const FormCol = ({ first, field, data, options, handleChange, setFocus }) => {
  let fieldOptions = options.fieldOptions[field] || {}
  let fieldSchema = fieldOptions.schema || {}
  let fieldLabel = fieldOptions.label || fieldSchema.label || field
  let fieldValue = data[field]
  let fieldType = fieldOptions.inputType || inputType(fieldSchema.type)
  let fieldValues = fieldSchema.values

  if (fieldOptions.format) {
    fieldValue = fieldOptions.format(fieldValue)
  }

  return (
    <Col sm={fieldOptions.size || 12}>
      <FormGroup>
        { !options.hideLabels && <ControlLabel>{fieldLabel}</ControlLabel> }
        <FormInput
          name={field}
          value={fieldValue}
          placeholder={fieldLabel}
          values={fieldValues}
          type={fieldType}
          handleChange={handleChange}
          inputRef={setFocus}
        />
      </FormGroup>
    </Col>
  )
}

const FormRow = ({ row, ...rest }) => (
  <Row>
    { row.map((col, idx) => (
      <div key={idx}>
        <FormCol key={idx} field={col} first={idx === 0} {...rest} />
      </div>
    )) }
  </Row>
)

class Form extends Component {
  constructor (props) {
    super(props)
    this.setFocus = this.setFocus.bind(this)
  }

  componentDidMount () {
    if (this.focusedInput) {
      this.focusedInput.focus()
    }
  }

  setFocus (focusedField, input) {
    if (input && input.name === focusedField) {
      this.focusedInput = input
    }
  }

  render () {
    const { layout, onSubmit, ...rest } = this.props
    return (
      <form onSubmit={onSubmit}>
        <Grid fluid className={styles.grid}>
          { layout.map((row, idx) => (
            <FormRow
              {...rest}
              key={idx}
              row={row}
              setFocus={this.setFocus.bind(this, this.props.options.focus)} />
          )) }
        </Grid>
        <input type='submit' style={{display: 'none'}} />
      </form>
    )
  }
}

export default Form
