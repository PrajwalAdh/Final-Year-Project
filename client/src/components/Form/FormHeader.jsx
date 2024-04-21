import React from "react";

function FormHeader() {
  return (
    <div className="flex h-[94px] w-screen items-center justify-center bg-primary">
      <div className="flex w-full justify-between">
        <div className="left w-full"></div>
        <div className="right flex w-full items-center justify-end px-10 text-white">
          <i className="fa-solid fa-envelope mx-2"></i>
          <p>willowdale@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default FormHeader;
