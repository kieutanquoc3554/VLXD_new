"use client";
import {
  Button,
  Image,
  message,
  Modal,
  Upload,
  Form,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AddProductFormModal({
  title,
  open,
  onClose,
  selectedProduct,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const matchedCategory = categories.find(
        (cat) => cat.label === selectedProduct.category_name
      );
      const matchedSupplier = suppliers.find(
        (sup) => sup.label === selectedProduct.supplier_name
      );
      form.setFieldsValue({
        ...selectedProduct,
        category_id: matchedCategory?.value,
        supplier_id: matchedSupplier?.value,
      });
      setImageUrl(selectedProduct.image_url || null);
    }
  }, [selectedProduct, categories, suppliers]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        form.getFieldInstance("name")?.focus();
      }, 200);
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/category`);
      const options = response.data.map((categories) => ({
        label: categories.name,
        value: categories.id,
      }));
      setCategories(options);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/supplier`);
      const options = response.data.map((res) => ({
        label: res.name,
        value: res.id,
      }));
      setSuppliers(options);
    } catch (error) {
      console.log(error);
    }
  };

  const customUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const response = await axios.post(`/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        setImageUrl(response.data.url);
        form.setFieldsValue({ image_url: response.data.url });
        message.success("Tải lên thành công!");
        onSuccess("ok");
      } else {
        throw new Error(response.data.error || "Lỗi không xác định");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Upload ảnh thất bại");
      onError(error);
    }
    setUploading(false);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (selectedProduct) {
        const response = await axios.put(
          `${apiUrl}/api/products/${selectedProduct.id}`,
          values,
          {
            withCredentials: true,
          }
        );
        message.success(response.data.message);
      } else {
        const response = await axios.post(`${apiUrl}/api/products`, values);
        message.success(response.data.message);
      }
      onClose(true);
    } catch (error) {
      message.error("Thêm sản phẩm thất bại!");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        title={selectedProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        onCancel={() => onClose(false)}
        footer={null}
        width={900}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto", paddingRight: 24 }}
      >
        <Form form={form} layout="horizontal" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="category_id"
                label="Danh mục sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục sản phẩm",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn danh mục sản phẩm"
                  optionFilterProp="label"
                  options={categories}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="supplier_id"
                label="Nhà cung cấp"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn nhà cung cấp sản phẩm",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Chọn nhà cung cấp sản phẩm"
                  options={suppliers}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Mô tả sản phẩm">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="import_price" label="Giá nhập vào">
                <Input type="number" placeholder="Nhập giá sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="price" label="Giá bán ra">
                <Input type="number" placeholder="Nhập giá sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stock_quantity" label="Số lượng tồn kho">
                <Input type="number" placeholder="Nhập số lượng tồn" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="unit" label="Đơn vị tính">
                <Select
                  placeholder="Chọn đơn vị tính"
                  options={[
                    { label: "Cái", value: "cái" },
                    { label: "Kg", value: "kg" },
                    { label: "Tấm", value: "tấm" },
                    { label: "Bao", value: "bao" },
                    { label: "Mét", value: "m" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Hình ảnh sản phẩm">
                <Upload
                  customRequest={customUpload}
                  showUploadList={false}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />} loading={uploading}>
                    Tải lên ảnh sản phẩm
                  </Button>
                </Upload>
                <Form.Item name="image_url" noStyle>
                  <Input type="hidden" />
                </Form.Item>
                {imageUrl && (
                  <div style={{ marginTop: 16 }}>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={submitting}>
            {title}
          </Button>
        </Form>
      </Modal>
    </>
  );
}
