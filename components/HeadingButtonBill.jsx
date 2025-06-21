import { Button, Flex, Input, DatePicker } from "antd";
import { BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
const { Search } = Input;

const HeadingButtonBill = ({
  onSearch,
  onExportPDF,
  handleExportExcel,
  setPaymentDate,
  handleFilterInvoiceByDate,
}) => {
  return (
    <Flex gap={10} align="center">
      <Search
        placeholder="Tìm kiếm hoá đơn (theo mã hoá đơn)"
        onSearch={onSearch}
        enterButton
      />
      <>
        <DatePicker
          onChange={(date, dateString) => setPaymentDate(dateString)}
          placeholder="Ngày thanh toán"
          style={{ width: "20%" }}
        />
        <Button type="dashed" onClick={handleFilterInvoiceByDate}>
          Tìm
        </Button>
      </>
      <Button
        type="primary"
        style={{ backgroundColor: "#AD0B00" }}
        onClick={() => onExportPDF()}
      >
        <BsFiletypePdf />
        Xuất PDF
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#0D7941" }}
        onClick={() => handleExportExcel()}
      >
        <RiFileExcel2Line />
        Xuất Excel
      </Button>
    </Flex>
  );
};

export default HeadingButtonBill;
