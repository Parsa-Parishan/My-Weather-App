import React, { useState, useEffect } from "react";
import loader from "../background/loader.gif";

export default function Loader() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(() => true);
    }, 4000);
  }, []);

  return (
    <div className={`wrapper ${load && "fade"}`}>
      <img src={loader} alt="" className="loader" />
    </div>
  );
}
