import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { User } from 'api/entity-schema'
import { buildEntityFromState, buildStateFromSchema } from 'lib/generator'
import { createUser } from 'redux/actions'
import { home } from 'routes'

import SignUpForm from './SignUpForm'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = buildStateFromSchema(User)

    // additional fields
    this.state.confirmPassword = ''

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
    this.goBack()
  }

  onChange (event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  onSubmit (event) {
    event.preventDefault()

    const { dispatch } = this.props

    let user = buildEntityFromState(this.state, User)
    let password = user.password
    delete user.password
    dispatch(createUser(user, password))

    this.goBack()
  }

  render () {
    return (
      <Modal show onHide={this.modalOnHide} title='Sign Up' bsSize='sm'
        body={
          <div>
            <SignUpForm
              data={this.state}
              handleChange={this.onChange}
              onSubmit={this.onSubmit} />
            <Button block onClick={this.onSubmit}>Sign up</Button>
          </div>
        }
      />
    )
  }
}

SignUp.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(connect()(SignUp))
