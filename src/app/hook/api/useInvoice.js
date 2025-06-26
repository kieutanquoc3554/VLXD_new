import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useInvoice() {
  const [invoice, setInvoice] = useState([]);
  const [customerInvoice, setCustomerInvoice] = useState([]);
  const [supplierInvoice, setSupplierInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchInvoice = async () => {
    try {
      setIsLoading(true);
      const invoiceResponse = await axios.get(`/api/bill`);
      setInvoice(invoiceResponse.data);
      setCustomerInvoice(
        invoiceResponse.data.filter((i) => i.type === "customer")
      );
      setSupplierInvoice(
        invoiceResponse.data.filter((i) => i.type === "supplier")
      );
    } catch (error) {
      message.error("Có lỗi khi lấy danh sách hoá đơn", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  return { invoice, customerInvoice, supplierInvoice, isLoading, fetchInvoice };
}
