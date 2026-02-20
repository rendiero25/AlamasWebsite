import React, { useState, useEffect } from "react";
import api, { BACKEND_URL } from "../../api";
import { FaPlus, FaTrash, FaArrowLeft, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [editIcon, setEditIcon] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/categories/${id}`);
        setCategories(categories.filter((c) => c._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Category has been deleted.",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete category",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCatName || !newCatIcon) {
      return Swal.fire("Error", "Name and Icon are required", "error");
    }

    const data = new FormData();
    data.append("name", newCatName);
    data.append("icon", newCatIcon);

    try {
      await api.post("/categories", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category added successfully",
        timer: 1500,
      });
      setShowForm(false);
      setNewCatName("");
      setNewCatIcon(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to add category",
      });
    }
  };

  const handleEditIcon = async (e) => {
    e.preventDefault();
    if (!editIcon) {
      return Swal.fire("Error", "Please select a new icon", "error");
    }

    const data = new FormData();
    data.append("icon", editIcon);

    try {
      await api.put(`/categories/${editingCat._id}/icon`, data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Icon updated successfully",
        timer: 1500,
      });
      setEditingCat(null);
      setEditIcon(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to update icon",
      });
    }
  };

  return (
    <div className="container mx-auto px-10 py-10 font-primary">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black"
      >
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div className="flex flex-wrap justify-between items-center mb-8 gap-7">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-90"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acids"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Icon
                </label>
                <input
                  type="file"
                  onChange={(e) => setNewCatIcon(e.target.files[0])}
                  className="cursor-pointer border p-2 rounded w-full"
                  accept="image/*"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="cursor-pointer px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-primary text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingCat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Edit Icon - {editingCat.name}
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-500">Current icon:</span>
              <img
                src={
                  editingCat.icon.startsWith("/")
                    ? `${BACKEND_URL}${editingCat.icon}`
                    : editingCat.icon
                }
                alt={editingCat.name}
                className="w-10 h-10 object-contain border rounded p-1"
              />
            </div>
            <form onSubmit={handleEditIcon} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  New Icon
                </label>
                <input
                  type="file"
                  onChange={(e) => setEditIcon(e.target.files[0])}
                  className="cursor-pointer border p-2 rounded w-full"
                  accept="image/*"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCat(null);
                    setEditIcon(null);
                  }}
                  className="cursor-pointer px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-primary text-white rounded"
                >
                  Update Icon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton variant="category-card" count={8} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white border rounded-xl p-6 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    cat.icon.startsWith("/")
                      ? `${BACKEND_URL}${cat.icon}`
                      : cat.icon
                  }
                  alt={cat.name}
                  className="w-10 h-10 object-contain"
                />
                <h3 className="font-bold">{cat.name}</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditingCat(cat)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  title="Edit Icon"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
