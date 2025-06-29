"use client";
import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

export default function useSupplierDebtHandler() {
  const [selectedSupplierDebt, setSelectedSupplierDebt] = useState(null);
  const [isOpenDetailDebtModal, setIsOpenDetailDebtModal] = useState(false);
  const [isOpenPaySupplierDebt, setIsOpenPaySupplierDebt] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleViewSupplierDebtDetails = (sup_debt) => {
    console.log(sup_debt);
    setSelectedSupplierDebt(sup_debt);
    setIsOpenDetailDebtModal(true);
  };

  const handlePaySupplierDebt = () => {
    setIsOpenPaySupplierDebt(true);
  };

  const handleSubmit = async (details) => {
    if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
      return message.error("Thiếu số tiền cần thanh toán hợp lệ");
    }
    if (!details.id) {
      return message.error("Không có công nợ nào được chọn để thanh toán");
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/debt/supplierDebt/${details.id}`,
        {
          amount: Number(paymentAmount),
        }
      );
      message.success("Thanh toán thành công!");
      console.log(response.data);
      setIsOpenPaySupplierDebt(false);
      setPaymentAmount("");
    } catch (error) {
      console.error(error);
      message.error("Thanh toán thất bại");
    }
  };

  const exportToPDF = async (detailSupplierDebt) => {
    if (!detailSupplierDebt) return;

    const documentDefinition = {
      content: [
        { text: "Chi tiết công nợ nhà cung cấp", style: "header" },
        {
          text: `Tên nhà cung cấp: ${detailSupplierDebt.supplier_name}`,
          margin: [0, 10],
        },
        { text: `SĐT: ${detailSupplierDebt.phone || "Không có"}` },
        {
          text: `Ngày nhập hàng: ${new Date(
            detailSupplierDebt.created_at
          ).toLocaleDateString()}`,
        },
        { text: `Ghi chú: ${detailSupplierDebt.note || ""}` },
        {
          columns: [
            {
              text: `Tổng tiền: ${Number(
                detailSupplierDebt.amount
              ).toLocaleString()} đ`,
            },
            {
              text: `Đã trả: ${Number(
                detailSupplierDebt.paid_amount
              ).toLocaleString()} đ`,
            },
            {
              text: `Còn nợ: ${Number(
                detailSupplierDebt.remaining_amount
              ).toLocaleString()} đ`,
              bold: true,
            },
          ],
          margin: [0, 10],
        },
        { text: "Lịch sử thanh toán", style: "subheader", margin: [0, 10] },
        detailSupplierDebt.payments?.length > 0
          ? {
              table: {
                widths: ["*", "*", "*"],
                body: [
                  ["Ngày thanh toán", "Số tiền", "Ghi chú"],
                  ...detailSupplierDebt.payments.map((p) => [
                    new Date(p.payment_date).toLocaleDateString(),
                    `${Number(p.amount).toLocaleString()} đ`,
                    p.note || "",
                  ]),
                ],
              },
            }
          : { text: "Không có lịch sử thanh toán." },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: { fontSize: 14, bold: true },
      },
      defaultStyle: { fontSize: 12 },
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  return {
    selectedSupplierDebt,
    isOpenDetailDebtModal,
    setIsOpenDetailDebtModal,
    handleViewSupplierDebtDetails,
    isOpenPaySupplierDebt,
    setIsOpenPaySupplierDebt,
    handlePaySupplierDebt,
    paymentAmount,
    setPaymentAmount,
    handleSubmit,
    exportToPDF,
  };
}
