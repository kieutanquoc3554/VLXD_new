export default function tabTitles() {
  const tabTitles = {
    active: "Danh sách sản phẩm",
    hidden: "Danh sách sản phẩm đã ẩn",
    deleted: "Danh sách sản phẩm đã xoá",
  };

  const getTitleTabs = (key) => tabTitles[key] || "Danh sách sản phẩm";

  return { getTitleTabs };
}
