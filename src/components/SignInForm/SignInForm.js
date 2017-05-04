import { default as React, Component } from 'react'
import { Alert, Button, Checkbox, Col, ControlLabel, Form, FormGroup,
         FormControl } from 'react-bootstrap'

class SignInForm extends Component {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '', remember: false }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    const { onSubmit } = this.props
    event.preventDefault()
    onSubmit(this.state.email, this.state.password, this.state.remember)
  }

  componentDidMount () {
    this.emailInput.focus()
  }

  render () {
    const { signInFailed } = this.props
    return (
      <Form horizontal onSubmit={this.handleSubmit} >
        {
          signInFailed &&
          <Alert bsStyle='danger'>Invalid email or password.</Alert>
        }
        <FormGroup controlId='formHorizontalEmail'>
          <Col componentClass={ControlLabel} sm={2}>Email</Col>
          <Col sm={10}>
            <FormControl name='email' type='email' placeholder='Email'
              onChange={this.handleInputChange} value={this.state.email}
              inputRef={input => { this.emailInput = input }} />
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalPassword'>
          <Col componentClass={ControlLabel} sm={2}>Password</Col>
          <Col sm={10}>
            <FormControl name='password' type='password' placeholder='Password'
              onChange={this.handleInputChange} value={this.state.password} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox name='remember' onChange={this.handleInputChange}
              checked={this.state.remember}>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type='submit'>Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default SignInForm
