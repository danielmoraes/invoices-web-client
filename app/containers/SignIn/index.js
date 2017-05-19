import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { getSignInFailed } from 'redux/reducers'
import { home } from 'routes'
import * as actions from 'redux/actions'

import Footer from './Footer'
import SignInForm from './SignInForm'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '', password: ''
    }

    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(home())
  }

  modalOnHide () {
    const { signInCancel } = this.props
    signInCancel()
    this.goBack()
  }

  onChange (event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  onSubmit (event) {
    event.preventDefault()

    const { signIn } = this.props
    signIn(this.state.email, this.state.password)
  }

  render () {
    const { signInFailed } = this.props
    return (
      <Modal show onHide={this.modalOnHide} title='Sign In' bsSize='sm'
        body={
          <div>
            { signInFailed && (
              <Alert bsStyle='danger'>Invalid email or password.</Alert>
            ) }
            <SignInForm data={this.state} handleChange={this.onChange} />
            <Button type='submit' block onClick={this.onSubmit}>Sign in</Button>
          </div>
        }
        footer={
          <Footer />
        }
      />
    )
  }
}

SignIn.propTypes = {
  location: PropTypes.object.isRequired,
  signInFailed: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signInCancel: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  signInFailed: getSignInFailed(state)
})

export default withRouter(connect(mapStateToProps, actions)(SignIn))
