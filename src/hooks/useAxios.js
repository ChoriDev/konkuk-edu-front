import { useState } from "react";
import axios from "axios";

function useAxios({ method, url, params, requestData, onSuccess }) {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const request = async () => {
    setIsLoading(true);
    try {
      let response;
      switch (method) {
        case "GET":
          response = await axios.get(url, { params });
          break;
        case "POST":
          response = await axios.post(url, requestData);
          break;
        case "PATCH":
          response = await axios.patch(url, requestData);
          break;
        case "PUT":
          response = await axios.put(url, requestData);
          break;
        case "DELETE":
          response = await axios.delete(url);
          break;
        default:
          throw new Error("지원하지 않는 HTTP 요청입니다.");
      }
      setResponseData(response.data);
      // 요청 성공 후에 onSuccess 콜백을 호출
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { responseData, error, isLoading, request };
}

export default useAxios;
