import React from "react";

const Register = () => {
  const handleEmailChange = (e) => {
    console.log(e.target.value);
  };
  const handlePassword = e => {
    console.log(e.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.password.value);
  }
  return (
    <div className="my-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          type="email"
          name=""
          id="email"
          placeholder="Your Email"
        />{" "}
        <br />
        <input onBlur={handlePassword} type="password" name="" id="password" placeholder="Your Password" />{" "}
        <br />
        <input  type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
