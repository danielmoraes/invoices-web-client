import DuckImage from './images/duck.jpg'
import { Panel } from 'react-bootstrap'
import React from 'react'
import styles from './DuckPage.css'

const DuckPage = () => (
  <Panel>
    <img
      alt='This is a duck!'
      className={styles.duck}
      src={DuckImage} />
  </Panel>
)

export default DuckPage
