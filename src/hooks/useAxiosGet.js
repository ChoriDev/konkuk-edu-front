import { useState, useEffect } from "react";
import axios from "axios";

function useAxiosGet({ url, params }) {
  const [responseData, setResponseData] = useState(null); // api 데이터 저장
  const [error, setError] = useState(null); // 에러 발생 상태
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        params: params,
      });
      setResponseData(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { responseData, error, isLoading, refetch: fetchData };
}

export default useAxiosGet;
