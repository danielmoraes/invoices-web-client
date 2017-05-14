import React from 'react'

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
