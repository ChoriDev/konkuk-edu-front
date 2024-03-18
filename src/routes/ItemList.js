import { useEffect, useState } from "react";
import moment from "moment";
import useAxios from "../hooks/useAxios";
import { Spinner, Table } from "react-bootstrap";
import styles from "../css/ItemList.module.css";
import Navbars from "../components/Navbars";

function ItemList() {
  const [response, setResponse] = useState([]);

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
  }, [isLoading]);

  return (
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>no</th>
                <th>물품명</th>
                <th>대여 일자</th>
                <th>반납 예정 일자</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {response.length === 0 ? (
                <tr>
                  <td colSpan="5">데이터가 없습니다</td>
                </tr>
              ) : (
                response.map((item) => (
                  <tr key={item.id}>
                    <td>{item.no}</td>
                    <td>{item.name}</td>
                    <td>
                      {item.rental_date === null
                        ? "."
                        : moment(item.rental_date).format("M월 D일 H시 m분")}
                    </td>
                    <td>
                      {item.deadline_date === null
                        ? "."
                        : moment(item.deadline_date).format("M월 D일 H시 m분")}
                    </td>
                    <td>{item.state ? "대여 중" : "대여 가능"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ItemList;
