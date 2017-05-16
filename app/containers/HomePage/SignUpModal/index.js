import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { home } from 'routes'

import SignUpForm from './SignUpForm'

class SignUpModal extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(home())
  }

  modalOnHide () {
    this.goBack()
  }

  render () {
    return (
      <Modal show onHide={this.modalOnHide} title='Sign Up' bsSize='sm'
        body={
          <SignUpForm />
        }
      />
    )
  }
}

SignUpModal.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(SignUpModal)
