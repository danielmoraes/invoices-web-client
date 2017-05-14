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

class AccountPasswordForm extends Component {
  componentDidMount () {
    if (this.currentPasswordInput) {
      this.currentPasswordInput.focus()
    }
  }

  render () {
    const { data, handleInputChange } = this.props

    return (
      <Form>
        <Grid>

          <Row>
            <FormCol sm={3}>
              <FormGroup>
                <ControlLabel>Current Password</ControlLabel>
                <FormControl
                  name='currentPassword'
                  type='password'
                  placeholder='Current Password'
                  value={data.currentPassword}
                  onChange={handleInputChange}
                  inputRef={(input) => { this.currentPasswordInput = input }} />
              </FormGroup>
            </FormCol>
          </Row>

          <Row>
            <FormCol sm={3}>
              <FormGroup>
                <ControlLabel>New Password</ControlLabel>
                <FormControl
                  name='newPassword'
                  type='password'
                  placeholder='New Password'
                  value={data.newPassword}
                  onChange={handleInputChange} />
                <FormControl
                  name='confirmNewPassword'
                  type='password'
                  placeholder='Confirm New Password'
                  value={data.confirmNewPassword}
                  onChange={handleInputChange} />
              </FormGroup>
            </FormCol>
          </Row>

        </Grid>

      </Form>
    )
  }
}

export default AccountPasswordForm
