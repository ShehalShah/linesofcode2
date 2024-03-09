import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Icons from '../Icons';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import app_api from "../../config/ApiConfig";

const Register = ({ setAuthType }) => {
  const [isActive, setIsActive] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    if (name === "" && email === "" && password === "") {
      toast.error("All fields are required");
    } else {
      app_api
        .post("users/signup", { name, email, password })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          navigate("/");
          toast.success("Registration Successful");
        })
        .catch(() => {
          toast.error("Please try again");
        });
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emailRef.current &&
        !emailRef.current.contains(event.target) &&
        passwordRef.current &&
        !passwordRef.current.contains(event.target) &&
        nameRef.current &&
        !nameRef.current.contains(event.target)
      ) {
        setIsActive("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailRef, passwordRef, nameRef, setIsActive]);
  return (
    <div className="h-full w-full flex px-8 flex-col justify-center items-center">
      <div className="w-full px-8 text-2xl font-bold">Sign Up</div>
      <div className="w-full mt-5 text-gray-400 px-8 text-sm">
        If you already have an account
      </div>
      <div className="w-full mt-1 text-sm px-8 font-semibold text-[#6133B4]">
        <div
          className="cursor-pointer hover:underline w-fit"
          onClick={() => {
            setAuthType("login");
          }}
        >
          Log in here
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-4 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Name</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "name" ? "border-[#6133B4]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("name");
          }}
          ref={nameRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="name"
              width="20"
              height="20"
              color={isActive === "name" ? "#6133B4" : "#676767"}
            />
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Email</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "email" ? "border-[#6133B4]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("email");
          }}
          ref={emailRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="email"
              width="20"
              height="20"
              color={isActive === "email" ? "#6133B4" : "#676767"}
            />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Password</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "password" ? "border-[#6133B4]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("password");
          }}
          ref={passwordRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="password"
              width="20"
              height="20"
              color={isActive === "password" ? "#6133B4" : "#676767"}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="px-8 w-full mt-6">
        <Button icon={"login"} onClick={() => handleRegister()}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register