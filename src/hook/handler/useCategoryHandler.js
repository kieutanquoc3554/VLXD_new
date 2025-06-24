import debounce from "lodash.debounce";
import { message, Modal } from "antd";
import axios from "axios";

export const useCategoryHandler = ({
  form,
  setSelectedCategory,
  setIsModalOpen,
  selectedCategory,
  fetchCategories,
  setSearchTerm,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue(category);
    setIsModalOpen(true);
  };

  const handleDisable = async (id, disabled) => {
    try {
      const { data: category } = await axios.get(`/api/category/${id}`);
      await axios.put(`/api/category/${id}`, {
        name: category.name,
        description: category.description,
        disabled,
      });
      message.success(
        disabled ? "Đã tạm ẩn danh mục!" : "Đã kích hoạt danh mục!"
      );
      fetchCategories();
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái danh mục!" + error);
    }
  };

  const handleSoftDelete = async (id, disabled) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc chắn muốn xoá danh mục này không?",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          const { data: category } = await axios.get(`/api/category/${id}`);
          await axios.put(`${apiUrl}/api/category/${id}`, {
            name: category.name,
            description: category.description,
            deleted: true,
            disabled,
          });
          message.success("Đã xoá danh mục!");
          fetchCategories();
        } catch (error) {
          message.error("Có lỗi xảy ra!" + error);
        }
      },
    });
  };

  const handleRestoreCategories = async (id, disabled) => {
    try {
      const { data: category } = await axios.get(
        `${apiUrl}/api/category/${id}`
      );
      await axios.put(`${apiUrl}/api/category/${id}`, {
        name: category.name,
        description: category.description,
        deleted: false,
        disabled,
      });
      message.success("Đã khôi phục danh mục!");
      fetchCategories();
    } catch (error) {
      message.error("Có lỗi xảy ra!" + error);
    }
  };

  const handleDeleteCategory = async (id) => {
    Modal.confirm({
      title: "Xác nhận xoá vĩnh viễn",
      content:
        "Bạn có chắc chắn muốn xoá danh mục này không? Thao tác này sẽ xoá vĩnh viễn danh mục ra khỏi toàn hệ thống, không thể hoàn tác!",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          const { data } = await axios.delete(`${apiUrl}/api/category/${id}`);
          message.success(data.message);
          fetchCategories();
        } catch (error) {
          message.error("Đã có lỗi xảy ra!", error);
        }
      },
    });
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedCategory) {
        await axios.put(
          `${apiUrl}/api/category/${selectedCategory.id}`,
          values
        );
        message.success("Cập nhật danh mục thành công!");
      } else {
        await axios.post(`${apiUrl}/api/category`, values);
        message.success("Thêm danh mục thành công!");
      }
      fetchCategories();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi lưu danh mục!" + error);
    }
  };

  return {
    handleSearch,
    handleEdit,
    handleDisable,
    handleSoftDelete,
    handleRestoreCategories,
    handleDeleteCategory,
    handleAddCategory,
    handleSubmit,
  };
};
