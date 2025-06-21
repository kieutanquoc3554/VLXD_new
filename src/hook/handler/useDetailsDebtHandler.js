"use client";
import { useState } from "react";

export default function useDetailsDebtHandler() {
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [isModalViewDetails, setIsModalViewDetails] = useState(false);

  const handleViewDetails = (debt) => {
    setIsModalViewDetails(true);
    setSelectedDebt(debt);
  };

  return {
    selectedDebt,
    isModalViewDetails,
    handleViewDetails,
    setIsModalViewDetails,
  };
}
