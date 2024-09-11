import React, { useContext, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import { mycontext } from "../Context/Context";

export default function NavBar() {
  const { cart, LoggedIn, searchProducts, logout, idname } = useContext(mycontext);
  const [dropdown, setDropdown] = useState(false);
  const [searchitem, setsearchitem] = useState("");
  const [accountDropdown, setAccountDropdown] = useState(false);
  const showDropdown = () => {
    setDropdown(!dropdown);
  };
  const toggleAccountDropdown = () => {
    setAccountDropdown(!accountDropdown);
  };

  const search = (event) => {
    const value = event.target.value;
    setsearchitem(value);
    searchProducts(value);
  };

  return (
    <div>
      <nav className="w-full h-24 flex flex-col justify-center items-center lg:bg-transparent bg-white lg:absolute fixed z-20">
        <div className="container mx-auto lg:px-6">
          <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between xl:items-baseline items-center text-[#12222E]">
            <div className="flex flex-col gap-y-4">
              <span
                onClick={() => (window.location = "/")}
                className="flex items-center  font-bold text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <span style={{ color: "red" }}>F</span>it
                <span style={{ color: "red" }}> F</span>eet
              </span>
            </div>
            <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
              <Link to="/">
                <li className="font-serif leading-normal text-lg text-[black] no-underline  hover:text-[red]">
                  Home
                </li>
              </Link>
              <Link to="/men">
                <li className="font-serif leading-normal text-lg text-[black] no-underline hover:text-[red]">
                  Men
                </li>
              </Link>
              <Link to="/women">
                <li className="font-serif leading-normal text-lg text-[black] no-underline hover:text-[red]">
                  Women
                </li>
              </Link>
              <Link to="/Kids">
                <li className="font-serif leading-normal text-lg text-[black] no-underline hover:text-[red]">
                  Kids
                </li>
              </Link>
              <div className="flex justify-between items-center gap-4">
                <div className="relative group hidden sm:block">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-[200px] sm:w-[200px] duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-black"
                    value={searchitem}
                    onChange={search}
                  />

                  <CiSearch className="text-gray-500 group-hover:text-black absolute top-1/2 -translate-y-1/2 right-3" />
                </div>
              </div>
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart />
                  {cart.length > 0 && (
                    <div className="absolute bottom-3 left-3 bg-red-700 rounded-full text-white font-normal w-4 h-4 text-center text-xs">
                      {cart.length}
                    </div>
                  )}
                </div>
              </Link>
            </ul>
            <div className="flex md:justify-end max-lg:hidden ">
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full transition-transform duration-300 hover:scale-105 hover:bg-red-700"
              >
                <VscAccount />
              </button>
              {accountDropdown && (
                <div className="absolute right-0 mt-6 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1">
                    <Link to="register">
                      <li className="px-4 py-2 text-gray-700  hover:bg-red-700 hover:text-[white] cursor-pointer">
                        Sign Up
                      </li>
                    </Link>
                    <Link to="login">
                      <li onClick={() => logout()} className="px-4 py-2 text-gray-700  hover:bg-red-700 hover:text-[white] cursor-pointer">
                        {LoggedIn ? "Log Out" : "Log In"}
                      </li>
                    </Link>
                  </ul>
                  <div className="px-1 py-1 text-white text-center border-t border-gray-200 bg-red-700">
                    {idname}
                  </div>
                </div>
              )}
            </div>
          </div>
          {dropdown ? (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <MdClose />
            </div>
          ) : (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <HiMenuAlt3 />
            </div>
          )}
        </div>
        {dropdown ? (
          <div
            onClick={showDropdown}
            className="lg:hidden text-[22px] cursor-pointer text-black"
          >
            <div className="w-full h-[320px] flex flex-col items-baseline pt-8 gap-4 text-[#12222E]">
              <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8">
                <Link to="/">
                  <li className="font-serif leading-normal text-lg text-[#b2ab9f] no-underline hover:text-[red]">
                    Home
                  </li>
                </Link>
                <Link to="/men">
                  <li className="font-serif leading-normal text-lg text-[#b2ab9f] no-underline hover:text-[red]">
                    Men
                  </li>
                </Link>
                <Link to="/women">
                  <li className="font-serif leading-normal text-lg text-[#b2ab9f] no-underline hover:text-[red]">
                    Women
                  </li>
                </Link>
                <Link to="/Kids">
                  <li className="font-serif leading-normal text-lg text-[#b2ab9f] no-underline hover:text-[red]">
                    Kids
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        ) : null}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
