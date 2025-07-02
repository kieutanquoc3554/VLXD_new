import useCategory from "@/app/hook/api/useCategory";
import { Select } from "antd";
import { useEffect, useState } from "react";

const FilterProduct = ({ setFilterKeyword }) => {
  const [options, setOptions] = useState([]);
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const formatted = categories.map((c) => ({
      value: c.id,
      label: <span>{c.name}</span>,
    }));
    setOptions(formatted);
  }, [categories]);

  return (
    <Select
      onChange={(value) => setFilterKeyword(value)}
      style={{ width: 300 }}
      options={options}
      placeholder="Chọn danh mục"
      allowClear
    />
  );
};

export default FilterProduct;
