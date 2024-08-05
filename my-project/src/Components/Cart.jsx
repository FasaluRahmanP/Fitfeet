import React, { useContext, useState } from "react";
import { mycontext } from "../Context/Context";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, handleRemove } = useContext(mycontext);
  const [counts, setCounts] = useState({});

  const Increment = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }));
  };

  const Decrement = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 1) - 1, 1),
    }));
  };
  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * (counts[item.id] || 1);
  }, 0);

  return (
    <div className="lg:py-24 py-12 lg:px-16 px-8" id="cart">
      <main className="container mx-auto max-sm:mt-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14 mt-16">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col w-full max-sm:w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg py-4"
            >
              <img
                src={item.img}
                alt=""
                className="w-[280px] h-[280px] max-w-full"
              />
              <div className="mt-8 flex justify-start gap-2.5">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD75dggXz3wZoNYr9O45RdrvTAIdijzegzbA&s"
                  alt="Nike Air Jordan-01"
                  width="26"
                  height="20"
                />
                <p className="text-xl leading-normal text-[#6D6D6D]">
                  {item.rating}
                </p>
              </div>
              <h1 className="mt-2 text-2xl leading-normal font-semibold font-mono">
                {item.title}
              </h1>
              <div className="flex items-center mt-2">
                <p className="font-semibold text-[red] text-2xl leading-normal">
                  ₹{item.price}
                </p>
                <div className="ml-7">
                  <button
                    className="bg-black text-white px-7 ml-8 rounded-3xl h-10 w-50 hover:bg-red-600 text-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-16">
                <button
                  onClick={() => Decrement(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-l hover:bg-red-600"
                >
                  -
                </button>
                <div className="px-4 py-1 text-center border-t border-b border-black">
                  {counts[item.id] || 1}
                </div>
                <button
                  onClick={() => Increment(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-r hover:bg-red-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <h2 className="text-2xl font-bold">Total Amount: ₹{totalAmount}</h2>
        </div>
        <Link to="/payment">
          <div className="flex justify-center items-center mt-8">
            <button
              type="submit"
              className="bg-[red] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform duration-300 hover:scale-110"
            >
              Order Here
            </button>
          </div>
        </Link>
      </main>
    </div>
  );
}
