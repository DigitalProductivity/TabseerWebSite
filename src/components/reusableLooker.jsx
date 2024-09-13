import React from "react";
import colors from "../assets/constants/colors";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useTranslation } from "react-i18next";
import { iconEditPencil } from "../assets/images";

const ReusableLooker = (props) => {
  const { width, height } = useWindowDimensions();

  const { t } = useTranslation();
  return (
    <div
      className="container p-0"
      style={{
        border: `2px solid ${colors.primaryColor}`,
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        className="col-lg-12"
        style={{
          // border: `2px solid ${colors.primaryColor}`,
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: colors.secondaryColorLighterShade,
          position: "relative",
        }}
        onClick={props.onClick}
      >
        <div className="row">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ borderBottom: `2px solid ${colors.primaryColor}` }}
          >
            <p style={{ color: colors.primaryColor, fontWeight: "bold" }}>
              {props.date}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  borderRight: `2px solid ${colors.primaryColor}`,
                  borderBottom: `2px solid ${colors.primaryColor}`,
                  padding: "10px",
                }}
              >
                <p className="m-0">{props.forenoon}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div
                  className="d-flex flex-column justify-content-center align-items-center gap-2"
                  style={{ padding: "10px" }}
                >
                  <p className="m-0">{props.forenoonTimeOne}</p>
                  {props.forenoonTimeOne == "" ? (
                    <p className="m-0">{t("No_session")}</p>
                  ) : (
                    <p className="m-0">{t("To")}</p>
                  )}

                  <p className="m-0">{props.forenoonTimeTwo}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  borderRight: `2px solid ${colors.primaryColor}`,
                  borderBottom: `2px solid ${colors.primaryColor}`,
                  borderTop:
                    width <= 576 ? `2px solid ${colors.primaryColor}` : "none",
                  padding: "10px",
                }}
              >
                <p className="m-0">{props.afternoon}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div
                  className="d-flex flex-column justify-content-center align-items-center gap-2"
                  style={{ padding: "10px" }}
                >
                  <p className="m-0">{props.afternoonTimeOne}</p>
                  {props.afternoonTimeOne == "" ? (
                    <p className="m-0">{t("No_session")}</p>
                  ) : (
                    <p className="m-0">{t("To")}</p>
                  )}

                  <p className="m-0">{props.afternoonTimeTwo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "-2px",
          right: "-2px",
          background: colors.primaryColor,
          borderBottomLeftRadius: "50%",
          height: "37px",
          width: "37px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
          transform: "rotateY(-10deg) rotateX(10deg)",
          perspective: "1000px",
        }}
        className="d-flex flex-row justify-content-center align-items-center"
        onClick={props.onPencilIconClick}
      >
        <img src={iconEditPencil} style={{ height: "auto", width: "20px" }} />
      </div>
    </div>
  );
};

export default ReusableLooker;
