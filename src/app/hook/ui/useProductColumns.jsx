"use client";

import { Button, Flex, Tag, Tooltip } from "antd";
import formatCurrency from "../../utils/formatCurrency";

const useProductColumns = (
  tabKey,
  handleUpdate,
  handleHideProduct,
  handleDeleteProduct,
  handleRestoreProduct
) => {
  return [
    {
      title: "Ảnh",
      dataIndex: "image_url",
      render: (_, record) => (
        <img
          src={record.image_url}
          alt=""
          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    { title: "ID", dataIndex: "id" },
    {
      title: "Thông tin",
      render: (record) => (
        <Tooltip
          title={
            <div style={{ maxWidth: 300 }}>
              <p>
                <b>{record.name}</b>
              </p>
              <p>
                <b>Giá:</b> {formatCurrency(record.price)}
              </p>
              <p>
                <b>Danh mục:</b> {record.category_name}
              </p>
              <p>
                <b>Mô tả:</b> {record.description}
              </p>
            </div>
          }
        >
          <div style={{ maxWidth: 200, cursor: "pointer" }}>
            <b>{record.name}</b>
            <br />
            <small>{record.description?.slice(0, 30)}...</small>
          </div>
        </Tooltip>
      ),
    },
    { title: "Nhà cung cấp", dataIndex: "supplier_name" },
    {
      title: "Trạng thái",
      render: (_, record) => {
        const status =
          record.isDeleted === 1
            ? { color: "red", label: "Đã xoá" }
            : record.disabled === 1
            ? { color: "orange", label: "Đã vô hiệu hoá" }
            : { color: "green", label: "Đang hoạt động" };
        return <Tag color={status.color}>{status.label}</Tag>;
      },
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <Flex gap={10}>
            {tabKey === "active" && (
              <>
                <Button type="primary" onClick={() => handleUpdate(record)}>
                  Cập nhật
                </Button>
                <Button onClick={() => handleHideProduct(record.id)}>
                  Ẩn sản phẩm
                </Button>
                <Button danger onClick={() => handleDeleteProduct(record.id)}>
                  Xoá
                </Button>
              </>
            )}

            {tabKey === "hidden" && (
              <>
                <Button onClick={() => handleHideProduct(record.id)}>
                  Bỏ ẩn
                </Button>
                <Button danger onClick={() => handleDeleteProduct(record.id)}>
                  Xoá
                </Button>
              </>
            )}

            {tabKey === "deleted" && (
              <Button onClick={() => handleRestoreProduct(record.id)}>
                Khôi phục
              </Button>
            )}
          </Flex>
        );
      },
    },
  ];
};

export default useProductColumns;
