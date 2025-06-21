import { Input, DatePicker, Button } from "antd";
const { Search } = Input;

const HeadingButtonOrder = ({
  setSearchTerm,
  onSearch,
  setOrderDate,
  onFilter,
}) => {
  return (
    <>
      <Search
        onSearch={onSearch}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm đơn hàng (theo mã đơn hàng, theo tên khách hàng)"
        enterButton
      />
      <DatePicker
        placeholder="Ngày đặt hàng"
        style={{ width: "20%" }}
        onChange={(date, dateString) => setOrderDate(dateString)}
      />
      <Button type="dashed" onClick={() => onFilter()}>
        Tìm
      </Button>
    </>
  );
};

export default HeadingButtonOrder;
