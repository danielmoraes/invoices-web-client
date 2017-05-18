import { default as React, Component } from 'react'
import { Col, Grid, Row } from 'react-bootstrap'

import { FormInput } from 'components'

import styles from './styles.css'

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

  setFocus (input, field, options) {
    if (field === options.focus) {
      this.focusedInput = input
    }
  }

  render () {
    const { data, layout, options, handleChange } = this.props
    return (
      <form>
        <Grid>
          { layout.map((row, index) => (
            <Row key={index}>
              { row.map((field, index) => (
                <Col key={index} className={styles.formCol}
                  sm={options.fieldOptions[field].size || 5}>
                  <FormInput
                    name={field}
                    value={data[field]}
                    options={options.fieldOptions[field]}
                    handleChange={handleChange}
                    inputRef={(input) => this.setFocus(input, field, options)}
                  />
                </Col>
              )) }
            </Row>
          )) }
        </Grid>
      </form>
    )
  }
}

export default Form
