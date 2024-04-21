import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl, doGet } from "../../Services/Axios";
import { image7, image8 } from "../../assets/img";
import CommonCard from "../../components/CommonCar";
import OfferCard from "./OfferCard";

const Offer = () => {
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

  console.log(hotelWithOffers, "rockd");

  return (
    <div className="mb-20">
      <h1 className="my-10 text-center text-2xl sm:text-4xl md:text-5xl">
        Limited Offer
      </h1>
      <div className="flex flex-wrap justify-evenly">
        {hotelWithOffers.map((item) => (
          <>
            <Link to={`/hoteldescription/${item.hotel_id}`}>
              <CommonCard item={item} />
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default Offer;
