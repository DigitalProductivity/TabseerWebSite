import React ,{ useEffect , useLayoutEffect, useState }  from "react";
import NavLinkComponent from "./components/navLink";
import "../navBar/NavBar.css"
import { useLocation } from "react-router-dom";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import ReusableTextButton from "../../../../components/reusableTextButton";
import colors from "../../../../assets/constants/colors";
import { iconClaimsMgmtActive, iconClaimsMgmtNormal, iconHomeActive, iconHomeNormal, iconLawyerMgmtActive, iconLawyerMgmtNormal, iconPaymentMgmtActive, iconPaymentMgmtNormal, iconSessionMgmtActive, iconSessionMgmtNormal, iconUserMgmtActive, iconUserMgmtNormal, iconWalletActive, iconWalletNormal } from "../../../../assets/images";
import { useTranslation } from "react-i18next";
import ReusableNextTogglePopper from "../../../../components/nxtMsgPopper/reusableNextTogglePopper";

function NavBar(props) {
  const {pathname} =useLocation()
  const {width , height} =useWindowDimensions()
  const {t,i18n}=useTranslation();

  const isRTL=i18n.dir() ==='rtl';

// const handleLogout = () =>{
//   window.localStorage.removeItem('token');
//   window.location.reload();
// }

  useLayoutEffect(()=>{

    if(props.navbarToggle ){
      const targetElement = document.getElementById("collapsedContents");
     
  
      if (targetElement ) {
        if (targetElement.classList.contains("collapsedContentsTranslate")) {
          targetElement.classList.remove("navigationAnimationRevert");
          targetElement.classList.remove("collapsedContentsTranslate");
          targetElement.classList.add("navigationAnimation");
     
        } else {
          targetElement.classList.add("navigationAnimationRevert");
          targetElement.classList.add("collapsedContentsTranslate");
          targetElement.classList.remove("navigationAnimation");
       
        }
      } else {
        console.error('Element with ID "collapsedContents" not found.');
      }

    props.setNavbarToggle((prev)=>!prev)

    }

  }, [ props.navbarToggle ])

  useLayoutEffect(()=>{

  if(width <= 992){
    const targetElement = document.getElementById("collapsedContents");

    targetElement.classList.add("navigationAnimationRevert");
    targetElement.classList.add("collapsedContentsTranslate");
    targetElement.classList.remove("navigationAnimation");

    props.setNavbarToggle(false)

  }
  } ,[pathname])





  return (
    <div className="collapsedContents collapsedContentsTranslate" id="collapsedContents" style={{borderRight:isRTL?"none":`2px solid ${colors.secondaryColorLighterShade}`,borderLeft:isRTL?`2px solid ${colors.secondaryColorLighterShade}`:"none"}}>
      <div className="subProp " style={{height:height*(3.1/4)}}>
        <ul className=" d-flex flex-column justify-content-center  navbarListItems " >
          <NavLinkComponent to="/" className="linkTag" linkName={t("Home")} listStyles="loginNavStyles" src={iconHomeNormal} activeSrc={iconHomeActive}/>
          <NavLinkComponent to="/requests" className="linkTag" linkName={t("Requests")} listStyles="loginNavStyles" src={iconSessionMgmtNormal} activeSrc={iconSessionMgmtActive}/>
          <NavLinkComponent to="/wallet" className="linkTag" linkName={t("Wallet")} listStyles="loginNavStyles" src={iconWalletNormal} activeSrc={iconWalletActive}/>
          <NavLinkComponent to="/profile" className="linkTag" linkName={t("Profile")} listStyles="loginNavStyles" src={iconUserMgmtNormal} activeSrc={iconUserMgmtActive}/>
          <NavLinkComponent to="/termsAndConditions"className="linkTag" linkName={t("TermsAndConditions")} listStyles="loginNavStyles" src={iconPaymentMgmtNormal} activeSrc={iconPaymentMgmtActive}/>
          <NavLinkComponent to="/help" className="linkTag" linkName={t("Help")} listStyles="loginNavStyles"  src={iconClaimsMgmtNormal} activeSrc={iconClaimsMgmtActive}/>
          <NavLinkComponent to="/contactUs" className="linkTag" linkName={t("ContactUs")} listStyles="loginNavStyles"  src={iconClaimsMgmtNormal} activeSrc={iconClaimsMgmtActive}/>
        </ul>

      </div>
        <div style={{height:height*(.9/4)}} className="d-flex align-items-start justify-content-center">
          <ReusableTextButton buttonName={t("LogOut")} color={"white"} backgroundColor={colors.primaryColor} buttonWidth={"80%"} onClick={()=>props.setLogoutPopper(true)}/>
        </div>

      

       

       

    </div>
  );
}

export default NavBar;
