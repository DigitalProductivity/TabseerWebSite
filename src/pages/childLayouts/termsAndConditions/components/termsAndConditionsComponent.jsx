import React from "react";
import colors from "../../../../assets/constants/colors";
import TermsSupportComponent from "./termsSupportComponent";
import { useTranslation } from "react-i18next";

const TermsAndConditionsComponent = () => {
  const {t}=useTranslation();
  return (
    <div>
      <div className="d-flex flex-column gap-3">
        <h5 style={{ color: colors.primaryColor }}>{t("Introduction")}</h5>

        <p style={{ color: colors.secondaryColor, lineHeight: "32px" }}>
         {t("Header_content")}
        </p>
      </div>

      <div>
        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>{t("ChapterOneDefinitions")}</h5>

        <div>
          <TermsSupportComponent
            boldText={t("First")}
            nonBoldContent={t("Chapter_One_Header")}
          />

          <div>
            <ul style={{ listStyleType: "number" }}>
              <li>
                <TermsSupportComponent
                  boldText={t("User")}
                  nonBoldContent={t("Chapter_One_One")}
                />
              </li>

              <li>
                <TermsSupportComponent
                  boldText={t("Service_provider")}
                  nonBoldContent={t("Chapter_One_Two")}
                />
              </li>

              <li>
                <TermsSupportComponent
                  boldText={t("Platform")}
                  nonBoldContent={t("Chapter_One_Three")}
                />
              </li>

              <li>
                <TermsSupportComponent
                  boldText={t("Account")}
                  nonBoldContent={t("Chapter_One_Four")}
                />
              </li>

              <li>
                <TermsSupportComponent
                  boldText={t("Service_Services")}
                  nonBoldContent={t("Chapter_One_Five")}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">

        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
          {t("Chapter_Two_Header")}
        </h5>

        <ul
          style={{ listStyleType: "number", lineHeight: "32px" }}
          className="d-flex flex-column gap-2"
        >
          <li>
          {t("Chapter_Two_One")}
          </li>

          <li>
          {t("Chapter_Two_Two")}
          </li>

          <li>
            {t("Chapter_Two_Three")}
          </li>

          <li>
           {t("Chapter_Two_Four")}
          </li>

          <li>
           {t("Chapter_Two_Five")}
          </li>

          <li>
           {t("Chapter_Two_Six")}
          </li>

          <li>
           {t("Chapter_Two_Seven")}
          </li>

          <li>
            {t("Chapter_Two_Eight")}
          </li>

          <li>
          {t("Chapter_Two_Nine")}
          </li>

          <li>
           {t("Chapter_Two_Ten")}
          </li>
        </ul>
      </div>

      <div className="d-flex flex-column gap-3">
        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
        {t("Chapter_Three_Header")}
        </h5>

        <ul
          style={{ listStyleType: "number", lineHeight: "32px" }}
          className="d-flex flex-column gap-2"
        >
          <li>
            {t("Chapter_Three_One")}
          </li>

          <li>
            {t("Chapter_Three_Two")}
          </li>

          <li>
            {t("Chapter_Three_Three")}
          </li>

          <li>
            {t("Chapter_Three_Four")}
          </li>

          <li>
            {t("Chapter_Three_Five")}
          </li>

          <li>
            {t("Chapter_Three_Six")}
          </li>

        </ul>

      </div>

      <div className="d-flex flex-column gap-3">
        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
        {t("Chapter_Four_Header")}
        </h5>

        <ul
          style={{ listStyleType: "number", lineHeight: "32px" }}
          className="d-flex flex-column gap-2"
        >
          <li>
            {t("Chapter_Four_One")}
          </li>

          <li>
            {t("Chapter_Four_Two")}
          </li>


          <li>
            {t("Chapter_Four_Three")}
          </li>

          <li>
            {t("Chapter_Four_Four")}
          </li>

        </ul>

      </div>

      <div className="d-flex flex-column gap-3">
        
        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
        {t("Chapter_Five_Header")}
        </h5>

        <ul
          style={{ listStyleType: "number", lineHeight: "32px" }}
          className="d-flex flex-column gap-2"
        >
          <li>
            {t("Chapter_Five_One")}
          </li>

          <li>
            {t("Chapter_Five_Two")}
          </li>

          <li>
            {t("Chapter_Five_Three")}
          </li>

          <li>
            {t("Chapter_Five_Four")}
          </li>

          <li>
            {t("Chapter_Five_Five")}
          </li>

          <li>
            {t("Chapter_Five_Six")}
          </li>

        </ul>

      </div>
      
      <div className="d-flex flex-column gap-3">

        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
       {t("Chapter_Six_Header")}
        </h5>

        <ul
          style={{ listStyleType: "number", lineHeight: "32px" }}
          className="d-flex flex-column gap-2"
        >
          <li>
            {t("Chapter_Six_One")}
          </li>

          <li>
            {t("Chapter_Six_Two")}
          </li>

          <li>
            {t("Chapter_Six_Three")}
          </li>

          <li>
            {t("Chapter_Six_Four")}
          </li>

          <li>
            {t("Chapter_Six_Five")}
          </li>

          <li>
            {t("Chapter_Six_Six")}
          </li>

          <li>
            {t("Chapter_Six_Seven")}
          </li>

        </ul>

      </div>

      <div className="d-flex flex-column gap-3">

        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
        {t("Chapter_Seven_Header")}
        </h5>

        <ul
          style={{ listStyleType: "number", lineHeight: "32px" }}
          className="d-flex flex-column gap-2"
        >
          <li>
            {t("Chapter_Seven_One")}
          </li>

          <li>
            {t("Chapter_Seven_Two")}
          </li>

     

        </ul>

      </div>

      <div className="d-flex flex-column gap-3">

        <h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
        {t("Chapter_Eight_Header")}
        </h5>

        <ul
          style={{ listStyleType: "number", lineHeight: "32px" }}
          className="d-flex flex-column gap-2"
        >
       
        {t("Chapter_Eight_One")}         

        </ul>

      </div>

      <div className="d-flex flex-column gap-3">

<h5 style={{ color: colors.primaryColor,lineHeight:"32px" }}>
{t("Chapter_Nine_Header")}
</h5>

<ul
  style={{ listStyleType: "number", lineHeight: "32px" }}
  className="d-flex flex-column gap-2"
>
  {t("Chapter_Nine_One")}
</ul>

</div>

    </div>
  );
};

export default TermsAndConditionsComponent;
