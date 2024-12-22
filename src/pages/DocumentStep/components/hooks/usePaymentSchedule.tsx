/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const usePaymentSchedule = (id: string) => {
  const api = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${api}/admin/application/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.credit.paymentSchedule || []); 
      } catch (err) {
		if (err instanceof Error) {
			setError(err.message)
		  }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};

export default usePaymentSchedule;
