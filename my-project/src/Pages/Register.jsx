import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    cart: [],
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:8000/user", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("User added successfully");
      resetForm();
      navigate("/login");
    } catch (error) {
      console.log("Error adding user:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center text-[black]">
          Sign Up <span className="text-[red]">Here!</span>
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="confirmpassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="confirmpassword"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div className="flex flex-col items-start space-y-2 mt-4">
              <Link to="/login">
                <p className="text-[blue] font-normal text-sm mt-4 text-center">
                  Already have an account?
                </p>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[red] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform duration-300 hover:scale-110"
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
