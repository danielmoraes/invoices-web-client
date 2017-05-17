import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { signIn } from 'routes'

import Form from './Form'

class ForgotPasswordModal extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(signIn())
  }

  modalOnHide () {
    this.goBack()
  }

  render () {
    return (
      <Modal show onHide={this.modalOnHide} title='Forgot Password' bsSize='sm'
        body={
          <Form />
        }
      />
    )
  }
}

ForgotPasswordModal.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(ForgotPasswordModal)
