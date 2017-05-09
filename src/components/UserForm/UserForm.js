import { default as React, Component } from 'react'
import {
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  Row
} from 'react-bootstrap'

// components
import { FormCol } from '../'

class UserForm extends Component {
  componentDidMount () {
    this.nameInput.focus()
  }

  render () {
    const { data, handleInputChange } = this.props

    return (
      <form>
        <Grid>

          <Row>
            <FormCol sm={5}>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name='name'
                  type='text'
                  placeholder='Name'
                  value={data.name}
                  onChange={handleInputChange}
                  inputRef={(input) => { this.nameInput = input }} />
              </FormGroup>
            </FormCol>
          </Row>

          <Row>
            <FormCol sm={5}>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={data.email}
                  onChange={handleInputChange} />
              </FormGroup>
            </FormCol>
          </Row>

        </Grid>

      </form>
    )
  }
}

export default UserForm
