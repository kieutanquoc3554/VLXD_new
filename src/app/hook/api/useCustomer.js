import axios from "axios";
import { useState } from "react";

export default function useCustomer() {
  const [customers, setCustomers] = useState([]);
  const [deletedCustomers, setDeletedCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/customer`);
      setCustomers(data.filter((customer) => !customer.deleted));
      setDeletedCustomers(data.filter((customer) => customer.deleted));
    } catch (error) {
      console.log("Có lỗi xảy ra!" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return { customers, deletedCustomers, isLoading, fetchCustomers };
}
