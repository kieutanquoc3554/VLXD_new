import axios from "axios";
import { useState } from "react";
import useInvoice from "../api/useInvoice";
import pdfMake from "pdfmake/build/pdfmake";
import formatCurrency from "../../utils/formatCurrency";
import moment from "moment";
import { message } from "antd";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function useInvoiceHandler({
  selectedTab,
  invoice,
  customerInvoice,
  supplierInvoice,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [filteredCustomerInvoice, setFilteredCustomerInvoice] = useState([]);
  const [filteredSupplierInvoice, setFilteredSupplierInvoice] = useState([]);
  const [paymentDate, setPaymentDate] = useState(null);
  const [filtered, setFiltered] = useState(false);
  const { fetchInvoice } = useInvoice();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (!value) {
      fetchInvoice();
    }
    try {
      const response = await axios.get(
        `${apiUrl}/api/bill/search?query=${value}`
      );
      setFilteredInvoice(response.data.all);
      setFilteredCustomerInvoice(response.data.customer);
      setFilteredSupplierInvoice(response.data.supplier);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  const getDataForSelectedTab = () => {
    if (selectedTab === "1")
      return filteredInvoice.length === 0 ? invoice : filteredInvoice;
    if (selectedTab === "2")
      return filteredCustomerInvoice.length === 0
        ? customerInvoice
        : filteredCustomerInvoice;
    if (selectedTab === "3")
      return filteredSupplierInvoice.length === 0
        ? supplierInvoice
        : filteredSupplierInvoice;
    return [];
  };

  const handleExportPDF = () => {
    const data = getDataForSelectedTab()
      .slice()
      .sort((a, b) => a.id - b.id);

    let title = "";
    if (selectedTab === "1") title = "Danh sách tất cả hóa đơn";
    else if (selectedTab === "2") title = "Danh sách hóa đơn khách hàng";
    else if (selectedTab === "3") title = "Danh sách hóa đơn nhà cung cấp";

    //  in4
    const companyInfo = {
      name: "Vật liệu Xây dựng & Trang trí nội thất Kim Dung",
      address: "Phường Tân Thành, Thành phố Cà Mau",
      phone: "Hotline: 0916 35 22 35",
      email: "Chưa thêm",
    };
    // content
    const headers = [
      { text: "Mã hóa đơn", style: "tableHeader" },
      { text: "Mã tham chiếu", style: "tableHeader" },
      { text: "Tên khách hàng/nhà cung cấp", style: "tableHeader" },
      { text: "Ngày thanh toán", style: "tableHeader" },
      { text: "Tổng tiền", style: "tableHeader" },
      { text: "Đã trả", style: "tableHeader" },
      { text: "Còn lại", style: "tableHeader" },
      { text: "Ghi chú", style: "tableHeader" },
    ];

    const body = [
      headers,
      ...data.map((item) => [
        item.id?.toString() || "",
        item.referenceId.toString() || "",
        item.name || "",
        moment(item.paymentDate).format("HH:mm DD/MM/YYYY") || "",
        formatCurrency(item.totalAmount) || "0",
        formatCurrency(item.paidAmount) || "0",
        formatCurrency(item.remainingAmount) || "0",
        item.note || "",
      ]),
    ];

    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 100, 40, 40], // l, t, r, b
      header: [
        {
          columns: [
            {
              width: "auto",
              text: companyInfo.name,
              style: "companyName",
            },
            {
              width: "*",
              text: "",
            },
            {
              width: "auto",
              text: companyInfo.phone,
              style: "companyPhone",
              alignment: "right",
            },
          ],
          margin: [40, 10, 40, 0],
        },
        {
          columns: [
            {
              width: "auto",
              text: companyInfo.address,
              style: "companyAddress",
            },
            {
              width: "*",
              text: "",
            },
            {
              width: "auto",
              text: companyInfo.email,
              style: "companyEmail",
              alignment: "right",
            },
          ],
          margin: [40, 0, 40, 10],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 600,
              y2: 0,
              lineWidth: 1,
              lineColor: "#444",
            },
          ],
        },
      ],
      content: [
        {
          text: title,
          style: "header",
          margin: [0, 10, 0, 20],
          alignment: "center",
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", "auto", "auto", "auto", "auto", "*"],
            body: body,
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#eeeeee" : null),
          },
        },
      ],
      styles: {
        companyName: {
          fontSize: 14,
          bold: true,
          color: "#2c3e50",
        },
        companyPhone: {
          fontSize: 10,
          italics: true,
          color: "#34495e",
        },
        companyAddress: {
          fontSize: 10,
          color: "#34495e",
        },
        companyEmail: {
          fontSize: 10,
          italics: true,
          color: "#34495e",
        },
        header: {
          fontSize: 16,
          bold: true,
          marginBottom: 15,
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 9,
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: "black",
        },
      },
      defaultStyle: {
        columnGap: 15,
      },
    };

    pdfMake.createPdf(docDefinition).download(`${title}.pdf`);
  };

  const handleExportExcel = () => {
    const data = getDataForSelectedTab()
      .slice()
      .sort((a, b) => a.id - b.id);
    if (!data.length) {
      message.error("Không có dữ liệu để xuất file Excel");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Danh sách hoá đơn");

    // Thiết lập cột
    sheet.columns = [
      { header: "Mã hoá đơn", key: "id", width: 15 },
      { header: "Mã tham chiếu", key: "referenceId", width: 15 },
      { header: "Tên khách hàng/nhà cung cấp", key: "name", width: 40 },
      { header: "Ngày thanh toán", key: "paymentDate", width: 20 },
      { header: "Tổng tiền", key: "totalAmount", width: 15 },
      { header: "Đã trả", key: "paidAmount", width: 15 },
      { header: "Còn lại", key: "remainingAmount", width: 15 },
      { header: "Ghi chú", key: "note", width: 30 },
    ];

    // Style Header (dòng 1)
    const headerRow = sheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFEEEEEE" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Ghi dữ liệu
    data.forEach((item) => {
      sheet.addRow({
        id: item.id?.toString() || "",
        referenceId: item.referenceId?.toString() || "",
        name: item.name || "",
        paymentDate: moment(item.paymentDate).format("HH:mm DD/MM/YYYY") || "",
        totalAmount: formatCurrency(item.totalAmount) || 0,
        paidAmount: formatCurrency(item.paidAmount) || 0,
        remainingAmount: formatCurrency(item.remainingAmount) || 0,
        note: item.note || "",
      });
    });

    // Format từng dòng dữ liệu
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // bỏ qua header
      row.eachCell((cell, colNumber) => {
        // Căn trái cho tên, căn giữa cho những cột khác
        const alignment =
          colNumber === 2
            ? { horizontal: "left", wrapText: true }
            : { horizontal: "center" };
        cell.alignment = { vertical: "middle", ...alignment };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const title =
      selectedTab === "1"
        ? "Danh_sach_tat_ca_hoa_don"
        : selectedTab === "2"
        ? "Danh_sach_hoa_don_khach_hang"
        : "Danh_sach_hoa_don_nha_cung_cap";

    const fileName = `${title}_${moment().format("YYYYMMDD_HHmmss")}.xlsx`;

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);
    });
  };

  const handleFilterInvoiceByDate = async () => {
    setFiltered(true);
    if (!paymentDate) {
      message.error("Vui lòng chọn ngày thanh toán và thử lại!");
      fetchInvoice();
    }
    try {
      const response = await axios.get(
        `${apiUrl}/api/bill/filter?date=${paymentDate}`
      );
      setFilteredInvoice(response.data.all);
      setFilteredCustomerInvoice(response.data.customer);
      setFilteredSupplierInvoice(response.data.supplier);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  return {
    handleSearch,
    handleExportPDF,
    getDataForSelectedTab,
    searchTerm,
    filteredInvoice,
    filteredCustomerInvoice,
    filteredSupplierInvoice,
    handleExportExcel,
    paymentDate,
    setPaymentDate,
    handleFilterInvoiceByDate,
    filtered,
  };
}
