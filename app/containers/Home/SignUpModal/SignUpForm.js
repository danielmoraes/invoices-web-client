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
            <FormControl
              name='name'
              type='text'
              placeholder='Name'
              value={this.state.name}
              onChange={this.handleInputChange}
              inputRef={input => { this.nameInput = input }} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <FormControl
              name='email'
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange} />
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
            <Button type='submit' block>Sign up</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

export default SignUpForm
