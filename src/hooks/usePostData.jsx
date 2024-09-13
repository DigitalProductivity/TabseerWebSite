import { useState } from 'react';

function usePostData() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (url, data) => {

    setIsLoading(true);
    setError(null);

    try {
        
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setResponseData(responseData);

    } catch (error) {

      setError(error);

    } finally {

      setIsLoading(false);

    }
  };

  return { postData, responseData, error, isLoading };
}

export default usePostData;
