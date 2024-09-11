import React, { useState } from "react";
import { mycontext } from "../Context/Context";
import { useContext } from "react";
import axios from "axios";

export default function AdminUser() {
  const { users, cart } = useContext(mycontext);
  const [showcart, setshowcart] = useState(false);
  const [state, setstate] = useState([]);
  const [deleted, setdeleted] = useState()
  // ----------------------------------------------------------------------------

  const clickHandle = (userId) => {
    axios.get("http://localhost:8000/user/", userId);
    setstate(userId);
    setshowcart(true);
  };

  const handledelete = (userid) => {
    axios.delete(`http://localhost:8000/user/${userid}`)
      .then(res => {
        setdeleted(users.filter(user => user.id !== userid))
      })
      .catch(console.log("error"))
  }

  // console.log(state)
  // ----------------------------------------------------------------------------
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg text-center">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Cart</th>
            {/* <th className="py-3 px-4 border-b">Order</th> */}
            <th className="py-3 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => clickHandle(user.cart)}
                >
                  Cart
                </button>
              </td>
              {/* <td className="py-2 px-4 border-b">
                <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                  Order
                </button>
              </td> */}
              <td className="py-2 px-4 border-b">
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handledelete(user.id)}>
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showcart && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg text-center">
            <button
              className="absolute top-3 right-3 text-white hover:text-white bg-red-600 h-5 w-5 flex items-center justify-center"
              onClick={() => setshowcart(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">User Cart</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[80vh] overflow-auto p-2">
              {state.map((itm, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
                >
                  <img
                    src={itm.img}
                    alt={itm.title}
                    className="h-40 w-40 object-cover mb-2 rounded-md"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {itm.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Rating: {itm.rating}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    ₹{itm.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
