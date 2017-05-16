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

class UserForm extends Component {
  componentDidMount () {
    if (this.nameInput) {
      this.nameInput.focus()
    }
  }

  render () {
    const { data, handleInputChange, isNew } = this.props

    return (
      <Form>
        <Grid>

          <Row>
            <Col sm={6}>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl name='name' type='text' placeholder='Name'
                  value={data.name} onChange={handleInputChange}
                  inputRef={(input) => { this.nameInput = input }} />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name='email' type='email' placeholder='Email'
                  value={data.email} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>

          { isNew && (
            <Row>
              <Col sm={3}>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>

                  <FormControl
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={data.password}
                    onChange={handleInputChange} />
                </FormGroup>
              </Col>
              <Col sm={3}>
                <FormGroup>
                  <ControlLabel>Confirm Password</ControlLabel>

                  <FormControl
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={data.password}
                    onChange={handleInputChange} />
                </FormGroup>
              </Col>
            </Row>
          ) }

        </Grid>

      </Form>
    )
  }
}

export default UserForm
