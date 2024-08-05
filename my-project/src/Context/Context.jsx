import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const mycontext = createContext();

export default function Context({ children }) {
  const [Product, SetProduct] = useState([]);
  const [show, setshow] = useState(true);
  const [cart, setcart] = useState([]);
  const [LoggedIn, SetLoggedIn] = useState(false);
  let id = localStorage.getItem("id");
  const [mens, setmens] = useState([]);
  const [women, setwomen] = useState([]);
  const [kids, setkids] = useState([]);
  // ----------------------------------------------------------------

  const [userd, setuserd] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [idname, setidname] = useState();
  const [itemupdate, setitemupdate] = useState();

  const updateFilteredProducts = () => {
    const filtered = (userd || []).filter(
      (item) =>
        item.category === "Men" ||
        item.category === "Kid" ||
        item.category === "Women"
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    updateFilteredProducts();
  }, [userd]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((res) => setidname(res.data.name))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products`)
      .then((res) => setuserd(res.data))
      .catch((error) => console.log(error));
  }, []);

  const AdminDelete = (itemId) => {
    axios
      .delete(`http://localhost:8000/products/${itemId}`)
      .then(() => {
        const updatedProducts = userd.filter(
          (product) => product.id !== itemId
        );
        setuserd(updatedProducts);
        toast.success("Product deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  const AdminUpdate = (itemId) => {
    axios
      .put(`http://localhost:8000/products/${itemId}`)
      .then(() => {
        const updateItem = userd.filter(
          (product) => product.id !== itemId
        );
        setitemupdate(updateItem);
        toast.success("Product deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  const AddNewProduct = (newProduct) => {
    axios
      .post("http://localhost:8000/products", newProduct)
      .then((res) => {
        setuserd([...userd, res.data]);
        toast.success("Product added successfully");
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
      });
  };

  const searchProducts = (product) => {
    const filterProduct = Product.filter(
      (item) => item.title.toLowerCase().includes(product.toLowerCase())
      // console.log(filterProduct);
    );
    setmens(filterProduct);
    setFilteredProducts(filterProduct);
    setkids(filterProduct);
    setwomen(filterProduct);
    // console.log(filterProduct);
  };

  // ---------------------------------------------------------------

  useEffect(() => {
    if (id) {
      SetLoggedIn(true);
    }
  }, []);

  const login = () => {
    SetLoggedIn(true);
  };

  const logout = () => {
    SetLoggedIn(false);
    localStorage.clear();
  };
  useEffect(() => {
    const filtermen = Product.filter((product) => product.category === "Men");
    setmens(filtermen);
  }, [Product]);

  useEffect(() => {
    const filterwomen = Product.filter(
      (product) => product.category === "Women"
    );
    setwomen(filterwomen);
  }, [Product]);

  useEffect(() => {
    const filterkids = Product.filter((product) => product.category === "Kid");
    setkids(filterkids);
  }, [Product]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((item) => SetProduct(item.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((res) => setcart(res.data.cart));

    axios.get(`http://localhost:8000/user`).then((res) => setUsers(res.data));
  }, []);

  const handleclick = (item1) => {
    console.log(item1);
    const findeddata = cart.find((cartitem) => cartitem.id === item1.id);
    if (findeddata) return;
    else {
      const updatedcart = [...cart, item1];
      axios.patch(`http://localhost:8000/user/${id}`, {
        cart: updatedcart,
      });
      setcart([...cart, item1]);
      console.log(cart.length);
    }
  };

  const handleRemove = (itemId) => {
    console.log(itemId);
    let newCart = cart.filter((item) => item.id !== itemId);
    axios
      .patch(`http://localhost:8000/user/${id}`, {
        cart: newCart,
      })
      .then((res) => setcart(newCart));
    setcart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  return (
    <mycontext.Provider
      value={{
        Product,
        SetProduct,
        handleclick,
        cart,
        handleRemove,
        SetLoggedIn,
        LoggedIn,
        login,
        logout,
        userd,
        setuserd,
        AdminDelete,
        AddNewProduct,
        searchProducts,
        mens,
        filteredProducts,
        women,
        kids,
        users,
        idname,
        itemupdate,
        AdminUpdate,
        setFilteredProducts
      }}
    >
      {children}
    </mycontext.Provider>
  );
}
