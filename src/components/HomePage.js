import React from 'react'
import { Grid, Row, Jumbotron } from 'react-bootstrap'
import { Route } from 'react-router-dom'

// components
import { ForgotPasswordPage, PublicHeader, SignUpPage } from './'

// containers
import { SignInPage } from '../containers'

// app routes
import * as routes from '../routes'

const HomePage = () => (
  <div>

    <Route path={routes.forgotPassword()} component={ForgotPasswordPage} />

    <Route path={routes.signIn()} component={SignInPage} />

    <Route path={routes.signUp()} component={SignUpPage} />

    <Grid>
      <Row>
        <PublicHeader />
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

export default HomePage
