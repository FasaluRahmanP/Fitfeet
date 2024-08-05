import React, { useContext, useEffect, useState } from "react";
import { mycontext } from "../Context/Context";
import Footer from "../Components/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function Kids() {
  const { Product, SetProduct, handleclick, kids } = useContext(mycontext);

  const Card = ({ id, img, rating, title, price }) => {
    return (
      <div className="flex flex-1 flex-col w-full max-sm:w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg py-4">
        <img src={img} alt="" className="w-[280px] h-[280px] max-w-full" />
        <div className="mt-8 flex justify-start gap-2.5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD75dggXz3wZoNYr9O45RdrvTAIdijzegzbA&s"
            alt="Nike Air Jordan-01"
            width="26"
            height="20"
          />
          <p className="text-xl leading-normal text-[#6D6D6D]">{rating}</p>
        </div>
        <h1 className="mt-2 text-2xl leading-normal font-semibold font-mono pl-2">
          {title}
        </h1>
        <div className="flex">
          <p className="mt-2 font-semibold text-[red] text-2xl leading-normal pl-2">
            ₹{price}
          </p>
          <button
            className="bg-black text-white px-6 ml-8 rounded-3xl hover:bg-red-600 text-sm"
            onClick={() => {
              handleclick({ id, img, rating, title, price });
              toast.success("Item added successfully");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="lg:py-24 py-12 lg:px-16 px-8" id="products">
        <main className="container mx-auto max-sm:mt-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14 mt-16">
            {kids.map((product) => (
              <Card
                id={product.id}
                img={product.img}
                rating={product.rating}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
