import React , {useEffect} from "react";
import NavLinkComponent from "../navLink";
import "../lawyerLoginNavbar/lawyerLoginNavbar.css";
import { useDispatch, useSelector } from 'react-redux'
import colors from "../../assets/constants/colors";
import { contactUsActiveIcon, contactUsIcon, helpActiveIcon, helpIcon, homeActiveIcon, homeIcon, profile, profileActiveIcon, requestActiveIcon, requestIcon, termsAndConditionsActiveIcon, termsAndConditionsIcon, walletActiveIcon, walletIcon } from "../../assets/images";
import { useTranslation } from "react-i18next";

function LawyerLoginNavbar() {
  const dispatch = useDispatch()
  const toggleStateRedux = useSelector((store)=> store.button.triggerFunctionCall)

  useEffect(()=>{

    if(toggleStateRedux){
      const targetElement = document.getElementById("collapsedContents");
     
  
      if ((targetElement)) {
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

      dispatch(setTriggerFunctionCall())

    }

  

  }, [ toggleStateRedux])

  const {t}=useTranslation()
  return (
    <>
            <div className="collapsedContents collapsedContentsTranslate" id="collapsedContents">
              <div>
              <div className="subProp">
                <ul className=" d-flex flex-column justify-content-center  navbarListItems ">
                  <NavLinkComponent to="/" className="linkTag" linkName="Home" landingPageStyles="loginNavStyles"  src={homeIcon} activeSrc={homeActiveIcon}/>
                  <NavLinkComponent to="/requests" className="linkTag" linkName="Requests"  landingPageStyles="loginNavStyles" src={requestIcon} activeSrc={requestActiveIcon}/>
                  <NavLinkComponent to="/wallet" className="linkTag" linkName="Wallet"  landingPageStyles="loginNavStyles" src={walletIcon} activeSrc={walletActiveIcon}/>
                  <NavLinkComponent to="/profile" className="linkTag" linkName="Profile"  landingPageStyles="loginNavStyles" src={profile} activeSrc={profileActiveIcon}/>
                </ul>
              </div>

              <div className="subProp2">
                <ul className="d-flex flex-column justify-content-center navbarListItems">
                  <NavLinkComponent to="/TermsAndConditions" className="linkTag" linkName="Terms & Conditions"  landingPageStyles="loginNavStyles" src={termsAndConditionsIcon} activeSrc={termsAndConditionsActiveIcon}/>
                  <NavLinkComponent  to="/help" className="linkTag" linkName="Help"  landingPageStyles="loginNavStyles" src={helpIcon} activeSrc={helpActiveIcon}/>
                  <NavLinkComponent to="/contactUs" className="linkTag" linkName="Contact Us"  landingPageStyles="loginNavStyles" src={contactUsIcon} activeSrc={contactUsActiveIcon}/>
                </ul>
              </div>

              </div>

              <div style={{padding:"0px 20px 30px"}}>
                <div className="d-flex justify-content-center w-100 align-items-center " style={{backgroundColor:colors.primaryColor,borderRadius:"5px",height:"40px"}}>
                  <p style={{ backgroundColor:colors.primaryColor,color:"white"}} className="m-0">{t("LogOut")}</p>
                </div>

              </div>

            </div>


            
    </>
  );
}

export default LawyerLoginNavbar;
