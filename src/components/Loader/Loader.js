import React from 'react'
import { RotatingPlane } from 'better-react-spinkit'

// styles
import styles from './Loader.css'

const Loader = () => (
  <div className={styles.loaderOverlay}>
    <RotatingPlane size={30} />
  </div>
)

export default Loader
