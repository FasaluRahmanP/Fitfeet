import React, { useContext, useState } from "react";
import { mycontext } from "../Context/Context";
import AddProductForm from "./AddProductForm";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AdminProduct = () => {
  const { AdminDelete, filteredProducts } = useContext(mycontext);

  const [showUpdate, setShowUpdate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const initialValues = {
    Title: "",
    Category: "",
    Price: "",
    Rating: "",
    Image: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    Title: Yup.string().required("Required"),
    Category: Yup.string().required("Required"),
    Price: Yup.number().required("Required"),
    Rating: Yup.number().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await axios.patch("http://localhost:8000/products", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Product updated successfully");
      resetForm();
      setShowUpdate(false);
      navigate("/admin/product");
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Product</h2>
            <Formik
              initialValues={{
                Title: currentProduct.title,
                Category: currentProduct.category,
                Price: currentProduct.price,
                Rating: currentProduct.rating,
                Image: currentProduct.img,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="Title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <Field
                    type="text"
                    id="Title"
                    name="Title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="Title" component="div" className="text-red-500 text-xs" />
                </div>

                <div className="mb-4">
                  <label htmlFor="Category" className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <Field
                    type="text"
                    id="Category"
                    name="Category"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="Category" component="div" className="text-red-500 text-xs" />
                </div>

                <div className="mb-4">
                  <label htmlFor="Price" className="block text-gray-700 text-sm font-bold mb-2">
                    Price
                  </label>
                  <Field
                    type="number"
                    id="Price"
                    name="Price"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="Price" component="div" className="text-red-500 text-xs" />
                </div>

                <div className="mb-4">
                  <label htmlFor="Rating" className="block text-gray-700 text-sm font-bold mb-2">
                    Rating
                  </label>
                  <Field
                    type="number"
                    id="Rating"
                    name="Rating"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="Rating" component="div" className="text-red-500 text-xs" />
                </div>

                <div className="mb-4">
                  <label htmlFor="Image" className="block text-gray-700 text-sm font-bold mb-2">
                    Image URL
                  </label>
                  <Field
                    type="text"
                    id="Image"
                    name="Image"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="Image" component="div" className="text-red-500 text-xs" />
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

