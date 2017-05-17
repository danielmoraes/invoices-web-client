import React from 'react'
import { Grid, Row, Jumbotron } from 'react-bootstrap'
import { Route } from 'react-router-dom'

import ForgotPasswordModal from './ForgotPasswordModal'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'

import { forgotPassword, signIn, signUp } from 'routes'

import Header from './Header'

const Home = () => (
  <div>

    <Route path={forgotPassword()} component={ForgotPasswordModal} />
    <Route path={signIn()} component={SignInModal} />
    <Route path={signUp()} component={SignUpModal} />

    <Grid>
      <Row>
        <Header />
      </Row>
      <Row>
        <Jumbotron>
          <h1>All your invoices in one place!</h1>
          <p>Description for this awesome invoice application here ...</p>
        </Jumbotron>
      </Row>
    </Grid>

  </div>
)

export default Home
