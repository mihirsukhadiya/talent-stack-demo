import React from "react";
import "../../css/loader.css";
const Loader = () => {
  return (
    <>
      <div className="mesh-loader">
        <div className="set-one">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="set-two">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
