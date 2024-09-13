import React, { Children, useState } from "react";
import TopBar from "./components/TopBar";
import NavBar from "./components/navBar/NavBar";
import "../mainLayout/mainLayout.css"
import ReusableNextTogglePopper from "../../components/nxtMsgPopper/reusableNextTogglePopper";
import { useTranslation } from "react-i18next";

function MainLayout({ children }) {
  const [navbarToggle , setNavbarToggle]=useState(false)
  
  const [logoutPopper,setLogoutPopper]=useState(false);

  const {t}=useTranslation();
  const handleLogout = () =>{
    window.localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div style={{height:"100vh"}}>

      <div style={{minHeight:"10%"}}>
        <TopBar setNavbarToggle={setNavbarToggle} setLogoutPopper={setLogoutPopper}/>
      </div>

      <div className="d-flex" style={{ minHeight:"86%" }}>

          <div className="widthNavResponsive">
            <NavBar navbarToggle={navbarToggle} setNavbarToggle={setNavbarToggle} setLogoutPopper={setLogoutPopper}/>
          </div>

          <div  className="widthBodyResponsive">
            <div className="container-fluid " style={{ paddingTop: "12px", paddingBottom: "12px" ,height:"100%"}}>
              {children}
            </div>
          </div>

          {
          logoutPopper&&(
            <ReusableNextTogglePopper 
            message={t("Are_you_sure_you_want_to_logout")}
            buttonOneName={t("Cancel")}
            buttonTwoName={t("Confirm")}
            buttonOneClick={()=>setLogoutPopper(false)}
            buttonTwoClick={handleLogout}
            buttonWidth={"30%"}
            />
          )
        }

      </div>
      
    </div>
  );
}

export default MainLayout;
