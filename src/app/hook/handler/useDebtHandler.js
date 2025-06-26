"use client";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebtHandler({
  detailDebt,
  fetchDebt,
  fetchViewDetails,
}) {
  const [editingDebt, setEditingDebt] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (detailDebt) {
      setAmount(detailDebt.paid_amount || 0);
    }
  }, [detailDebt]);

  const handleUpdateDebt = () => {
    setEditingDebt(true);
    setAmount(detailDebt.paid_amount);
  };

  const handleSubmit = async () => {
    try {
      if (!amount || !paymentMethod) {
        return message.error("Thiếu số tiền hoặc phương thức thanh toán");
      }
      const amount_customer = parseFloat(amount);
      const response = await axios.post(`/api/debt/${detailDebt.id}`, {
        id: detailDebt.id,
        amount: amount_customer,
        payment_method: paymentMethod,
      });
      message.success(response.data.message);
      fetchDebt();
      fetchViewDetails();
    } catch (error) {
      console.log(`Có lỗi khi cập nhật công nợ`, error);
    }
  };

  return {
    handleUpdateDebt,
    handleSubmit,
    editingDebt,
    setPaymentMethod,
    setEditingDebt,
    amount,
    setAmount,
  };
}
