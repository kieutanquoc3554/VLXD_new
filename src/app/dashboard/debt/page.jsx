"use client";
import useDebt from "@/app/hook/api/useDebt";
import useDetailDebt from "@/app/hook/api/useDetailDebt";
import useDetailSupplierDebt from "@/app/hook/api/useDetailSupplierDebt";
import useDebtFilter from "@/app/hook/handler/useDebtFilter";
import useDebtHandler from "@/app/hook/handler/useDebtHandler";
import useDebtSearch from "@/app/hook/handler/useDebtSearch";
import useDetailsDebtHandler from "@/app/hook/handler/useDetailsDebtHandler";
import useSupplierDebtHandler from "@/app/hook/handler/useSupplierDebtHandler";
import HeadingToolDebt from "../../../../components/HeadingToolDebt";
import TabsDebt from "../../../../components/TabsDebt";
import DebtModal from "../../../../components/DebtModal";
import SupplierDebtModal from "../../../../components/SupplierDebtModal";

export default function DebtPage() {
  const {
    selectedDebt,
    isModalViewDetails,
    handleViewDetails,
    setIsModalViewDetails,
  } = useDetailsDebtHandler();
  const { detailDebt, fetchViewDetails } = useDetailDebt(selectedDebt);
  const { debt, fetchDebt, supplierDebt } = useDebt(selectedDebt);
  const {
    editingDebt,
    amount,
    setAmount,
    setEditingDebt,
    handleUpdateDebt,
    handleSubmit,
    setPaymentMethod,
  } = useDebtHandler({ detailDebt, fetchDebt, fetchViewDetails });
  const {
    selectedSupplierDebt,
    isOpenDetailDebtModal,
    handleViewSupplierDebtDetails,
    setIsOpenDetailDebtModal,
    isOpenPaySupplierDebt,
    handlePaySupplierDebt,
    setIsOpenPaySupplierDebt,
  } = useSupplierDebtHandler({});
  const { detailSupplierDebt, fetchSupplierDebtDetail } =
    useDetailSupplierDebt(selectedSupplierDebt);
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    filteredCustomerDebt,
    filteredSupplierDebt,
    isSearched,
    setIsSearched,
  } = useDebtSearch();
  const {
    date,
    status,
    setDate,
    setStatus,
    filteredCustomerByDate,
    filteredSupplierByDate,
    filteredCustomerByStatus,
    filteredSupplierByStatus,
    handleFilterByStatus,
    handleFilterByDate,
  } = useDebtFilter({ setIsSearched });

  return (
    <>
      <h2>Quản lý công nợ</h2>
      <HeadingToolDebt
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        setDate={setDate}
        setStatus={setStatus}
        onFilter={handleFilterByDate}
        onFilterByStatus={handleFilterByStatus}
      />
      <TabsDebt
        supplierDebt={supplierDebt}
        debt={debt}
        handleViewDetails={handleViewDetails}
        handleViewSupplierDebtDetails={handleViewSupplierDebtDetails}
        searchTerm={searchTerm}
        filteredCustomerDebt={filteredCustomerDebt}
        filteredSupplierDebt={filteredSupplierDebt}
        filteredCustomerByDate={filteredCustomerByDate}
        filteredSupplierByDate={filteredSupplierByDate}
        filteredCustomerByStatus={filteredCustomerByStatus}
        filteredSupplierByStatus={filteredSupplierByStatus}
        isSearched={isSearched}
        date={date}
        status={status}
      />
      <DebtModal
        isModalViewDetails={isModalViewDetails}
        setIsModalViewDetails={setIsModalViewDetails}
        editingDebt={editingDebt}
        amount={amount}
        setAmount={setAmount}
        setEditingDebt={setEditingDebt}
        handleUpdateDebt={handleUpdateDebt}
        handleSubmit={handleSubmit}
        setPaymentMethod={setPaymentMethod}
        detailDebt={detailDebt}
      />
      <SupplierDebtModal
        selectedSupplierDebt={selectedSupplierDebt}
        isOpenDetailDebtModal={isOpenDetailDebtModal}
        handleViewSupplierDebtDetails={handleViewSupplierDebtDetails}
        setIsOpenDetailDebtModal={setIsOpenDetailDebtModal}
        detailSupplierDebt={detailSupplierDebt}
        isOpenPaySupplierDebt={isOpenPaySupplierDebt}
        handlePaySupplierDebt={handlePaySupplierDebt}
        setIsOpenPaySupplierDebt={setIsOpenPaySupplierDebt}
        fetchSupplierDebtDetail={fetchSupplierDebtDetail}
      />
    </>
  );
}
