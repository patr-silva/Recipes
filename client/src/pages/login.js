import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Form from "../components/Form";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const user = { username, password };

    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        toast.error("Something went wrong with your username or password 🫣", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const data = await response.json();
        setCookies("access_token", data.token);
        window.localStorage.setItem("userID", data.userID);
        window.location.pathname = "/";
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      type='Login'
      onSubmit={onSubmit}
    />
  );
};

export default Login;
