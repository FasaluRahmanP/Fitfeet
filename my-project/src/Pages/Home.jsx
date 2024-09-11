import React, { useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [ImgUrl, SetImgUrl] = useState(
    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600"
  );

  return (
    <div>
      <div
        id="home"
        className="w-full flex flex-col xl:flex-row justify-center min-h-screen gap-y-10 container mx-auto relative"
      >
        <section className="relative z-10 xl:w-2/5 flex flex-col justify-center items-start px-8 pt-28">
          <p className="text-xl text-[red]">Our summer collections</p>
          <h1 className="mt-10 font-mono text-[black] text-8xl max-sm:text-[72px] leading-[106px] max-sm:leading-[82px] font-bold">
            <span className="bg-white relative z-10 pr-10 lg:text-7xl font-mono xl:whitespace-nowrap">
              The New Arrival</span>
            <br />
            <span className="text-[red] inline-block mt-3">Nike</span> Shoes
          </h1>
          <p className="text-[#6D6D6D] text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
            Discover stylish Nike arrivals, quality, and innovation for your
            active life.
          </p>
          <Link to="/register">
            <button className="mb-3 flex justify-center items-center gap-2 px-7 py-4 border-none text-lg leading-none rounded-full bg-[red] text-[white] transition-transform duration-300 hover:scale-110">
              Shop now
              <HiArrowCircleRight className="ml-2 rounded-full text-2xl" />
            </button>
          </Link>
        </section>
        <section className="absolute top-0 right-0 xl:top-10 xl:right-10 w-full max-w-md xl:w-1/3 xl:max-w-xs">
          <img
            src={ImgUrl}
            alt="Nike Shoes"
            className="w-full h-auto"
            style={{ objectFit: 'cover' }}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
