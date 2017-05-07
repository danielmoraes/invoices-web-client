import { default as React, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'

const AuthModal = ({ modalShow, modalOnHide, modalTitle, children }) => (
  <Modal bsSize='sm' show={modalShow} onHide={modalOnHide}>

    <Modal.Header closeButton>
      <Modal.Title>{ modalTitle }</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      { children }
    </Modal.Body>

  </Modal>
)

AuthModal.propTypes = {
  modalShow: PropTypes.bool.isRequired,
  modalOnHide: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired
}

export default AuthModal
