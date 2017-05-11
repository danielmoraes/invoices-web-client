import { default as React, Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', email: '', password: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log('Sign Up form submitted with values: ', this.state)
  }

  componentDidMount () {
    if (this.nameInput) {
      this.nameInput.focus()
    }
  }

  render () {
    return (
      <Form horizontal onSubmit={this.handleSubmit} >

        <FormGroup>
          <Col sm={12}>
            <FormControl name='name' type='text' placeholder='Name'
              onChange={this.handleInputChange} value={this.state.name}
              inputRef={input => { this.nameInput = input }} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <FormControl name='email' type='email' placeholder='Email'
              onChange={this.handleInputChange} value={this.state.email} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <FormControl name='password' type='password' placeholder='Password'
              onChange={this.handleInputChange} value={this.state.password} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <Button type='submit' block>Sign up</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default SignUpForm
