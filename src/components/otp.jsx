/* eslint-disable react/prop-types */
import {useEffect, useRef, useState} from "react";
import colors from "../assets/constants/colors";
import ReusableTextButton from "./reusableTextButton";
import { useTranslation } from "react-i18next";
import {  verifyOtp } from "../core/reducer/User";
import { useDispatch, useSelector } from 'react-redux';
import { useForm,Controller } from "react-hook-form";

const OtpInput = ({length = 4, onOtpSubmit = () => {},registeredNumber}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const otpFormRefs =useRef(null)
  const otpValidityForm = useForm()
  const error = useSelector(state=>state.user.error)
  const {handleSubmit , formState , setError , control,clearErrors}=otpValidityForm
  const {errors}=formState


  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    clearErrors()

    
  

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length == length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const dispatch =useDispatch()

  const onOtpFormSubmission = () => {
    const enteredOtp = otp.join(""); 
    onOtpSubmit(enteredOtp); 
    

    if(enteredOtp==""|| enteredOtp.length<4){

        if (enteredOtp.length<4) {
            setError('', {
              type: "manual",
              message: t("please_enter_a_4_digit_number")
            });
          }
    }else{
               const payload={
            mobile:registeredNumber,
            otp:enteredOtp,
        }
        dispatch(verifyOtp(payload))
    }
    
  };

  const handleVerify=()=>{
  
    if(otpFormRefs.current)
    otpFormRefs.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
    

  

  const {t}=useTranslation();

  useEffect(()=>{

    if(error?.code==1001){
        setError('', {
            type: "manual",
            message: t("Please_enter_a_valid_OTP"),
          });
    }

},[error])


  return (
    <div className="d-flex flex-column gap-5 w-100">

      <div className="d-flex flex-column gap-4 w-100 align-items-start">
        <h5>{t("ResetPassword")}</h5>
        <p className="m-0" style={{fontSize:"17px",color:"gray"}}>{t("Please_enter_the_OTP_send_to_the_mobile_number")} <span style={{color:colors.primaryColor, fontWeight:"bold"}}>{registeredNumber}</span></p>
      </div>

<div className="d-flex flex-column gap-5">

      <div className="d-flex justify-content-center">
            <div className="w-50 d-flex flex-column gap-2">

          <form ref={otpFormRefs} className="d-flex gap-4" onSubmit={handleSubmit(onOtpFormSubmission)} noValidate>
          {otp.map((value, index) => (
                <div key={index}>
                  <Controller
                    name={`input${index}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        value={value}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input)}
                        className="otpInput"
                        style={{
                          height: '80px',
                          width: '80px',
                          border: `2px solid ${colors.secondaryColorLighterShade}`,
                          textAlign: 'center',
                          fontSize: '23px',
                          outline:'none',
                        }}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onChange={(e) => handleChange(index, e)}
                        onFocus={() => {
                          inputRefs.current[index].style.border = `2px solid ${colors.primaryColor}`;
                        }}
                        onBlur={() => {
                          inputRefs.current[index].style.border = `2px solid ${colors.secondaryColorLighterShade} `;
                        }}
                      />
                    )}
                  />
                </div>
              ))}

          </form>
          {errors && errors[''] && (
              <p className='m-0' style={{color: "red", fontSize: "14px"}}>
                {errors[''].message}
              </p>
            )}

            </div>

      </div>

      <div className="d-flex justify-content-center">

      <div className="w-50">
          <div className='d-flex justify-content-center gap-3 '>
              <ReusableTextButton backgroundColor={colors.primaryColor} color={"white"} buttonName={t("Verify")} onClick={handleVerify} />
            </div>  

      </div>

      </div>
</div>


    </div>
  );
};

export default OtpInput;