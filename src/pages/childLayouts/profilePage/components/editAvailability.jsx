import React, { useRef } from 'react'
import ReusableDropdown from '../../../../components/reusableD'
import { useForm } from 'react-hook-form'
import ReusableTextButton from '../../../../components/reusableTextButton'
import colors from '../../../../assets/constants/colors'
import { useTranslation } from 'react-i18next'

const EditAvailability = (props) => {

    const editAvailabilityFormRef =useRef(null)
    const editAvailabilityForm= useForm()
    const {handleSubmit , formState ,  control , setValue , watch}=editAvailabilityForm
    const {errors , dirty}= formState

    const {t}=useTranslation();
    const editAvailabilityOptionValue =[
        {
            availabilityStatusValue:1,
            availabilityValue: t("Delete_availability")
        },
        {
            availabilityStatusValue:2,
            availabilityValue: t("Edit_availability")
        },
    ]

    const editAvailabilityFormSubmitClick =()=>{
        if (editAvailabilityFormRef.current)
        editAvailabilityFormRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
    }

    const editAvailabilityFormSubmission = (data)=>{
      console.log(data)
        if(data?.editAvailability==1){
          props.setEditAvailabilitySectionOne(false)
          props.setEditAvailabilitySectionTwo(true)
        }
    }

  return (

<>

<form ref={editAvailabilityFormRef} onSubmit={handleSubmit(editAvailabilityFormSubmission)} noValidate>
     <>
                  <ReusableDropdown
                    defaultValue={""}
                    labelName={""}
                    name={"editAvailability"}
                    control={control}
                    formInstnace={editAvailabilityForm}
                    mappingOptionValues={editAvailabilityOptionValue}
                    rules={{
                      required: t("please_select_an_option_to_continue"),
                    }}
                  />

                  <p
                    className="m-0"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {errors.editAvailability?.message}
                  </p>
     </>

</form>

<ReusableTextButton buttonName={t("Next")} backgroundColor={colors.primaryColor} color={"white"} onClick={editAvailabilityFormSubmitClick}/>
</>

)

}

export default EditAvailability