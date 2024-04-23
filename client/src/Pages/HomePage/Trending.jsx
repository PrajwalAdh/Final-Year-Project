import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {} from "../../App.css";
import { baseUrl, doGet } from "../../Services/Axios";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from "../../assets/img";
import Card from "./Card";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const handleGetOfferHotels = async () => {
    try {
      const response = await doGet("/hotel/all");

      setTrending(
        response.data && response.data.length > 0
          ? response.data.sort((a, b) => {
              if (a.totalReviews - b.totalReviews < 0) {
                return 1;
              } else {
                return -1;
              }
            })
          : []
      );
    } catch (error) {}
  };
  useEffect(() => {
    handleGetOfferHotels();
  }, []);
  console.log(trending);
  return (
    <>
      <h1 className="my-10 text-center text-2xl sm:text-4xl md:text-5xl">
        Hotels and Destinations for you!
      </h1>
      <div className="grid-template-column mb-20">
        {trending.map((item) => (
          <Card item={item} />
        ))}
     
      </div>
    </>
  );
};

export default Trending;
