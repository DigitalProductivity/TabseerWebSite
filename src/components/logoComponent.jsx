import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import images from "../assets/constants/images";
import { logoFull, logoSymbolOnly } from "../assets/images";

function LogoComponent(props) {
  const { width, height } = useWindowDimensions();
  return (
    <img
      src={width <= 576 ? logoSymbolOnly :logoFull }
      alt="Alrefaei & Aldahash Law Firm Logo"
      style={{
        height: "auto",
        width: props.width ||  (width <= 576 ? "50px" : "200px") ,
      }}
    />
  );
}

export default LogoComponent;
