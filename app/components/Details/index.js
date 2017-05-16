import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.css'

const Details = ({ data }) => (
  <div>
    { data.map((item) => (
      <div key={item.label} className={styles.item}>
        <div className={styles.label}>{item.label}</div>
        { item.path ? (
          <Link to={item.path}>
            <div className={styles.value}>{item.value}</div>
          </Link>
        ) : (
          <div className={styles.value}>{item.value}</div>
        ) }
      </div>
    )) }
  </div>
)

export default Details
