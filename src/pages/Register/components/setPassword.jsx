import React , {useState , useRef, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { iconEyeClose, iconEyeOpen } from '../../../assets/images';
import colors from '../../../assets/constants/colors';
import ReusableTextButton from '../../../components/reusableTextButton';
import { changePassword, setPassword } from '../../../core/reducer/User';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReusablePageScrollEncloser from '../../../components/reusablePageScrollEncloser';
import ReusableMessagePopper from '../../../components/utils/popper/reusableMessagePopper';


const SetPasswordForms = (props) => {

    const {t,i18n}=useTranslation()
    const [isRTL,setIsRTL]=useState(false);
    const resetPasswordForm=useForm()
    const { handleSubmit, control, setError, formState: { errors }, watch } = resetPasswordForm;
    const [showPassword, setShowPassword] = useState(false);
    const[showConfirmPassword , setShowConfirmPassword]=useState(false)
    const formRef=useRef(null)
    const navigate=useNavigate();
    // const passwordStatus=useSelector(state=>state.user.otpStatus)
    const registerPasswordSetStatus =useSelector(state=>state.user?.registerPasswordSetStatus)
    const changePasswordStatus =useSelector(state=>state.user?.changePasswordStatus)
    console.log(changePasswordStatus)

    useEffect(()=>{
        const isRTL=i18n.dir() === 'rtl';
        setIsRTL(isRTL);
    },[i18n.dir()])

  const dispatch =useDispatch()
    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleToggleConfirmPassword =() =>{
        setShowConfirmPassword((prev)=>!prev)
    }

  const password = watch('password');

  const onResetPasswordFormSubmission = () => {
    if(formRef.current)
        formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  const onSubmit = (data)=>{

    if(props?.registeredNumber){
        const payload={
            mobile:props?.registeredNumber,
            newPassword:data?.password
            
        }
        dispatch(setPassword(payload))
       
    }else{
        const payload={
            newPassword:data?.password
        }
        dispatch(changePassword(payload))
        
    }
    
    
  }
  
//     const handleCancelClick = () => {
//         navigate('/register'); 
//     }

//     const navigateHome=()=>{
//         window.localStorage.removeItem('token');
//         window.location.reload();
//     }
//     const navigateHomes=()=>{
//         navigate('/login')
//             window.location.reload();
//     }

  

  useEffect(()=>{
   
    if(changePasswordStatus==1000){
        setTimeout(()=>{
            window.localStorage.removeItem('token');
            navigate('/login')
            window.location.reload();

        },2000)
    }
  },[changePasswordStatus])

  useEffect(()=>{
    if(registerPasswordSetStatus==1000){
        setTimeout(()=>{
            navigate('/login')
            window.location.reload();
        },2000)
    }
  },[registerPasswordSetStatus])






  return (

    <>
    
        {
            props.resetPage &&(

                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-5  w-100'>
            
            
            
            <div className="d-flex flex-column gap-3">
                    {
                        props.heading && (
                            <h5>{props.heading}</h5>
                        )
                    }
            
                    {
                        props.headingSubPara &&(
                            <p className='m-0' style={{fontSize:"17px",color:"gray"}}>{props.headingSubPara}</p>
                        )
                    }
            
            </div>
            
                    <div className="d-flex flex-column align-items-center w-100 gap-5">
                        <div className='d-flex flex-column gap-2'>
                            <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: t("PasswordIsRequired"),
                                minLength: {
                                value: 8,
                                message: t("PasswordMustBeLong"),
                                },
                            }}
                            render={({ field }) => (
                                <>
                                <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t("PasswordPlaceHolder")}
                                    {...field}
                                    style={{ paddingRight: '10px' , width:"330px", height:"55px",  border:`2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"5px",paddingLeft:"10px", outline:"none"}}
                                    onFocus={(e) => {
                                        e.target.style.border = `1px solid ${colors.primaryColor}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = `1px solid ${colors.secondaryColorLighterShade}`;
                                    }}
                                />
                                <div
                                    style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: isRTL? "":"10px",
                                    left:isRTL?"10px":"",
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    }}
                                    onClick={handleTogglePassword}
                                >
                                    <img
                                    src={showPassword ? iconEyeOpen : iconEyeClose}
                                    alt={showPassword ? 'Open Eye Icon' : 'Close Eye Icon'}
                                    style={{ width: '20px', height: '20px' }}
                                    />
                                </div>
                                </div>
                                {errors.password && <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.password.message}</p>}
                                </>
                            )}
                            />
                        </div>
            
                        <div className='mb-2 d-flex flex-column gap-2'>
                            
                            <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: t("ConfirmPasswordRequired"),
                                validate: (value) => value === password || t("PasswordsNotMatch"),
                            }}
                            render={({ field }) => (
                                <>
                                <div style={{ position: 'relative' }}>
                                <input
                                    placeholder={t("Re-enter_your_password")}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...field}
                                    style={{ paddingRight: '10px' , width:"330px", height:"55px", border:`2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"5px",outline:"none",paddingLeft:"10px"}}
                                    onFocus={(e) => {
                                        e.target.style.border = `1px solid ${colors.primaryColor}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = `2px solid ${colors.secondaryColorLighterShade}`;
                                    }}
                                />
                                <div
                                    style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: isRTL? "":"10px",
                                    left:isRTL?"10px":"",
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    }}
                                    onClick={handleToggleConfirmPassword}
                                >
                                    <img
                                    src={showConfirmPassword ? iconEyeOpen : iconEyeClose}
                                    alt={showPassword ? 'Open Eye Icon' : 'Close Eye Icon'}
                                    style={{ width: '20px', height: '20px' }}
                                    />
                                </div>
                                </div>
                                {errors.confirmPassword && <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.confirmPassword.message}</p>}
                            </>
                            )}
                            />
                        </div>
            {
                props.defaultButtonNeeded &&(
            
                        <div className="d-flex justify-content-center w-100">
            
                                <div  style={{width:"20%"}}>
                                            <div className='d-flex gap-3  align-items-center justify-content-center '>
                                                
                                                {/* <ReusableTextButton backgroundColor={colors.primaryColorLighterShade} color={colors.primaryColor} buttonName={t("Cancel")} buttonWidth={"35%"} onClick={handleCancelClick}/> */}
                                                <ReusableTextButton  backgroundColor={colors.primaryColor} color={"white"} onClick={onResetPasswordFormSubmission} buttonName={t("Save")}  buttonWidth={"100%"}/>
            
                                            </div>
            
                                </div>
            
                        </div>
                )
            }
                                            
                        
            
                    </div>
            
                </form>
            )
        }

        {
            props.otherPage &&(

                <div className='d-flex flex-column w-100' style={{gap:props.gap||"50px", height:props.height || "100%"}}>
                {/* <ReusablePageScrollEncloser> */}

                      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-5  w-100 justify-content-center h-100'>
            
            
            
                            <div className="d-flex flex-column gap-3">
                                        {
                                            props.heading && (
                                                <h5>{props.heading}</h5>
                                            )
                                        }
                                
                                        {
                                            props.headingSubPara &&(
                                                <p className='m-0' style={{fontSize:"17px",color:"gray"}}>{props.headingSubPara}</p>
                                            )
                                        }
                                
                            </div>
                    
                            <div className="d-flex flex-column align-items-center  w-100 gap-5">

                                <div className='d-flex flex-column gap-2'>

                                <p>{t("Password")}</p>
                                    <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: t("PasswordIsRequired"),
                                        minLength: {
                                        value: 8,
                                        message: t("PasswordMustBeLong"),
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                        <div style={{ position: 'relative' }}>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={t("PasswordPlaceHolder")}
                                            {...field}
                                            style={{ paddingRight: '10px' , width:"330px", height:"55px",  border:`2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"5px",paddingLeft:"10px", outline:"none"}}
                                            onFocus={(e) => {
                                                e.target.style.border = `1px solid ${colors.primaryColor}`;
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.border = `1px solid ${colors.secondaryColorLighterShade}`;
                                            }}
                                        />
                                        <div
                                            style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: isRTL? "":"10px",
                                            left:  isRTL?"10px":"",
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            }}
                                            onClick={handleTogglePassword}
                                        >
                                            <img
                                            src={showPassword ? iconEyeOpen : iconEyeClose}
                                            alt={showPassword ? 'Open Eye Icon' : 'Close Eye Icon'}
                                            style={{ width: '20px', height: '20px' }}
                                            />
                                        </div>
                                        </div>
                                        {errors.password && <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.password.message}</p>}
                                        </>
                                    )}
                                    />
                                </div>
                    
                                <div className='mb-2 d-flex flex-column gap-2'>

                                <p>{t("ConfirmPassword")}</p>  
                                    <Controller
                                    name="confirmPassword"
                                    control={control}
                                    rules={{
                                        required: t("ConfirmPasswordRequired"),
                                        validate: (value) => value === password || t("PasswordsNotMatch"),
                                    }}
                                    render={({ field }) => (
                                        <>
                                        <div style={{ position: 'relative' }}>
                                        <input
                                            placeholder={t("Re-enter_your_password")}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            {...field}
                                            style={{ paddingRight: '10px' , width:"330px", height:"55px", border:`2px solid ${colors.secondaryColorLighterShade}`,borderRadius:"5px",outline:"none",paddingLeft:"10px"}}
                                            onFocus={(e) => {
                                                e.target.style.border = `1px solid ${colors.primaryColor}`;
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.border = `2px solid ${colors.secondaryColorLighterShade}`;
                                            }}
                                        />
                                        <div
                                            style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: isRTL? "":"10px",
                                            left:isRTL?"10px":"",
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            }}
                                            onClick={handleToggleConfirmPassword}
                                        >
                                            <img
                                            src={showConfirmPassword ? iconEyeOpen : iconEyeClose}
                                            alt={showPassword ? 'Open Eye Icon' : 'Close Eye Icon'}
                                            style={{ width: '20px', height: '20px' }}
                                            />
                                        </div>
                                        </div>
                                        {errors.confirmPassword && <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.confirmPassword.message}</p>}
                                    </>
                                    )}
                                    />
                                </div>
                
                                                    
                                
                    
                            </div>
            
                        </form>

                        <div className="d-flex justify-content-center w-100">
            
                            <div  style={{width:"40%"}}>

                                        <div className='d-flex gap-3  align-items-center justify-content-center '>
                                            
                                            {/* <ReusableTextButton backgroundColor={colors.primaryColorLighterShade} color={colors.primaryColor} buttonName={t("Back")} buttonWidth={"100%"} onClick={props.onBackButtonClick}/> */}
                                            <ReusableTextButton  backgroundColor={colors.primaryColor} color={"white"} onClick={onResetPasswordFormSubmission} buttonName={t("Save")}  buttonWidth={props.setPassButtonWidth | "100%"}/>

                                        </div>

                            </div>

                        </div>

                        
                {/* </ReusablePageScrollEncloser> */}
                </div >

            )
        }

        {
            changePasswordStatus == 1000 &&(
                <ReusableMessagePopper message={t("password_updated_successfully.please_login_again")} />
            )
        }
        {
            registerPasswordSetStatus == 1000 &&(
                <ReusableMessagePopper message={t("password_updated_successfully.please_login_again")} />
            )
        }

    </>

  );
}

export default SetPasswordForms