import React from "react";
import images, { logoImage } from "../assets/constants/images";
import NavLinkComponent from "./navLink";
import "../components/lawyerLandingPage.css";
import useWindowDimensions from "./useWindowDimensions";
import { closeMarkIcon, hamBurgerMenuIcon, logoFull, logoMobile } from "../assets/images";
import LanguageSelecter from "./Language/LanguageSelecter";
import { useTranslation } from "react-i18next";




function LawyerLandingPageNav(props) {


  const { width, height } = useWindowDimensions();

  
  
  // useEffect(()=>{

  //   if(width){
  //     const targetElement = document.getElementById("targetElement");
     
  
  //     if ((targetElement)) {
  //       if (targetElement.classList.contains("collapsedContentsTranslate")) {
  //         targetElement.classList.remove("navigationAnimationRevert");
  //         targetElement.classList.remove("collapsedContentsTranslate");
  //         targetElement.classList.add("navigationAnimation");
     
  //       } else {
  //         targetElement.classList.add("navigationAnimationRevert");
  //         targetElement.classList.add("collapsedContentsTranslate");
  //         targetElement.classList.remove("navigationAnimation");
       
  //       }
  //     } else {
  //       console.error('Element with ID "target Element" not found.');
  //     }

    

  //   }

  

  // }, [])


const {t}=useTranslation();


  return (
    <div className="container-fluid positionClassName" style={{ background:"linear-gradient(90deg, rgba(233,226,215,0.5) 0%, rgba(255,255,255,1) 100%)"}}>

      <div className="container">

        <div className="d-flex justify-content-between align-items-center">

          <div className="d-flex justify-content-center align-items-center d-lg-none">
                  <img src={hamBurgerMenuIcon} style={{height:"auto", width:"30px"}}  onClick={()=>console.log("val")}/>
          </div>

          <img src={ width <= 576 ? logoMobile : logoFull } style={{ height: "auto", width: width <= 576 ? "60px" : "250px" }}/>
{
  props.generalNav && (

            <ul className="navbarListItemsUl collapsedContentsTranslate d-flex align-items-center " id="targetElement" style={{cursor:"pointer"}}>

                <li className="closeButtonControl" style={{height:"82px"}}>
                  <img src={closeMarkIcon} style={{height:"25px", width:"25px"}} onClick={()=>console.log("val")}/>
                </li>
               
              
                <li onClick={() => props.onClick('sectionOneRef')}>{t("Home")}</li>
                <li onClick={() => props.onClick('sectionFourRef')}>{t("Sectors")}</li>
                <li onClick={() => props.onClick('sectionThreeRef')}>{t("Testimonials")}</li>
                <li onClick={() => props.onClick('sectionFourRef')}>{t("Contact")}</li>

                <NavLinkComponent to="/login" className="navLinks" linkName={t("Login")} landingPageStyles="landingPageNavStyles"/>
                <NavLinkComponent to="/register" className="navLinks" linkName={t("Register")} landingPageStyles="landingPageNavStyles"/>
                <LanguageSelecter/>

            </ul>
  )
}

{
  props.customisedNav && (
    <ul className="navbarListItemsUl collapsedContentsTranslate d-flex align-items-center " id="targetElement" style={{cursor:"pointer"}}>

    <li className="closeButtonControl" style={{height:"82px"}}>
      <img src={closeMarkIcon} style={{height:"25px", width:"25px"}} onClick={()=>console.log("val")}/>
    </li>
   
  
    
   

    <NavLinkComponent to="/landingPage" className="navLinks" linkName={t("Home")} landingPageStyles="landingPageNavStyles"/>
    <NavLinkComponent to="/login" className="navLinks" linkName={t("Login")} landingPageStyles="landingPageNavStyles"/>
    <NavLinkComponent to="/register" className="navLinks" linkName={t("Register")} landingPageStyles="landingPageNavStyles"/>
    <LanguageSelecter/>

</ul>
  )
}

        </div>

      </div>

    </div>
  );
}

export default LawyerLandingPageNav;
