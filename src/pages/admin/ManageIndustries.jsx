import React, { useState, useEffect } from "react";
import api, { BACKEND_URL } from "../../api";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const ManageIndustries = () => {
  // ... existing state ...

  // (We are skipping the state defs in replacement to keep it short if using multi-replace, but here using single block replacement for top part)

  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    heading: "",
    productListDescription: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchIndustries = async () => {
    try {
      const res = await api.get("/industries");
      setIndustries(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  // ... (handleDelete, handleEdit, handleSubmit skipped in this replace block as they are lower down)

  // We need to target the Return statement to add button

  // Wait, I cannot easily replace the top imports AND the return statement in one replace_file_content.
  // I should use multi_replace_file_content or do it in two steps.
  // I will do imports first.

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! Deleting an industry might affect linked products.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const deleteUrl = "/industries/" + id;
        await api.delete(deleteUrl);
        setIndustries((prev) => prev.filter((i) => i._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Industry has been deleted.",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete industry",
        });
      }
    }
  };

  const handleEdit = (industry) => {
    setIsEditing(true);
    setCurrentIndustry(industry);
    setFormData({
      name: industry.name,
      description: industry.description || "",
      image: industry.image || "",
      heading: industry.heading || "",
      productListDescription: industry.productListDescription || "",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData for file upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("heading", formData.heading);
    data.append("productListDescription", formData.productListDescription);
    if (imageFile) {
      data.append("image", imageFile);
    } else {
      // Keep existing image URL if no new file is selected
      data.append("image", formData.image);
    }

    try {
      if (isEditing) {
        const updateUrl = "/industries/" + currentIndustry._id;
        await api.put(updateUrl, data);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Industry updated successfully",
          timer: 1500,
        });
      } else {
        await api.post("/industries", data);
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Industry created successfully",
          timer: 1500,
        });
      }
      setShowForm(false);
      setFormData({
        name: "",
        description: "",
        image: "",
        heading: "",
        productListDescription: "",
      });
      setImageFile(null);
      setIsEditing(false);
      fetchIndustries();
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || err.message || "Operation failed";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 py-10 font-primary">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black"
      >
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div className="flex flex-wrap justify-between items-center mb-8 gap-7">
        <h1 className="text-3xl font-bold">Manage Industries</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
            setFormData({
              name: "",
              description: "",
              image: "",
              heading: "",
              productListDescription: "",
            });
            setImageFile(null);
          }}
          className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-90"
        >
          <FaPlus /> Add Industry
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Industry" : "Add New Industry"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Industry Name
                </label>
                <input
                  type="text"
                  placeholder="Enter industry name"
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
                  Heading
                </label>
                <input
                  type="text"
                  placeholder="Enter heading"
                  value={formData.heading}
                  onChange={(e) =>
                    setFormData({ ...formData, heading: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Background Image
                </label>
                {formData.image && !imageFile && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                    <img
                      src={
                        formData.image.startsWith("/")
                          ? `${BACKEND_URL}${formData.image}`
                          : formData.image
                      }
                      alt="Preview"
                      className="h-20 object-cover rounded"
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="cursor-pointer border p-2 rounded w-full"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload an image or it will use the existing URL.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Main Description
                </label>
                <textarea
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border p-2 rounded w-full h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Product List Description
                </label>
                <textarea
                  placeholder="Enter description for product list section"
                  value={formData.productListDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productListDescription: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-full h-24"
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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton variant="industry-card" count={6} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div
              key={industry._id}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {industry.description || "No description"}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handleEdit(industry)}
                  className="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(industry._id)}
                  className="cursor-pointer text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageIndustries;
