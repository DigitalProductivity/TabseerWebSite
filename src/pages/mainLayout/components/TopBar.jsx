import React, { useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import colors from "../../../assets/constants/colors";
import LogoComponent from "../../../components/logoComponent";
import UserComponent from "../../../components/userComponent";
import DropDownBox from "../../../components/utils/dropDownBox/dropDownBox";
import ReusableTextButton from "../../../components/reusableTextButton";
import {
  iconBell,
  iconHamburgerMenu,
  iconLogout,
  iconUserMgmtNormal,
} from "../../../assets/images";
import LanguageSelecter from "../../../components/Language/LanguageSelecter";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function TopBar(props) {
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();

  const topBarStyles = {
    paddingTop: "5px",
    paddingBottom: "10px",
    borderBottom: `2px solid ${colors.secondaryColorLighterShade}`,
  };

  const { width, height } = useWindowDimensions();

  const handleClick = () => {
    props.setNavbarToggle((prev) => !prev);
  };

  const handleNotificationBellClick = () => {
    navigate("/notification");
  };

  const handleProfileClick=()=>{
    navigate("/profile");
  }

  // const handleLogout = () => {
  //   window.localStorage.removeItem("token");
  //   window.location.reload();
  // };

  return (
    <div
      className="container-fluid"
      style={{
        ...topBarStyles,
        position: width <= 576 ? "unset" : "fixed",
        height: "10%",
        zIndex: 5,
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <div
        className="d-flex flex-row justify-content-between"
        style={{ height: "100%" }}
      >
        <div
          className="d-flex justify-content-center align-items-center d-lg-none "
          onClick={handleClick}
        >
          <img
            src={iconHamburgerMenu}
            style={{ height: "auto", width: "30px" }}
          />
        </div>

        <LogoComponent />

        <div className="d-flex gap-4 align-items-center">
          <div className="d-md-block d-none">
            <LanguageSelecter />
          </div>

          <UserComponent setIsVisible={setIsVisible} isVisible={isVisible} />

          <div
            style={{
              height: "35px",
              width: "35px",
              background: colors.primaryColorLighterShade,
              borderRadius: "5px",
            }}
            className="d-flex justify-content-center align-items-center"
            onClick={handleNotificationBellClick}
          >
            <img src={iconBell} style={{ height: "auto", width: "30px",cursor:'pointer'}} />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            ...(isRTL ? { left: 0 } : { right: 0 }),
            transform: "translateY(70%)",
            zIndex: 100,
          }}
        >
          <DropDownBox
            isVisible={isVisible}
            backgroundColor={"white"}
            height={"120px"}
            width={"200px"}
          >
            <div className="d-flex flex-column w-100 h-100">
              <div
                className="d-flex flex-row justify-content-center p-3"
                style={{
                  borderBottom: `2px solid ${colors.secondaryColorLighterShade}`,
                }}
              >
                <div className="d-flex flex-row justify-content-center gap-5 align-items-center w-100" style={{cursor:"pointer"}} onClick={handleProfileClick}>
                  {/* <img src={iconUserMgmtNormal}  style={{height:"auto", width:"30px"}}/> */}
                  <p className="m-0" style={{color:colors.secondaryColor}}>{t("Profile")}</p>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center w-100 p-3">
                <div className="d-flex flex-row justify-content-center gap-5 align-items-center w-100" style={{cursor:"pointer"}} onClick={()=>props.setLogoutPopper(true)}>
                  {/* <img src={iconLogout}  style={{height:"auto", width:"30px"}}/> */}
                  <div >
                    <p className="m-0" style={{color:colors.secondaryColor, fontWeight:"bold"}}>{t("LogOut")}</p>
                  </div>
                </div>
                {/* <ReusableTextButton backgroundColor={colors.primaryColor} color={"white"} buttonName={t("LogOut")} buttonWidth={"90%"} buttonHeight={"40px"} /> */}
              </div>
            </div>
          </DropDownBox>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
