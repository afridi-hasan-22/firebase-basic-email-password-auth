import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const RegisterTail = () => {
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const handleSubmit = (event) => {
    // prevent page refresh
    event.preventDefault();
    // collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    console.log(name, email, password);
    // password validation
    if(!/(?=.*[A-Z])/.test(password)){
       toast.error('Please add at least one uppercase');
       return;
    }else if(!/^(?=.*[0-9]).*$/.test(password)){
       toast.error('Please add at least one number');
       return
    }else if(password.length < 6){
        toast.error('Password Must Contain at least 6 characters')
        return
    } 
    // add to the Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError('');
        event.target.reset();
        toast.success('Succesfully Registerd');
        emailVerification(loggedUser)
        updateUserData(loggedUser, name)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        toast.error('Something Wrong with you')
      });
  };
  const emailVerification = (user) => {
    sendEmailVerification(user).then(result => {
        toast.success('Please verify your email address')
    }).catch(error=> {
        console.log(error);
    })
  }
  const updateUserData = (user, name) => {
    updateProfile(user, {
        displayName : name
    }).then(result=> {console.log('username updated');}).catch(error=> {
        console.log(error.message);
    })
  }
  return (  
    <div className="my-container py-16">
      <section className="text-gray-600 body-font">
        <div className="max-w-xl bg-gray-100 rounded-lg p-8 flex flex-col justify-center mx-auto">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label
                htmlFor="name"
                className="leading-7 text-sm text-gray-600"
              >
                Your Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <input
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
              value="Register"
            />
          </form>
          <p className="text-xs text-gray-500 mt-3">
            Already have an account? please <span className="text-blue-300"><Link to='/login'>Login</Link></span>
          </p>
          <p className="text-red-500 ">{error}</p>
        </div>
      </section>
    </div>
  );
};

export default RegisterTail;
