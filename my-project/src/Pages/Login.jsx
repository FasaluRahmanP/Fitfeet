import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { mycontext } from "../Context/Context";

const Login = () => {
  const { login } = useContext(mycontext);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const response = await axios.get("http://localhost:8000/user");
      const users = response.data;
      // const admin = users.find(item => item.email === 'fasalu@gmail.com'&& item.password === 1234567890);
      const user = users.find(
        (item) =>
          item.email === values.email && item.password === values.password
      );
      const userWithIncorrectPassword = users.find(
        (item) =>
          item.email === values.email && item.password !== values.password
      );

      if (user && values.email === "admin@gmail.com") {
        localStorage.setItem("id", user.idb);
        toast.success("login success");
        setTimeout(() => {
          navigate("/admin");
          login();
        }, 1000);
      } else if (user) {
        localStorage.setItem("id", user.id);
        toast.success("login success");
        setTimeout(() => {
          navigate("/");
          login();
        }, 1000);
      } else if (userWithIncorrectPassword) {
        alert("Password incorrect");
        setSubmitting(false);
      } else {
        alert("Email ID not registered");
        navigate("/register");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center text-[black]">
          Log in <span className="text-[red]">Here!</span>
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                // type="submit"
                className="bg-[red] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform duration-300 hover:scale-110"
              >
                Log in
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
