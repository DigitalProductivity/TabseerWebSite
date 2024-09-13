import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import colors from "../../../../assets/constants/colors";
import ReusableDropdown from "../../../../components/reusableD";
import ReusablePageScrollEncloser from "../../../../components/reusablePageScrollEncloser";
import ReusableTextButton from "../../../../components/reusableTextButton";
import { useDispatch, useSelector } from "react-redux";
import { addAvailabilityForOneDay } from "../../../../core/reducer/User";
import ReusableMessagePopper from "../../../../components/utils/popper/reusableMessagePopper";

const AddIndividualAvailability = (props) => {
  const addIndividualAvailabilityForm = useForm();
  const { handleSubmit, formState, control, setError } =
    addIndividualAvailabilityForm;
  const { errors } = formState;
  const addIndividualAvailabilityFormRef = useRef(null);
  const dispatch=useDispatch()
  const addAvailabilityForOneDayCode=useSelector((state)=>state?.user?.addAvailabilityForOneDayCode)
  const error =useSelector((state)=>state?.user?.error)

 

  const onFormSubmission = (data) => {

    const startTimeNumber=parseInt(data?.startTime)
    const afternoonStartingTime=parseInt(data?.afternoonStartingTime)
    const endTimeNumber=parseInt(data?.endTime)
    const afternoonEndingTime=parseInt(data?.afternoonEndingTime)


   
    if (data?.startTime == "" && data?.afternoonStartingTime == "") {
      setError("startTime", {
        type: "manual",
        message: "please select atleast one session",
      });
      setError("afternoonStartingTime", {
        type: "manual",
        message: "please select atleast one session",
      });
    } else if (data?.startTime !== "" && data?.endTime == "") {
      setError("endTime", {
        type: "manual",
        message: "please select an end time ",
      });
    } else if (
      data?.afternoonStartingTime !== "" &&
      data?.afternoonEndingTime == ""
    ) {
      setError("afternoonEndingTime", {
        type: "manual",
        message: "please select an end time ",
      });
    } else if (data?.startTime == data?.endTime) {
      setError("startTime", {
        type: "manual",
        message: "start and end time cannot be same ",
      });
      setError("endTime", {
        type: "manual",
        message: "start and end time cannot be same ",
      });
    } else if (startTimeNumber > endTimeNumber) {
      setError("startTime", {
        type: "manual",
        message: "please select a valid time",
      });
      setError("endTime", {
        type: "manual",
        message:  "please select a valid time",
      });
    } else if (afternoonStartingTime > afternoonEndingTime) {
      setError("afternoonStartingTime", {
        type: "manual",
        message: "please select a valid time",
      });
      setError("afternoonEndingTime", {
        type: "manual",
        message:  "please select a valid time",
      });
    }else{
        

       const payload={
      
        consulationTime: data?.consultationTime,
        bufferTime: data?.bufferTime,
        date: data?.toDate,
        singleDateSlot: [
            {
                fromTime: data?.startTime,
                toTime: data?.endTime,
                "session": 1
            },
            {
                fromTime: data?.afternoonStartingTime,
                toTime: data?.afternoonEndingTime,
                session: 2
            }
        ]
                        }

        dispatch(addAvailabilityForOneDay(payload))
    }
  };

  const handleIndividualAvailabilityFormClick = () => {
    if (addIndividualAvailabilityFormRef.current)
      addIndividualAvailabilityFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
  };

  useEffect(()=>{
    if(error){
        setError("toDate", {
            type: "manual",
            message: "You already have added availability for the selected date. Try editing the added availability",
          });
    }
  },[error])

  return (
    <div className="d-flex flex-column justify-content-between align-items-center gap-5 ">
      <form
        ref={addIndividualAvailabilityFormRef}
        onSubmit={handleSubmit(onFormSubmission)}
        noValidate
        className="mt-3"
        style={{ width: "35vw" }}
      >
        <div className="d-flex flex-column align-items-center gap-2 w-100">
          <div className="d-flex flex-column align-items-center gap-2 w-100">
            <div className="d-flex flex-column gap-2 w-100">
              <ReusableDropdown
                labelName={"consultation time in minutes"}
                name={"consultationTime"}
                control={control}
                mappingOptionValues={props.consultationTimeMappingValues}
                rules={{
                  required: "please select consultation time",
                }}
              />
              <p className="m-0" style={{ color: "red", fontSize: "12px" }}>
                {errors.consultationTime?.message}
              </p>
            </div>

            <div className="d-flex flex-column gap-2 w-100">
              <ReusableDropdown
                labelName={"Buffer time (minutes)"}
                name={"bufferTime"}
                control={control}
                mappingOptionValues={props.consultationBufferTimeMappingValues}
                rules={{
                  required: "please select buffer time",
                }}
              />
              <p className="m-0" style={{ color: "red", fontSize: "12px" }}>
                {errors.bufferTime?.message}
              </p>
            </div>
          </div>

          <div className="d-flex flex-column gap-2 w-100">
            <p className="m-0" style={{ fontSize: "15px", color: "black" }}>
              {"Date"}
            </p>

            <Controller
  name="toDate"
  control={control}
  defaultValue={new Date()}
  rules={{
    validate: (value) => {
      if (!value ) {
        return "Date is required";
      }
      return true;
    },
    required: "Please select an end date.",
  }}
  render={({ field }) => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() ); 
    const minDate = tomorrow.toISOString().split("T")[0];

    return (
      <input
        type="date"
        style={{
          width: "100%",
          height: "45px",
          borderColor: `2px solid ${colors?.secondaryColorLighterShade}`,
        }}
        {...field}
        min={minDate}
      />
    );
  }}
/>

            <p className="m-0" style={{ color: "red", fontSize: "12px" }}>
              {errors.toDate?.message}
            </p>
          </div>
          <div className="row w-100">
            <div className="col-lg-3">
              <div className="d-flex flex-row align-items-center h-100">
                <p className="m-0">Session timing</p>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row justify-content-center w-100 gap-2">
                  <div className="d-flex flex-column gap-2 w-100">
                    <ReusableDropdown
                      labelName={""}
                      // defaultValue={forenoonStartTime}
                      name={"startTime"}
                      control={control}
                      mappingOptionValues={props.sessionStartMappingValues}
                    />

                    <p
                      className="m-0"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {errors.startTime?.message}
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-2 w-100">
                    <ReusableDropdown
                      labelName={""}
                      name={"endTime"}
                      // defaultValue={forenoonEndTime}
                      control={control}
                      mappingOptionValues={props.sessionEndMappingValues}
                    />

                    <p
                      className="m-0"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {errors.endTime?.message}
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-between w-100 gap-2">
                  <div className="d-flex flex-column gap-2 w-100">
                    <ReusableDropdown
                      labelName={""}
                      // defaultValue={afternoonStartTime}
                      name={"afternoonStartingTime"}
                      control={control}
                      mappingOptionValues={
                        props.sessionStartAfternoonMappingValues
                      }
                    />

                    <p
                      className="m-0"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {errors.afternoonStartingTime?.message}
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-2  w-100">
                    <ReusableDropdown
                      labelName={""}
                      name={"afternoonEndingTime"}
                      // defaultValue={afternoonEndTime}
                      control={control}
                      mappingOptionValues={
                        props.sessionEndAfternoonMappingValues
                      }
                    />

                    <p
                      className="m-0"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {errors.afternoonEndingTime?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="row w-100" style={{ padding: "10px 0px" }}>
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="d-flex justify-content-center align-items-center gap-3 w-50">
            <ReusableTextButton
              buttonName={"Back"}
              backgroundColor={colors.primaryColorLighterShade}
              color={colors.primaryColor}
              onClick={props.onAddAvailabilityBackClick}
            />
            <ReusableTextButton
              buttonName={"Submit"}
              backgroundColor={colors.primaryColor}
              color={"white"}
              onClick={handleIndividualAvailabilityFormClick}
            />
          </div>
        </div>
      </div>

      {
        addAvailabilityForOneDayCode==1000&&(
            <ReusableMessagePopper message={"Availability added successfully"}/>
        )
      }
    </div>
  );
};

export default AddIndividualAvailability;
