import { Form, message } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import { useMemo, useRef, useState } from "react";

export default function useCustomerHandler({ fetchCustomers, setSearchTerm }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchedCustomer, setIsSearchedCustomer] = useState([]);
  const [form] = Form.useForm();

  const controllerRef = useRef(null);

  const handleSearch = useMemo(() => {
    return debounce(async (value) => {
      if (!value || value.trim().length < 2) return;
      if (controllerRef.current) controllerRef.current.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        const res = await axios.get(`/api/customer/search?query=${value}`, {
          signal: controller.signal,
        });
        setIsSearchedCustomer(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request bị huỷ");
        } else {
          message.error(err?.response?.data?.message || "Lỗi tìm kiếm");
        }
      }
    }, 500);
  }, []);

  const onChangeInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleUpdateCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    form.setFieldsValue(customer);
  };

  const handleDeleteCustomer = async (id) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content:
        "Khi bạn thực hiện thao tác này, hệ thống sẽ tiến hành xoá thông tin người dùng, vui lòng khi truy cập 'Danh sách khách hàng đã xoá' để khôi phục",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ ",
      async onOk() {
        try {
          const response = await axios.delete(`/api/customer/${id}`);
          if (response.status === 200) {
            message.success("Xoá thành công!");
            fetchCustomers();
          } else {
            message.error("Có lỗi xảy ra!");
          }
        } catch (error) {
          message.error(error);
        }
      },
    });
  };

  const handleRestoreCustomer = async (id) => {
    try {
      const { data } = await axios.post(`/api/customer/${id}`, {});
      message.info(data.message);
      fetchCustomers();
    } catch (error) {
      message.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedCustomer) {
        await axios.put(`/api/customer/${selectedCustomer.id}`, values);
        message.success("Cập nhật thông tin người dùng thành công!");
      } else {
        const response = await axios.post(`/api/customer`, values);
        if (response.status === 200) {
          message.success("Thêm khách hàng mới thành công!");
        }
      }
      fetchCustomers();
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.log(error);
        message.error(error.response.data.message || "Đã xảy ra lỗi!");
      } else {
        message.error("Lỗi kết nối đến server!");
      }
    }
  };

  return {
    form,
    selectedCustomer,
    isModalOpen,
    setIsModalOpen,
    isSearchedCustomer,
    onChangeInput,
    handleSearch,
    handleAddCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer,
    handleRestoreCustomer,
    handleSubmit,
  };
}
