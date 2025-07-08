import { message } from "antd";
import axios from "axios";
import { useState } from "react";

export default function useStatistic() {
  const [statisticOverview, setStatisticOverview] = useState([]);

  const fetchStatisticOverview = async () => {
    try {
      const statistic = await axios.get(
        "http://localhost:3000/api/statistic/overview"
      );
      setStatisticOverview(statistic.data);
      message.success("Lấy dữ liệu thống kê thành công!");
    } catch (error) {
      message.error(`Có lỗi xảy ra - ${error?.message}`);
    }
  };

  return { statisticOverview, fetchStatisticOverview };
}
