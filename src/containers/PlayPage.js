import { connect } from 'react-redux'
import Counter from '../components/Counter'
import { getCounter } from '../reducers'
import { incrementCounter } from '../actions'

const mapStateToProps = (state) => {
  return { counter: getCounter(state) }
}

const PlayPage = connect(
  mapStateToProps,
  { increment: incrementCounter }
)(Counter)

export default PlayPage
