import React from 'react'
import { Grid, Row, Jumbotron } from 'react-bootstrap'
import { Route } from 'react-router-dom'

import { SignIn, SignUp, ForgotPassword } from 'containers'
import { forgotPassword, signIn, signUp } from 'routes'

import Header from './Header'

const Home = () => (
  <div>

    <Route path={forgotPassword()} component={ForgotPassword} />
    <Route path={signIn()} component={SignIn} />
    <Route path={signUp()} component={SignUp} />

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
