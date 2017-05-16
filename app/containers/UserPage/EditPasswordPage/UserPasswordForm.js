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

class PasswordForm extends Component {
  componentDidMount () {
    const { isAccount } = this.props
    if (isAccount) {
      this.curPasswordInput.focus()
    } else {
      this.newPasswordInput.focus()
    }
  }

  render () {
    const { data, handleInputChange, isAccount } = this.props

    return (
      <Form>
        <Grid>

          { isAccount && (
            <Row>
              <Col sm={3}>
                <FormGroup>
                  <ControlLabel>Current Password</ControlLabel>
                  <FormControl
                    name='curPassword'
                    type='password'
                    placeholder='Current Password'
                    value={data.curPassword}
                    onChange={handleInputChange}
                    inputRef={(input) => { this.curPasswordInput = input }} />
                </FormGroup>
              </Col>
            </Row>
          ) }

          <Row>
            <Col sm={3}>
              <FormGroup>
                <ControlLabel>New Password</ControlLabel>

                <FormControl
                  name='newPassword'
                  type='password'
                  placeholder='New Password'
                  value={data.newPassword}
                  onChange={handleInputChange}
                  inputRef={(input) => { this.newPasswordInput = input }}
                  style={{marginBottom: '3px'}} />

                <FormControl
                  name='confirmNewPassword'
                  type='password'
                  placeholder='Confirm New Password'
                  value={data.confirmNewPassword}
                  onChange={handleInputChange} />

              </FormGroup>
            </Col>
          </Row>

        </Grid>

      </Form>
    )
  }
}

export default PasswordForm
