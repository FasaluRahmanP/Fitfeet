import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [usercount, setusercount] = useState([]);
  const [productcount, setproductcount] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user`)
      .then((res) => setusercount(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products`)
      .then((res) => setproductcount(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-8 text-[black]">
          Admin Dashboard
        </h1>
        <div className="flex justify-around">
          <div className="p-4 bg-red-600 rounded-lg shadow-md w-1/3 mx-2 transition-transform duration-300 hover:scale-110">
          <Link to="/admin/user">
            <h2 className="text-xl font-bold mb-2 text-white">Total Users</h2>
            <p className="text-2xl font-bold text-white">{usercount.length}</p>
            </Link>
          </div>
          <div className="p-4 bg-red-600 rounded-lg shadow-md w-1/3 mx-2 transition-transform duration-300 hover:scale-110">
          <Link to="/admin/product">
            <h2 className="text-xl font-bold mb-2 text-white">Total Products</h2>
            <p className="text-2xl font-bold text-white">{productcount.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminHome;
