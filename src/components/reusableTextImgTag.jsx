import React from "react";
import colors from "../assets/constants/colors";

function ReusableTextImgTag(props) {
  return (
    <div
      className="d-flex flex-column  justify-content-between"
      style={{ minHeight: "60px", maxHeight: "60px" }}
    >
      <div className="h-50">
        <p
          className="m-0"
          style={{ color: "#a9a9a9", textTransform: "capitalize" }}
        >
          {props.headingText}
        </p>
      </div>
      <div className="h-50">
        {props.iconExplanationText !== null && (
          <div className="d-flex gap-2 align-items-center">
            <img
              src={props.iconSourceImage}
              style={{ height: "auto", width: props.imgWidth || "30px" }}
            />
            <p className="m-0" style={{ color: colors.secondaryColor }}>
              {props.iconExplanationText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReusableTextImgTag;
