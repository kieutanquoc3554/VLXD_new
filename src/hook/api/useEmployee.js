import axios from "axios";
import { useCallback, useState } from "react";

export default function useEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchEmployees = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/auth`);
      setEmployees(data.filter((d) => !d.deleted));
      setDeletedEmployees(data.filter((d) => d.deleted));
    } catch (error) {
      console.error("Lỗi server!", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, employees, deletedEmployees, fetchEmployees };
}
