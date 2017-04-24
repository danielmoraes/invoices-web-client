import React from 'react'
import DuckImage from '../../images/duck.jpg'
import styles from './Duck.css'

const Duck = () => (
  <div>
    <img
      alt='This is a duck!'
      className={styles.duck}
      src={DuckImage} />
  </div>
)

export default Duck
