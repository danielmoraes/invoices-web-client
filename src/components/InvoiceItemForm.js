import { default as React, Component } from 'react'
import {
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Row
} from 'react-bootstrap'

import { FormCol } from '../components'

class InvoiceItemForm extends Component {
  componentDidMount () {
    this.descriptionInput.focus()
  }

  render () {
    const { data, handleInputChange } = this.props
    return (
      <Form>
        <Grid>

          <Row>
            <FormCol sm={6}>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  name='description'
                  type='text'
                  placeholder='Description'
                  value={data.description}
                  onChange={handleInputChange}
                  inputRef={(input) => { this.descriptionInput = input }} />
              </FormGroup>
            </FormCol>
          </Row>

          <Row>
            <FormCol sm={2}>
              <FormGroup>
                <ControlLabel>Quantity</ControlLabel>
                <FormControl
                  name='quantity'
                  type='number'
                  placeholder='Quantity'
                  value={data.quantity}
                  onChange={handleInputChange} />
              </FormGroup>
            </FormCol>

            <FormCol sm={2}>
              <FormGroup>
                <ControlLabel>Unit Price</ControlLabel>
                <FormControl
                  name='unitPrice'
                  type='number'
                  placeholder='Unit Price'
                  value={data.unitPrice}
                  onChange={handleInputChange} />
              </FormGroup>
            </FormCol>
          </Row>

        </Grid>

      </Form>
    )
  }
}

export default InvoiceItemForm
