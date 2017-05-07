import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Grid, Row, Jumbotron } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

// components
import { AuthModal, PublicHeader } from '../components'

// containers
import { SignInPage, SignUpPage } from './'

// redux
import { signInCancel } from '../actions'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.modalOnHide = this.modalOnHide.bind(this)
    this.signInModalOnHide = this.signInModalOnHide.bind(this)
  }

  modalOnHide () {
    const { history } = this.props
    history.push('/')
  }

  signInModalOnHide (event) {
    const { dispatch } = this.props
    dispatch(signInCancel())
    this.modalOnHide()
  }

  render () {
    const { location } = this.props
    return (
      <div>

        <AuthModal
          name='signInModal'
          modalShow={location.pathname === '/signin'}
          modalOnHide={this.signInModalOnHide} modalTitle='Sign In'>

          <SignInPage />

        </AuthModal>

        <AuthModal
          modalShow={location.pathname === '/signup'}
          modalOnHide={this.modalOnHide} modalTitle='Sign Up'>

          <SignUpPage />

        </AuthModal>

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
  }
}

HomePage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(connect()(HomePage))
