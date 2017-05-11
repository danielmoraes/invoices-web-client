import React from 'react'

// styles
import styles from './PanelHeader.css'

const PanelHeader = ({ title, children }) => (
  <div className={styles.header}>
    <h4>{title}</h4>
    <span className={styles.actions}>
      {children}
    </span>
  </div>
)

export default PanelHeader
