import { default as React, Component } from 'react'
import {
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Row
} from 'react-bootstrap'

import { Col } from 'components'

class InvoiceForm extends Component {
  componentDidMount () {
    this.descriptionInput.focus()
  }

  render () {
    const { data, handleInputChange } = this.props

    return (
      <Form>
        <Grid>

          <Row>
            <Col sm={8}>
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
            </Col>
          </Row>

          <Row>
            <Col sm={3}>
              <FormGroup>
                <ControlLabel>Date</ControlLabel>
                <FormControl
                  name='date'
                  type='date'
                  placeholder='Date'
                  value={data.date}
                  onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={3}>
              <FormGroup>
                <ControlLabel>Number</ControlLabel>
                <FormControl
                  name='number'
                  type='number'
                  placeholder='Number'
                  value={data.number}
                  onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={5}>
              <FormGroup>
                <ControlLabel>Beneficiary Name</ControlLabel>
                <FormControl
                  name='beneficiary'
                  type='text'
                  placeholder='Name'
                  value={data.beneficiary}
                  onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col sm={3}>
              <FormGroup>
                <ControlLabel>Beneficiary Number</ControlLabel>
                <FormControl
                  name='beneficiaryNumber'
                  type='text'
                  placeholder='Number'
                  value={data.beneficiaryNumber}
                  onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={3}>
              <FormGroup>
                <ControlLabel>Amount</ControlLabel>
                <FormControl
                  name='amount'
                  type='number'
                  placeholder='Amount'
                  value={data.amount}
                  onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

        </Grid>

      </Form>
    )
  }
}

export default InvoiceForm
