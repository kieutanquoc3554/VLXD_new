"use client";
import useDebt from "@/hook/api/useDebt";
import useDetailDebt from "@/hook/api/useDetailDebt";
import useDetailSupplierDebt from "@/hook/api/useDetailSupplierDebt";
import useDebtFilter from "@/hook/handler/useDebtFilter";
import useDebtHandler from "@/hook/handler/useDebtHandler";
import useDebtSearch from "@/hook/handler/useDebtSearch";
import useDetailsDebtHandler from "@/hook/handler/useDetailsDebtHandler";
import useSupplierDebtHandler from "@/hook/handler/useSupplierDebtHandler";
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
    setDate,
    handleFilterByDate,
    filteredCustomerByDate,
    filteredSupplierByDate,
  } = useDebtFilter({ setIsSearched });

  return (
    <>
      <h2>Quản lý công nợ</h2>
      <HeadingToolDebt
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        setDate={setDate}
        onFilter={handleFilterByDate}
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
        isSearched={isSearched}
        date={date}
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
