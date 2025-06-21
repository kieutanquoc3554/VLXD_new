import { Flex, Input, Select } from "antd";

const SearchFilterCategory = ({ handleSearch, setFilter }) => {
  return (
    <Flex gap={10}>
      <Input
        placeholder="Tìm kiếm danh mục..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Lọc danh mục"
        onChange={setFilter}
        style={{ width: 160 }}
      >
        <Select.Option value={null}>Tất cả</Select.Option>
        <Select.Option value={false}>Hoạt động</Select.Option>
        <Select.Option value={true}>Tạm ẩn</Select.Option>
      </Select>
    </Flex>
  );
};

export default SearchFilterCategory;
