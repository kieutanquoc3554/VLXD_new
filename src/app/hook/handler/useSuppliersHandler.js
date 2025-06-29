import { message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const useSuppliersHandler = ({
  form,
  setSelectedSupplier,
  selectedSupplier,
  setIsModalOpen,
  fetchSuppliers,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedSupplier, setSearchedSupplier] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    form.setFieldsValue(supplier);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedSupplier) {
        await axios.put(`/api/supplier/${selectedSupplier.id}`, values);
        message.success("Cập nhật danh mục thành công!");
      } else {
        await axios.post(`/api/supplier`, values);
        message.success("Thêm cung cấp thành công!");
      }
      fetchSuppliers();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi lưu nhà cung cấp!" + error);
    }
  };

  const handleDeleteSupplier = (id) => {
    try {
      Modal.confirm({
        title: "Xác nhận xoá nhà cung cấp",
        content:
          "Khi xoá nhà cung cấp, các sản phẩm thuộc nhà cung cấp đó sẽ bị gán lại giá trị, có thể ảnh hưởng đến việc kiểm tra, tham khảo trong tương lai. Nếu bạn có nhu cầu khôi phục, vui lòng di chuyển đến thẻ Danh sách nhà cung cấp đã xoá",
        okText: "Xoá",
        okType: "danger",
        cancelText: "Huỷ",
        async onOk() {
          try {
            await axios.post(`${apiUrl}/api/supplier/${id}`, {});
            message.success("Đã xoá nhà cung cấp");
            fetchSuppliers();
          } catch (error) {
            message.error("Đã có lỗi xảy ra!" + error);
          }
        },
      });
    } catch (error) {
      message.error("Có lỗi xảy ra!" + error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.post(`/api/supplier/${id}/restore`, {});
      message.success("Đã khôi phục thành công");
      fetchSuppliers();
    } catch (error) {
      message.error("Đã có lỗi xảy ra" + error);
    }
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await axios.get(
        `/api/supplier/search?query=${searchTerm}`
      );
      setSearchedSupplier(response.data);
      message.success("Tìm kiếm hoàn tất!");
    } catch (error) {
      message.error("Có lỗi trong quá trình tìm kiếm");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchedSupplier([]);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchedSupplier,
    isSearching,
    handleAddSupplier,
    handleEditSupplier,
    handleSubmit,
    handleDeleteSupplier,
    handleRestore,
    handleSearch,
  };
};

export default useSuppliersHandler;
