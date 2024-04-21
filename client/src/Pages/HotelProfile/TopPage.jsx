import React, { useEffect, useState } from "react";
import { doGet } from "../../Services/Axios";
import { Logo, Room1, Room2, Room3, Room4, profile } from "../../assets/img";
const TopPages = () => {
  const [value, setValue] = useState("Nepal");
  const options = ["China", "India", "Australia", "America", "Russia"];
  const onOptionChangeHandler = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const getAllHotels = async () => {
      try {
        const resp = await doGet("/hotel/all");
      } catch (error) {}
    };
    getAllHotels();
  }, []);

  return (
    <>
      <div className="place-items-left grid">
        <img
          src={Logo}
          alt="logo"
          className="relative top-3 left-16 w-52 text-black"
        />
        <div className="absolute top-14 right-[20rem] flex w-36 items-center justify-evenly rounded-xl bg-[#F5F5F5] px-2 py-1 text-black">
          <i className="fa-solid fa-globe"></i>
          <select
            onChange={onOptionChangeHandler}
            className="bg-transparent outline-none"
          >
            <option className="bg-black">{value}</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className="absolute top-14 right-[14rem] w-20 rounded-xl bg-[#F5F5F5] px-2 py-1 text-black">
          <p className="px-5">Ajju</p>
        </div>
        <div>
          <img
            src={profile}
            alt="logo"
            className="absolute top-12 right-40 h-12 w-12 rounded-full bg-red-300"
          />
        </div>
      </div>
      <div className="mt-5 border bg-light-gray">
        <div className=" flex px-24 pt-8">
          <img src={Room2} alt="Room-1" className="h-38 w-92 absolute" />
          <img src={Room1} alt="Room-1" className="h-54 mt-56" />
          <img src={Room4} alt="Room-1" className="relative h-1/4 px-5" />
          <img src={Room3} alt="Room-1" className="" />
        </div>

        <div className="mt-8 px-24">
          <div>
            <span className="mr-3 text-2xl font-semibold">Pokhreli Home</span>
            <i class=" fa-solid fa-star text-primary "></i>
            <i class="fa-solid fa-star text-primary"></i>
            <i class="fa-solid fa-star text-primary"></i>
            <i class="fa-solid fa-star text-primary"></i>
          </div>
          <i className="  fa-solid fa-location-dot"></i>
          <span className="p-2 text-sm">Pokhara, Chapagau</span>
          <br />
          <i class=" fa-solid fa-message-pen"></i>
          <span className="p-2 text-sm">55 review</span>
          <br />
          <i class=" fa-regular fa-water"></i>
          <span className="mr-8 p-2 text-sm">lake side</span>
          <i class=" fa-regular fa-bed-pulse"></i>
          <span className="p-2 text-sm">Free Cancelation</span>
        </div>
      </div>
    </>
  );
};
export default TopPages;
