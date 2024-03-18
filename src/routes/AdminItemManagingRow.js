import { useEffect, useState } from "react";
import moment from "moment";
import { Form, Button } from "react-bootstrap";
import useAxios from "../hooks/useAxios";

function AdminItemManagingRow({
  id,
  no,
  name,
  studentId,
  studentName,
  phoneNum,
  rentalDate,
  deadlineDate,
  state,
  reload,
}) {
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newPhoneNum, setNewPhoneNum] = useState("");
  const [isValid, setIsValid] = useState(false);

  const changeStudentId = (e) => {
    setNewStudentId(e.target.value);
  };

  const changeStudentName = (e) => {
    setNewStudentName(e.target.value);
  };

  const changePhoneNum = (e) => {
    setNewPhoneNum(e.target.value);
  };

  useEffect(() => {
    if (newStudentId.length === 9 && newStudentName !== "") {
      setIsValid(true);
    }
  }, [newStudentId, newStudentName]);

  // 물품 대여
  const { request: borrowItem } = useAxios({
    method: "PATCH",
    url: `api/item/${id}`,
    requestData: {
      no: no,
      name: name,
      student_id: newStudentId,
      student_name: newStudentName,
      phone_num: newPhoneNum,
      state: true,
    },
    onSuccess: reload,
  });

  // 물품 반납
  const { request: returnItem } = useAxios({
    method: "PATCH",
    url: `api/item/${id}`,
    requestData: {
      no: no,
      name: name,
      state: false,
    },
    onSuccess: reload,
  });

  return (
    <tr key={id}>
      <td>{no}</td>
      <td>{name}</td>
      <td>
        {studentId === null ? (
          <Form>
            <Form.Control
              type="text"
              value={newStudentId}
              placeholder="학번을 입력하세요"
              onChange={changeStudentId}
              maxLength={9}
            />
          </Form>
        ) : (
          studentId
        )}
      </td>
      <td>
        {studentName === null ? (
          <Form>
            <Form.Control
              type="text"
              value={newStudentName}
              placeholder="이름을 입력하세요"
              onChange={changeStudentName}
              maxLength={20}
            />
          </Form>
        ) : (
          studentName
        )}
      </td>
      <td>
        {phoneNum === null ? (
          <Form>
            <Form.Control
              type="text"
              value={newPhoneNum}
              placeholder="휴대폰 번호를 입력하세요"
              onChange={changePhoneNum}
              maxLength={20}
            />
          </Form>
        ) : (
          phoneNum
        )}
      </td>
      <td>
        {rentalDate === null
          ? "."
          : moment(rentalDate).format("M월 D일 H시 m분")}
      </td>
      <td>
        {deadlineDate === null
          ? "."
          : moment(deadlineDate).format("M월 D일 H시 m분")}
      </td>
      <td>
        {state ? (
          <Button variant="warning" onClick={returnItem}>
            반납
          </Button>
        ) : (
          <Button disabled={!isValid} onClick={borrowItem}>
            대여
          </Button>
        )}
      </td>
      <td>
        <Button variant="danger">삭제</Button>
      </td>
    </tr>
  );
}

export default AdminItemManagingRow;
