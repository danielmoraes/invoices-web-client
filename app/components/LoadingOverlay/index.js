import React from 'react'
import { RotatingPlane } from 'better-react-spinkit'

import styles from './styles.css'

const LoadingOverlay = () => (
  <div className={styles.loadingOverlay}>
    <RotatingPlane size={30} />
  </div>
)

export default LoadingOverlay
