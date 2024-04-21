import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserFromLocalStorage,
  isRemoveUserFromLocalStorage,
} from "../../Services/Helpers";
import { useCurrentUserContextConsumer } from "../../Services/useUserLocation";
import { profile } from "../../assets/img";
import PrimaryBrandLogo from "../../assets/img/PrimaryBrandLogo.png";

const NavBar = () => {
  const { options, location, setLocation } = useCurrentUserContextConsumer();
  const onOptionChangeHandler = (event) => {
    setLocation(event.target.value);
  };

  const [display, setDisplay] = useState(true);
  const onClickHandler = () => {
    display === true ? setDisplay(false) : setDisplay(true);
  };

  const [show, setShow] = useState(true);
  const onClickHandler1 = () => {
    show === true ? setShow(false) : setShow(true);
  };

  const handlegOut = () => {
    isRemoveUserFromLocalStorage();
    window.location.href = "/";
  };
  return (
    <>
      <div className="place-items-left grid bg-red-300">
        <Link to={"/"}>
          <img
            src={PrimaryBrandLogo}
            alt="logo"
            className="absolute top-3 left-16 w-72 text-black"
          />
        </Link>
        <div className="absolute top-24 right-[4rem] w-20 rounded-xl bg-[#F5F5F5] px-2 py-1 text-black sm:top-14 sm:right-[5rem] md:right-[7rem] lg:right-[7rem]">
          <p className="px-5">{getUserFromLocalStorage()}</p>
        </div>
        <div className="absolute top-20 right-[.1rem] sm:top-12 sm:right-[1rem] md:right-[3rem]">
          <Avatar size={48} icon={<UserOutlined />} />
          <div
            className={
              show === true
                ? "top-15 absolute right-5 z-20 hidden w-max rounded-lg bg-white py-2 shadow shadow-black"
                : "top-15 absolute right-5 z-20 grid w-max rounded-lg bg-white py-2 shadow shadow-black"
            }
          >
            <h2
              className="font-regular cursor-pointer rounded-lg px-5 py-1 text-lg hover:bg-[#F5F5F5]"
              onClick={handlegOut}
            >
              Sign Out
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
