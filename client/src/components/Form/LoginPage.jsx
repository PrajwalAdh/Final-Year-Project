import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doPost } from "../../Services/Axios";
import {
  setAccessTokenFromLocalStorage,
  setAdminAccessTokenFromLocalStorage,
  setAdminUsernameToLocalStorage,
  setUnverifiedEmailToLocalStorage,
  setUserDetailsToLocalStorage,
  setUserEmailToLocalStorage,
  setUsernameToLocalStorage,
} from "../../Services/Helpers";
import { useForm } from "../../Services/useForm";
import Logo from "../../assets/img/SecondaryBrandLogo.png";
import loginImage from "../../assets/img/loginImage.jpg";
import Navbar from "../navbar/navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [verified, setVerified] = useState();

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const initialState = {
    email: "",
    password: "",
  };
  const { handleChange, errors, states, validate } = useForm(initialState);
  const handleChangeOption = (data) => {
    if (data === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (validate()) {
        if (isAdmin) {
          const resp = await doPost("admin/login", states);
          setAdminUsernameToLocalStorage(resp.data.firstName);
          setUserEmailToLocalStorage(resp.data.email);
          setAdminAccessTokenFromLocalStorage(resp.data.acessToken);
          navigate("/admin");
        } else {
          const resp = await doPost("user/login", states);
          setUsernameToLocalStorage(resp.data.firstName);
          setUserEmailToLocalStorage(resp.data.email);
          setAccessTokenFromLocalStorage(resp.data.access);
          navigate("/");
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === "string"
      ) {
        if (error.response.data === "Password Incorrect") {
          setError((prev) => ({
            ...prev,
            password: error.response.data,
            email: "",
          }));
        } else if (error.response.data === "Account not verified") {
          setError((prev) => ({
            ...prev,
            email: error.response.data,
            password: "",
          }));
          setVerified("try");
          setUnverifiedEmailToLocalStorage(states.email);
        } else {
          setError((prev) => ({
            ...prev,
            email: error.response.data,
            password: "",
          }));
        }
      } else if (
        error.response &&
        error.response.data &&
        error.response.data &&
        typeof error.response.data.response === "string"
      ) {
        setError((prev) => ({
          ...prev,
          email: error.response.data.response,
          password: "",
        }));
      }
    }
  };

  return (
    <>
      {/* <FormHeader /> */}

      <div
        className="flex items-center justify-center"
        style={{
          height: "100dvh",
          overflowY: "hidden",
          background: "black",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "100vh",
            margin: 0,
            padding: 0,
            opacity: "0.7",
          }}
        />
        <div className="4xl:max-w-4xls absolute flex max-w-[90%] flex-col items-center justify-center sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
          <div className="m-auto flex-row justify-center">
            <h1 className="text-center text-[40px] text-zinc-50">Welcome</h1>
            <p className="text-center text-zinc-300">Sign in to your account</p>
          </div>
          <div className="w-full p-[2rem]">
            <div className="flex justify-between">
              <div
                className=" flex cursor-pointer justify-evenly border-[1px] border-transparent  py-1 hover:border-r-[1px] hover:border-b-[1px] hover:border-b-black hover:border-r-black"
                onClick={() => handleChangeOption("user")}
              >
                <input
                  type="radio"
                  name="switch"
                  id=""
                  value="USER"
                  checked={!isAdmin}
                  className="accent-primary"
                />
                <p className="ml-2 font-bold text-zinc-50">USER</p>
              </div>
              <div
                className=" flex cursor-pointer justify-evenly border-[1px] border-transparent  py-1 hover:border-r-[1px] hover:border-b-[1px] hover:border-b-black hover:border-r-black"
                onClick={() => handleChangeOption("admin")}
              >
                <input
                  type="radio"
                  name="switch"
                  id=""
                  value="ADMIN"
                  checked={isAdmin}
                  className="accent-primary"
                />
                <p className="ml-2 font-bold text-zinc-50">ADMIN</p>
              </div>
            </div>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
              method="POST"
            >
              <div className="my-3 flex-row">
                <label htmlFor="email font-bold" className="text-zinc-50">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border-2 py-2 px-5"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                />
                <span className="text-red-100">
                  {errors.email || error.email}
                </span>
              </div>
              <div className="my-3 flex-row">
                <label htmlFor="password font-bold" className="text-zinc-50">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full border-2 py-2 px-5"
                  placeholder="********"
                  onChange={handleChange}
                />
                <span className="text-red-100">
                  {errors.password || error.password}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <Link to="/sendmail">
                  <p className="cursor-pointer text-zinc-100 hover:underline">
                    Forgot Password ??
                  </p>
                </Link>
              </div>
              <button
                onClick={handleSubmit}
                className="my-2 w-full rounded-md bg-primary py-2 text-white drop-shadow-lg"
              >
                Login
              </button>
              <div className="my-3 flex justify-start">
                <p className="text-zinc-200">
                  Don't have an account ?
                  <Link
                    to="/register"
                    className="cursor-pointer pl-4 font-semibold text-blue-200 hover:underline"
                  >
                    Sign Up
                  </Link>
                  {verified === "try" && (
                    <Link
                      to="/otp"
                      className="cursor-pointer pl-4 font-semibold text-primary hover:underline"
                    >
                      Verify
                    </Link>
                  )}
                </p>
              </div>
            </form>
            {/* 2ee8b29407ca0849a43eea964c807b20b59e263c */}
          </div>
        </div>
        <div className="absolute top-10 left-10">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" style={{ width: "40%" }} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
