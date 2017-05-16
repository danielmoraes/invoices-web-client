import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { forgotPassword, signUp } from 'routes'

const SignInFooter = () => (
  <div>
    <div className='text-center'>
      <LinkContainer to={forgotPassword()}>
        <Button bsStyle='link'>Forgot your password?</Button>
      </LinkContainer>
    </div>

    <div className='text-center'>
      Do not have an account?
      <LinkContainer to={signUp()}>
        <Button bsStyle='link'>Sign up!</Button>
      </LinkContainer>
    </div>
  </div>
)

export default SignInFooter
