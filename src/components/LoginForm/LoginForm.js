import React from 'react'
import { Alert, Button, Checkbox, Col, ControlLabel, Form, FormGroup,
         FormControl } from 'react-bootstrap'

const LoginForm = ({ onSubmit, loginFailed }) => {
  let emailInput, passwordInput, rememberInput
  return (
    <Form horizontal
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(emailInput.value, passwordInput.value, rememberInput.checked)
      }}
    >
      {
        loginFailed ? (
          <Alert bsStyle='danger'>
            Invalid email or password.
          </Alert>
        ) : (
          ''
        )
      }
      <FormGroup controlId='formHorizontalEmail'>
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl type='email' placeholder='Email'
            inputRef={input => { emailInput = input }} />
        </Col>
      </FormGroup>

      <FormGroup controlId='formHorizontalPassword'>
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl type='password' placeholder='Password'
            inputRef={input => { passwordInput = input }} />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox inputRef={input => { rememberInput = input }}>
            Remember me
          </Checkbox>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type='submit'>
            Sign in
          </Button>
        </Col>
      </FormGroup>
    </Form>
  )
}

export default LoginForm
