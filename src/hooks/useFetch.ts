import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (
  url,
  options = {},
  intervalTime = 2 * 60 * 60 * 1000
) => {
  // default intervalTime = 2 hours
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(url, options);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) return;

    fetchData(); // Fetch ngay khi hook được gọi

    const interval = setInterval(() => {
      fetchData(); // Fetch lại mỗi intervalTime
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup interval khi component unmount
  }, [url, JSON.stringify(options), intervalTime]);

  return { response, error, loading };
};
