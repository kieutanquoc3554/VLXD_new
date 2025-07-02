"use client";
import { Input } from "antd";
const { Search } = Input;

const SearchButtonProduct = ({ onChange }) => {
  return (
    <Search
      style={{ width: "20%" }}
      placeholder="Tìm kiếm sản phẩm"
      enterButton
      onChange={onChange}
    />
  );
};

export default SearchButtonProduct;
