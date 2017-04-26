import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, Panel } from 'react-bootstrap'

const Counter = (props) => (
  <Panel header='Counter'>
    <div className='text-center'>
      <p><Badge>{props.counter}</Badge></p>
      <Button onClick={props.increment}>Increment</Button>
    </div>
  </Panel>
)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired
}

export default Counter
