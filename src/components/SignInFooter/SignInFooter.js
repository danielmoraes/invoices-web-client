import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const SignInFooter = () => (
  <div>
    <div className='text-center'>
      <LinkContainer to='/forgot-password'>
        <Button bsStyle='link'>Forgot your password?</Button>
      </LinkContainer>
    </div>

    <div className='text-center'>
      Don't have an account?
      <LinkContainer to='/signup'>
        <Button bsStyle='link'>Sign up!</Button>
      </LinkContainer>
    </div>
  </div>
)

export default SignInFooter
