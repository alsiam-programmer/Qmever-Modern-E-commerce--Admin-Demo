import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

const Menu = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        
        {/* Left: Logo + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <BiMenu
            size={28}
            className="md:hidden cursor-pointer hover:text-green-500 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <h1 className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            Qmever Panel
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <Link to="/" className="hover:text-green-400 transition-all">Dashboard</Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-green-400 transition-all">Orders</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-green-400 transition-all">Products</Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-green-400 transition-all">Users</Link>
          </li>
          <li>
            <Link to="/reports" className="hover:text-green-400 transition-all">Reports</Link>
          </li>
        </ul>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-4 relative">
          <IoMdNotificationsOutline
            size={26}
            className="cursor-pointer hover:text-green-400 transition-all"
          />

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FaUserCircle size={30} className="hover:text-green-400 transition-all" />
            <span className="hidden md:block font-semibold">Admin</span>
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 top-14 bg-gray-800 rounded-xl shadow-2xl w-48 py-2 text-white animate-fade-in">
              <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition">Profile</p>
              <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition">Settings</p>
              <p className="px-4 py-2 hover:bg-red-600 cursor-pointer transition">Logout</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-900 text-white transition-all overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-3 px-6">
          <li>
            <Link to="/" className="hover:text-green-400 transition-all">Dashboard</Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-green-400 transition-all">Orders</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-green-400 transition-all">Products</Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-green-400 transition-all">Users</Link>
          </li>
          <li>
            <Link to="/reports" className="hover:text-green-400 transition-all">Reports</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
