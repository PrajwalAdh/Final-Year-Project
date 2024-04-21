import React from "react";
import Logo from "../../assets/img/SecondaryBrandLogo.png";

const Footer = () => {
  return (
    <>
      <div className="bg-red relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
          className=""
        >
          <path
            fill="#8D021F"
            fill-opacity="1"
            d="M0,128L60,117.3C120,107,240,85,360,69.3C480,53,600,43,720,53.3C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <div className="expand h-fit w-full bg-[#8D021F] pb-10">
          <img src={Logo} alt="" className="mx-10 w-80" />
          <div className="flex h-fit flex-wrap justify-evenly gap-14 px-14">
            <div className="w-content leading-10 text-gray-300">
              <h1 className="mb-5 text-[2rem] font-semibold text-white">
                Call Now
              </h1>
              <p>Chabahil, Kathmandu</p>
            </div>
            <div className="w-content leading-10 text-gray-300">
              <h1 className="mb-5 text-[2rem] font-semibold text-white">
                Quick Links
              </h1>
              <p>Travel Website</p>
              <p>Brands</p>
              <p>Featured Products</p>
            </div>
            <div className="w-content leading-10 text-gray-50">
              <h1 className="mb-5 text-[2rem] font-semibold text-white">
                Information
              </h1>
              <p>Privacy Policy</p>
              <p>Terms and Conditions</p>
              <p>FAQ's</p>
              <p>Contat Us</p>
            </div>
          </div>
          <div className="copyright grid place-items-center text-white">
            <small className="m-auto mt-5">Copyright &copy; 2024</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
