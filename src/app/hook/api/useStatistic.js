"use client";
import { message } from "antd";
import axios from "axios";
import { useState } from "react";

export default function useStatistic() {
  const [statisticOverview, setStatisticOverview] = useState([]);
  const [statisticByMonthOverview, setStatisticByMonthOverview] = useState([]);
  const [statisticByDateOverview, setStatisticByDateOverview] = useState([]);
  const [bestSellingProduct, setBestSellingProduct] = useState([]);

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

  const fetchStatisticByDateOverview = async (startDate, endDate) => {
    try {
      const statistic = await axios.get(
        `http://localhost:3000/api/statistic/overview/bydate?startDate=${startDate}&endDate=${endDate}`
      );
      if (statistic) {
        setStatisticByDateOverview(statistic.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchBestSellingProduct = async () => {
    try {
      const statistic = await axios.get(
        "http://localhost:3000/api/statistic/overview/bestSelling"
      );
      if (statistic) {
        setBestSellingProduct(statistic.data);
      }
    } catch (error) {
      message.error(
        "Có lỗi khi lấy danh sách sản phẩm bán chạy!",
        error.message
      );
    }
  };
  return {
    statisticOverview,
    statisticByMonthOverview,
    statisticByDateOverview,
    bestSellingProduct,
    fetchStatisticOverview,
    fetchStatisticByMonthOverview,
    fetchStatisticByDateOverview,
    fetchBestSellingProduct,
  };
}
