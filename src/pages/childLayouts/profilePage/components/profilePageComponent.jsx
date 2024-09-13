import React, { useRef } from "react";
import colors from "../../../../assets/constants/colors";
import "../../../../App.css";
import EditUserForm from "./editUserForms";
import { avatar } from "../../../../assets/images";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ReusablePageScrollEncloser from "../../../../components/reusablePageScrollEncloser";

function ProfilePageComponent(props) {
  const saveEditForm = useRef(null);
  const individualUserDetails = useSelector(
    (state) => state.user?.individualUserDetails
  );

  const handleEditUserFormSubmission = () => {
    if (saveEditForm.current)
      saveEditForm.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
  };

 
  const { t } = useTranslation();

  return (
    <div className="container-fluid">
   

      <div className="d-flex flex-column gap-4 align-items-between">

        <div className="row">

        

            <div className="d-flex flex-row justify-content-center">

              <div  className="widthProfileControl">

                <ReusablePageScrollEncloser>

                    <div className="d-flex flex-column gap-3 w-100">
                      <>
                        {props.isDisabled && (

                          <div className="d-flex flex-row justify-content-center align-items-center gap-3">

                            <div>
                              <img
                                src={individualUserDetails?.profileImgURL || avatar}
                                style={{
                                  height: "auto",
                                  width: "100px",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>

                            {/* <div>
                              <p className="m-0">{`${individualUserDetails?.firstName} ${individualUserDetails?.secondName} ${individualUserDetails?.familyName}`}</p>
                              <p
                                style={{
                                  color: colors.primaryColor,
                                  fontSize: "15px",
                                }}
                                className="m-0"
                              >
                                {individualUserDetails?.email}
                              </p>
                            </div> */}

                          </div>
                        )}
                      </>

                      <EditUserForm
                        formRef={saveEditForm}
                        isDisabled={props.isDisabled}
                        setIsDisabled={props.setIsDisabled}
                      />

              
                    

          
                    </div>

                        <div className="d-flex flex-row justify-content-center">
                    <button
                      style={{
                        color: "white",
                        backgroundColor: colors.primaryColor,
                        border: "none",
                        padding: "10px 60px",
                        borderRadius: "5px",
                      }}
                      onClick={
                        props.isDisabled
                          ? () => props.setIsDisabled(false)
                          : handleEditUserFormSubmission
                      }
                    >
                      {props.isDisabled ? t("Edit") : t("Save")}
                    </button>
                        </div>
                </ReusablePageScrollEncloser>


              </div>

            </div>


       

          <div className="col-lg-3">

            <div className="d-flex flex-column align-items-center justify-content-between h-100">

                    {/* <div onClick={props.onClick}>
                        <button
                        style={{
                            color: "white",
                            backgroundColor: colors.primaryColor,
                            border: "none",
                            padding: "10px 45px",
                            borderRadius: "5px",
                        }}
                        >
                        {t("Settings")}
                        </button>
                    </div> */}

                    {/* <div>
                        <button
                        style={{
                            color: "white",
                            backgroundColor: colors.primaryColor,
                            border: "none",
                            padding: "10px 35px",
                            borderRadius: "5px",
                        }}
                        onClick={props.OnAvailabilityClick}
                        >
                        { t("Availability")}
                        </button>
                    </div> */}
{/* {
    props.isDisabled && (
                    <div className="d-flex flex-row justify-content-center">
                    <button
                      style={{
                        color: "white",
                        backgroundColor: colors.primaryColor,
                        border: "none",
                        padding: "10px 60px",
                        borderRadius: "5px",
                      }}
                      onClick={
                        props.isDisabled
                          ? () => props.setIsDisabled(false)
                          : handleEditUserFormSubmission
                      }
                    >
                      {props.isDisabled ? t("Edit") : t("Save")}
                    </button>
                    </div>

    )
} */}

            </div>

          </div>

        </div>


      </div>
    </div>
  );
}

export default ProfilePageComponent;
