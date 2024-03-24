// DeleteModal.js
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ show, onHide, onConfirm, itemName }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Body>{itemName}(을)를 삭제하시겠습니까?</Modal.Body>
    <Modal.Footer>
      <Button type="button" variant="secondary" onClick={onHide}>
        닫기
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        삭제
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;
