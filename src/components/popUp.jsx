import React, { useRef } from "react";
import "../App.css";
import colors from "../assets/constants/colors";
import { useDispatch  } from "react-redux";
import ReusableTextButton from "./reusableTextButton";
import { Controller, useForm } from "react-hook-form";
import { orderStatusUpdation } from "../core/reducer/User";
import { useTranslation } from "react-i18next";



function PopUp(props) {

  const dispatch = useDispatch()
  const commentForm=useForm()
  const {handleSubmit , formState ,  control , setValue , watch}=commentForm
  const {errors , dirty}= formState
  const commentFormRef=useRef(null)

  const handleClick=()=>{
    if(commentFormRef.current)
    commentFormRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));


  }

  const commentFormSubmission = (data)=>{
    // console.log(data)
    
    const payload={

      appointmentId: props.id,
      appointmentStatus: 2,
    lawyerCommentOnClientAppointment:data?.commentForm

}

dispatch(orderStatusUpdation(payload))

  }


  const {t}=useTranslation();

  return (
    <div>


        <div className="popup-container d-flex flex-column gap-2" style={{zIndex:100}}>

          <div className="popup d-flex flex-column justify-content-between" style={{height:"40%"}}>


              <p>{t("Write_down_the_comment")}</p>

              <form ref={commentFormRef} onSubmit={handleSubmit(commentFormSubmission)} noValidate>

                <>
                    <Controller
                            name="commentForm"
                            control={control}
                            defaultValue=""
                            rules={{ required:"please make a comment to move further" }} 
                            render={({ field }) => <textarea placeholder="Enter your comment" style={{ width: "100%", height: "20vh", padding:"15px 20px" }}  {...field} />}
                          />
                    <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.commentForm?.message}</p>
                
                </>
                        
              </form>
            
     

            <div className="d-flex justify-content-center gap-3 mt-2">
            
            <ReusableTextButton backgroundColor={colors.primaryColorLighterShade} color={colors.primaryColor} buttonName={t("Cancel")} buttonWidth={"150px"} onClick={props.onClick}/>
            <ReusableTextButton backgroundColor={colors.primaryColor} color={"white"} buttonName={t("Post")} buttonWidth={"150px"} onClick={handleClick}/>

            </div>
               
          </div>

        </div>


    </div>
  );
}

export default PopUp;
