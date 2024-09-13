import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../service/apiclient";

const initialState = {
  personalInfo: null,
  error: null,
  isLoading: false,
  verificationRequired: null,
  requiredPwd: null,
  registerSuccess: null,
  orders: null,
  fetchSessionDetailsVal: null,
  agoraInteractionData: null,
  sector: null,
  sectorList: null,
  addUserStatus: null,
  individualUserDetails: null,
  fetchTransactionHistory: null,
  verifyOtp: null,
  fetchUserDetails: null,
  resendOtp: null,
  sectorData: null,
  userFileUploadStatus: null,
  forgotPasswordStatus: null,
  passwordSetStatus: null,
  registerPasswordSetStatus: null,
  addUserUuid: null,
  profileImageUpdateStatus: null,
  changePasswordStatus: null,
  changeLanguagesStatus: null,
  orderStatusUpdationCode: null,
  getChart: null,
  availabilityUpdationCode: null,
  availabilityDates: null,
  fetchCurrentDateSessionDetailsData: null,
  availabilityUpdationData: null,
  chatTokenGeneratorData: null,
  updateAvailableSlotsCode: null,
  userFileUpload: null,
  fetchCurrentDateSessionDetailsDataValue: null,
  addAvailabilityForOneDayCode: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/login");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/user");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "user/fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/orders");
      const response = await apiClient.get();
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//chart
export const getChart = createAsyncThunk(
  "user/getChart",
  async (year, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient(`/landing?year=${year}`);
      const response = await apiClient.get();
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//sector
export const sectorList = createAsyncThunk(
  "user/sector",
  async (_, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/sectors");
      const response = await apiClient.get();
      // console.log(response.data);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSessionDetails = createAsyncThunk(
  "user/fetchSessionDetails",
  async (args, { rejectWithValue }) => {
    try {
      const apiUrl = `/order?orderId=${args.orderId}`;
      const apiClient = new APIClient(apiUrl);
      const response = await apiClient.get();
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const agoraInteraction = createAsyncThunk(
  "user/agoraInteraction",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/agora/rtctoken");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//wallet transaction
export const fetchTransactionHistory = createAsyncThunk(
  "user/fetchTransactionHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/transaction");
      const response = await apiClient.get();
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//fetchUserDetails
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/user");
      const response = await apiClient.get();
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//verifyotp
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/verifyOtp");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//resendOtp
export const resendOtp = createAsyncThunk(
  "user/resendOtp",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/resendOtp");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//setPassword
export const setPassword = createAsyncThunk(
  "user/setPassword",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/setPassword");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//userFileUpload
export const userFileUpload = createAsyncThunk(
  "user/userFileUpload",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/file/upload/nationalId");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//ibanFileUpload
export const ibanFileUpload = createAsyncThunk(
  "user/ibanFileUpload ",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/file/upload/IBAN");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//contactUsQuery
export const contactUsQuery = createAsyncThunk(
  "user/contactUsQuery",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/contactUs");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//forgotPassword
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/resendOtp");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//profileImageUpdate
export const profileImageUpdate = createAsyncThunk(
  "user/profileImageUpdate",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/file/upload/profile");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// changePassword
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/password");
      const response = await apiClient.patch(args);
      // console.log("password",response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// changeLanguages
export const changeLanguages = createAsyncThunk(
  "user/changeLanguages",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/language");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// orderStatusUpdation
export const orderStatusUpdation = createAsyncThunk(
  "user/orderStatusUpdation",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/orderStatus");
      const response = await apiClient.patch(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//availabilityUpdate
export const availabilityUpdate = createAsyncThunk(
  "user/availabilityUpdate",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/availability");
      const response = await apiClient.post(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.date?.overLappedDates);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//fetchAvailablityDatesDetails
export const fetchAvailablityDatesDetails = createAsyncThunk(
  "user/fetchAvailablityDatesDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/availableDates");
      const response = await apiClient.get();
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//fetchCurrentDateSessionDetails
export const fetchCurrentDateSessionDetails = createAsyncThunk(
  "user/fetchCurrentDateSessionDetails",
  async (args, { rejectWithValue }) => {
    try {
      const apiUrl = `/availableSlots?selectedDate=${args.date}`;
      const apiClient = new APIClient(apiUrl);
      const response = await apiClient.get();
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//chatTokenGenerator
export const chatTokenGenerator = createAsyncThunk(
  "user/chatTokenGenerator",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/agora/rtctoken/chat");
      const response = await apiClient.post(args);
      // console.log("val",response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// updateAvailableSlots
export const updateAvailableSlots = createAsyncThunk(
  "user/updateAvailableSlots",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/updateAvailableSlots");
      const response = await apiClient.patch(args);
      // console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

///addAvailabilityForOneDay
export const addAvailabilityForOneDay = createAsyncThunk(
  "user/addAvailabilityForOneDay",
  async (args, { getState, rejectWithValue }) => {
    try {
      const apiClient = new APIClient("/addAvailabilityForOneDay");
      const response = await apiClient.post(args);
      console.log(response);
      if (response?.status) {
        if (response.status?.code !== 1000) {
          return rejectWithValue(response?.status?.message);
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
      state.isLoading = false;
    },
    clearRegistration: (state, action) => {
      state.verificationRequired = null;
      state.requiredPwd = null;
      state.registerSuccess = null;
    },
  },

  extraReducers: (builder) => {
    //LOGIN USER
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.code;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.personalInfo = action.payload?.data?.userDetails;
    });

    //registerUser

    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.mobileRegistered = action.payload?.code;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addUserStatus = action.payload?.status?.code;
      state.addUserStatusMessage = action.payload?.status?.message;
      state.addUserUuid = action.payload?.data?.lawyerUuid;
    });

    //verifyOtp
    builder.addCase(verifyOtp.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.mobileRegistered = action.payload?.code;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.otpStatus = action.payload?.status?.code;
    });

    //resendOtp
    builder.addCase(resendOtp.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resendOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.mobileRegistered = action.payload?.code;
    });
    builder.addCase(resendOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resendOtp = action.payload?.status?.code;
    });

    ///setPassword
    builder.addCase(setPassword.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(setPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.mobileRegistered = action.payload?.code;
    });
    builder.addCase(setPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.passwordSetStatus = action.payload?.status?.code;
      state.registerPasswordSetStatus = action.payload?.status?.code;
    });

    //orders
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action?.payload?.data?.orders;
    });

    //getChart
    builder.addCase(getChart.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getChart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getChart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getChart = action?.payload;
      state.monthlyIncome = action?.payload?.data?.incomeStats.map(
        (item) => item.monthlyIncome
      );
      state.yearIncome = action?.payload?.data?.totalYearlyIncome;
    });

    //fetchSessionDetails
    builder.addCase(fetchSessionDetails.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSessionDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchSessionDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchSessionDetailsVal = action?.payload?.data?.results;
    });

    //agoraInteraction

    builder.addCase(agoraInteraction.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(agoraInteraction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(agoraInteraction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.agoraInteractionData = action?.payload?.data;
    });

    //sector
    builder.addCase(sectorList.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sectorList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(sectorList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sectorList = action.payload?.data?.sectors;
      state.sectorData = action.payload?.data?.sectors;
    });

    //fetchUserDetails
    builder.addCase(fetchUserDetails.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.individualUserDetails = action.payload?.data?.lawyerProfileDetails;
    });

    //transactionhistroy
    builder.addCase(fetchTransactionHistory.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactionHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchTransactionHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetchTransactionHistory = action.payload?.data?.transactionHistory;
      state.wallet = action.payload?.data?.lawyerProfileDetails;
      state.allwallet = action.payload?.data;
    });

    //userFileUpload
    builder.addCase(userFileUpload.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userFileUpload.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userFileUpload.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userFileUploadStatus = action.payload?.status?.code;
    });

    //ibanFileUpload
    builder.addCase(ibanFileUpload.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(ibanFileUpload.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(ibanFileUpload.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ibanFileUploadStatus = action.payload?.status?.code;
    });

    //contactUsQuery
    builder.addCase(contactUsQuery.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(contactUsQuery.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(contactUsQuery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contactUsQueryStatus = action.payload?.status?.code;
    });

    //forgotPassword
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.forgotPasswordStatus = action.payload?.status?.code;
    });

    //profileImageUpdate
    builder.addCase(profileImageUpdate.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(profileImageUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(profileImageUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profileImageUpdateStatus = action.payload?.status?.code;
    });

    //changePassword
    builder.addCase(changePassword.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.changePasswordStatus = action.payload?.status?.code;
    });

    //changeLanguages
    builder.addCase(changeLanguages.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(changeLanguages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(changeLanguages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.changeLanguagesStatus = action.payload?.status?.code;
    });

    //orderStatusUpdation
    builder.addCase(orderStatusUpdation.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(orderStatusUpdation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(orderStatusUpdation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderStatusUpdationCode = action.payload;
    });

    //availabilityUpdate
    builder.addCase(availabilityUpdate.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(availabilityUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(availabilityUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.availabilityUpdationCode = action.payload?.status?.code;
      state.availabilityUpdationData = action.payload?.date?.overLappedDates;
    });

    //fetchAvailablityDatesDetails
    builder.addCase(fetchAvailablityDatesDetails.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAvailablityDatesDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAvailablityDatesDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.availabilityDates =
        action.payload?.data?.filteredLawyerAvailabldDates;
    });

    //fetchCurrentDateSessionDetails
    builder.addCase(fetchCurrentDateSessionDetails.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCurrentDateSessionDetails.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(
      fetchCurrentDateSessionDetails.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.fetchCurrentDateSessionDetailsData = action.payload?.data;
        state.fetchCurrentDateSessionDetailsDataValue = action.payload?.data;
      }
    );

    //chatTokenGenerator
    builder.addCase(chatTokenGenerator.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(chatTokenGenerator.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(chatTokenGenerator.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chatTokenGeneratorData = action.payload?.data;
    });

    //updateAvailableSlots
    builder.addCase(updateAvailableSlots.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateAvailableSlots.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateAvailableSlots.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateAvailableSlotsCode = action.payload?.status?.code;
    });

    //addAvailabilityForOneDay
    builder.addCase(addAvailabilityForOneDay.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addAvailabilityForOneDay.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addAvailabilityForOneDay.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addAvailabilityForOneDayCode = action.payload?.status?.code;
    });
  },
});

export const {
  setUserInfo,
  setLoading,
  clearError,
  clearRegistration,
  setError,
} = userSlice.actions;
export const UserReducer = userSlice.reducer;
