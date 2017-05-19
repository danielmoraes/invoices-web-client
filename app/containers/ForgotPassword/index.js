import { Button } from 'react-bootstrap'
import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { home, signIn } from 'routes'

import Form from './ForgotPasswordForm'

class ForgotPasswordModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: ''
    }

    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(signIn())
  }

  modalOnHide () {
    this.goBack()
  }

  onChange (event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  onSubmit (event) {
    event.preventDefault()
    const { history } = this.props
    history.push(home())
  }

  render () {
    return (
      <Modal show onHide={this.modalOnHide} title='Forgot Password' bsSize='sm'
        body={
          <div>
            <Form data={this.state} handleChange={this.onChange} />
            <Button type='submit' block onClick={this.onSubmit}>
              Send me reset instructions
            </Button>
          </div>
        }
      />
    )
  }
}

ForgotPasswordModal.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(ForgotPasswordModal)
