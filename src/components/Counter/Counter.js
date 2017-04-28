import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, Panel } from 'react-bootstrap'

const Counter = ({ counter, incrementCounter }) => (
  <Panel header='Counter'>
    <div className='text-center'>
      <p><Badge>{counter}</Badge></p>
      <Button onClick={incrementCounter}>Increment</Button>
    </div>
  </Panel>
)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  incrementCounter: PropTypes.func.isRequired
}

export default Counter
