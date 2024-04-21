import React, { useContext, useState } from "react";
import SecondaryBrandLogo from "../../assets/img/SecondaryBrandLogo.png";

import coverPic from "../../assets/img/coverPic.jpg";
import { Untitled } from "../../assets/video";

import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalLayout from "../../ResuableComponents/ModalLayout";
import { doGet, doPost } from "../../Services/Axios";
import { getUserFromLocalStorage } from "../../Services/Helpers";
import { useCurrentUserContextConsumer } from "../../Services/useUserLocation";

const TopPage = () => {
  const navigate = useNavigate();
  const { options, location, setLocation } = useCurrentUserContextConsumer();
  const [searchTerm, setSearchTerm] = useState("");
  const onOptionChangeHandler = (event) => {
    setLocation(event.target.value);
  };
  useEffect(() => {
    const getAllHotels = async () => {
      try {
        const resp = await doGet("/hotel/all");
      } catch (error) {}
    };
    getAllHotels();
  }, []);

  const [display, setDisplay] = useState(false);
  const onClickHandler = () => {
    setDisplay((prev) => !prev);
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      toast.error("Search Term Cannot be empty");
    } else {
      navigate(`/search`, {
        state: searchTerm,
      });
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {display === true && (
        <div
          className={
            // ? 'fixed z-40 hidden h-screen w-screen place-items-center bg-black bg-opacity-75'
            "fixed z-40 grid h-screen w-screen place-items-center bg-black bg-opacity-75"
          }
        >
          <div className="w-[25rem] rounded-xl bg-white px-5 py-2 pb-10">
            <div className="my-3 flex items-center justify-between">
              <h2 className="text-3xl">Regional Setting</h2>
              <span
                className="cursor-pointer bg-transparent"
                onClick={onClickHandler}
              >
                &#x274C;
              </span>
            </div>
            <hr className="h-[2px] w-full bg-black" />
            <div className="my-3 flex items-center justify-start">
              <i className="fa-solid fa-globe mr-3"></i>
              <h2 className="text-2xl">Country Name</h2>
            </div>
            <p>
              Selecting the country you're inwill give you local deals and
              information.
            </p>
            <select
              onChange={onOptionChangeHandler}
              className="w-full border-2 bg-transparent px-3 py-2 text-xl outline-none "
            >
              <option className="">{location}</option>
              {location &&
                options.map((option, index) => {
                  return (
                    <option key={index} valuw={option.country}>
                      {option.country}
                    </option>
                  );
                })}
            </select>
            <div className="my-3 flex items-center justify-start">
              <i className="fa-solid fa-sack-dollar mr-3"></i>
              <h2 className="text-xl">Currency</h2>
            </div>
            <div className="w-full border-2 bg-transparent px-3 py-2 text-xl outline-none">
              <input
                type="text"
                name=""
                id=""
                value={
                  location &&
                  options.filter((item) => item.country === location)[0]
                    .currency
                }
                className="w-full border-none bg-transparent text-slate-400 outline-none"
              />
            </div>
          </div>
        </div>
      )}
      <div className="grid place-items-center">
        <div className="relative grid h-[35vh] place-items-center overflow-hidden sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[80vh] 3xl:h-[90vh]">
          <img
            src={coverPic}
            alt="coverpic"
            style={{ objectFit: "cover", height: "100%" }}
          />
          <div className="absolute z-10 h-full w-full bg-black opacity-30"></div>
        </div>
        <div className="absolute top-4 z-20 flex w-full items-center justify-between">
          <img
            src={SecondaryBrandLogo}
            alt="logo"
            className="z-20 w-36 text-white sm:w-72"
          />
          <div className="flex w-full justify-around gap-5 sm:w-3/12 md:w-3/12 lg:w-2/12">
            {/* <div
              className="box-shadow w-cotent z-50 flex cursor-pointer items-center justify-evenly rounded-xl bg-transparent px-2 py-1 text-xs text-white"
              onClick={onClickHandler}
            >
              <i className="fa-solid fa-globe"></i>&nbsp;
              <span className="sm:text-base">
                {location &&
                  options.filter((item) => item.country === location)[0]
                    .country}
                &nbsp;{" "}
                {location &&
                  options.filter((item) => item.country === location)[0]
                    .currency}
                &emsp;&emsp;&#x25BC;
              </span>
            </div> */}

            {getUserFromLocalStorage() ? (
              <Link to={"/profile"}>
                <button className="box-shadow z-20 w-16 rounded-xl bg-transparent px-2 py-1 text-xs text-white sm:w-24 sm:text-base md:w-36">
                  {getUserFromLocalStorage()}
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="box-shadow m:w-36 z-20 w-16 rounded-xl bg-transparent px-2 py-1 text-xs text-white sm:w-24 sm:text-base">
                  Login
                </button>
              </Link>
            )}
          </div>
          <div className="absolute z-20 mt-80 flex w-[100%] justify-center rounded-xl align-middle text-gray-50 ">
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "500",
                letterSpacing: "1px",
              }}
            >
              Your Stay, Your Way - Book with Ease!
            </p>
          </div>
        </div>

        <div className="absolute z-20 mt-28 flex w-[80%] rounded-xl bg-white sm:w-[60%] md:mt-10 md:w-[40%]">
          <i className="fa-regular fa-magnifying-glass m-auto w-10 bg-transparent px-2 text-sm text-slate-500"></i>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full rounded-xl border-none bg-transparent px-1 py-2 text-sm text-opacity-[50%] outline-none sm:py-3"
            placeholder="Where do you want to stay ??"
            onChange={(e) => handleSearchChange(e)}
          />
          <div
            className="grid w-[30%] place-items-center rounded-r-xl bg-primary text-white"
            onClick={handleSearch}
          >
            <button className="">Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPage;
