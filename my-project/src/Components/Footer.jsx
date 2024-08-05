import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[black] lg:px-16 px-8 lg:pt-12 pb-8 ">
      <section className="container mx-auto">
        <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col ">
          <div className="flex flex-col items-start">
            <a
              href="/"
              className="transition-transform duration-300 hover:scale-110"
            >
              <img
                src="https://i.pinimg.com/236x/d2/a4/7b/d2a47bc6021db28067a973c9901d2b65.jpg"
                width="150"
                height="46"
              />
            </a>
            <p className="mt-6 text-base leading-7 text-[#fffc] sm:max-w-sm transition-transform duration-300 hover:scale-110">
              Get shoes ready for the new term at your nearest FitFeet
              store.Find Your Perfect Size in Store
            </p>
            <div className="flex items-center gap-5 mt-8">
              <div className="flex justify-center items-center w-12 h-12 bg-[white] rounded-full transition-transform duration-300 hover:scale-110">
                <FaFacebook
                  style={{ width: "24", height: "24", cursor: "pointer" }}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-[white] rounded-full transition-transform duration-300 hover:scale-110">
                <FaInstagramSquare
                  style={{ width: "24", height: "24", cursor: "pointer" }}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-[white] rounded-full transition-transform duration-300 hover:scale-110">
                <FaTwitterSquare
                  style={{ width: "24", height: "24", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
            <div>
              <h4 className="text-white text-2xl leading-normal font-medium mb-6 transition-transform duration-300 hover:scale-110">
                Products
              </h4>
              <ul className="p-0">
                <Link to="/men">
                  <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    Air Force 1
                  </li>
                </Link>
                <Link to="/women">
                  <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    Nike V2K Run
                  </li>
                </Link>
                <Link to="/women">
                  <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    Nike Motiva
                  </li>
                </Link>
                <Link to="/men">
                  <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    Air Force 2
                  </li>
                </Link>
                <Link to="/kids">
                  <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    Jordan Stadium 90{" "}
                  </li>
                </Link>
                <Link to="/kids">
                  <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                    Nike Air Force 1 Lv8
                  </li>
                </Link>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-2xl leading-normal font-medium mb-6 transition-transform duration-300 hover:scale-110">
                Help
              </h4>
              <ul>
                <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  About us
                </li>
                <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  FAQs
                </li>
                <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  How it works
                </li>
                <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  Privacy policy
                </li>
                <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  Payment policy
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-2xl leading-normal font-medium mb-6 transition-transform duration-300 hover:scale-110">
                Get in touch
              </h4>
              <ul>
                <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  feetfit@gmail.com
                </li>
                <li className="mt-3 text-[#fffc] list-none text-base leading-normal hover:text-[#b2ab9f] cursor-pointer">
                  +91 9946 7377 08
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-[#fffc] mt-24 max-sm:flex-col max-sm:items-center">
          <div className="flex flex-1 justify-start items-center gap-2 cursor-pointer">
            <p>© Copyright. All Rights Reserved.</p>
          </div>
          <p className="cursor-pointer">Term & Conditions </p>
        </div>
      </section>
    </footer>
  );
}
