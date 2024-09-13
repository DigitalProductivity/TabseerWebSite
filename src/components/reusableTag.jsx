import React from "react";
import { useTranslation } from "react-i18next";

function ReusableTag(props) {
  let color = "";
  let backgroundColor = "";
  let statusColor = "";
  let statusBackgroundColor = "";
  let text = "";

  const { t } = useTranslation();

  if (props.sectorName !== null) {
    switch (props.sectorName) {
      case props.sectorName:
        (text = props.sectorName),
          (color = "#bb8d4f"),
          (backgroundColor = "rgb(233,226,215)");
        break;
    }
  }

  if (props.status !== null) {
    switch (props.status) {
      case 4:
        (backgroundColor = "#eaf5fb"),
          (color = "#359fdc"),
          (text = t("Completed"));
        break;
      case "rejected":
        (backgroundColor = "#fcedeb"),
          (color = "#e25546"),
          (text = t("Rejected"));
        break;
      case 1:
        (backgroundColor = "#fef7eb"),
          (color = "#f2b43c"),
          (text = t("Approved"));
        break;
      case 5:
        (backgroundColor = "#f6f6f6"),
          (color = "#a6a6a6"),
          (text = t("Expired"));
        break;
      case 2:
        (backgroundColor = "#ebf7f1"),
          (color = "#3bb273"),
          (text = t("Commented"));
        break;
      case 3:
        (backgroundColor = "#f5f5f5"),
          (color = "#9b9b9b"),
          (text = t("Cancelled"));
        break;

      default:
        break;
    }
  }

  if (props.slotBookingStatus !== null) {
    switch (props.slotBookingStatus) {
      case 1:
        (backgroundColor = "#eaf7f1"),
          (color = "#39aa6f"),
          (text = t("Booked"));
        break;
      case 0:
        (backgroundColor = "#fcedeb"),
          (color = "#e14a3a"),
          (text = t("Unbooked"));
        break;
    }
  }

  switch (props.typeOfUser) {
    case 1:
      color = "black";
      backgroundColor = "lightGray";
      text = t("individual");
      break;
    case 2:
      color = "#bb8d4f";
      backgroundColor = "rgb(233,226,215)";
      text = t("institution");
      break;
    default:
      break;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "30px",
        width: "80px",
        backgroundColor: backgroundColor,
        borderRadius: "5px",
      }}
    >
      <p
        style={{
          color: color,
          padding: "5px 10px",
          margin: 0,
          fontSize: "12px",
          textTransform: "capitalize",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default ReusableTag;
