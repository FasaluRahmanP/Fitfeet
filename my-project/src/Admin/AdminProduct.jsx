import React, { useContext, useState } from "react";
import { mycontext } from "../Context/Context";
import AddProductForm from "./AddProductForm";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AdminProduct = () => {
  const { AdminDelete, filteredProducts, setFilteredProducts } =
    useContext(mycontext);

  const [showUpdate, setShowUpdate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    rating: Yup.number().required("Required"),
    img: Yup.string().url().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log("Submitting values:", values); // Debug log
    if (currentProduct) {
      try {
        const response = await axios.put(
          `http://localhost:8000/products/${currentProduct.id}`,
          values
        );
        console.log("Product updated successfully:", response.data);
        setFilteredProducts((prev) =>
          prev.map((product) =>
            product.id === currentProduct.id
              ? { ...product, ...values }
              : product
          )
        );
        resetForm();
        setShowUpdate(false);
      } catch (error) {
        console.error(
          "Error updating product:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  // console.log(currentProduct)

  const Card = ({ id, img, rating, title, price, category }) => {
    return (
      <div className="flex flex-1 flex-col w-full max-sm:w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg py-4">
        <img src={img} alt={title} className="w-[280px] h-[280px] max-w-full" />
        <div className="mt-8 flex justify-start gap-2.5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD75dggXz3wZoNYr9O45RdrvTAIdijzegzbA&s"
            alt="Rating Icon"
            width="26"
            height="20"
          />
          <p className="text-xl leading-normal text-[#6D6D6D]">{rating}</p>
        </div>
        <h1 className="mt-2 text-2xl leading-normal font-semibold font-mono pl-2">
          {title}
        </h1>
        <p className="mt-2 font-semibold text-[black] text-2xl leading-normal pl-2">
          {category}
        </p>
        <div className="flex">
          <p className="mt-2 font-semibold text-[red] text-2xl leading-normal pl-2">
            ₹{price}
          </p>
          <div>
            <button
              className="bg-black text-white px-7 ml-8 rounded-3xl hover:bg-red-600 text-sm h-10"
              onClick={() => AdminDelete(id)}
            >
              DELETE
            </button>
            <button
              onClick={() => {
                setCurrentProduct({ id, img, rating, title, price, category });
                setShowUpdate(true);
                console.log("first");
              }}
              className="bg-red-600 text-white px-7 ml-8 rounded-3xl hover:bg-black text-sm h-10 mt-5"
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="lg:py-24 py-12 lg:px-16 px-8" id="products">
        <AddProductForm />
        <main className="container mx-auto max-sm:mt-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14 mt-16">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                img={product.img}
                rating={product.rating}
                title={product.title}
                price={product.price}
                category={product.category}
              />
            ))}
          </div>
        </main>
      </div>

      {showUpdate && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg text-center">
            <button
              className="absolute top-3 right-3 text-white bg-red-600 h-5 w-5 flex items-center justify-center rounded-full"
              onClick={() => setShowUpdate(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Update Product
            </h2>
            <Formik
              initialValues={{
                title: currentProduct.title,
                category: currentProduct.category,
                price: currentProduct.price,
                rating: currentProduct.rating,
                img: currentProduct.img,
                quantity: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Category
                  </label>
                  <Field
                    type="text"
                    id="category"
                    name="category"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Price
                  </label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Rating
                  </label>
                  <Field
                    type="number"
                    id="rating"
                    name="rating"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="img"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Image URL
                  </label>
                  <Field
                    type="text"
                    id="img"
                    name="img"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="img"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform duration-300 hover:scale-110"
                  >
                    Update
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProduct;
