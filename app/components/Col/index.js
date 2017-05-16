import React from 'react'
import { Col as BootstrapCol } from 'react-bootstrap'

const Col = ({children, ...rest}) => (
  <BootstrapCol {...rest} style={{ paddingLeft: 0 }}>
    {children}
  </BootstrapCol>
)

export default Col
