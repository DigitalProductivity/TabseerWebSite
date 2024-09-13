import React,{useEffect,useState} from 'react';
import InputTag from '../../../components/inputTag';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sectorList, registerUser, userFileUpload, ibanFileUpload  } from '../../../core/reducer/User';
import colors from '../../../assets/constants/colors';
import ReusableFileUpload from '../../../components/reusableFileUpload';
import { useTranslation } from 'react-i18next';
import ReusableDropdown from '../../../components/reusableD';



const RegisterForm = (props) => {
  const registerForm = useForm();
  const {t,i18n}=useTranslation();
  const {handleSubmit , formState , control, setError, clearErrors}=registerForm
  const {errors}=formState
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [sectorError, setSectorError] = useState(false);
  const [IbanUploadError, setIbanUploadError] = useState(false);
  const[fileurl,setFileurl]=useState(null);
  const[fileName,setFileName]=useState([]);
  const[fileObject , setFileObject]=useState({})
  const[ibanFileUrl,setIanFileUrl]=useState(null);
  const[ibanFileName,setIbanFileName]=useState([]);
  const[ibanFileObject,setIbanFileObject]=useState({});
  const fetchedData = useSelector((state) => state.user.sectorList);
  const mobileRegistered = useSelector((state) => state.user?.mobileRegistered);
  const addUserStatus =useSelector(state =>state.user.addUserStatus)
  const userFileUploadStatus =useSelector(state =>state.user.userFileUploadStatus)
  const addUserUuid =useSelector(state=>state.user?.addUserUuid)
  const dispatch = useDispatch();
  const[helper , setHelper]=useState(false);
  const[isRTL,setIsRTL]=useState(false);
  const lawyersConsultationTypes=[{
    consultationId:1,
    consultationName:t("professional")
  },
  {
    consultationId:2,
    consultationName:t("LegalAdvisor")
  }
]


  useEffect(()=>{
    const isRTL=i18n.dir() === 'rtl';
    setIsRTL(isRTL);
  },[i18n.dir()])
  
    

  const handleAddSector = (sector) => {
    if (!selectedSectors.find((s) => s.sectorId === sector.sectorId)) {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  const handleRemoveSector = (index) => {
    const updatedSectors = [...selectedSectors];
    updatedSectors.splice(index, 1);
    setSelectedSectors(updatedSectors);
  };

 




  useEffect(() => {
    dispatch(sectorList());
  }, []);

  useEffect(() => {

    if (mobileRegistered == 1003) {
      setError("mobile", {
        type: "manual",
        message:t("mobileNumberExists")
      });

    }
  
  }, [mobileRegistered]);


  useEffect(()=>{

      if(selectedSectors.length >=1 && sectorError== true){
        setSectorError(false)
      }

  },[selectedSectors])


  const onSubmit = (data) => {
  
  
    if (selectedSectors.length == 0) { 
      setSectorError(true); 
      return; 
    }if(selectedSectors.length>=1){
      setSectorError(false)
    }
 
    setSectorError(false)

    const consultationConvertInt=parseInt(data?.consultantType);
    const payload = {
      firstName:data.firstName,
      secondName:data.secondName,
      familyName:data.familyName,
      email: data.email,
      mobile: data.mobile,
      nationalId: data.nationalId,
      IBAN: data.iban, 
      preferredLanguage: 1,
      consultationTypeId:consultationConvertInt,
      servicePercentage:"10",
      insertLawyerProvidedSectors: selectedSectors.map((sector) => ({
        sectorId: sector.sectorId,
      })),

    };
  
    const formData = new FormData();
    formData.append('file', fileObject);
    formData.append('file2', ibanFileObject);
    formData.append('userUuid', addUserUuid);
    
 

    function isFormDataEmpty(formData) {
      return formData.entries().next().done;
  }

  if (isFormDataEmpty(formData) || fileName.length==0) {
    props.setUploadError(true)
    return
  }
  if(isFormDataEmpty(formData) || ibanFileName.length==0){
    setIbanUploadError(true);
  }
  else {
    
    dispatch(registerUser(payload))
    props.setRegisteredNumber(data?.mobile)
    setHelper((prev)=>!prev)
  }

  }

  useEffect(()=>{
    if(addUserStatus==1000){

      // console.log(fileObject)

      const formData = new FormData();
      formData.append('file', fileObject);
      formData.append('userUuid', addUserUuid);
      
   
  
      function isFormDataEmpty(formData) {
        return formData.entries().next().done;
    }

    if (isFormDataEmpty(formData) || fileName.length==0) {
 
      props.setUploadError(true)
      return
  }else {

    dispatch(userFileUpload(formData));
  }
    }
  },[addUserUuid])


  useEffect(() => {
    if (addUserStatus == 1000) {
      const formData = new FormData();
      formData.append('file', ibanFileObject);
      formData.append('userUuid', addUserUuid);
  
      function isFormDataEmpty(formData) {
        return formData.entries().next().done;
      }
  
      if (isFormDataEmpty(formData) || ibanFileName.length === 0) {
        setIbanUploadError(true);
      } else {
      dispatch(ibanFileUpload(formData));
       
      }
    }
  }, [addUserUuid]);
  

  useEffect(() => {
    props.setUploadError(false);
    setIbanUploadError(false)
}, [fileName.length !== 0,ibanFileName]);

    
  
  

  return (
    <form ref={props.formRef} onSubmit={handleSubmit(onSubmit)} noValidate className='d-flex flex-column gap-2' style={{maxHeight:"55vh", overflowY:"scroll",scrollbarWidth:"none"}}> 
    <div >

      <label htmlFor='name' id='name' className='text-start'>{t("Name")}</label>
      <div style={{ width: '100%' }} className='d-flex flex-row gap-3 mb-3'>
              <div className='d-flex flex-column'>
              <InputTag inputPlaceholder={t("FirstName")} inputName={"firstName"} formInstance={registerForm} required requiredErrorMessage={t("FirstNameIsRequired")} />
              <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.firstName?.message}</p>
              </div>

              <div className='d-flex flex-column'>
              <InputTag inputPlaceholder={t("SecondName")} inputName={"secondName"} formInstance={registerForm} required requiredErrorMessage={t("SecondNameIsRequired")} />
              <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.secondName?.message}</p>
              </div>

              <div className="d-flex flex-column">
              <InputTag inputPlaceholder={t("FamilyName")} inputName={"familyName"} formInstance={registerForm}  required requiredErrorMessage={t("FamilyNameIsRequired")}/>
              <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.familyName?.message}</p>

              </div>
      </div>

      <div className='d-flex gap-2 flex-column'> 
      <>
      <InputTag labelName={t("MobileNumber")} inputPlaceholder={t("MobileNumber")} imageTag={true} inputName={"mobile"} formInstance={registerForm} required requiredErrorMessage={t("MobileNumberIsRequired")} pattern={/^[0-9]+$/} patternErrorMessage={t("pleaseNumber")} maxLength={10}/>
      <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.mobile?.message}</p>
   
      </>

      <>
      <InputTag labelName={t("Email")} inputPlaceholder={t("EmailPlaceholder")} inputName={"email"} formInstance={registerForm} required requiredErrorMessage={t("EmailIsRequired")} pattern={/^[a-zA-Z0-9._\u0600-\u06FF-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
} patternErrorMessage={t("pleaseValidEmail")} validate/>
      <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.email?.message}</p>
      </>

      <>
      <ReusableDropdown labelName={t("ConsultantType")} name={"consultantType"} control={control} formInstance={registerForm} mappingOptionValues={lawyersConsultationTypes} rules={{required: t("PleaseSelectconsultantType") }} />
          <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.consultantType?.message}</p>
      </>

      <>
      <InputTag labelName={t("NationalID/Iqama")} inputPlaceholder={t("NationalIDPlaceholder")} inputName={"nationalId"} formInstance={registerForm} required requiredErrorMessage={t("NationalIDIsRequired")} pattern={/^[0-9]+$/} patternErrorMessage={t("pleaseNumber")} maxLength={10} />
      <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.nationalId?.message}</p>
      </>

      <>
      <InputTag labelName={t("Iban")} inputPlaceholder={t("IbanPlaceholder")} inputName={"iban"} formInstance={registerForm} required requiredErrorMessage={t("IBANIsRequired")}  minLength={24}  minLengthErrorMessage={t("please_enter_minimum_24_character")}  maxLength={34} />
      <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.iban?.message}</p>
      </>

      <>
      <ReusableFileUpload labelName={t("Upload IBAN")}  fileLink={ibanFileUrl} fileName={ibanFileName} setFileName={setIbanFileName} setFileObject={setIbanFileObject}  isDisabled={false}/>
      {
       IbanUploadError &&       <p className='m-0' style={{color:"red", fontSize:"12px"}}>{t("FieldCannotBeEmpty")}</p>
      }
      </>
      

      <>
      <ReusableFileUpload labelName={t("UploadnationalID/Iqama")}  fileLink={fileurl} fileName={fileName} setFileName={setFileName} setFileObject={setFileObject}  isDisabled={false}/>
      {
        props.uploadError &&       <p className='m-0' style={{color:"red", fontSize:"12px"}}>{t("FieldCannotBeEmpty")}</p>
      }
      </>



     
                    <label htmlFor="sector" style={{ color: "black" }}>

                      {t("SelectSectors")}
                    </label>

                    <div className="dropdown w-100">
                          <button className="btn btn-secondary dropdown-toggle d-flex justify-content-between align-items-center w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"
                              style={{backgroundColor: "white",color: colors.secondaryColor,width: "100%",border: `2px solid ${colors.secondaryColorLighterShade}`,height:"45px"}}
                              >
                             {t("SelectSectors")}
                              <span className="dropdown-arrow"></span>
                          </button>
            
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      
                            {fetchedData && fetchedData.length > 0 ? (
                              fetchedData.map((sector, index) => (
                                <li key={index} className="dropdown-item" onClick={() => handleAddSector(sector)} >
                                  {isRTL ? sector.sectorNameArabic : sector.sectorName}
                                </li>
                              ))
                            ) : (
                              <li className="dropdown-item" >
                                {t("NoSectorsAvailable")}
                              </li>
                            )}
                          </ul>
                    </div>
            {sectorError && <p className='m-0' style={{ color: "red", fontSize: "12px" }}>{t("SectorMustSelected")}</p>}
             <div className="container mt-3">
             {/* <p>Selected Sectors:</p> */}

            <ul className="list-group">
              {selectedSectors.map((sector, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {isRTL ? sector.sectorNameArabic : sector.sectorName}
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ backgroundColor: colors.primaryColor, border: 'none' }}
                    onClick={() => handleRemoveSector(index)}
                  >
                    {t("Remove")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

                  </div> 

      </div>

    
    </form>
  );
};

export default RegisterForm;
