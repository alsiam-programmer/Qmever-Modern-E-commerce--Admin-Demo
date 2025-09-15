import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";

const Orders = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const location = useLocation();

  // Get status from URL query
  const queryParams = new URLSearchParams(location.search);
  const getUrlStatus = queryParams.get("status");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(getUrlStatus || "Processing");

  const statuses = [
    "Processing",
    "Confirmed",
    "Picking",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  // Fetch orders from Firebase
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
      );
      if (res?.data) {
        const allOrders = [];

        // Flatten nested Firebase data
        Object.entries(res.data).forEach(([customerUid, customerOrders]) => {
          Object.entries(customerOrders).forEach(([orderId, orderData]) => {
            if (orderData) {
              allOrders.push({ ...orderData, customerUid, orderId });
            }
          });
        });

        // Filter by status
        const filtered = allOrders.filter(
          (order) => order?.orderStatus?.orderStatus === statusFilter
        );
        setOrders(filtered);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, getUrlStatus]);

  // Update order status
  const updateOrderStatus = (CUid, ORid, newStatus) => {
    if (!CUid || !ORid || !newStatus) return;

    const statusPath = ref(db, `orders/${CUid}/${ORid}/orderStatus`);
    const now = new Date();
    const statusUpdate = {
      orderStatus: newStatus,
      dateISO: now.toISOString(),
      dateFormatted: now.toLocaleString(),
    };

    set(statusPath, statusUpdate)
      .then(() => {
        setOrders([]);
        fetchOrders();
      })
      .catch((err) => console.error("Error updating order status:", err));
  };

  // Handle filter change
  const handleStatusFilter = (status) => {
    setOrders([]);
    navigate(`/?status=${encodeURIComponent(status)}`);
    setStatusFilter(status);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      {/* Page Title */}
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-tight drop-shadow-md">
        📦 Orders Management
      </h2>

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {statuses.map((status) => (
          <button
            key={status}
            className={`px-6 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300
              ${
                status === statusFilter
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105 shadow-lg"
                  : status === "Cancelled"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => handleStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          Loading orders...
        </p>
      )}

      {/* Orders List */}
      <div className="space-y-10">
        {orders.length === 0 && !loading && (
          <p className="text-center text-gray-600">No orders found.</p>
        )}

        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition"
          >
            {/* Header */}
            <div className="grid md:grid-cols-3 gap-4 items-center p-6 bg-gradient-to-r from-indigo-100 to-purple-100 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                Order ID:{" "}
                <span className="text-indigo-600">{order.orderId}</span>
              </h3>
              <p className="text-indigo-700 font-semibold text-lg">
                💰 Total: {order.TotalBuild?.toLocaleString()} ৳
              </p>
              <select
                value={order.orderStatus?.orderStatus || "Processing"}
                onChange={(e) =>
                  updateOrderStatus(
                    order.customerUid,
                    order.orderId,
                    e.target.value
                  )
                }
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium focus:ring-2 focus:ring-indigo-400 bg-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Info */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                🚚 Delivery Information
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-gray-700 text-sm leading-relaxed">
                <p>
                  <span className="font-bold">📍 Address:</span>{" "}
                  {order.customer?.local_address}
                </p>
                <p>
                  <span className="font-bold">🌍 Region:</span>{" "}
                  {order.customer?.unions}, {order.customer?.upazila},{" "}
                  {order.customer?.District}, {order.customer?.Division}
                </p>
                <p>
                  <span className="font-bold">👤 Customer:</span>{" "}
                  {order.customer?.username}
                </p>
                <p>
                  <span className="font-bold">✉️ Email:</span>{" "}
                  {order.customer?.email}
                </p>
                <p>
                  <span className="font-bold">📞 Phone:</span>{" "}
                  {order.customer?.Phone_Number}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {order.orderItem &&
                order.orderItem
                  .flatMap((item) => (item.cartItem ? item.cartItem : [item]))
                  .map((prod) => (
                    <div
                      key={prod.ProdectId || prod.uid}
                      className="relative rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                      <img
                        src={prod.imgurl}
                        alt={prod.Prodectname}
                        className="w-full h-44 object-cover"
                      />

                      {/* Color + Size Overlay */}
                      {(prod.size || prod.modleColor?.Color) && (
                        <div className="absolute top-3 left-3 flex items-center gap-2 p-2 bg-gradient-to-r from-indigo-200 to-pink-200/80 backdrop-blur-md rounded-2xl shadow-lg">
                          {prod.modleColor?.Color && (
                            <div
                              className="w-6 h-6 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: prod.modleColor.Color }}
                            />
                          )}
                          {prod.size && (
                            <span className="text-sm font-bold text-gray-900 px-1 py-0.5 bg-white/60 rounded-md">
                              {prod.size}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="p-3 space-y-2">
                        <a
                          href={`https://qmever.com/productDetails/${
                            prod.ProdectId || prod.uid
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs font-semibold text-blue-700 underline"
                        >
                          UID: {prod.ProdectId || prod.uid}
                        </a>
                        <p className="text-sm font-bold text-purple-800">
                          Quantity:{" "}
                          <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            {prod.ProdectQun} ×
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
