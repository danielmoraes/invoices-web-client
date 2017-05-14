import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

import { SimpleModal, SignUpForm } from '../components'
import * as routes from '../routes'

class SignUpPage extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(routes.home())
  }

  modalOnHide () {
    this.goBack()
  }

  render () {
    return (
      <SimpleModal show onHide={this.modalOnHide} title='Sign Up' bsSize='sm'
        body={
          <SignUpForm />
        }
      />
    )
  }
}

SignUpPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(SignUpPage)
