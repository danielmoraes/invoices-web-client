import { connect } from 'react-redux'

// components
import { Counter } from '../components'

// redux
import { getCounter } from '../reducers'
import * as actions from '../actions'

const mapStateToProps = (state) => ({
  counter: getCounter(state)
})

const PlayPage = connect(
  mapStateToProps,
  actions
)(Counter)

export default PlayPage
