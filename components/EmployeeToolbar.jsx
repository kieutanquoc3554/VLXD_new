import { Button, Flex, Input, Select } from "antd";

const { Search } = Input;

const EmployeeToolbar = ({ handleAddEmployee, setSelectedFilterRole }) => {
  return (
    <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
      <Flex gap={12}>
        <Button type="primary" onClick={() => handleAddEmployee()}>
          Thêm nhân viên
        </Button>
        <Button type="default">Xuất danh sách</Button>
      </Flex>
      <Flex gap={12}>
        <Search
          style={{ width: 250 }}
          placeholder="Tìm kiếm nhân viên..."
          enterButton
        />
        <Select
          style={{ width: 180 }}
          showSearch
          placeholder="Lọc danh sách"
          onChange={setSelectedFilterRole}
          options={[
            { value: "manager", label: "Cửa hàng trưởng" },
            { value: "staff", label: "Nhân viên" },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default EmployeeToolbar;
