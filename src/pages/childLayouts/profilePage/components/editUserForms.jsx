import React , {useEffect, useRef, useState} from 'react'
import { Controller , useForm , useWatch } from 'react-hook-form'
import InputTag from '../../../../components/inputTag'
import { useDispatch, useSelector } from 'react-redux'
import ReusableFileUpload from '../../../../components/reusableFileUpload'
import colors from '../../../../assets/constants/colors'
import ReusableTooltip from '../../../../components/reusableTooltip'
import { avatar, iconCamera, iconPlus } from '../../../../assets/images'
import { profileImageUpdate, registerUser, sectorList, userFileUpload } from '../../../../core/reducer/User'
import ReusableMessagePopper from '../../../../components/utils/popper/reusableMessagePopper'
import { useTranslation } from 'react-i18next'




const EditUserForm = (props) => {
  const individualUserDetails = useSelector(state => state.user?.individualUserDetails)
    const editUserForm= useForm()
    const [formData , setFormData]=useState()
    const {handleSubmit , formState ,  control , setValue , watch}=editUserForm
    const {errors , dirty}= formState
    const[uploadError , setUploadError]=useState(false)
    const [fileUrl, setFileUrl] = useState(null );
    const [fileName , setFileName]=useState([]);
    const [fileStorageName , setFileStorageName]=useState()
    const[fileObject , setFileObject]=useState({})
    const dispatch =useDispatch();
    const sectorData=useSelector(state=>state.user?.sectorData)
    const [lawyerSectorDetails , setLawyerSectorDetails]=useState()
    const [sectorDataList , setSectorDataList]=useState([])
    const [visibility , setVisibility]=useState(false)
    const[profileImageUpdateError, setProfileImageUpdateError]=useState(false)
    const[profileImageFile,setProfileImageFile]=useState(null)
    const userFileUploadStatus = useSelector(state=>state?.user?.userFileUploadStatus)
    const addUserStatus =useSelector(state=>state.user?.addUserStatus)
    const[profileImage , setProfileImage]=useState(individualUserDetails?.profileImgURL || avatar)
    const fileInputRef = useRef(null);
    



    const editUserFormSubmission = (data) =>{
  
      const payload ={
        
           lawyerUuid:individualUserDetails?.lawyerUuid,
          firstName: data?.firstName,
          secondName: data?.secondName,
          familyName: data?.familyName,
          mobile: data?.mobile,
          email: data?.email,
          nationalId: data?.nationalId,
          IBAN: data?.iban,
          servicePercentage: 10.5,
          preferredLanguage:2,
          insertLawyerProvidedSectors: lawyerSectorDetails?.map((sector) => ({
            sectorId: sector.id
          }))
      
      }
      const formData = new FormData();
      formData.append('file', fileObject);
      formData.append('userUuid', individualUserDetails?.lawyerUuid);

      const imageData =new FormData()
      imageData.append('file', profileImageFile);
      imageData.append('userUuid', individualUserDetails?.lawyerUuid);

  
      function isFormDataEmpty(formData) {
        return formData.entries().next().done;
    }
    
  

    if (isFormDataEmpty(formData) || fileName.length==0) {
 
      setUploadError(true)
      return
  }else {
      if(fileName==fileStorageName){
        
        dispatch(registerUser(payload))
      }else{
        dispatch(registerUser(payload))
        dispatch(userFileUpload(formData));
        dispatch(profileImageUpdate(imageData))
      }

  }
      
    }

  
    const handleCameraClick = () => {
      if (!props.isDisabled) {
        
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        setProfileImageFile(file)
        // console.log(file)
        
      } else {
        setProfileImageUpdateError(true)
        
      }
    };
  
 const handleClick = (id) =>{
  // console.log(id)
 }


    // useEffect(() => {
      
    //     setValue('dob', props.dob);
     
    //   }, [props.dob, setValue]);

    const {t,i18n}=useTranslation();
    const [isRTL,setIsRTL]=useState(false)

   

      useEffect(()=>{
        const isRTL=i18n.dir() === 'rtl';
      setIsRTL(isRTL)
        let sectorsArray = individualUserDetails?.lawyerProvidedSectors?.map(sector => ({ id: sector.sectorId, name: isRTL ? sector.sectorNameArabic : sector.sectorName}));
        setLawyerSectorDetails(sectorsArray)
      },[individualUserDetails,i18n.dir()])

      useEffect(() => {
        setUploadError(false);
    }, [fileName.length !== 0]);
    

      useEffect(() => {
        const url = individualUserDetails?.nationalIdImgURL;
        if (url) {
          const urlParts = url.split('/');
          const filename = urlParts[urlParts.length - 1];
          setFileUrl(url);
        
          setFileName(prev => [ filename]);
          setFileStorageName(prev => [ filename])
        }
      }, [individualUserDetails?.nationalIdImgURL]);

      useEffect(()=>{
          setSectorDataList(sectorData)
      },[sectorData])



      useEffect(()=>{
        dispatch(sectorList())
      },[])

      

  return (
    <>
    {
      individualUserDetails && (

        <form ref={props.formRef} onSubmit={handleSubmit(editUserFormSubmission)} noValidate className='d-flex align-items-center flex-column gap-3'>

{
  <>
  {!props.isDisabled && (
    <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
      <div style={{ height: "auto", width: "100px", position: "relative" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <img src={profileImage} style={{ height: "auto", width: "100px", borderRadius: "50%" }} />
        </div>

        <div
          onClick={handleCameraClick}
          style={{ position: "absolute", bottom: 0, right: 0, height: "30px", width: "30px", borderRadius: "50%", background: "white" }}
          className='d-flex justify-content-center align-items-center'
        >
          <img src={iconCamera} style={{ height: "auto", width: "100%", borderRadius: "50%" }} />
        </div>
      </div>

      {
        profileImageUpdateError && (
          <p className='m-0' style={{fontSize:"12px",color:"red"}}>{t("Please_upload_formats_only")}</p>
        )
      }
    </div>
  )}

<input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
</>

  
}
          

     
    
    <div className='d-flex flex-row align-items-end gap-2 w-100'>
    
            <Controller
            name="firstName"
            control={control}
            defaultValue={individualUserDetails?.firstName}
            rules={{ required: t("First name is required") }}
            render={({ field }) => (
              <>
                <InputTag labelName={t("Name")} disabled={props.isDisabled} inputName="firstName" formInstance={editUserForm}
                  onChange={(e) => {
                    setValue('firstName', e.target.value);
                  }}
                />
              </>
            )}
          />
            <Controller
            name="secondName"
            control={control}
            defaultValue={individualUserDetails?.secondName}
            rules={{ required: t("SecondNameIsRequired") }}
            render={({ field }) => (
              <>
                <InputTag labelName="" disabled={props.isDisabled}  inputName="secondName" formInstance={editUserForm}
                  onChange={(e) => {
                    setValue('secondName', e.target.value);
                  }}
                />
              </>
            )}
          />
          
            <Controller
            name="familyName"
            control={control}
            defaultValue={individualUserDetails?.familyName}
            rules={{ required: t("FamilyNameIsRequired") }}
            render={({ field }) => (
              <>
                <InputTag labelName="" disabled={props.isDisabled}  inputName="familyName" formInstance={editUserForm}
                  onChange={(e) => {
                    setValue('familyName', e.target.value);
                  }}
                />
              </>
            )}
          />
    
    </div>

    <div className='w-100'>
    <Controller
            name="mobile"
            control={control}
            defaultValue={individualUserDetails?.mobile}
            rules={{ required: t("Mobile number is required") }}
            render={({ field }) => (
              <>
                <InputTag imageTag={true} labelName={t("mobileNumber")} disabled={true}  inputName="mobile" formInstance={editUserForm}
                  onChange={(e) => {
                    setValue('mobile', e.target.value);
                  }}
                />
              </>
            )}
          />

    </div>
    
    <div className='w-100'>
            <Controller
            name="email"
            control={control}
            defaultValue={individualUserDetails?.email}
            rules={{ required: t("Email is required") }}
            render={({ field }) => (
              <>
                <InputTag labelName={t("Email")} inputName="email" disabled={props.isDisabled}  formInstance={editUserForm}
                  onChange={(e) => {
                    setValue('email', e.target.value);
                  }}
                />
              </>
            )}
          />

    </div>

    <div className='w-100'>
            <Controller
            name="nationalId"
            control={control}
            defaultValue={individualUserDetails?.nationalId}
            rules={{ required: t("NationalIDIsRequired") }}
            render={({ field }) => (
              <>
                <InputTag  labelName={t("NationalID/Iqama")} disabled={props.isDisabled}  inputName="nationalId" formInstance={editUserForm}
                  onChange={(e) => {
                    setValue('nationalId', e.target.value);
                  }}
                />
              </>
            )}
          />

    </div>
           
          <div className='w-100'>

          

                  <ReusableFileUpload labelName={t("UploadnationalID/Iqama")} setFileObject={setFileObject} fileLink={fileUrl} fileName={fileName} setFileName={setFileName} isDisabled={props.isDisabled}/>
                  {
                    uploadError && <p className='m-0' style={{fontSize:"12px", color:"red"}}>{t("PleaseUploadEmpty")} </p>
                  }

         

          </div>

          <div className='w-100'>
            <Controller name="iban" control={control} defaultValue={individualUserDetails?.IBAN} rules={{ required: 'IBAN is required' }} render={({ field }) => (
            <>
                <InputTag  labelName="IBAN" disabled={true}  inputName="iban" formInstance={editUserForm} onChange={(e) => {setValue('iban', e.target.value);}}/>
            </>
            )}
          />

          </div>
    

          <div className='d-flex flex-column gap-2 w-100' >

            <p className='m-0'>{t("Sector")}</p>

            <div className='d-flex flex-row gap-2' style={{position:"relative", height:"100%", width:"100%"}}>

                <div style={{width:"100%", height:"45px", borderRadius:"5px", border:`2px solid ${colors.secondaryColorLighterShade}`}} className='d-flex flex-row align-items-center justify-contents-between'>

                  <div>

                          {
                            lawyerSectorDetails ?
                             ( <ReusableTooltip text={lawyerSectorDetails?.map( sector => sector.name)} isDisabled={true} onTextClick={(index) => console.log("Text clicked:", lawyerSectorDetails[index])} 
                              onDeleteClick={(index, e) => {console.log("Delete clicked:", lawyerSectorDetails[index]);
                      e.stopPropagation(); 
                  }}
              />):""
                          }
                  </div>


                </div>

                {
                  visibility && (

                <div style={{position: "absolute", top: 0, right: 0,height:"auto", width:"100%", transform:`translateY(-100%)`, background:colors.primaryColorLighterShade, borderRadius:"5px"}}>
                  <div className='d-flex flex-column gap-2' style={{padding:"10px"}}>
                  {sectorDataList.map((sector) => (
        <div key={sector.sectorId} onClick={() => handleClick(sector.sectorId)} className='d-flex flex-row justify-content-between'>

         

            <div>
              {sector.sectorName}
            </div>

            <div>
            <img src={iconPlus} style={{height:"auto", width:"20px"}}/>
          </div>

        </div>
      ))}
                  </div>

                  </div>

                  )
                }

                
       
                {/* {
                  !props.isDisabled && (
                                <div className='d-flex align-items-center' onClick={()=>setVisibility((prev)=>!prev)}>
                                    <img src={iconPlus} style={{height:"auto", width:"20px"}}/>
                                  </div>

                  )
                } */}




             

            </div>


          </div>
                              
        </form>
      )
    }

    {
      addUserStatus == 1000 && userFileUploadStatus ==1000 ? (
        <ReusableMessagePopper message={t("userSuccessfullyMessage")}/>
      ) : ""
    }

    {
      addUserStatus == 1000 &&(
        <ReusableMessagePopper message={t("userSuccessfullyMessage")}/>
      )
    }
    </>
  )
}

export default EditUserForm