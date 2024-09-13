import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAvailablityDatesDetails, fetchCurrentDateSessionDetails } from '../../../../core/reducer/User'
import { useForm } from 'react-hook-form'
import ReusableTextButton from '../../../../components/reusableTextButton'
import colors from '../../../../assets/constants/colors'
import ReusableDropdown from '../../../../components/reusableD'
import ReusablePageScrollEncloser from '../../../../components/reusablePageScrollEncloser'
import { useTranslation } from 'react-i18next'


const DeleteAvailabilityForm = () => {


    const {t}=useTranslation();
    const deleteAvailabilityFormRef =useRef(null)
    const deleteAvailabilityForm = useForm();
    const { handleSubmit, formState, control, setValue, watch } = deleteAvailabilityForm;
    const {errors , dirty}= formState
    const dispatch =useDispatch()
    const [datesMappingArray , setDatesMappingArray]=useState(null)
    const selectedDateTodelete =watch("dateToDelete")
    const noonData =watch("noonSelection")
    const availabilityDates =useSelector(state=>state.user?.availabilityDates)
    const fetchCurrentDateSessionDetailsData =useSelector(state=>state.user?.fetchCurrentDateSessionDetailsData)

    const noonMappingArray=[
        {
            noonId:1,
            noonName:t("Forenoon")
        },
        {
            noonId:2,
            noonName:t("Afternoon")
        },
    ]

    const [result, setResult] = useState(null);


    function checkInAppointment(session) {

     const val=session

        

        if(fetchCurrentDateSessionDetailsData!==null){
            

            const sessionKey = val == 1 ? "session1" : "session2";
        const sessionData = fetchCurrentDateSessionDetailsData.slots[sessionKey];

        if (!sessionData) {
            return false; 
        }
    
            for (const obj of sessionData) {
                if (obj.inAppointment == 1) {
                    return false; 
                }
            }
    
            return true; 
        }
    }

    const deleteAvailabilityFormSubmitClick =()=>{
        if (deleteAvailabilityFormRef.current)
        deleteAvailabilityFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
    }

    const deleteAvailabilityFormSubmission =(data)=>{

        if(fetchCurrentDateSessionDetailsData){

            const payload ={
                userUuid: "531d8b00-f326-4eec-998b-e0451a56cb56",
                selectedDate: [
                    data?.dateToDelete
                ]
            }

        }
     
    }

 

    useEffect(()=>{
        if(availabilityDates){
            const datesArray = availabilityDates?.map((item, index) => ({ 
                id:index++,
                date: item.availableDate }));

                setDatesMappingArray(datesArray)

            
        }
    },[availabilityDates])

    useEffect(()=>{
       
         if(noonData){
             setResult(checkInAppointment(noonData));
             

         }

    },[noonData, selectedDateTodelete,fetchCurrentDateSessionDetailsData])



    useEffect(()=>{

        if(selectedDateTodelete){

                    const val =selectedDateTodelete
            
                    dispatch(fetchCurrentDateSessionDetails({date:val}))

                    
        }
    
    },[selectedDateTodelete])

    useEffect(()=>{
        dispatch(fetchAvailablityDatesDetails())
    },[])

  return (

    <>

    <ReusablePageScrollEncloser>

        <div className="d-flex justify-content-center align-items-center h-100 ">

            <form ref={deleteAvailabilityFormRef} onSubmit={handleSubmit(deleteAvailabilityFormSubmission)} noValidate className='w-100 d-flex flex-column gap-3'>

        <>
        
                <ReusableDropdown
                            defaultValue={""}
                            labelName={"Select a date"}
                            name={"dateToDelete"}
                            control={control}
                            formInstnace={deleteAvailabilityForm}
                            mappingOptionValues={datesMappingArray}
                            rules={{
                            required:" please select an option to continue",
                            }}
                        />

                        <p
                            className="m-0"
                            style={{ color: "red", fontSize: "12px" }}
                        >
                            {errors.dateToDelete?.message}
                        </p>
        </>  

        <>
        <ReusableDropdown
                            defaultValue={""}
                            labelName={"Select a session"}
                            name={"noonSelection"}
                            control={control}
                            formInstnace={deleteAvailabilityForm}
                            mappingOptionValues={noonMappingArray}
                            rules={{
                            required:" please select an option to continue",
                            }}
                        />

                        <p
                            className="m-0"
                            style={{ color: "red", fontSize: "12px" }}
                        >
                            {errors.noonSelection?.message}
                        </p>               
        </>
{
    result==false &&(
        <p style={{color:"#e25546", background:"#fcedeb", borderRadius:"5px",padding:"10px"}} className='m-0'>Cannot delete any session for the selected combination because you already have an booked appoinment in it. please contact the administrator for support</p>
    )
}

            </form>

        </div>

        <>
        { (result==true || result==null) &&(
            <ReusableTextButton buttonName={"Submit"} backgroundColor={colors.primaryColor} color={"white"} onClick={deleteAvailabilityFormSubmitClick}/>

        )

        }
        </>


    </ReusablePageScrollEncloser>
    

      

    </>
  )
}

export default DeleteAvailabilityForm