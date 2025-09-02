import React, { useContext, useEffect, useState } from 'react';
import AddNewProdect from '../componat/AddNewProdect';
import { IoAddOutline } from "react-icons/io5";
import OrdersProcessing from '../componat/OrdersProcessing';
import { apiData } from '../AllDataModels/ordersApiD';

const Home = () => {
  const [showAddNewProduct, setShowAddNewProduct] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // ✅ added
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const data = useContext(apiData);

  const handleAddNewProduct = () => {
    if (showAddNewProduct) {
      // start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setShowAddNewProduct(false);
        setIsClosing(false); // reset
      }, 500); // match your animation duration
    } else {
      setShowAddNewProduct(true);
    }
  };

  // Calculate total earnings and quantity from Delivered orders
  useEffect(() => {
    if (data?.length) {
      const deliveredOrders = data.filter(
        order => order?.orderStatus?.orderStatus === "Delivered"
      );

      let earnings = 0;
      let quantity = 0;

      deliveredOrders.forEach(order => {
        order.orderItem.forEach(item => {
          if (item.cartItem) {
            item.cartItem.forEach(cart => {
              earnings += (Number(cart.Price) || 0) * (Number(cart.ProdectQun) || 1);
              quantity += Number(cart.ProdectQun) || 0;
            });
          } else {
            earnings += (Number(item.Price) || Number(item.Pricesub) || 0) * (Number(item.ProdectQun) || 1);
            quantity += Number(item.ProdectQun) || 0;
          }
        });
      });

      setTotalEarnings(earnings);
      setTotalQuantity(quantity);
    }
  }, [data]);

  return (
<section className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-10">
  <div className="container mx-auto px-4 relative">
    <div className="flex flex-wrap gap-8">
      
      {/* Left Box - Advanced Earnings & Quantity */}
      <div className="relative w-full md:w-[30%] p-8 rounded-3xl bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl shadow-2xl border border-gray-200 transform transition-all duration-500">
        
        {/* Earnings */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-green-100/60 p-4 rounded-2xl shadow-inner flex items-center justify-center">
            <span className="text-green-600 text-2xl">💰</span>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-gray-700">Total Earnings</h5>
            <p className="text-4xl font-extrabold text-green-600 tracking-tight">
              {totalEarnings.toLocaleString()} ৳
            </p>
          </div>
        </div>

        {/* Sold Items */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-100/60 p-4 rounded-2xl shadow-inner flex items-center justify-center">
            <span className="text-blue-600 text-2xl">📦</span>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-gray-700">Total Sold Items</h5>
            <p className="text-3xl font-bold text-gray-900">
              {totalQuantity}
            </p>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-200/30 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-4 left-0 w-16 h-16 bg-blue-200/30 rounded-full blur-2xl pointer-events-none animate-pulse-slow"></div>
      </div>

      {/* Right Box - Orders */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full md:flex-1 border border-gray-100">
        <h5 className="text-lg font-semibold mb-6 text-gray-700 flex items-center gap-2">
          🛒 Orders
        </h5>
        <div className="animate-fade-in">
          <OrdersProcessing />
        </div>
      </div>
    </div>

    {/* Floating Add New Product Button */}
    <button
      onClick={handleAddNewProduct}
      className="fixed bottom-8 right-8 z-50 h-16 w-16 bg-gradient-to-tr from-green-500 to-emerald-600 
                 text-white rounded-full flex items-center justify-center shadow-2xl 
                 hover:scale-110 hover:rotate-6 transition-transform duration-300 ease-out"
    >
      <IoAddOutline size={30} />
    </button>

    {/* Add New Product Panel (Slide-in with Overlay) */}
    {showAddNewProduct && (
      <div className="fixed inset-0 z-40 flex justify-end">
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${
            isClosing ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={handleAddNewProduct}
        />

        {/* Panel */}
        <div
          className={`relative w-full max-w-4xl h-full bg-white rounded-l-2xl shadow-2xl 
                      overflow-y-auto p-8 ${
                        isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
                      }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              ➕ Add New Product
            </h3>
            <button
              onClick={handleAddNewProduct}
              className="text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none"
            >
              ×
            </button>
          </div>
          <AddNewProdect />
        </div>
      </div>
    )}
  </div>
</section>

  );
};

export default Home;
