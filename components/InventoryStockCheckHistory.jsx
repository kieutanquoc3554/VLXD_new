"use client";

import { Button, Modal, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const InventoryStockCheckHistory = () => {
  const [session, setSession] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/inventory/stock-check/all`)
      .then((res) => setSession(res.data));
  }, []);

  const handleViewDetails = (created_time, created_by) => {
    axios
      .get(`${apiUrl}/api/inventory/stock-check/detail`, {
        params: { created_time, created_by },
      })
      .then((res) => {
        setDetails(res.data);
        setModalOpen(true);
      });
  };

  const exportSessionToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Báo cáo kiểm kho");
    // Tiêu đề cột
    sheet.columns = [
      { header: "Thời gian", key: "created_at", width: 25 },
      { header: "Người kiểm", key: "employee_name", width: 20 },
      { header: "Số lượng sản phẩm", key: "total_products", width: 20 },
      { header: "Ghi chú", key: "note_report", width: 40 },
    ];
    // Style cho header
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCE5FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Dữ liệu
    session.forEach((item) => {
      sheet.addRow({
        created_at: item.created_at,
        employee_name: item.employee_name,
        total_products: item.total_products,
        note_report: item.note_report,
      });
    });
    // Style cho từng ô
    sheet.eachRow((row, index) => {
      if (index !== 1) {
        row.eachCell((cell) => {
          cell.alignment = { vertical: "middle", horizontal: "left" };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "bao_cao_kiem_kho.xlsx");
  };

  const exportDetailsToExcel = () => {
    const exportData = details.map((d) => ({
      "Sản phẩm": d.product_name,
      "Số lượng hệ thống": d.system_quantity,
      "Số lượng thực tế": d.actual_quantity,
      "Chênh lệch": d.difference,
      "Ghi chú": d.note,
    }));
    const workSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, workSheet, "Chi tiết kiểm kho");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(new Blob([excelBuffer]), "chi_tiet_kiem_kho.xlsx");
  };

  const columns = [
    { title: "Thời gian", dataIndex: "created_at" },
    { title: "Người kiểm", dataIndex: "employee_name" },
    { title: "Số lượng sản phẩm", dataIndex: "total_products" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Button
          onClick={() =>
            handleViewDetails(record.created_at, record.created_by)
          }
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const detailColumns = [
    { title: "Sản phẩm", dataIndex: "product_name" },
    { title: "Số lượng hệ thống", dataIndex: "system_quantity" },
    { title: "Số lượng thực tế", dataIndex: "actual_quantity" },
    {
      title: "Số lượng chênh lệch",
      dataIndex: "difference",
      render: (value) => {
        let color = "default";
        if (value > 0) color = "green";
        else if (value < 0) color = "red";
        return <Tag color={color}>{value > 0 ? `+${value}` : value}</Tag>;
      },
    },
    { title: "Ghi chú", dataIndex: "note" },
  ];

  return (
    <>
      <Button onClick={exportSessionToExcel} type="primary">
        Xuất danh sách Excel
      </Button>
      <Table rowKey="report_id" dataSource={session} columns={columns} />
      <Modal
        width={"80%"}
        open={modalOpen}
        title="Chi tiết phiếu kiểm kho"
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Button onClick={exportDetailsToExcel} type="primary">
          Xuất chi tiết phiếu kiểm kho
        </Button>
        <Table
          rowKey="id"
          dataSource={details}
          columns={detailColumns}
          pagination={false}
        />
      </Modal>
    </>
  );
};

export default InventoryStockCheckHistory;
