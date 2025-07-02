import { message } from "antd";
import axios from "axios";
import { useState } from "react";

export default function useCategory() {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [deletedCategories, setDeletedCategories] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/api/category`);
      let active = data.filter((cat) => !cat.deleted);
      let deleted = data.filter((cat) => cat.deleted);
      if (filter !== null) {
        if (filter === true) {
          active = active.filter((cat) => cat.disabled === 1);
        } else if (filter === false) {
          active = active.filter((cat) => cat.disabled === 0);
        }
      }
      if (searchTerm) {
        active = active.filter((cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setCategories(active);
      setDeletedCategories(deleted);
    } catch (error) {
      message.error("Lỗi khi tải danh mục!" + error);
    } finally {
      setLoading(false);
    }
  };
  return {
    setCategories,
    searchTerm,
    filter,
    loading,
    setFilter,
    setSearchTerm,
    categories,
    deletedCategories,
    fetchCategories,
  };
}
