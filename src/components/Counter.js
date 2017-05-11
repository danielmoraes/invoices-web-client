import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, Panel } from 'react-bootstrap'

const Counter = ({ counter, counterIncrement }) => (
  <Panel>
    <div className='text-center'>
      <p><Badge>{counter}</Badge></p>
      <Button onClick={counterIncrement}>Increment</Button>
    </div>
  </Panel>
)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  counterIncrement: PropTypes.func.isRequired
}

export default Counter
