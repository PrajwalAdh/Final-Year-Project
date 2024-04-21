import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl, doGet } from "../../Services/Axios";
import Card from "../HomePage/Card";
import OfferCard from "../HomePage/OfferCard";

const LocalOffer = () => {
  const [hotelWithOffers, setHotelsWithOffer] = useState([]);
  const handleGetOfferHotels = async () => {
    try {
      const response = await doGet("/hotel/readlimitedofferhotels");

      setHotelsWithOffer(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleGetOfferHotels();
  }, []);
  return (
    <div className="h-screen w-screen bg-slate-300">
      <div className="flex items-center justify-center py-6 text-3xl">
        Local Offers
      </div>
      <div className="flex flex-wrap justify-evenly">
        {hotelWithOffers.map((item) => (
          <Link to={`/hoteldescription/${item.hotel_id}`}>
            <div className="my-5 flex w-[20rem] rounded-lg bg-[#F5F5F5] hover:bg-slate-500 hover:bg-opacity-50">
              <div>
                <div className="relative h-fit overflow-hidden rounded-lg bg-transparent lg:h-[10rem]">
                  <img
                    src={`${baseUrl}/image/hotel/${item.hotelImages[0]}`}
                    alt=""
                    className="w-screen object-cover"
                  />
                  <img
                    src={`${baseUrl}/image/hotel/${item.hotelImages[1]}`}
                    alt=""
                    className="absolute top-2 right-2 w-10"
                  />
                </div>
                <div className="px-3 py-1">
                  <div className="flex justify-between">
                    <div>
                      <i className="fa-solid fa-location-dot mx-1 text-[10px]"></i>
                      <span className="text-[10px]">{item.location}</span>
                    </div>
                    <div className="">
                      {Array.from(Array(5)).map((el, index) => (
                        <i
                          className={` fa-star   ${
                            index < item.averageRating
                              ? "fa-solid text-primary "
                              : "fa-regular text-black"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <h2 className="flex gap-4 text-xl">
                    <div>{item.name}</div>
                    <div>
                      {item.averageCost
                        ? `Rs. ${item.averageCost.toFixed(0)}`
                        : "Rs. 0"}
                    </div>
                  </h2>
                  <p className="text-justify">{item.description}</p>
                </div>
                <div className="flex">
                  <button className="w-full self-end rounded-b-lg bg-primary py-2 text-white drop-shadow-lg">
                    Details
                  </button>
                  <div className="flex w-10 justify-center border-[1px] bg-transparent bg-white py-2">
                    <select
                      name=""
                      id=""
                      className="border-none bg-transparent outline-none"
                    >
                      <option value="" className=""></option>
                      <option value="" className=""></option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LocalOffer;
