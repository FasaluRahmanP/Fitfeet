import React, { useState, useContext } from "react";
import { mycontext } from "../Context/Context";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const { AddNewProduct } = useContext(mycontext);
  const [product, setProduct] = useState({
    title: "",
    img: "",
    rating: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddNewProduct(product);
    setProduct({
      title: "",
      img: "",
      rating: "",
      price: "",
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form ">
      <input
        className="ms-2 ps-1 border rounded border-gray-400	"
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        className="ms-2 ps-1 border rounded border-gray-400	"
        type="text"
        name="img"
        value={product.img}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <input
        className="ms-2 ps-1 border rounded border-gray-400	"
        type="text"
        name="rating"
        value={product.rating}
        onChange={handleChange}
        placeholder="Rating"
        required
      />
      <input
        type="text"
        className="ms-2 ps-1 border rounded border-gray-400	"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        className="ms-2 ps-1 border rounded border-gray-400	"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-5 ml-2 rounded-lg hover:bg-black text-sm h-8 mt-5"
        onClick={AddNewProduct}
      >
        ADD PRODUCT
      </button>
    </form>
  );
};

export default AddProductForm;
