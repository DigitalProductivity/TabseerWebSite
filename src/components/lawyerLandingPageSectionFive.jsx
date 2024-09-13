import React from "react";
import images from "../assets/constants/images";
import { appleStoreIcon, chatIcon, googlePlayStoreIcon, landingPageSectionFiveImage, telephoneIcon, videoCallIcon } from "../assets/images";
import { useTranslation } from "react-i18next";

function LawyerLandingPageSectionFive() {

  const {t}=useTranslation();
  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
            <h3 style={{ lineHeight: "40px" }}>
              <span style={{ color: "#B48F5A" }}>{t("Download")}</span> {t("AppNowConsulationsOne")}{" "}
              <span style={{ color: "#B48F5A" }}>{t("AppNowConsulationsTwo")}</span>{t("AppNowConsulationsThree")}{" "}
            </h3>

            <p style={{ color: "gray", lineHeight: "25px" }}>
             {t("LawyerLanFiveDescription")}
            </p>

            <div className="d-flex justify-content-start gap-5 w-100 mb-3">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <>
                  <img
                    src={chatIcon}
                    style={{ height: "auto", width: "40px" }}
                  />
                </>

                <>
                  <p className="mb-0" style={{ color: "gray" }}>
                    {t("Chat")}
                  </p>
                </>
              </div>

              <div className="d-flex justify-content-center align-items-center gap-2">
                <>
                  <img
                    src={telephoneIcon}
                    style={{ height: "auto", width: "40px" }}
                  />
                </>

                <>
                  <p className="mb-0" style={{ color: "gray" }}>
                    {t("AudioCall")}
                  </p>
                </>
              </div>

              <div className="d-flex justify-content-center align-items-center gap-2">
                <>
                  <img
                    src={videoCallIcon}
                    style={{ height: "auto", width: "40px" }}
                  />
                </>

                <>
                  <p className="mb-0" style={{ color: "gray" }}>
                   {t("VideoCall")}
                  </p>
                </>
              </div>
            </div>

            <div className="d-flex justify-content-start w-100 gap-3">
              <div
                className="d-flex"
                style={{
                  backgroundColor: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  height: "50px",
                  width: "160px",
                }}
              >
                <>
                  <img
                    src={appleStoreIcon}
                    style={{ height: "40px", width: "40px" }}
                  />
                </>

                <div className="d-flex flex-column">
                  <p
                    className="mb-0"
                    style={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {t("Download")}
                  </p>
                  <p
                    className="mb-0"
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    {t("AppStore")}
                  </p>
                </div>
              </div>

              <div
                className="d-flex"
                style={{
                  backgroundColor: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  height: "50px",
                  width: "160px",
                }}
              >
                <>
                  <img
                    src={googlePlayStoreIcon}
                    style={{ height: "40px", width: "40px" }}
                  />
                </>

                <div className="d-flex flex-column">
                  <p
                    className="mb-0"
                    style={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {t("GETITON")}
                  </p>
                  <p
                    className="mb-0"
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    {t("GooglePlay")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="d-flex">
            <img
              src={landingPageSectionFiveImage}
              style={{ height: "auto", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerLandingPageSectionFive;
