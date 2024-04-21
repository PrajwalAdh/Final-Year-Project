import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cloud } from "../../assets/img";
import carImage from "../../assets/img/20-1.png";
import localOfferImage from "../../assets/img/discount.png";
import hotelImage from "../../assets/img/img1.png";
import CsCard from "../../components/CsCard";

const Banner = () => {
  const [position, setPostiion] = useState({
    longitude: 85.34,
    latitude: 27.72,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) =>
      setPostiion((prev) => ({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }))
    );
  }

  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}&longitude=${position.longitude}&hourly=temperature_2m&current_weather=true`
      );
      setWeather(response.data.current_weather);
    };
    fetchWeather();
  }, []);

  return (
    <>
      {
        <div className="my-20 flex flex-wrap place-items-center justify-evenly gap-4">
          <Link to={"/search/hotel"}>
            <CsCard
              image={hotelImage}
              title={"Hotel Book"}
              description={"Book best hotel from different locations"}
            />
          </Link>
          <Link to={"/search/car"}>
            <CsCard
              image={carImage}
              title={"Car Rent"}
              description={"Best cars near your location to visit places"}
            />
          </Link>
          <Link to={"/offer"}>
            <CsCard
              image={localOfferImage}
              title={"Local Offers"}
              description={"Check out local offers in your area"}
            />
          </Link>
          <div className="weather flex w-[17rem] cursor-pointer items-center justify-center bg-[#F5F5F5] py-2 px-3">
            <div>
              <h1 className="text-center text-[1.5rem]">Weather</h1>
              <p className="mx-2 flex text-justify">
                {weather && weather.temperature}
                <div>
                  <sup>o</sup>C
                </div>
                <img src={cloud} alt="" className="mx-3 h-full w-16" />
              </p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Banner;
