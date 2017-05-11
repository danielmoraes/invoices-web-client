import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

// components
import { SimpleModal, ForgotPasswordForm } from './'

// app routes
import * as routes from '../routes'

class ForgotPasswordPage extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(routes.signIn())
  }

  modalOnHide () {
    this.goBack()
  }

  render () {
    return (
      <SimpleModal
        show onHide={this.modalOnHide} title='Forgot Password' bsSize='sm'
        body={
          <ForgotPasswordForm />
        }
      />
    )
  }
}

ForgotPasswordPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(ForgotPasswordPage)
