import DuckImage from '../../images/duck.jpg'
import { Panel } from 'react-bootstrap'
import React from 'react'
import styles from './Duck.css'

const Duck = () => (
  <Panel header='Duck'>
    <img
      alt='This is a duck!'
      className={styles.duck}
      src={DuckImage} />
  </Panel>
)

export default Duck
