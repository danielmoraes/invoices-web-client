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

class UserPasswordForm extends Component {
  componentDidMount () {
    if (this.newPasswordInput) {
      this.newPasswordInput.focus()
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
                <ControlLabel>New Password</ControlLabel>
                <FormControl
                  name='newPassword'
                  type='password'
                  placeholder='New Password'
                  value={data.newPassword}
                  onChange={handleInputChange}
                  inputRef={(input) => { this.newPasswordInput = input }} />
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

export default UserPasswordForm
