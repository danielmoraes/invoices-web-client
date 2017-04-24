import React from 'react'
import PropTypes from 'prop-types'

const Counter = (props) => (
  <div>
    <h4>Counter: {props.counter}</h4>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
  </div>
)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired
}

export default Counter
