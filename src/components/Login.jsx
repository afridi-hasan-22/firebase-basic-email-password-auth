import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const auth = getAuth(app);
  const [error, setError] = useState("");
  const emailRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        toast.success("Loged In Successfully");
        e.target.reset();
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Email/Password is incorrect");
      });
  };
  const handleResetPassword = (event) => {
     const email = emailRef.current.value;
     if(!email){
        toast.error('Please provide your email address to reset password');
        return
     }
     sendPasswordResetEmail(auth,email).then(result => {
        setError('')
        toast.success('Please check your email')
     }).catch(error=> {
        setError(error.message)

     })
  };
  return (
    <div>
      <h1 className="text-4xl ">Please Login</h1>
      <div className="flex justify-center items-center h-[calc(100vh-250px)]">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              ref={emailRef}
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              name="password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-red-500">{error}</p>
          </div>
        </form>
      </div>
      <p className="text-2xl">
        Forgot Password plase{" "}
        <button
          onClick={handleResetPassword}
          className="bg-black text-white py-2 px-4 rounded-2xl"
        >
          Reset
        </button>
      </p>
      <h2 className="ml-5 text-2xl">
        New to this website ? please{" "}
        <span className="text-blue-300">
          <Link to="/register-tail">Register</Link>
        </span>
      </h2>
    </div>
  );
};

export default Login;
