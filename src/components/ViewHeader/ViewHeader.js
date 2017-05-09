import React from 'react'

// styles
import styles from './ViewHeader.css'

const ViewHeader = ({ title, children }) => (
  <div className={styles.header}>
    <h4>{title}</h4>
    <span className={styles.actions}>
      {children}
    </span>
  </div>
)

export default ViewHeader
