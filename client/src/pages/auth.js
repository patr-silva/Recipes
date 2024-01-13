import React from "react";
import Login from "./login";
import Register from "./register";

const Auth = () => {
  return (
    <div className='auth'>
      <Login />
      <Register />
    </div>
  );
};

export default Auth;