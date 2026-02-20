import React, { useState, useEffect } from "react";
import api from "../../api";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [categories, setCategories] = useState([]); // Dynamic categories
  const [loading, setLoading] = useState(true);

  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState("newest");

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    industry: "",
  });
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchIndustries = async () => {
    try {
      const res = await api.get("/industries");
      setIndustries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchIndustries();
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
        await api.delete(`/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete product",
        });
      }
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      industry: product.industry?._id || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/products/${currentProduct._id}`, formData);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Product updated successfully",
          timer: 1500,
        });
      } else {
        await api.post("/products", formData);
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Product created successfully",
          timer: 1500,
        });
      }
      setShowForm(false);
      setFormData({ name: "", category: "", industry: "" });
      setIsEditing(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Operation failed",
      });
    }
  };

  // Sorting & Pagination Logic
  const processedProducts = React.useMemo(() => {
    let sorted = [...products];

    // Sorting
    if (sortBy === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "newest") {
      // Assuming there is a createdAt or updatedAt, otherwise rely on ID or default order if not available
      // If createdAt exists:
      if (sorted[0]?.createdAt) {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        // Fallback to reverse order of fetching if no timestamps (often newest is last in DB)
        // or simply reverse if standard append
        // But usually mongo IDs have timestamp. For now let's hope createdAt works as confirmed in model.
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    } else if (sortBy === "oldest") {
      if (sorted[0]?.createdAt) {
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
    }

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem);

    return { currentItems, totalItems: sorted.length };
  }, [products, sortBy, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedProducts.totalItems / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 pt-10 pb-[75px] font-primary">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black"
      >
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div className="flex flex-wrap justify-between items-center mb-8 gap-7">
        <h1 className="text-3xl font-bold">Manage Products</h1>

        <div className="flex gap-5">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded-full px-4 cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>

          <button
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setFormData({ name: "", category: "", industry: "" });
            }}
            className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-90"
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="cursor-pointer border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="cursor-pointer border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Industry</option>
                  {industries.map((ind) => (
                    <option key={ind._id} value={ind._id}>
                      {ind.name}
                    </option>
                  ))}
                </select>
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
                  className="cursor-pointer bg-primary text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 rounded-tl-xl">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Industry</th>
                <th className="p-4 rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              <Skeleton variant="table-row" count={10} />
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 rounded-tl-xl">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Industry</th>
                <th className="p-4 rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedProducts.currentItems.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.industry?.name || "-"}</td>
                  <td className="p-4 flex gap-7">
                    <button
                      onClick={() => handleEdit(product)}
                      className="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="cursor-pointer text-red-600 hover:text-red-800 flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer hover:bg-gray-100"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
