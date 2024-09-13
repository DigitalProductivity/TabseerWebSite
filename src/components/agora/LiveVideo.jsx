import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../agora/liveVideo.css";

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  useVolumeLevel,
} from "agora-rtc-react";
import { useDispatch, useSelector } from "react-redux";
import {
  agoraInteraction,
  fetchSessionDetails,
  orderStatusUpdation,
} from "../../core/reducer/User";
import {
  avatar,
  avatarImage,
  iconEyeClose,
  iconEyeOpen,
  iconHangupPhone,
  iconIndividual,
  iconInstitution,
  iconMicrophone,
  iconMicrophoneWhite,
  iconVideoCamera,
  iconVideoWhite,
} from "../../assets/images";
import colors from "../../assets/constants/colors";
import Loader from "../loaders/loader";
import ReusablePageScrollEncloser from "../reusablePageScrollEncloser";
import ReusableDisplay from "../reusableDisplay";

export const LiveVideo = () => {
  const loading = useSelector((state) => state.user?.isLoading);
  let { id } = useParams();
  const dispatch = useDispatch();
  const [serviceName, setServiceName] = useState("video");
  const [clientName, setClientName] = useState(null);
  const fetchedData = useSelector((state) => state?.user?.agoraInteractionData);
  const sessionDetails = useSelector(
    (state) => state.user.fetchSessionDetailsVal
  );
  const [activeConnection, setActiveConnection] = useState(false);
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const [showCamera, setShowCamera] = useState(true);
  const [clientType, setClientType] = useState(null);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const navigate = useNavigate();
  const [isSpeaking, setSpeaking] = useState(false);
  const remoteUsers = useRemoteUsers();
  const [lawyerVolumeLevel, setLawyerVolumeLevel] = useState(0);
  const [userActiveMic, setUserActiveMic] = useState(false);
  const individualUserDetails = useSelector(
    (state) => state?.user?.individualUserDetails
  );
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const orderStatusUpdationCode = useSelector(
    (state) => state?.user?.orderStatusUpdationCode
  );

  // {console.log(remoteUsers)}

  const volumeLevel = useVolumeLevel(localMicrophoneTrack);

  const [isShown, setIsShown] = useState(false);

  const toggleSlide = () => {
    setIsShown(!isShown);
  };

  audioTracks.forEach((track) => track.play());

  const handleSessionEndClick = () => {
    const payload = {
      appointmentId: id,
      appointmentStatus: 4,
    };

    dispatch(orderStatusUpdation(payload));
  };

  useEffect(() => {
    if (audioTracks.length !== 0) {
      setUserActiveMic(true);
    } else {
      setUserActiveMic(false);
    }
  }, [audioTracks]);

  // {console.log(audioTracks)}

  useEffect(() => {
    if (fetchedData) {
      if (serviceName == "audio") {
        setCamera(false);
        setShowCamera(false);
        setActiveConnection(true);
      } else if (serviceName == "video") {
        useJoin;
        setActiveConnection(true);
      }
    }
  }, [fetchedData]);

  useEffect(() => {
    setLawyerVolumeLevel(volumeLevel);
  }, [volumeLevel]);

  useJoin(
    {
      appid: fetchedData?.appId,
      channel: fetchedData?.channelName,
      token: fetchedData?.token,
      uid: fetchedData?.uid,
    },
    activeConnection
  );

  useEffect(() => {
    const sessionServiceName = sessionDetails?.serviceName;
    const clientName = sessionDetails?.clientName;
    const clientType = sessionDetails?.clientType;

    setClientType(clientType);
    setClientName(clientName);
    setServiceName(sessionServiceName);
  }, [sessionDetails]);

  useEffect(() => {
    if (orderStatusUpdationCode?.status?.code == 1000) {
      setActiveConnection(false);
      navigate("/");
    }
  }, [orderStatusUpdationCode]);

  useEffect(() => {
    const val = Number(id);

    dispatch(agoraInteraction({ appointmentId: val }));

    dispatch(fetchSessionDetails({ orderId: val }));
  }, []);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  return (
    <>
      {serviceName == "video" && (
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          <div style={{ position: "relative", height: "90%", width: "100%" }}>
            <div style={{ height: "100%", width: "100%" }}>
              {remoteUsers.map((user) => (
                <div key={user.uid} style={{ height: "100%", width: "100%" }}>
                  <RemoteUser
                    user={user}
                    style={{
                      background:
                        serviceName == "audio"
                          ? `${colors.primaryColorLighterShade}`
                          : "",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              className={isSpeaking ? "animatingClass" : ""}
              style={{
                height: "20%",
                width: "20%",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <LocalUser
                className={isSpeaking ? "animatingClass" : ""}
                audioTrack={localMicrophoneTrack}
                videoTrack={localCameraTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                playAudio={micOn}
                playVideo={cameraOn}
                style={{
                  background:
                    serviceName == "audio" ? `${colors.primaryColor}` : "",
                }}
              />
            </div>

            {loading && <Loader />}
          </div>

          <div style={{ height: "10%" }}>
            <div id="controlsToolbar">
              <div
                onClick={toggleSlide}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  border: `2px solid ${colors.primaryColor}`,
                }}
                className="d-flex flex-row align-items-center justify-content-center"
              >
                <img
                  src={isShown ? iconEyeOpen : iconEyeClose}
                  style={{ height: "auto", width: "30px" }}
                />
              </div>

              <div
                className="d-flex justify-content-end align-items-center "
                style={{ gap: "15px" }}
              >
                <button className="btn" onClick={() => setMic((a) => !a)}>
                  <div
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      border: micOn ? "2px solid #bb8d4f" : "none",
                      background: micOn ? "none" : "red",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={micOn ? iconMicrophone : iconMicrophoneWhite}
                      style={{ height: "auto", width: "30px" }}
                    />
                  </div>
                </button>

                {showCamera && (
                  <button className="btn" onClick={() => setCamera((a) => !a)}>
                    <div
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                        border: cameraOn ? "2px solid #bb8d4f" : "none",
                        background: cameraOn ? "none " : "red",
                      }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={cameraOn ? iconVideoCamera : iconVideoWhite}
                        style={{ height: "auto", width: "30px" }}
                      />
                    </div>
                  </button>
                )}
              </div>

              <div>
                <button className="btn" onClick={handleSessionEndClick}>
                  <div
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      background: "red",
                      border: "none",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={iconHangupPhone}
                      style={{ height: "auto", width: "30px" }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className={`slideContainer ${isShown ? "active" : ""}`}>
            <div className="col-lg-4 w-100 h-100">
              <div className=" p-0 w-100">
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "5px",
                    background: "",
                  }}
                  className="d-flex flex-column justify-content-center align-items-center gap-3 w-100"
                >
                  <ReusablePageScrollEncloser variableHeight={"100%"}>
                    <div style={{ width: "100%", height: "100%" }}>
                      <ReusableDisplay
                        secondIconExplanationText={sessionDetails?.orderId}
                        interactionType={sessionDetails?.serviceType}
                        firstIconExplanationText={sessionDetails?.clientName}
                        thirdIconExplanationText={sessionDetails?.date}
                        fourthIconExplanationText={sessionDetails?.time}
                        title={sessionDetails?.title}
                        description={sessionDetails?.description}
                        attachments={sessionDetails?.attachments}
                        lawyerNotes={sessionDetails?.LawyerNotes}
                      />
                    </div>

                    <div className="d-flex flex-row justify-content-center align-items-end w-100 h-100">
                      {/* <ReusableTextButton
                  buttonName={"End session"}
                  backgroundColor={colors.primaryColor}
                  color={"white"}
                  onClick={() => setEndPopper(true)}
                /> */}
                      <div></div>
                    </div>
                  </ReusablePageScrollEncloser>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {serviceName == "audio" && (
        <div className="d-flex flex-row w-100 h-100">
          <div className="col-lg-8">
            <div className="h-100">
              <div
                className="d-flex justify-content-center align-items-center  w-100"
                style={{ height: "90%" }}
              >
                <div
                  className="d-flex flex-column gap-3 justify-content-center align-items-center"
                  style={{ height: "100%", width: "100%" }}
                >
                  {remoteUsers?.map((user) => (
                    <div
                      key={user.uid}
                      style={{
                        height: "200px",
                        width: "200px",
                        position: "relative",
                      }}
                    >
                      <RemoteUser
                        className={userActiveMic ? "animatingClass" : ""}
                        user={user}
                        style={{
                          borderRadius: "50%",
                          background: colors.primaryColorLighterShade,
                        }}
                      />
                      <img
                        src={clientType == 1 ? iconIndividual : iconInstitution}
                        alt="Avatar"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          borderRadius: "50%",
                          width: "60%",
                          height: "auto",
                        }}
                      />
                    </div>
                  ))}

                  <p className="m-0" style={{ fontSize: "20px" }}>
                    {clientName}
                  </p>
                </div>

                <div
                  className="d-flex flex-column gap-3 justify-content-center align-items-center"
                  style={{ height: "100%", width: "100%" }}
                >
                  <div
                    style={{
                      height: "200px",
                      width: "200px",
                      position: "relative",
                    }}
                  >
                    <LocalUser
                      className={
                        lawyerVolumeLevel > 0.3 ? "animatingClass" : ""
                      }
                      audioTrack={localMicrophoneTrack}
                      videoTrack={localCameraTrack}
                      cameraOn={cameraOn}
                      micOn={micOn}
                      playAudio={micOn}
                      playVideo={cameraOn}
                      style={{
                        borderRadius: "50%",
                        background: colors.primaryColorLighterShade,
                      }}
                    />
                    <img
                      src={individualUserDetails?.profileImgURL || avatar}
                      alt="Avatar"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        width: "60%",
                        height: "auto",
                      }}
                    />
                  </div>

                  <p
                    className="m-0"
                    style={{ fontSize: "20px" }}
                  >{`${individualUserDetails?.firstName} ${individualUserDetails?.secondName} ${individualUserDetails?.familyName}`}</p>
                </div>
              </div>

              <div style={{ height: "10%" }}>
                <div id="controlsToolbar">
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <button className="btn" onClick={() => setMic((a) => !a)}>
                      <div
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          border: micOn ? "2px solid #bb8d4f" : "none",
                          background: micOn ? "none" : "red",
                        }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={micOn ? iconMicrophone : iconMicrophoneWhite}
                          style={{ height: "auto", width: "30px" }}
                        />
                      </div>
                    </button>

                    {showCamera && (
                      <button
                        className="btn"
                        onClick={() => setCamera((a) => !a)}
                      >
                        <div
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            border: cameraOn ? "2px solid #bb8d4f" : "none",
                            background: cameraOn ? "none " : "red",
                          }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <img
                            src={cameraOn ? iconVideoCamera : iconVideoWhite}
                            style={{ height: "auto", width: "30px" }}
                          />
                        </div>
                      </button>
                    )}
                  </div>
                  <button className="btn" onClick={handleSessionEndClick}>
                    <div
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                        background: "red",
                        border: "none",
                      }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={iconHangupPhone}
                        style={{ height: "auto", width: "30px" }}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="container-fluid h-100 p-0">
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "5px",
                  background: "",
                }}
                className="d-flex flex-column justify-content-center align-items-center gap-3 "
              >
                <ReusablePageScrollEncloser>
                  <div style={{ width: "100%", height: "100%" }}>
                    <ReusableDisplay
                      secondIconExplanationText={sessionDetails?.orderId}
                      interactionType={sessionDetails?.serviceType}
                      firstIconExplanationText={sessionDetails?.clientName}
                      thirdIconExplanationText={sessionDetails?.date}
                      fourthIconExplanationText={sessionDetails?.time}
                      title={sessionDetails?.title}
                      description={sessionDetails?.description}
                      attachments={sessionDetails?.attachments}
                      lawyerNotes={sessionDetails?.LawyerNotes}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-center align-items-end w-100 h-100">
                    {/* <ReusableTextButton
                  buttonName={"End session"}
                  backgroundColor={colors.primaryColor}
                  color={"white"}
                  onClick={() => setEndPopper(true)}
                /> */}
                    <div></div>
                  </div>
                </ReusablePageScrollEncloser>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
