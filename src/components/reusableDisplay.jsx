import React from "react";
import ReusableTextImgTag from "./reusableTextImgTag";
import {
  calendarIcon,
  iconClaimsMgmtActive,
  iconClock,
  iconIndividual,
} from "../assets/images";

import { useTranslation } from "react-i18next";
import ReusableContentEncloser from "./reusableContentEncloser";
import colors from "../assets/constants/colors";

const ReusableDisplay = (props) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column gap-4 ">
      <div className="row">
        <div className="col-lg-6 mb-3">
          <ReusableTextImgTag
            headingText={"Client name"}
            imgWidth={"35px"}
            iconSourceImage={iconIndividual}
            iconExplanationText={props.firstIconExplanationText}
          />
        </div>
        <div className="col-lg-6 mb-3">
          <ReusableTextImgTag
            headingText={"Order Id"}
            imgWidth={"40px"}
            iconSourceImage={iconClaimsMgmtActive}
            iconExplanationText={props.secondIconExplanationText}
          />
        </div>

        <div className="col-lg-6 mb-3">
          <ReusableTextImgTag
            headingText={"Date"}
            imgWidth={"35px"}
            iconSourceImage={calendarIcon}
            iconExplanationText={props.thirdIconExplanationText}
          />
        </div>

        <div className="col-lg-6 mb-3">
          <ReusableTextImgTag
            headingText={"Time"}
            imgWidth={"30px"}
            iconSourceImage={iconClock}
            iconExplanationText={props.fourthIconExplanationText}
          />
        </div>

      {
        props.fifthIconExplanationText&&(
      <div className="col-lg-6 mb-3">
          <ReusableTextImgTag
            headingText={"Status"}
            imgWidth={"15px"}
            iconSourceImage={props.onlineStatusImage}
            iconExplanationText={props.fifthIconExplanationText}
          />
        </div>

        )
      }  
      </div>

      <div className="row">
        <div className="mb-3">
          <p>{t("Description")}</p>
          <p
            className="m-0"
            style={{
              backgroundColor: "lightGray",
              padding: "15px",
              borderRadius: "5px",
              color: colors.secondaryColor,
            }}
          >
            {props.description}
          </p>
        </div>

        <div className="mb-3">
          <p>{t("Attachment")}</p>

          <div className="row" style={{ color: "lightGray" }}>
            {props?.attachments?.length == 0 ? (
              <p>{t("NoAttachmentsAvailable")}</p>
            ) : (
              props?.attachments?.map((item, index) => (
                <div className="col-lg-6 mb-3">
                  <ReusableContentEncloser
                    fileType={item.type}
                    fileName={item.name}
                    fileLink={item.url}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <p>{t("Comment")}</p>
          {props.lawyerNotes !== null ? (
            <p
              className="m-0"
              style={{
                backgroundColor: "lightGray",
                padding: "15px",
                borderRadius: "5px",
                color: colors.secondaryColor,
              }}
            >
              {props.LawyerNotes}
            </p>
          ) : (
            <div style={{ color: "lightGray" }}>
              <p>No comments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReusableDisplay;
