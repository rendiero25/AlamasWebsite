import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    products: 0,
    industries: 0,
    categories: 0,
  });
  const [loading, setLoading] = React.useState(true);

  // Simple fetch if we had an endpoint, or fetch all individually
  // For now fetching individually
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        // We'll import api here if not imported, or assume it's available?
        // Importing api dynamically or ensuring it's in imports
        const api = (await import("../../api")).default;

        const [pRes, iRes, cRes] = await Promise.all([
          api.get("/products"),
          api.get("/industries"),
          api.get("/categories").catch(() => ({ data: [] })), // Handle if route not ready
        ]);

        setStats({
          products: pRes.data.length,
          industries: iRes.data.length,
          categories: cRes.data.length,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 py-10 xl:py-20 font-primary">
      <h1 className="text-4xl font-bold mb-10 text-primary">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
          {loading ? (
            <Skeleton variant="text-lg" className="mb-2" />
          ) : (
            <h3 className="text-4xl font-bold text-primary mb-2">
              {stats.products}
            </h3>
          )}
          <p className="text-gray-600 font-medium">Total Products</p>
        </div>
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
          {loading ? (
            <Skeleton variant="text-lg" className="mb-2" />
          ) : (
            <h3 className="text-4xl font-bold text-primary mb-2">
              {stats.industries}
            </h3>
          )}
          <p className="text-gray-600 font-medium">Industries</p>
        </div>
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
          {loading ? (
            <Skeleton variant="text-lg" className="mb-2" />
          ) : (
            <h3 className="text-4xl font-bold text-primary mb-2">
              {stats.categories}
            </h3>
          )}
          <p className="text-gray-600 font-medium">Categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to="/dashboard/products"
          className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-md transition-all group"
        >
          <h2 className="text-2xl font-bold mb-4 group-hover:text-primary">
            Manage Products
          </h2>
          <p className="text-gray-600">
            Add, edit, or delete chemical products.
          </p>
        </Link>

        <Link
          to="/dashboard/industries"
          className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-md transition-all group"
        >
          <h2 className="text-2xl font-bold mb-4 group-hover:text-primary">
            Manage Industries
          </h2>
          <p className="text-gray-600">
            Update industry details and descriptions.
          </p>
        </Link>

        <Link
          to="/dashboard/categories"
          className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-md transition-all group"
        >
          <h2 className="text-2xl font-bold mb-4 group-hover:text-primary">
            Manage Categories
          </h2>
          <p className="text-gray-600">Add new categories and upload icons.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
