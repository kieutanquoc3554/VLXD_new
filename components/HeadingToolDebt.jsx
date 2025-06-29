import { Input, DatePicker, Button, Flex, Select } from "antd";
const { Search } = Input;
const { Option } = Select;

const HeadingToolDebt = ({
  setSearchTerm,
  onSearch,
  setDate,
  setStatus,
  onFilter,
  onFilterByStatus,
}) => {
  return (
    <Flex align="center" gap={10}>
      <Search
        placeholder="Tìm kiếm công nợ"
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={onSearch}
        enterButton
      />
      <Select
        placeholder="Trạng thái công nợ"
        style={{ width: 150 }}
        onChange={(value) => setStatus(value)}
        allowClear
      >
        <Option value="paid">Đã thanh toán</Option>
        <Option value="unpaid">Chưa thanh toán/thanh toán một phần</Option>
      </Select>
      <Button type="default" onClick={onFilterByStatus}>
        Tìm
      </Button>
      <DatePicker
        style={{ width: "30%" }}
        placeholder="Ngày đặt hàng"
        onChange={(date, dateString) => setDate(dateString)}
      />
      <Button type="default" onClick={onFilter}>
        Tìm
      </Button>
      <Button type="primary" style={{ backgroundColor: "#AD0B00" }}>
        Xuất PDF công nợ
      </Button>
      <Button type="primary" style={{ backgroundColor: "#0D7941" }}>
        Xuất Excel công nợ
      </Button>
    </Flex>
  );
};

export default HeadingToolDebt;
