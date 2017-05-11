import { default as React, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'

const SimpleModal = ({ title, body, footer, ...rest }) => (
  <Modal {...rest}>

    <Modal.Header closeButton>
      <Modal.Title>{ title }</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      { body }
    </Modal.Body>

    { footer && (
      <Modal.Footer>
        { footer }
      </Modal.Footer>
    ) }

  </Modal>
)

SimpleModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired
}

export default SimpleModal
