import { default as React, Component, PropTypes } from 'react'
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap'

class SignInForm extends Component {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  handleSubmit (event) {
    const { onSubmit } = this.props
    event.preventDefault()
    onSubmit(this.state.email, this.state.password)
  }

  componentDidMount () {
    if (this.emailInput) {
      this.emailInput.focus()
    }
  }

  render () {
    const { signInFailed } = this.props
    return (
      <Form horizontal onSubmit={this.handleSubmit} >

        { signInFailed && (
          <Alert bsStyle='danger'>Invalid email or password.</Alert>
        ) }

        <FormGroup>
          <Col sm={12}>
            <FormControl
              name='email'
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange}
              inputRef={input => { this.emailInput = input }} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <FormControl
              name='password'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <Button type='submit' block>Sign in</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

SignInForm.propTypes = {
  signInFailed: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SignInForm
