import { Input, Select } from "antd";

const SearchFilterInput = ({ categories, filteredKey }) => {
  return (
    <>
      <Input.Search placeholder="Tìm kiếm sản phẩm" />
      <Select
        mode="multiple"
        maxCount={categories.length}
        value={filteredKey}
        style={{ width: "100%" }}
        onChange={filteredKey}
        placeholder="Chọn danh mục sản phẩm"
        options={categories.map((c) => ({
          value: c.id,
          label: c.name,
        }))}
      />
    </>
  );
};

export default SearchFilterInput;
