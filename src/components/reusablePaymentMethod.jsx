import React from "react";
import { useTranslation } from "react-i18next";
import colors from "../assets/constants/colors";
import { iconApplePay, iconAtmCard, iconGiftCard, iconWallet } from "../assets/images";

function ReusablePaymentMethod(props) {
  let image;
  let text;

  const {t}=useTranslation();
  switch (props.paymentMode) {
    case 2:
      image = iconApplePay, 
      text = null;
      break;

    case 2:
      image = iconGiftCard;
      text = t("Gift");
      break;

    case 1:
      image = iconAtmCard;
      text = t("PayByCard");
      break;

    case 3:
      image = iconWallet;
      text = t("WalletDeduction");
      break;
  }
  return (
    <div className="d-flex  align-items-center">
      <img
        src={image}
        style={{
          height: props.iconHeight || "auto",
          width: props.iconWidth || "20px",
        }}
      />
      <p
        className="m-0"
        style={{
          display: text == null ? "none" : "block",
          color: colors.secondaryColor,
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default ReusablePaymentMethod;
