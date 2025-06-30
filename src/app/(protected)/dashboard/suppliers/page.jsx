"use client";
import { Form } from "antd";
import { useState } from "react";
import useSuppliers from "../../../hook/api/useSuppliers";
import useSuppliersHandler from "../../../hook/handler/useSuppliersHandler";
import SupplierColumn from "../../../../../components/SupplierColumn";
import SupplierToolbar from "../../../../../components/SupplierToolbar";
import SupplierTabs from "../../../../../components/SupplierTabs";
import SupplierModal from "../../../../../components/SupplierModal";

export default function Suppliers() {
  const [form] = Form.useForm();
  const { fetchSuppliers, suppliers, deletedSuppliers, loading } =
    useSuppliers();
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
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
  } = useSuppliersHandler({
    form,
    setSelectedSupplier,
    selectedSupplier,
    setIsModalOpen,
    fetchSuppliers,
  });
  const { columns, columnsDeleted } = SupplierColumn({
    handleEditSupplier,
    handleDeleteSupplier,
    handleRestore,
  });
  return (
    <div>
      <h2>Quản lý nhà cung cấp</h2>
      <SupplierToolbar
        setSearchTerm={setSearchTerm}
        handleSearchSupplier={handleSearch}
        handleAddSupplier={handleAddSupplier}
      />
      <SupplierTabs
        loading={loading}
        columns={columns}
        columnsDeleted={columnsDeleted}
        deletedSuppliers={deletedSuppliers}
        suppliers={suppliers}
        isSearching={isSearching}
        searchedSupplier={searchedSupplier}
        searchTerm={searchTerm}
      />
      <SupplierModal
        form={form}
        selectedSupplier={selectedSupplier}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
