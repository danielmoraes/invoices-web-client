import React from 'react'
import { Col } from 'react-bootstrap'

const FormCol = ({children, ...rest}) => (
  <Col {...rest} style={{ paddingLeft: 0 }}>
    { children}
  </Col>
)

export default FormCol
