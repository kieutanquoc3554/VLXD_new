"use client";
import useInvoice from "@/hook/api/useInvoice";
import HeadingButtonBill from "./HeadingButtonBill";
import useInvoiceHandler from "@/hook/handler/useInvoiceHandler";
import { useState } from "react";
import InvoiceTabs from "../components/InvoiceTabs";
const TabsBill = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { invoice, customerInvoice, supplierInvoice } = useInvoice();
  const {
    handleSearch,
    handleExportPDF,
    searchTerm,
    filteredInvoice,
    filteredCustomerInvoice,
    filteredSupplierInvoice,
    handleExportExcel,
    handleFilterInvoiceByDate,
    setPaymentDate,
    filtered,
  } = useInvoiceHandler({
    selectedTab,
    invoice,
    customerInvoice,
    supplierInvoice,
  });

  return (
    <>
      <HeadingButtonBill
        onSearch={handleSearch}
        onExportPDF={handleExportPDF}
        handleExportExcel={handleExportExcel}
        setPaymentDate={setPaymentDate}
        handleFilterInvoiceByDate={handleFilterInvoiceByDate}
      />
      <InvoiceTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        searchTerm={searchTerm}
        filtered={filtered}
        filteredInvoice={filteredInvoice}
        filteredCustomerInvoice={filteredCustomerInvoice}
        filteredSupplierInvoice={filteredSupplierInvoice}
        invoice={invoice}
        customerInvoice={customerInvoice}
        supplierInvoice={supplierInvoice}
      />
    </>
  );
};

export default TabsBill;
