"use client";
import { message } from "antd";
import axios from "axios";
import { useState } from "react";

export default function useStatistic() {
  const [statisticOverview, setStatisticOverview] = useState([]);
  const [statisticByMonthOverview, setStatisticByMonthOverview] = useState([]);

  const fetchStatisticOverview = async () => {
    try {
      const statistic = await axios.get(
        "http://localhost:3000/api/statistic/overview"
      );
      setStatisticOverview(statistic.data);
    } catch (error) {
      message.error(`Có lỗi xảy ra - ${error?.message}`);
    }
  };

  const fetchStatisticByMonthOverview = async () => {
    try {
      const statistic = await axios.get(
        "http://localhost:3000/api/statistic/overview/month"
      );
      setStatisticByMonthOverview(statistic.data);
    } catch (error) {
      message.error(`Có lỗi xảy ra - ${error?.message}`);
    }
  };
  return {
    statisticOverview,
    statisticByMonthOverview,
    fetchStatisticOverview,
    fetchStatisticByMonthOverview,
  };
}
