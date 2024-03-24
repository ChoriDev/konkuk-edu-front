import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import AdminItemManagingRow from "./AdminItemManagingRow";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import styles from "../css/AdminItemManaging.module.css";
import Navbars from "../components/Navbars";

function AdminItemManaging() {
  const [response, setResponse] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addMode, setAddMode] = useState(true);
  const [newNo, setNewNo] = useState("");
  const [newStartNo, setNewStartNo] = useState("");
  const [newEndNo, setNewEndNo] = useState("");
  const [newName, setNewName] = useState("");
  const [isValid, setIsValid] = useState(false);

  const {
    responseData,
    error,
    isLoading,
    request: performGet,
  } = useAxios({
    method: "GET",
    url: `/api/item`,
  });
  useEffect(() => {
    performGet();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      if (responseData !== null) {
        setResponse(responseData);
      } else {
        const status = error.response.status;
        console.log(status);
      }
    }
  }, [responseData, error]);

  // 물품 하나 추가
  const { request: addItem } = useAxios({
    method: "POST",
    url: `api/item/`,
    requestData: {
      start_no: newStartNo,
      end_no: newEndNo,
      no: newNo,
      name: newName,
    },
    onSuccess: performGet,
  });

  const changeAddMode = () => {
    setAddMode((current) => !current);
    setNewStartNo("");
    setNewEndNo("");
    setNewNo("");
  };

  const changeStartNo = (e) => {
    setNewStartNo(e.target.value);
  };

  const changeEndNo = (e) => {
    setNewEndNo(e.target.value);
  };

  const changeNo = (e) => {
    setNewNo(e.target.value);
  };

  const changeName = (e) => {
    setNewName(e.target.value);
  };

  useEffect(() => {
    if (
      (newNo !== "" || (newStartNo !== "" && newEndNo !== "")) &&
      newName !== ""
    ) {
      setIsValid(true);
    }
  }, [newNo, newStartNo, newEndNo, newName]);

  // 추가 모달 열기
  const openAddModal = () => {
    setAddModalShow(true);
  };

  // 추가 모달 닫기
  const closeAddModal = () => {
    setAddModalShow(false);
    setNewStartNo("");
    setNewEndNo("");
    setNewNo("");
    setNewName("");
    setAddMode((current) => !current);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Navbars />
        </div>
        {isLoading ? (
          <div className={styles.spinner}>
            <Spinner animation="border" />
          </div>
        ) : (
          <div className={styles.content}>
            <Button onClick={openAddModal}>물품 추가</Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>no</th>
                  <th>물품명</th>
                  <th>대여자 학번</th>
                  <th>대여자 이름</th>
                  <th>휴대폰 번호</th>
                  <th>대여 일자</th>
                  <th>반납 예정 일자</th>
                  <th>대여/반납</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {response.length === 0 ? (
                  <tr>
                    <td colSpan="9">데이터가 없습니다</td>
                  </tr>
                ) : (
                  response.map((item) => (
                    <AdminItemManagingRow
                      key={item.id}
                      id={item.id}
                      no={item.no}
                      name={item.name}
                      studentId={item.student_id}
                      studentName={item.student_name}
                      phoneNum={item.phone_num}
                      rentalDate={item.rental_date}
                      deadlineDate={item.deadline_date}
                      state={item.state}
                      reload={performGet}
                    />
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <Modal show={addModalShow} onHide={closeAddModal} centered>
        <div className={styles.addModeBox}>
          <Form.Check
            inline
            type={"radio"}
            name="addMode"
            label={"물품 하나"}
            defaultChecked
            onClick={changeAddMode}
          />
          <Form.Check
            inline
            type={"radio"}
            name="addMode"
            label={"물품 여러 개"}
            onClick={changeAddMode}
          />
        </div>
        <Form>
          {addMode ? (
            <Modal.Body className={styles.modalBody}>
              <InputGroup>
                <InputGroup.Text>번호</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={newNo}
                  placeholder="ex) 1"
                  onChange={changeNo}
                  maxLength={2}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>물품명</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={newName}
                  placeholder="ex) 우산"
                  onChange={changeName}
                />
              </InputGroup>
            </Modal.Body>
          ) : (
            <Modal.Body className={styles.modalBody}>
              <InputGroup>
                <InputGroup.Text>번호</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={newStartNo}
                  placeholder="ex) 1"
                  onChange={changeStartNo}
                  maxLength={2}
                />
                <InputGroup.Text>~</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={newEndNo}
                  placeholder="ex) 1"
                  onChange={changeEndNo}
                  maxLength={2}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>물품명</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={newName}
                  placeholder="ex) 우산"
                  onChange={changeName}
                />
              </InputGroup>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={closeAddModal}>
              닫기
            </Button>
            <Button
              onClick={() => {
                addItem();
                closeAddModal();
              }}
              disabled={!isValid}
            >
              추가
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AdminItemManaging;
