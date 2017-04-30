import { connect } from 'react-redux'

// components
import Counter from '../components/Counter'

// redux
import { getCounter } from '../reducers'
import * as actions from '../actions'

const mapStateToProps = (state) => {
  return { counter: getCounter(state) }
}

const PlayPage = connect(
  mapStateToProps,
  actions
)(Counter)

export default PlayPage
