import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../ResuableComponents/InputField";
import { doPost } from "../../Services/Axios";
import Button from "../../UI/Button/Button";
import Navbar from "../navbar/navbar";

import {
  setAccessTokenFromLocalStorage,
  setUnverifiedEmailToLocalStorage,
  setUsernameToLocalStorage,
} from "../../Services/Helpers";
import loginImage from "../../assets/img/loginImage.jpg";

import { useForm } from "../../Services/useForm";

const SignUp = () => {
  const [error, setError] = useState("");
  const router = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  };
  const { handleChange, errors, states, validate } = useForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const resp = await doPost("/user/register", {
          firstname: states.firstName,
          lastname: states.lastName,
          email: states.email,
          password: states.newPassword,
          confirmPassword: states.confirmPassword,
        });

        setUnverifiedEmailToLocalStorage(states.email);

        router("/otp");
      } else {
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === "string"
      ) {
        setError(error.response.data);
      }
    }
  };

  return (
    <>
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
        <div className="absolute px-10">
          <div className="m-auto flex-row justify-center">
            <h1 className=" text-center text-[40px] text-zinc-50 ">Hello! Welcome to Kaha Basney Aaja</h1>
            <p className="text-center text-zinc-300">Mind joining us?</p>
          </div>

          <div className="flex items-center justify-center">
            <form
              className="4xl:max-w-4xls max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              method="POST"
            >
              <div className="my-2 flex justify-center gap-4">
                <InputField
                  type="text"
                  placeholder="first name"
                  name="firstName"
                  id="fname"
                  handleChange={handleChange}
                  customStyle={{ width: "calc(50% - 1.25rem)" }}
                  title="First Name"
                  error={errors.firstName || error}
                />
                <InputField
                  type="text"
                  placeholder="last name"
                  name="lastName"
                  id="lname"
                  required
                  handleChange={handleChange}
                  className="  mx-auto mb-2 mr-5 h-10 w-36 rounded-lg border-2 border-green-50 bg-gray-200 text-center"
                  title="Last Name"
                  customStyle={{ width: "50%" }}
                  error={errors.lastName}
                />
              </div>
              <div>
                <div className="flex flex-col gap-2 pb-6">
                  <InputField
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    id="email"
                    required
                    handleChange={handleChange}
                    className="  mx-auto mb-2 mr-5 h-10 w-80 rounded-lg border-2 border-green-50  bg-gray-200"
                    title="Email"
                    error={errors.email}
                  />
                  <InputField
                    type="password"
                    placeholder="*******"
                    name="newPassword"
                    id="password"
                    required
                    handleChange={handleChange}
                    className="mx-auto mb-2 mr-5 h-10 w-80 rounded-lg border-2 border-green-50  bg-gray-200"
                    title="Password"
                    error={errors.newPassword}
                  />
                  <InputField
                    type="password"
                    placeholder="*******"
                    name="confirmPassword"
                    id="rpassword"
                    required
                    handleChange={handleChange}
                    className="mx-auto mb-3 mr-5 h-10 w-80 rounded-lg border-2 border-green-50 bg-gray-200"
                    title="Re-enter Password"
                    error={errors.confirmPassword}
                  />
                </div>
                <Button
                  text={"Create Account"}
                  onClick={(e) => handleSubmit(e)}
                />
                <div className="my-3 flex justify-start">
                  <p className="text-zinc-200">
                    Already have an account? &nbsp;
                    <Link
                      to="/login"
                      className="
                      cursor-pointer font-semibold text-blue-200 text-primary hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
