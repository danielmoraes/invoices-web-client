import { default as React, PropTypes } from 'react'
import { Modal as BootstrapModal } from 'react-bootstrap'

const Modal = ({ title, body, footer, ...rest }) => (
  <BootstrapModal {...rest}>

    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{ title }</BootstrapModal.Title>
    </BootstrapModal.Header>

    <BootstrapModal.Body>
      { body }
    </BootstrapModal.Body>

    { footer && (
      <BootstrapModal.Footer>
        { footer }
      </BootstrapModal.Footer>
    ) }

  </BootstrapModal>
)

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired
}

export default Modal
