import { default as React, Component } from 'react'
import { Button, Form, FormGroup, FormControl, Col } from 'react-bootstrap'

class ForgotPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.state = { email: '' }
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
    if (this.emailInput) {
      this.emailInput.focus()
    }
  }

  render () {
    return (
      <Form horizontal onSubmit={this.handleSubmit} >

        <FormGroup>
          <Col sm={12}>
            <FormControl
              name='email'
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange}
              inputRef={(input) => { this.emailInput = input }} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={12}>
            <Button type='submit' block>Send me reset instructions</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

export default ForgotPasswordForm
