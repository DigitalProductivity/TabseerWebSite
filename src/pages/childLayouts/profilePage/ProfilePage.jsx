import React, { useEffect, useRef, useState } from "react";
import ProfilePageComponent from "./components/profilePageComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  availabilityUpdate,
  changeLanguages,
  fetchAvailablityDatesDetails,
  fetchCurrentDateSessionDetails,
  fetchUserDetails,
  updateAvailableSlots,
} from "../../../core/reducer/User";
import ReusableTextButton from "../../../components/reusableTextButton";
import colors from "../../../assets/constants/colors";
import ReusableDropdown from "../../../components/reusableD";
import { Controller, useForm } from "react-hook-form";
import SetPasswordForms from "../../Register/components/setPassword";
import Loader from "../../../components/loaders/loader";
import ReusableMessagePopper from "../../../components/utils/popper/reusableMessagePopper";
import { useTranslation } from "react-i18next";
import ReusableSlotCreator from "../../../components/reusableSlotCreator";
import ReusableLooker from "../../../components/reusableLooker";
import ReusableModal from "../../../components/modal/reusableModal";
import DateFormatter from "../../../components/dateFormatter";
import ReusableSessionLooker from "../../../components/reusableSessionLooker";
import {
  iconAddAvailability,
  iconNullData,
  iconViewAvailability,
} from "../../../assets/images";
import ReusableProfileNavtabs from "../../../components/reusableProfileNavtabs";
import ReusablePageScrollEncloser from "../../../components/reusablePageScrollEncloser";
import EditAvailability from "./components/editAvailability";
import DeleteAvailabilityForm from "./components/deleteAvailabilityForm";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ReusablePopupHeading from "../../../components/reusablePopupHeading";
import InputTag from "../../../components/inputTag";
import AddIndividualAvailability from "./components/addIndividualAvailability";

function ProfilePage() {
  const [toDate, setToDate] = useState();
  const [availabilitySectionOne, setAvailabilitySectionOne] = useState(true);
  const [availabilitySectionTwo, setAvailabilitySectionTwo] = useState(false);
  const [availabilitySectionThree, setAvailabilitySectionThree] =
    useState(false);
  const [availabilitySectionFour, setAvailabilitySectionFour] = useState(false);

  const [editAvailabilitySectionOne, setEditAvailabilitySectionOne] =
    useState(true);
  const [editAvailabilitySectionTwo, setEditAvailabilitySectionTwo] =
    useState(false);
  const [editAvailabilitySectionThree, setEditAvailabilitySectionThree] =
    useState(false);

  const [sectionOneSelection, setSectionOneSelection] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);

  const [sundayTwo, setSundayTwo] = useState([]);
  const [sundayFour, setSundayFour] = useState([]);
  const [mondayTwo, setMondayTwo] = useState([]);
  const [mondayFour, setMondayFour] = useState([]);
  const [tuesdayTwo, setTuesdayTwo] = useState([]);
  const [tuesdayFour, setTuesdayFour] = useState([]);
  const [wednesdayTwo, setWednesdayTwo] = useState([]);
  const [wednesdayFour, setWednesdayFour] = useState([]);
  const [thursdayTwo, setThursdayTwo] = useState([]);
  const [thursdayFour, setThursdayFour] = useState([]);
  const [fridayTwo, setFridayTwo] = useState([]);
  const [fridayFour, setFridayFour] = useState([]);
  const [saturdayTwo, setSaturdayTwo] = useState([]);
  const [saturdayFour, setSaturdayFour] = useState([]);

  const [groupedData, setGroupedData] = useState([]);
  const [slotDetailsPopup, setSlotDetailsPopup] = useState(false);
  const [availabilityDatesArray, setAvailabilityDatesArray] = useState([]);
  const dispatch = useDispatch();
  const profileSettingsForm = useForm();
  const availabilityForm = useForm();
  const {
    handleSubmit: handleAvailabilitySubmit,
    formState: availabilityFormState,
    control: availabilityControl,
    watch: availabilityWatch,
    setValue: availabilitySetValue,
  } = availabilityForm;

  const [forenoonStartTime, setForeNoonStartTime] = useState("");
  const [forenoonEndTime, setForeNoonEndTime] = useState("");
  const [afternoonStartTime, setAfterNoonStartTime] = useState("");
  const [afternoonEndTime, setAfterNoonEndTime] = useState("");

  const { errors: availabilityErrors } = availabilityFormState;
  const { handleSubmit, formState, control } = profileSettingsForm;
  const loading = useSelector((state) => state?.user?.isLoading);
  const availabilityUpdationData = useSelector(
    (state) => state?.user?.availabilityUpdationData
  );

  const editAvailabilityFormReference = useRef(null);
  const editAvailabilityForm = useForm();

  const {
    handleSubmit: editAvailabilityFormHandleSubmit,
    formState: editAvailabilityFormState,
    control: editAvailabilityFormControl,
    setError: editAvailabilityFormSetError,
    watch: editAvailabilityWatch,
    setValue,
    clearErrors: editAvailabilityClearErrors,
  } = editAvailabilityForm;
  const { errors: editAvailabilityFormErrors } = editAvailabilityFormState;
  const watchedSessionPeriod = editAvailabilityWatch("sessionPeriod");
  const [clickedDate, setClickedDate] = useState("");
  const [resultData, setResultData] = useState(null);

  //individualAvailabilityForm
  const individualAvailabilityForm = useForm();

  const {
    handleSubmit: individualAvailabilityFormHandleSubmit,
    formState: individualAvailabilityFormState,
    control: individualAvailabilityFormControl,
    setError: individualAvailabilityFormSetError,
    watch: individualAvailabilityFormWatch,
    setValue: individualAvailabilityFormSetValue,
    clearErrors: individualAvailabilityFormClearErrors,
  } = individualAvailabilityForm;
  const { errors: individualAvailabilityFormErrors } =
    individualAvailabilityFormState;
  const [radioButtonWatch, setRadioButtonWatch] = useState("individual");
  const radioButtonWatchedValue =
    individualAvailabilityFormWatch("radioButton");

  useEffect(() => {
    if (radioButtonWatchedValue) {
      setRadioButtonWatch(radioButtonWatchedValue);
    }
  }, [radioButtonWatchedValue]);

  const onFormTypeSelectionSubmission = (data) => {
    console.log(data);
  };

  const profileSettingsFormRef = useRef(null);
  const [changeLanguage, setChangeLanguage] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [languagePreference, setLanguagePreference] = useState(null);
  const { errors } = formState;
  const { width, height } = useWindowDimensions();
  const availabilityFormRef = useRef(null);
  const [lookerDate, setLookerDate] = useState(null);
  const [editPencilToggle, setEditPencilToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const changeLanguagesStatus = useSelector(
    (state) => state?.user?.changeLanguagesStatus
  );

  const errorVal = useSelector((state) => state?.user?.error);
  const individualUserDetails = useSelector(
    (state) => state.user?.individualUserDetails
  );
  const availabilityUpdationCode = useSelector(
    (state) => state?.user?.availabilityUpdationCode
  );
  const availabilityDates = useSelector(
    (state) => state.user?.availabilityDates
  );
  const fetchCurrentDateSessionDetailsData = useSelector(
    (state) => state?.user?.fetchCurrentDateSessionDetailsData
  );

  const fetchCurrentDateSessionDetailsDataValue = useSelector(
    (state) => state?.user?.fetchCurrentDateSessionDetailsDataValue
  );

  const { t } = useTranslation();

  const sessionPeriodMappedValues = [
    {
      sessionPeriodId: 1,
      sessionPeriodName: "FN",
    },
    {
      sessionPeriodId: 2,
      sessionPeriodName: "AN",
    },
  ];

  const languageMappingValues = [
    {
      languageId: 1,
      language: "English",
    },
    {
      languageId: 2,
      language: t("Arabic"),
    },
  ];

  const consultationTimeMappingValues = [
    {
      timeId: "30",
      timeValue: "30",
    },
  ];

  const consultationBufferTimeMappingValues = [
    {
      timeId: "10",
      timeValue: "10",
    },
  ];

  const sessionStartMappingValues = [
    {
      sessionMappingValueId: "08:00:00",
      sessionMappingValue: "08:00 AM",
    },
    {
      sessionMappingValueId: "09:00:00",
      sessionMappingValue: "09:00 AM",
    },
    {
      sessionMappingValueId: "10:00:00",
      sessionMappingValue: "10:00 AM",
    },
    {
      sessionMappingValueId: "11:00:00",
      sessionMappingValue: "11:00 AM",
    },
    {
      sessionMappingValueId: "12:00:00",
      sessionMappingValue: "12:00 PM",
    },
  ];

  const sessionEndMappingValues = [
    {
      sessionMappingValueId: "09:00:00",
      sessionMappingValue: "09:00 AM",
    },
    {
      sessionMappingValueId: "10:00:00",
      sessionMappingValue: "10:00 AM",
    },
    {
      sessionMappingValueId: "11:00:00",
      sessionMappingValue: "11:00 AM",
    },
    {
      sessionMappingValueId: "12:00:00",
      sessionMappingValue: "12:00 PM",
    },
  ];

  const sessionStartAfternoonMappingValues = [
    {
      sessionMappingValueId: "13:00:00",
      sessionMappingValue: "01:00 PM",
    },
    {
      sessionMappingValueId: "14:00:00",
      sessionMappingValue: "02:00 PM",
    },
    {
      sessionMappingValueId: "15:00:00",
      sessionMappingValue: "03:00 PM",
    },
    {
      sessionMappingValueId: "16:00:00",
      sessionMappingValue: "04:00 PM",
    },
    {
      sessionMappingValueId: "17:00:00",
      sessionMappingValue: "05:00 PM",
    },
    {
      sessionMappingValueId: "18:00:00",
      sessionMappingValue: "06:00 PM",
    },
    {
      sessionMappingValueId: "19:00:00",
      sessionMappingValue: "07:00 PM",
    },
  ];

  const sessionEndAfternoonMappingValues = [
    {
      sessionMappingValueId: "14:00:00",
      sessionMappingValue: "02:00 PM",
    },
    {
      sessionMappingValueId: "15:00:00",
      sessionMappingValue: "03:00 PM",
    },
    {
      sessionMappingValueId: "16:00:00",
      sessionMappingValue: "04:00 PM",
    },
    {
      sessionMappingValueId: "17:00:00",
      sessionMappingValue: "05:00 PM",
    },
    {
      sessionMappingValueId: "18:00:00",
      sessionMappingValue: "06:00 PM",
    },
    {
      sessionMappingValueId: "19:00:00",
      sessionMappingValue: "07:00 PM",
    },
    {
      sessionMappingValueId: "20:00:00",
      sessionMappingValue: "08:00 PM",
    },
  ];

  const radioButtonMappingValues = [
    {
      radioButtonMapId: "individual",
    },
    {
      radioButtonMapId: "group",
    },
  ];

  const startTime = editAvailabilityWatch("startTime");
  const afternoonStartingTime = editAvailabilityWatch("afternoonStartingTime");
  const afternoonEndingTime = editAvailabilityWatch("afternoonEndingTime");
  const endTime = editAvailabilityWatch("endTime");
  const updateAvailableSlotsCode = useSelector(
    (state) => state?.user?.updateAvailableSlotsCode
  );

  const fromDate = availabilityWatch("fromDate");

  const selectedStartTime = availabilityWatch("sundayOne");
  const sundayAfternoon = availabilityWatch("sundayThree");

  const mondayOne = availabilityWatch("mondayOne");
  const mondayAfternoon = availabilityWatch("mondayThree");

  const tuesdayOne = availabilityWatch("tuesdayOne");
  const tuesdayAfternoon = availabilityWatch("tuesdayThree");

  const wednesdayOne = availabilityWatch("wednesdayOne");
  const wednesdayAfternoon = availabilityWatch("wednesdayThree");

  const thursdayOne = availabilityWatch("thursdayOne");
  const thursdayAfternoon = availabilityWatch("thursdayThree");

  const fridayOne = availabilityWatch("fridayOne");
  const fridayAfternoon = availabilityWatch("fridayThree");

  const saturdayOne = availabilityWatch("saturdayOne");
  const saturdayAfternoon = availabilityWatch("saturdayThree");

  const consultationStartTime = "08:00:00";
  const consultationEndTime = "12:10:00";
  const afternoonConsultationStartTime = "13:00:00";
  const afternoonConsultationEndTime = "20:10:00";

  function generateTimeSlots(startTime, endTime, interval) {
    const timeSlots = [];
    let currentTime = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);

    while (currentTime < endTimeObj) {
      const twelveHourFormat = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const twentyFourHourFormat = currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      timeSlots.push({
        option: twelveHourFormat,
        value: twentyFourHourFormat,
      });

      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return timeSlots;
  }

  const onEditAvailabilitySubmitClick = () => {
    if (editAvailabilityFormReference.current)
      editAvailabilityFormReference.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
  };

  const consulationTimeMappingValues = generateTimeSlots(
    consultationStartTime,
    consultationEndTime,
    60
  );

  const consultationTimeMappingValuesAfternoon = generateTimeSlots(
    afternoonConsultationStartTime,
    afternoonConsultationEndTime,
    60
  );

  const handleSettingsClick = () => {
    setSectionOne(false);
    setSectionTwo(true);
  };

  const handleAvailabilityNextClick = () => {
    if (sectionOneSelection == 1) {
      setAvailabilitySectionOne(false);
      setAvailabilitySectionTwo(true);
    }
    if (sectionOneSelection == 2) {
      setAvailabilitySectionOne(false);
      setAvailabilitySectionTwo(false);
      setAvailabilitySectionThree(true);
    }
    if (sectionOneSelection == 3) {
      setAvailabilitySectionOne(false);
      setAvailabilitySectionTwo(false);
      setAvailabilitySectionThree(false);
      setAvailabilitySectionFour(true);
    }
  };

  const handleViewAvailabilityDatesBackClick = () => {
    setAvailabilitySectionOne(true);
    setAvailabilitySectionFour(false);
  };

  const settingsFormSubmission = (data) => {
    const payload = {
      preferredLanguage: data?.language,
    };

    dispatch(changeLanguages(payload));
  };

  const handleProfileSettingsBackClick = () => {
    setSectionOne(true);
    setSectionTwo(false);
    setChangePassword(false);
    setChangeLanguage(false);
  };

  const handleAvailabilityClick = () => {
    setSectionOne(false), setSectionTwo(false);
    setSectionThree(true);
  };

  const handleResetPassword = () => {
    setChangePassword(true);
    setChangeLanguage(false);
  };

  const handleChangeLanguage = () => {
    setChangePassword(false);
    setChangeLanguage(true);
  };

  const handleChangeLanguageClick = () => {
    if (profileSettingsFormRef.current)
      profileSettingsFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
  };

  const availabilityFormSubmission = (data) => {
    const payload = {
      consulationTime: data?.consultationTime,
      bufferTime: data?.bufferTime,
      fromDate: data?.fromDate,
      toDate: data?.toDate,
      days: [
        {
          dayId: 1,
          fromTime: data?.sundayOne,
          toTime: data?.sundayTwo,
          session: 1,
        },
        {
          dayId: 1,
          fromTime: data?.sundayThree,
          toTime: data?.sundayFour,
          session: 2,
        },
        {
          dayId: 2,
          fromTime: data?.mondayOne,
          toTime: data?.mondayTwo,
          session: 1,
        },
        {
          dayId: 2,
          fromTime: data?.mondayThree,
          toTime: data?.mondayFour,
          session: 2,
        },
        {
          dayId: 3,
          fromTime: data?.tuesdayOne,
          toTime: data?.tuesdayTwo,
          session: 1,
        },
        {
          dayId: 3,
          fromTime: data?.tuesdayThree,
          toTime: data?.tuesdayFour,
          session: 2,
        },
        {
          dayId: 4,
          fromTime: data?.wednesdayOne,
          toTime: data?.wednesdayTwo,
          session: 2,
        },
        {
          dayId: 4,
          fromTime: data?.wednesdayThree,
          toTime: data?.wednesdayFour,
          session: 2,
        },
        {
          dayId: 5,
          fromTime: data?.thursdayOne,
          toTime: data?.thursdayTwo,
          session: 1,
        },
        {
          dayId: 5,
          fromTime: data?.thursdayThree,
          toTime: data?.thursdayFour,
          session: 2,
        },
        {
          dayId: 6,
          fromTime: data?.fridayOne,
          toTime: data?.fridayTwo,
          session: 1,
        },
        {
          dayId: 6,
          fromTime: data?.fridayThree,
          toTime: data?.fridayFour,
          session: 2,
        },
        {
          dayId: 7,
          fromTime: data?.saturdayOne,
          toTime: data?.saturdayTwo,
          session: 2,
        },
        {
          dayId: 7,
          fromTime: data?.saturdayThree,
          toTime: data?.saturdayFour,
          session: 2,
        },
      ],
    };
    dispatch(availabilityUpdate(payload));
    // console.log(payload)
  };

  const handleAvailabilityFormClick = () => {
    if (availabilityFormRef.current)
      availabilityFormRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
  };

  const handleNullAvailabilityBackClick = () => {
    setAvailabilitySectionFour(false);
    setAvailabilitySectionOne(true);
  };

  const handleAddAvailabilityClick = () => {
    // setSectionOne(false);
    // setSectionTwo(false);
    // setSectionThree(false);
    // setSectionFour(true);

    setAvailabilitySectionTwo(true);
    setAvailabilitySectionFour(false);
  };

  const onAddAvailabilityBackClick = () => {
    setAvailabilitySectionOne(true);
    setAvailabilitySectionTwo(false);
  };

  const handleLookerClick = (date) => {
    const parts = date.split("/");

    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    setLookerDate(formattedDate);
    setSlotDetailsPopup(true);
  };

  const onEditAvailabilityFormSubmit = (data) => {
    function convertTo24Hour(timeStr) {
      const [time, modifier] = timeStr?.split(" ") ?? [];
      let [hours, minutes, seconds] = time?.split(":") ?? [];

      if (!hours || !minutes) {
        return "Invalid time format";
      }

      if (hours === "12") {
        hours = "00";
      }

      if (modifier === "PM" && hours !== "12") {
        hours = parseInt(hours, 10) + 12;
      }

      hours = hours.toString().padStart(2, "0");

      minutes = minutes.padStart(2, "0");
      seconds = seconds ? seconds.padStart(2, "0") : "00";

      return `${hours}:${minutes}:${seconds}`;
    }

    const parts = clickedDate.split("/");

    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    if (data?.sessionPeriod == "1") {
      const payload = {
        selectedDate: formattedDate,
        fromTimeFN: data?.startTime,
        toTimeFN: data?.endTime,
        fromTimeAN: convertTo24Hour(afternoonStartTime),
        toTimeAN: convertTo24Hour(afternoonEndTime),
      };
      dispatch(updateAvailableSlots(payload));
    } else {
      const payload = {
        selectedDate: formattedDate,
        fromTimeFN: convertTo24Hour(forenoonStartTime),
        toTimeFN: convertTo24Hour(forenoonEndTime),
        fromTimeAN: data?.afternoonStartingTime,
        toTimeAN: data?.afternoonEndingTime,
      };
      dispatch(updateAvailableSlots(payload));
    }
  };

  const handlePencilToggleClick = (date, AN, FN) => {
    setForeNoonStartTime(FN.fromTime);
    setAfterNoonStartTime(AN.fromTime);
    setForeNoonEndTime(FN.toTime);
    setAfterNoonEndTime(AN.toTime);
    setClickedDate(date);
    // console.log(AN)
    // console.log(FN)
  };

  function checkInAppointment(session) {
    const val = session;

    if (fetchCurrentDateSessionDetailsData !== null) {
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

  useEffect(() => {
    if (startTime == "12:00 PM" || startTime == "") {
      setValue("endTime", "");
    } else {
      if (startTime <= endTime) {
        const currentIndex = sessionStartMappingValues.findIndex(
          (item) => item.sessionMappingValue == startTime
        );
        const nextTimeValue =
          sessionStartMappingValues[currentIndex + 1]?.sessionMappingValue;
        if (nextTimeValue) {
          setValue("endTime", nextTimeValue);
        }
      } else {
        return;
      }
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime <= startTime) {
      setValue("endTime", "");
      editAvailabilityFormSetError("endTime", {
        type: "manual",
        message: "please select a valid time",
      });
    } else {
      editAvailabilityClearErrors("endTime");
    }
  }, [endTime]);

  useEffect(() => {
    if (clickedDate) {
      setEditPencilToggle(true);
    }
  }, [clickedDate]);

  useEffect(() => {
    console.log(resultData);
  }, [resultData]);

  useEffect(() => {
    // console.log(watchedSessionPeriod)

    if (clickedDate) {
      console.log(clickedDate);
      function convertDateFormat(dateStr) {
        const parts = dateStr.split("/");
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        // Format to yyyy-mm-dd
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }

      // Example usage:
      const date = clickedDate;
      const formattedDate = convertDateFormat(date);
      console.log(formattedDate);

      dispatch(fetchCurrentDateSessionDetails({ date: formattedDate }));
    }
  }, [watchedSessionPeriod]);

  useEffect(() => {
    console.log(fetchCurrentDateSessionDetailsDataValue);
    if (watchedSessionPeriod) {
      setResultData(checkInAppointment(watchedSessionPeriod));
    }
  }, [fetchCurrentDateSessionDetailsDataValue]);

  useEffect(() => {
    const morningEndTime = consultationEndTime;
    const afterNoonEndTime = afternoonConsultationEndTime;
    const interval = 60;

    function generateSessionTwoTimeSlots(selectedStartTime, endTime, interval) {
      const timeSlots = [];
      let currentTime = new Date(`2000-01-01T${selectedStartTime}`);
      currentTime.setMinutes(currentTime.getMinutes() + interval);

      const endTimeObj = new Date(`2000-01-01T${endTime}`);

      while (currentTime < endTimeObj) {
        const twelveHourFormat = currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const twentyFourHourFormat = currentTime.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          option: twelveHourFormat,
          value: twentyFourHourFormat,
        });

        const nextTime = new Date(currentTime);
        nextTime.setMinutes(nextTime.getMinutes() + interval);
        currentTime = nextTime;
      }

      return timeSlots;
    }

    setSundayTwo(
      generateSessionTwoTimeSlots(selectedStartTime, morningEndTime, interval)
    );
    setSundayFour(
      generateSessionTwoTimeSlots(sundayAfternoon, afterNoonEndTime, interval)
    );

    setMondayTwo(
      generateSessionTwoTimeSlots(mondayOne, morningEndTime, interval)
    );
    setMondayFour(
      generateSessionTwoTimeSlots(mondayAfternoon, afterNoonEndTime, interval)
    );

    setTuesdayTwo(
      generateSessionTwoTimeSlots(tuesdayOne, morningEndTime, interval)
    );
    setTuesdayFour(
      generateSessionTwoTimeSlots(tuesdayAfternoon, afterNoonEndTime, interval)
    );

    setWednesdayTwo(
      generateSessionTwoTimeSlots(wednesdayOne, morningEndTime, interval)
    );
    setWednesdayFour(
      generateSessionTwoTimeSlots(
        wednesdayAfternoon,
        afterNoonEndTime,
        interval
      )
    );

    setThursdayTwo(
      generateSessionTwoTimeSlots(thursdayOne, morningEndTime, interval)
    );
    setThursdayFour(
      generateSessionTwoTimeSlots(thursdayAfternoon, afterNoonEndTime, interval)
    );

    setFridayTwo(
      generateSessionTwoTimeSlots(fridayOne, morningEndTime, interval)
    );
    setFridayFour(
      generateSessionTwoTimeSlots(fridayAfternoon, afterNoonEndTime, interval)
    );

    setSaturdayTwo(
      generateSessionTwoTimeSlots(saturdayOne, morningEndTime, interval)
    );
    setSaturdayFour(
      generateSessionTwoTimeSlots(saturdayAfternoon, afterNoonEndTime, interval)
    );
  }, [
    selectedStartTime,
    sundayAfternoon,
    mondayOne,
    mondayAfternoon,
    tuesdayOne,
    tuesdayAfternoon,
    wednesdayOne,
    wednesdayAfternoon,
    thursdayOne,
    thursdayAfternoon,
    fridayOne,
    fridayAfternoon,
    saturdayOne,
    saturdayAfternoon,
  ]);

  useEffect(() => {
    const getMinToDate = (fromDate) => {
      if (!fromDate) return;

      const parsedDate = new Date(fromDate);
      if (isNaN(parsedDate)) return;

      parsedDate.setDate(parsedDate.getDate() + 7);

      return parsedDate.toISOString().split("T")[0];
    };

    const calculatedMinToDate = getMinToDate(fromDate);
    if (calculatedMinToDate) {
      setToDate(calculatedMinToDate);
      availabilitySetValue("toDate", calculatedMinToDate);
    }
  }, [fromDate]);

  useEffect(() => {
    // console.log("val", fetchCurrentDateSessionDetailsData);
  }, [fetchCurrentDateSessionDetailsData]);

  useEffect(() => {
    if (changeLanguagesStatus == 1000) {
      localStorage.removeItem("initialLoad");
      dispatch(fetchUserDetails());
    }
  }, [changeLanguagesStatus]);

  useEffect(() => {
    const prefferedLanguageValue = individualUserDetails?.preferredLanguage;

    if (prefferedLanguageValue == 2) {
      setLanguagePreference(2);
    }

    if (prefferedLanguageValue == 1) {
      setLanguagePreference(1);
    }

    if (prefferedLanguageValue) {
      if (localStorage.getItem("initialLoad") === null) {
        if (prefferedLanguageValue === 2) {
          i18n.changeLanguage("ar");
          localStorage.setItem("language", "ar");
          localStorage.setItem("initialLoad", "value");
          document.body.dir = "rtl";
        } else {
          i18n.changeLanguage("en");
          localStorage.setItem("language", "en");
          localStorage.setItem("initialLoad", "value");
        }
      } else {
        return;
      }
    }
  }, [individualUserDetails]);

  useEffect(() => {
    function isTimeNotMidnight(time) {
      return time !== "00:00:00";
    }

    const filteredDates = availabilityDates
      ?.filter(
        (data) =>
          isTimeNotMidnight(data.fromTimeAN) ||
          isTimeNotMidnight(data.fromTimeFN) ||
          isTimeNotMidnight(data.toTimeAN) ||
          isTimeNotMidnight(data.toTimeFN)
      )
      .map((data) => {
        const parts = data.availableDate.split("-");
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

        return {
          date: formattedDate,
          AN: {
            fromTime: data.fromTimeAN,
            toTime: data.toTimeAN,
          },
          FN: {
            fromTime: data.fromTimeFN,
            toTime: data.toTimeFN,
          },
        };
      });

    setAvailabilityDatesArray(filteredDates);
  }, [availabilityDates]);

  useEffect(() => {
    const monthNames = [
      t("January"),
      t("February"),
      t("March"),
      t("April"),
      t("May"),
      t("June"),
      t("July"),
      t("August"),
      t("September"),
      t("October"),
      t("November"),
      t("December"),
    ];

    if (availabilityDatesArray) {
      const groupDatesByMonth = (dates) => {
        return dates.reduce((acc, currentItem) => {
          const [day, month, year] = currentItem.date.split("/");
          const monthName = monthNames[parseInt(month, 10) - 1];
          const key = `${monthName} ${year}`;
          if (!acc[key]) {
            acc[key] = [];
          }

          // const convertTimeTo12HourFormat = (timeString) => {
          //   if (timeString === "00:00:00") {
          //     return "No session";
          //   } else {
          //     const [hours, minutes] = timeString.split(":");
          //     const hour = parseInt(hours, 10) % 12 || 12;
          //     const period = parseInt(hours, 10) >= 12 ? "PM" : "AM";
          //     return `${hour}:${minutes} ${period}`;
          //   }
          // };

          const convertTimeTo12HourFormat = (timeString) => {
            if (timeString === "00:00:00") {
              return "No session";
            } else {
              const [hours, minutes] = timeString.split(":");
              const hour = (parseInt(hours, 10) % 12 || 12)
                .toString()
                .padStart(2, "0");
              const period = parseInt(hours, 10) >= 12 ? "PM" : "AM";
              return `${hour}:${minutes} ${period}`;
            }
          };

          acc[key].push({
            date: currentItem.date,
            AN: {
              fromTime: convertTimeTo12HourFormat(currentItem.AN.fromTime),
              toTime: convertTimeTo12HourFormat(currentItem.AN.toTime),
            },
            FN: {
              fromTime: convertTimeTo12HourFormat(currentItem.FN.fromTime),
              toTime: convertTimeTo12HourFormat(currentItem.FN.toTime),
            },
          });

          return acc;
        }, {});
      };

      const groupedDates = groupDatesByMonth(availabilityDatesArray);
      setGroupedData(groupedDates);
    }
  }, [availabilityDatesArray]);

  useEffect(() => {
    const val = lookerDate;

    if (lookerDate) {
      dispatch(fetchCurrentDateSessionDetails({ date: val }));
    }
  }, [slotDetailsPopup]);

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(fetchAvailablityDatesDetails());
  }, []);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const imageSelection = (val) => {
    setSectionOneSelection(val);
  };

  return (
    <>
      {slotDetailsPopup && (
        <ReusableModal
          modalWidth={width <= 992 ? "80vw" : ""}
          onClick={() => setSlotDetailsPopup(false)}
          needHeading={true}
        >
          {fetchCurrentDateSessionDetailsData && (
            <>
              <div className="d-flex flex-row justify-content-center p-4">
                <h5>
                  {
                    <DateFormatter
                      date={fetchCurrentDateSessionDetailsData?.selectedDate}
                    />
                  }
                </h5>
              </div>

              <div>
                <p className="m-0 mb-3" style={{ color: colors.primaryColor }}>
                  {t("Morning_Sessions")}
                </p>

                <div className="container-fluid">
                  <div
                    className="d-flex gap-2 w-100"
                    style={{ overflowX: "scroll" }}
                  >
                    {fetchCurrentDateSessionDetailsData?.slots?.session1?.map(
                      (item) => (
                        <div className="col-lg-2  mb-3">
                          <div
                            style={{ minWidth: "100%", overflowX: "scroll" }}
                          >
                            <ReusableSessionLooker
                              slotBookingStatus={item?.inAppointment}
                              interactionType={item?.serviceType}
                              time={item?.slotTime}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="m-0 mb-3" style={{ color: colors.primaryColor }}>
                  {t("Afternoon_Sessions")}
                </p>

                <div className="container-fluid">
                  <div className="d-flex gap-2" style={{ overflowX: "scroll" }}>
                    {fetchCurrentDateSessionDetailsData?.slots?.session2?.map(
                      (item) => (
                        <div className="col-lg-2  mb-3">
                          <ReusableSessionLooker
                            slotBookingStatus={item?.inAppointment}
                            interactionType={item?.serviceType}
                            time={item?.slotTime}
                          />
                        </div>
                      )
                    )}
                  </div>
                  {loading && <Loader />}
                </div>
              </div>
            </>
          )}
        </ReusableModal>
      )}

      <div>
        <h6
          className="mb-5"
          style={{ color: "#434345", fontSize: 18, fontWeight: 600 }}
        >
          {t("Profile")}
        </h6>

        <div
          className=" d-flex flex-row gap-2  justify-content-evenly"
          style={{ padding: "15px 0px" }}
        >
          <ReusableProfileNavtabs
            heading={t("Personal_details")}
            isActive={activeTab === "active"}
            onClick={() => handleClick("active")}
          />
          {/* <ReusableProfileNavtabs
            heading={"Settings"}
            isActive={activeTab === "link1"}
            onClick={() => handleClick("link1")}
          /> */}
          <ReusableProfileNavtabs
            heading={t("Availability")}
            isActive={activeTab === "link2"}
            onClick={() => handleClick("link2")}
          />
          <ReusableProfileNavtabs
            heading={t("Change_Password")}
            isActive={activeTab === "link3"}
            onClick={() => handleClick("link3")}
          />
          <ReusableProfileNavtabs
            heading={t("Change_language")}
            isActive={activeTab === "link4"}
            onClick={() => handleClick("link4")}
          />
        </div>

        <div className="tab-content" style={{ paddingTop: "15px" }}>
          {activeTab === "active" && (
            <div className="tab-pane active">
              <ProfilePageComponent
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                onClick={handleSettingsClick}
                OnAvailabilityClick={handleAvailabilityClick}
              />
            </div>
          )}

          {activeTab === "link1" && (
            <div className="tab-content">
              <div>
                <ReusableTextButton
                  backgroundColor={colors.primaryColor}
                  color={"white"}
                  buttonName={t("Back")}
                  buttonWidth={"10%"}
                  onClick={handleProfileSettingsBackClick}
                />

                <form
                  ref={profileSettingsFormRef}
                  onSubmit={handleSubmit(settingsFormSubmission)}
                  noValidate
                  className="d-flex flex-column gap-2 "
                >
                  <div className="d-flex justify-content-center">
                    <div className="w-25 d-flex flex-column gap-4">
                      <div className="d-flex justify-content-start align-items-center gap-3">
                        <ReusableTextButton
                          backgroundColor={colors.primaryColorLighterShade}
                          color={colors.primaryColor}
                          buttonName={t("ResetPasword")}
                          buttonHeight={"45px"}
                          onClick={handleResetPassword}
                        />
                        <ReusableTextButton
                          backgroundColor={colors.primaryColorLighterShade}
                          color={colors.primaryColor}
                          buttonName={t("ChangeLanguage")}
                          buttonHeight={"45px"}
                          onClick={handleChangeLanguage}
                        />
                      </div>
                      {changeLanguage && (
                        <div className="d-flex flex-column gap-3">
                          <>
                            <ReusableDropdown
                              defaultValue={languagePreference}
                              labelName={t("Language")}
                              name={"language"}
                              control={control}
                              formInstnace={profileSettingsForm}
                              mappingOptionValues={languageMappingValues}
                              rules={{
                                required: t("PleaseSelectLanguage"),
                              }}
                            />

                            <p
                              className="m-0"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {errors.language?.message}
                            </p>
                          </>

                          <div className="d-flex justify-content-center">
                            <ReusableTextButton
                              buttonName={t("UpdateLanguage")}
                              backgroundColor={colors.primaryColor}
                              color={"white"}
                              onClick={handleChangeLanguageClick}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>

                <div className="d-flex justify-content-center">
                  <div style={{ width: "25%" }}>
                    {changePassword && (
                      <SetPasswordForms setPasswordLabel={t("ResetPassword")} />
                    )}
                  </div>
                </div>

                {loading && <Loader />}

                {changeLanguagesStatus == 1000 && (
                  <ReusableMessagePopper
                    message={t("user_default_language_updated_successfully")}
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === "link2" && (
            <div className="tab-content">
              {availabilitySectionOne && (
                <div className="d-flex flex-column ">
                  <div
                    className="d-flex flex-row gap-5 justify-content-center align-items-center"
                    style={{ height: "40vh" }}
                  >
                    <div className="d-flex flex-column gap-2">
                      <div
                        style={{
                          background: colors.primaryColorLighterShade,
                          height: "130px",
                          width: "130px",
                          borderRadius: "5px",
                          border:
                            sectionOneSelection == 1
                              ? "2px solid black"
                              : "none",
                        }}
                        className="d-flex justify-content-center align-items-center"
                        onClick={() => imageSelection(1)}
                      >
                        <div className="d-flex flex-row justify-content-center">
                          <img
                            src={iconAddAvailability}
                            style={{ height: "auto", width: "50%" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="d-flex flex-column align-items-center gap-2">

                      <div
                        style={{
                          background: colors.primaryColorLighterShade,
                          height: "130px",
                          width: "130px",
                          borderRadius: "5px",
                          border : sectionOneSelection==2 ? "2px solid black" : "none"
                        }}
                        className="d-flex justify-content-center align-items-center"
                        onClick={()=>imageSelection(2)}
                      >
                        <img
                          src={iconInstitution}
                          style={{ height: "auto", width: "60%" }}
                        />
                      </div>

                     
                    </div> */}

                    <div className="d-flex flex-column align-items-center gap-2">
                      <div
                        style={{
                          background: colors.primaryColorLighterShade,
                          height: "130px",
                          width: "130px",
                          borderRadius: "5px",
                          border:
                            sectionOneSelection == 3
                              ? "2px solid black"
                              : "none",
                        }}
                        className="d-flex justify-content-center align-items-center"
                        onClick={() => imageSelection(3)}
                      >
                        <img
                          src={iconViewAvailability}
                          style={{ height: "auto", width: "60%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-center">
                    <ReusableTextButton
                      buttonName={
                        sectionOneSelection == 1
                          ? t("Add_availability")
                          : t("View_availability")
                      }
                      backgroundColor={colors.primaryColor}
                      color={"white"}
                      buttonWidth={"140px"}
                      onClick={handleAvailabilityNextClick}
                    />
                  </div>
                </div>
              )}

              {availabilitySectionTwo && (
                <div
                  className="container-fluid"
                  style={{ borderRadius: "5px" }}
                >
                  <ReusablePageScrollEncloser>
                    <div className="d-flex flex-row justify-content-center">
                      <div style={{ width: width <= 576 ? "100%" : "65%" }}>
                        <>
                          <form
                            onSubmit={individualAvailabilityFormHandleSubmit(
                              onFormTypeSelectionSubmission
                            )}
                            noValidate
                            className="d-flex flex-column gap-4"
                          >
                            <div className="d-flex justify-content-end">
                              <div style={{width:"120px"}}>
                                <ReusableDropdown
                                  defaultValue={"individual"}
                                  labelName={""}
                                  name={"radioButton"}
                                  control={individualAvailabilityFormControl}
                                  formInstnace={individualAvailabilityForm}
                                  mappingOptionValues={radioButtonMappingValues}
                                  selectHeight={"35px"}
                                
                                  // rules={{
                                  //   required: t("PleaseSelectLanguage"),
                                  // }}
                                />

                                <p
                                  className="m-0"
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  {errors.language?.message}
                                </p>
                              </div>
                            </div>
                          </form>
                        </>
                        {radioButtonWatch == "group" && (
                          <form
                            ref={availabilityFormRef}
                            onSubmit={handleAvailabilitySubmit(
                              availabilityFormSubmission
                            )}
                            noValidate
                            style={{ padding: "10px" }}
                            className="d-flex flex-column gap-3"
                          >
                            <div className="d-flex flex-row gap-2 w-100">
                              <div className="d-flex flex-column gap-2 w-50">
                                <ReusableDropdown
                                  labelName={t("Consultation_Time _minutes)")}
                                  name={"consultationTime"}
                                  control={availabilityControl}
                                  mappingOptionValues={
                                    consultationTimeMappingValues
                                  }
                                  rules={{
                                    required: t(
                                      "please_select_consultation_time"
                                    ),
                                  }}
                                />
                                <p
                                  className="m-0"
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  {availabilityErrors.consultationTime?.message}
                                </p>
                              </div>

                              <div className="d-flex flex-column gap-2 w-50">
                                <ReusableDropdown
                                  labelName={t("Buffer_time_(minutes)")}
                                  name={"bufferTime"}
                                  control={availabilityControl}
                                  mappingOptionValues={
                                    consultationBufferTimeMappingValues
                                  }
                                  rules={{
                                    required: t("please_select_buffer_time"),
                                  }}
                                />
                                <p
                                  className="m-0"
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  {availabilityErrors.bufferTime?.message}
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-column gap-2">
                              <div className="d-flex flex-row gap-2 w-100">
                                <div className="d-flex flex-column gap-2 w-50">
                                  <p
                                    className="m-0"
                                    style={{ fontSize: "15px", color: "black" }}
                                  >
                                    {t("From_date")}
                                  </p>

                                  <Controller
                                    name="fromDate"
                                    control={availabilityControl}
                                    defaultValue={new Date()}
                                    rules={{
                                      validate: (value) => {
                                        if (
                                          typeof value !== "string" ||
                                          value.trim() === ""
                                        ) {
                                          return t(
                                            "Please_select_valid_from_date"
                                          );
                                        }

                                        return true;
                                      },
                                      required: t("please_select_tart_date"),
                                    }}
                                    render={({ field }) => {
                                      const currentDate = new Date();

                                      const tomorrow = new Date(currentDate);
                                      tomorrow.setDate(
                                        currentDate.getDate() + 1
                                      );
                                      const minDate = tomorrow
                                        .toISOString()
                                        .split("T")[0];

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
                                  <p
                                    className="m-0"
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {availabilityErrors.fromDate?.message}
                                  </p>
                                </div>

                                <div className="d-flex flex-column gap-2 w-50">
                                  <p
                                    className="m-0"
                                    style={{ fontSize: "15px", color: "black" }}
                                  >
                                    {t("To_date")}
                                  </p>

                                  <Controller
                                    name="toDate"
                                    control={availabilityControl}
                                    defaultValue={new Date()}
                                    rules={{
                                      validate: (value) => {
                                        if (
                                          typeof value !== "string" ||
                                          value.trim() === ""
                                        ) {
                                          return t(
                                            "Please_select_valid_end_date"
                                          );
                                        }

                                        return true;
                                      },
                                      required: t("please_select_end_date"),
                                    }}
                                    render={({ field }) => {
                                      const currentDate = new Date();

                                      return (
                                        <input
                                          type="date"
                                          style={{
                                            width: "100%",
                                            height: "45px",
                                            borderColor: `2px solid ${colors?.secondaryColorLighterShade}`,
                                          }}
                                          {...field}
                                          min={toDate}
                                        />
                                      );
                                    }}
                                  />

                                  <p
                                    className="m-0"
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {availabilityErrors.toDate?.message}
                                  </p>
                                </div>
                              </div>

                              <div>
                                {typeof errorVal == "object" && errorVal && (
                                  <div
                                    className="d-flex flex-row"
                                    style={{
                                      padding: "10px",
                                      borderRadius: "5px",
                                      background: "#fcedeb",
                                      color: "#e25546",
                                      maxHeight: "100px",
                                      overflowY: "scroll",
                                    }}
                                  >
                                    <div className="m-0">
                                      {errorVal && (
                                        <p>
                                          {t(
                                            "You_already_have_created_availability_for_the_following"
                                          )}{" "}
                                          {errorVal?.length > 1
                                            ? t("dates")
                                            : t("date")}{" "}
                                          :
                                        </p>
                                      )}
                                      {errorVal?.map((item, index) => (
                                        <span key={index}>
                                          <DateFormatter date={item} />
                                          {index !== errorVal.length - 1 &&
                                            ", "}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div
                              style={{ maxHeight: "50vh", overflowY: "scroll" }}
                            >
                              <ReusableSlotCreator
                                nameOfDay={t("SUNDAY")}
                                sessionOneStartLabelName={""}
                                sessionOneStartName={"sundayOne"}
                                control={availabilityControl}
                                sessionOneStartMappingValues={
                                  consulationTimeMappingValues
                                }
                                formsErrorState={availabilityErrors}
                                sessionOneEndLabelName={""}
                                sessionOneEndName={"sundayTwo"}
                                sessionOneEndMappingValues={sundayTwo}
                                sessionOneEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoStartLabelName={""}
                                sessionTwoStartName={"sundayThree"}
                                sessionTwoStartMappingValues={
                                  consultationTimeMappingValuesAfternoon
                                }
                                sessionTwoEndMappingValues={sundayFour}
                                sessionTwoEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoEndName={"sundayFour"}
                                sessionTwoEndLabelName={""}
                              />

                              <ReusableSlotCreator
                                nameOfDay={t("MONDAY")}
                                sessionOneStartLabelName={""}
                                sessionOneStartName={"mondayOne"}
                                control={availabilityControl}
                                sessionOneStartMappingValues={
                                  consulationTimeMappingValues
                                }
                                formsErrorState={availabilityErrors}
                                sessionOneEndLabelName={""}
                                sessionOneEndName={"mondayTwo"}
                                sessionOneEndMappingValues={mondayTwo}
                                sessionOneEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoStartLabelName={""}
                                sessionTwoStartName={"mondayThree"}
                                sessionTwoStartMappingValues={
                                  consultationTimeMappingValuesAfternoon
                                }
                                sessionTwoEndMappingValues={mondayFour}
                                sessionTwoEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoEndName={"mondayFour"}
                                sessionTwoEndLabelName={""}
                              />
                              <ReusableSlotCreator
                                nameOfDay={t("TUESDAY")}
                                sessionOneStartLabelName={""}
                                sessionOneStartName={"tuesdayOne"}
                                control={availabilityControl}
                                sessionOneStartMappingValues={
                                  consulationTimeMappingValues
                                }
                                formsErrorState={availabilityErrors}
                                sessionOneEndLabelName={""}
                                sessionOneEndName={"tuesdayTwo"}
                                sessionOneEndMappingValues={tuesdayTwo}
                                sessionOneEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoStartLabelName={""}
                                sessionTwoStartName={"tuesdayThree"}
                                sessionTwoStartMappingValues={
                                  consultationTimeMappingValuesAfternoon
                                }
                                sessionTwoEndMappingValues={tuesdayFour}
                                sessionTwoEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoEndName={"tuesdayFour"}
                                sessionTwoEndLabelName={""}
                              />
                              <ReusableSlotCreator
                                nameOfDay={t("WEDNESDAY")}
                                sessionOneStartLabelName={""}
                                sessionOneStartName={"wednesdayOne"}
                                control={availabilityControl}
                                sessionOneStartMappingValues={
                                  consulationTimeMappingValues
                                }
                                formsErrorState={availabilityErrors}
                                sessionOneEndLabelName={""}
                                sessionOneEndName={"wednesdayTwo"}
                                sessionOneEndMappingValues={wednesdayTwo}
                                sessionOneEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoStartLabelName={""}
                                sessionTwoStartName={"wednesdayThree"}
                                sessionTwoStartMappingValues={
                                  consultationTimeMappingValuesAfternoon
                                }
                                sessionTwoEndMappingValues={wednesdayFour}
                                sessionTwoEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoEndName={"wednesdayFour"}
                                sessionTwoEndLabelName={""}
                              />
                              <ReusableSlotCreator
                                nameOfDay={t("THURSDAY")}
                                sessionOneStartLabelName={""}
                                sessionOneStartName={"thursdayOne"}
                                control={availabilityControl}
                                sessionOneStartMappingValues={
                                  consulationTimeMappingValues
                                }
                                formsErrorState={availabilityErrors}
                                sessionOneEndLabelName={""}
                                sessionOneEndName={"thursdayTwo"}
                                sessionOneEndMappingValues={thursdayTwo}
                                sessionOneEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoStartLabelName={""}
                                sessionTwoStartName={"thursdayThree"}
                                sessionTwoStartMappingValues={
                                  consultationTimeMappingValuesAfternoon
                                }
                                sessionTwoEndMappingValues={thursdayFour}
                                sessionTwoEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoEndName={"thursdayFour"}
                                sessionTwoEndLabelName={""}
                              />
                              <ReusableSlotCreator
                                nameOfDay={t("FRIDAY")}
                                sessionOneStartLabelName={""}
                                sessionOneStartName={"fridayOne"}
                                control={availabilityControl}
                                sessionOneStartMappingValues={
                                  consulationTimeMappingValues
                                }
                                formsErrorState={availabilityErrors}
                                sessionOneEndLabelName={""}
                                sessionOneEndName={"fridayTwo"}
                                sessionOneEndMappingValues={fridayTwo}
                                sessionOneEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoStartLabelName={""}
                                sessionTwoStartName={"fridayThree"}
                                sessionTwoStartMappingValues={
                                  consultationTimeMappingValuesAfternoon
                                }
                                sessionTwoEndMappingValues={fridayFour}
                                sessionTwoEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoEndName={"fridayFour"}
                                sessionTwoEndLabelName={""}
                              />
                              <ReusableSlotCreator
                                nameOfDay={t("SATURDAY")}
                                sessionOneStartLabelName={""}
                                sessionOneStartName={"saturdayOne"}
                                control={availabilityControl}
                                sessionOneStartMappingValues={
                                  consulationTimeMappingValues
                                }
                                formsErrorState={availabilityErrors}
                                sessionOneEndLabelName={""}
                                sessionOneEndName={"saturdayTwo"}
                                sessionOneEndMappingValues={saturdayTwo}
                                sessionOneEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoStartLabelName={""}
                                sessionTwoStartName={"saturdayThree"}
                                sessionTwoStartMappingValues={
                                  consultationTimeMappingValuesAfternoon
                                }
                                sessionTwoEndMappingValues={saturdayFour}
                                sessionTwoEndRequiredRule={t(
                                  "please_select_an_end_time"
                                )}
                                sessionTwoEndName={"saturdayFour"}
                                sessionTwoEndLabelName={""}
                              />
                            </div>
                          </form>
                        )}

                        {radioButtonWatch == "individual" && (
                          <AddIndividualAvailability
                            consultationTimeMappingValues={
                              consultationTimeMappingValues
                            }
                            consultationBufferTimeMappingValues={
                              consultationBufferTimeMappingValues
                            }
                            sessionStartMappingValues={
                              sessionStartMappingValues
                            }
                            sessionEndMappingValues={sessionEndMappingValues}
                            sessionStartAfternoonMappingValues={
                              sessionStartAfternoonMappingValues
                            }
                            sessionEndAfternoonMappingValues={
                              sessionEndAfternoonMappingValues
                            }
                            onAddAvailabilityBackClick={
                              onAddAvailabilityBackClick
                            }
                          />
                        )}
                      </div>
                    </div>

                    {radioButtonWatch == "group" && (
                      <div className="row w-50" style={{ padding: "10px 0px" }}>
                        <div className="d-flex justify-content-center align-items-center w-100">
                          <div className="d-flex justify-content-center align-items-center gap-3 w-50">
                            <ReusableTextButton
                              buttonName={t("Back")}
                              backgroundColor={colors.primaryColorLighterShade}
                              color={colors.primaryColor}
                              onClick={onAddAvailabilityBackClick}
                            />
                            <ReusableTextButton
                              buttonName={t("Submit")}
                              backgroundColor={colors.primaryColor}
                              color={"white"}
                              onClick={handleAvailabilityFormClick}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </ReusablePageScrollEncloser>

                  {availabilityUpdationCode == 1000 && (
                    <ReusableMessagePopper
                      message={t("Availability_added_successfully")}
                    />
                  )}
                </div>
              )}

              {availabilitySectionThree && (
                <>
                  {editAvailabilitySectionOne && (
                    <>
                      <EditAvailability
                        setEditAvailabilitySectionOne={
                          setEditAvailabilitySectionOne
                        }
                        setEditAvailabilitySectionTwo={
                          setEditAvailabilitySectionTwo
                        }
                      />
                    </>
                  )}

                  {editAvailabilitySectionTwo && (
                    <>
                      <div className="d-flex flex-row justify-content-center align-items-center">
                        <div style={{ width: "30%" }}>
                          <DeleteAvailabilityForm />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {availabilitySectionFour && (
                <>
                  {availabilityDates == null ? (
                    <div className="d-flex flex-column  justify-content-center align-items-center h-100 gap-3">
                      <div
                        className="d-flex justify-content-center align-items-center flex-row gap-3"
                        style={{ height: "40vh" }}
                      >
                        <div>
                          <img
                            src={iconNullData}
                            style={{ height: "auto", width: "30vh" }}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-center align-items-center h-100 gap-3 w-100 ">
                        <ReusableTextButton
                          buttonName={t("Back")}
                          backgroundColor={colors.primaryColorLighterShade}
                          color={colors.primaryColor}
                          buttonWidth={"10%"}
                          onClick={handleNullAvailabilityBackClick}
                        />
                        <ReusableTextButton
                          buttonName={t("Add_availability")}
                          backgroundColor={colors.primaryColor}
                          color={"white"}
                          buttonWidth={"10%"}
                          onClick={handleAddAvailabilityClick}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="container-fluid">
                      <ReusablePageScrollEncloser>
                        <div className="row mb-3 w-100">
                          {Object.entries(groupedData)?.map(
                            ([monthYear, datesArray], index) => (
                              <div key={index++}>
                                <h2>{monthYear}</h2>
                                <div className="row mb-3">
                                  {datesArray.map(({ date, AN, FN }, index) => (
                                    <div
                                      key={index++}
                                      style={{ cursor: "pointer" }}
                                      className="col-lg-3 col-6 mb-3 "
                                    >
                                      <ReusableLooker
                                        onClick={() => handleLookerClick(date)}
                                        onPencilIconClick={() =>
                                          handlePencilToggleClick(date, AN, FN)
                                        }
                                        key={date}
                                        date={date}
                                        forenoon="FN"
                                        forenoonTimeOne={
                                          FN.fromTime == "No session"
                                            ? ""
                                            : FN.fromTime
                                        }
                                        forenoonTimeTwo={
                                          FN.toTime == "No session"
                                            ? ""
                                            : FN.toTime
                                        }
                                        afternoon="AN"
                                        afternoonTimeOne={
                                          AN.fromTime == "No session"
                                            ? ""
                                            : AN.fromTime
                                        }
                                        afternoonTimeTwo={
                                          AN.toTime == "No session"
                                            ? ""
                                            : AN.toTime
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        <div className="d-flex">
                          <ReusableTextButton
                            buttonName={t("Back")}
                            backgroundColor={colors.primaryColorLighterShade}
                            color={colors.primaryColor}
                            buttonWidth={"120px"}
                            onClick={handleViewAvailabilityDatesBackClick}
                          />
                        </div>
                      </ReusablePageScrollEncloser>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "link3" && (
            <>
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <div style={{ width: "25%", height: "100%" }}>
                    <SetPasswordForms
                      setPasswordLabel={t("ResetPassword")}
                      otherPage={true}
                    />
                  </div>
                </div>

                {loading && <Loader />}
              </div>
            </>
          )}

          {activeTab === "link4" && (
            <form
              ref={profileSettingsFormRef}
              onSubmit={handleSubmit(settingsFormSubmission)}
              noValidate
              className="d-flex flex-column gap-2 h-100"
            >
              <div className="d-flex justify-content-center h-100">
                <div className="w-25 d-flex flex-column  gap-4 h-100">
                  <div className="d-flex flex-column gap-3 h-100 justify-content-center ">
                    <>
                      <ReusableDropdown
                        defaultValue={languagePreference}
                        labelName={t("User_default_language")}
                        name={"language"}
                        control={control}
                        formInstnace={profileSettingsForm}
                        mappingOptionValues={languageMappingValues}
                        rules={{
                          required: t("PleaseSelectLanguage"),
                        }}
                      />

                      <p
                        className="m-0"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {errors.language?.message}
                      </p>
                    </>

                    <div className="d-flex justify-content-center">
                      <ReusableTextButton
                        buttonName={t("UpdateLanguage")}
                        backgroundColor={colors.primaryColor}
                        color={"white"}
                        onClick={handleChangeLanguageClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {changeLanguagesStatus == 1000 && (
            <ReusableMessagePopper
              message={t("user_default_language_updated_successfully")}
            />
          )}

          {editPencilToggle && (
            <ReusableModal modalHeight={"50vh"} modalWidth={"40vw"}>
              <ReusablePopupHeading
                popupHeading={"Edit availability"}
                onClick={() => setEditPencilToggle(false)}
              />

              <div className="d-flex flex-row justify-content-center w-100 mt-3 ">
                <div
                  style={{ width: "70%", height: "100%" }}
                  className="d-flex flex-column  align-items-center gap-4"
                >
                  <form
                    ref={editAvailabilityFormReference}
                    onSubmit={editAvailabilityFormHandleSubmit(
                      onEditAvailabilityFormSubmit
                    )}
                    noValidate
                    className="d-flex flex-column gap-2 w-100"
                  >
                    <div className="d-flex flex-column">
                      <InputTag
                        disabled={true}
                        labelName={"Date"}
                        inputPlaceholder={clickedDate}
                        inputName={"date"}
                        formInstance={editAvailabilityForm}
                      />
                      <p
                        className="m-0"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {editAvailabilityFormErrors.date?.message}
                      </p>
                    </div>

                    <>
                      <ReusableDropdown
                        labelName={"Session period"}
                        name={"sessionPeriod"}
                        control={editAvailabilityFormControl}
                        mappingOptionValues={sessionPeriodMappedValues}
                        rules={{
                          required: "please select an option",
                        }}
                      />

                      <p
                        className="m-0"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {editAvailabilityFormErrors.sessionPeriod?.message}
                      </p>
                    </>

                    <>
                      {resultData == false && (
                        <p
                          style={{
                            color: "#e25546",
                            background: "#fcedeb",
                            borderRadius: "5px",
                            padding: "10px",
                          }}
                          className="m-0"
                        >
                          Cannot delete any session for the selected combination
                          because you already have an booked appoinment in it.
                          please contact the administrator for support
                        </p>
                      )}
                    </>

                    <>
                      {watchedSessionPeriod == 1 && resultData == true && (
                        <div className="d-flex flex-row justify-content-between w-100">
                          <ReusableDropdown
                            labelName={"Start time"}
                            // defaultValue={forenoonStartTime}
                            name={"startTime"}
                            control={editAvailabilityFormControl}
                            mappingOptionValues={sessionStartMappingValues}
                            rules={{
                              required: "please select an option",
                            }}
                          />

                          <div className="d-flex flex-column gap-2">
                            <ReusableDropdown
                              labelName={"End time"}
                              name={"endTime"}
                              // defaultValue={forenoonEndTime}
                              control={editAvailabilityFormControl}
                              mappingOptionValues={sessionEndMappingValues}
                              rules={{
                                required: "please select an option",
                              }}
                            />

                            <p
                              className="m-0"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {editAvailabilityFormErrors.endTime?.message}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                    <>
                      {watchedSessionPeriod == 2 && resultData == true && (
                        <div className="d-flex flex-row justify-content-between w-100">
                          <ReusableDropdown
                            labelName={"Start time"}
                            // defaultValue={afternoonStartTime}
                            name={"afternoonStartingTime"}
                            control={editAvailabilityFormControl}
                            mappingOptionValues={
                              sessionStartAfternoonMappingValues
                            }
                            rules={{
                              required: "please select an option",
                            }}
                          />

                          <div className="d-flex flex-column gap-2">
                            <ReusableDropdown
                              labelName={"End time"}
                              name={"afternoonEndingTime"}
                              // defaultValue={afternoonEndTime}
                              control={editAvailabilityFormControl}
                              mappingOptionValues={
                                sessionEndAfternoonMappingValues
                              }
                              rules={{
                                required: "please select an option",
                              }}
                            />

                            <p
                              className="m-0"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {editAvailabilityFormErrors.endTime?.message}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  </form>
                  {resultData == true && (
                    <ReusableTextButton
                      buttonName={"submit"}
                      backgroundColor={colors.primaryColor}
                      color={"white"}
                      onClick={onEditAvailabilitySubmitClick}
                    />
                  )}
                </div>
              </div>
            </ReusableModal>
          )}

          {updateAvailableSlotsCode == 1000 && (
            <ReusableMessagePopper
              message={"Session availability updated successfully"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
