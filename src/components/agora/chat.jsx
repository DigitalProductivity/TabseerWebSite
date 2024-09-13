import AC from "agora-chat";

import React, { useEffect, useRef, useState } from "react";
import colors from "../../assets/constants/colors";
import "../../../src/components/agora/agora.css";
import ReusableTextButton from "../reusableTextButton";
import { useDispatch, useSelector } from "react-redux";
import {
  chatTokenGenerator,
  fetchSessionDetails,
  orderStatusUpdation,
} from "../../core/reducer/User";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import ReusableDisplay from "../reusableDisplay";
import Loader from "../loaders/loader";
import ReusablePageScrollEncloser from "../reusablePageScrollEncloser";
import ReusableNextTogglePopper from "../nxtMsgPopper/reusableNextTogglePopper";
import { useTranslation } from "react-i18next";
import { iconGreen, iconRed } from "../../assets/images";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [backClickPopper, setBackClickPopper] = useState(false);
  const [connect, setConnect] = useState(true);
  const [endPopper, setEndPopper] = useState(false);

  const [receivedMsgId, setReceivedMsgId] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state?.user?.isLoading);
  const chatTokenGeneratorData = useSelector(
    (state) => state?.user?.chatTokenGeneratorData
  );
  const sessionDetails = useSelector(
    (state) => state.user.fetchSessionDetailsVal
  );
  const orderStatusUpdationCode = useSelector(
    (state) => state?.user?.orderStatusUpdationCode
  );
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [clientOnline, setClientOnline] = useState(false);

  const [shouldAddBeforeUnload, setShouldAddBeforeUnload] = useState(true);
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);

 

  const handleLogoutClick = () => {
    if (sessionDetails) {
      setShouldAddBeforeUnload(false);
      const payload = {
        appointmentId: sessionDetails?.orderId,
        appointmentStatus: 4,
      };

      dispatch(orderStatusUpdation(payload));
    }
  };

  const appKey = "611055565#1233322";

  const conn = new AC.connection({
    appKey: appKey,
    delivery: true,
  });

  conn.addEventHandler("connection&message", {
    onConnected: () => {
      setConnect(false);
      document.getElementById("myButton").addEventListener("click", () => {
        const myMessage = document
          .getElementById("peerMessage")
          .value.toString();

        if (myMessage !== "") {
          const option = {
            chatType: "singleChat",
            type: "txt",
            from: chatTokenGeneratorData?.lawyerUserName,
            to: chatTokenGeneratorData?.clientUserName,
            msg: myMessage,
          };

          const msg = AC.message.create(option);

          conn
            .send(msg)
            .then((res) => {
              const messageElement = document.createElement("li");
              messageElement.className = "alignment";

              const paragraphElement = document.createElement("p");
              paragraphElement.className = "align-right";
              paragraphElement.style.maxWidth = "50%";
              paragraphElement.style.overflowWrap = "break-word";
              paragraphElement.style.background = colors.primaryColor;
              paragraphElement.textContent = myMessage;

              const date = new Date();
              let hours = date.getHours();
              const minutes = date.getMinutes().toString().padStart(2, "0");
              const amPm = hours >= 12 ? "PM" : "AM";
              hours = hours % 12;
              hours = hours ? hours : 12;
              const timeString = hours + ":" + minutes + " " + amPm;
              const timestampElement = document.createElement("div");
              timestampElement.className = "timestamp";
              timestampElement.textContent = timeString;
              timestampElement.style.fontSize = "0.7em";
              timestampElement.style.marginLeft = "10px";
              timestampElement.style.color = "white";

              paragraphElement.appendChild(timestampElement);
              messageElement.appendChild(paragraphElement);

              document
                .getElementById("received-log")
                .appendChild(messageElement);

              setTimeout(function () {
                const receivedLog = document.getElementById("scrollLog");
                receivedLog.scrollTop = receivedLog.scrollHeight;
              }, 5);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      conn
        .getHistoryMessages({
          targetId: chatTokenGeneratorData?.clientUserName,
          chatType: "singleChat",
        })
        .then((response) => {
          if (response.length !== 0) {
            for (let i = response?.messages.length - 1; i >= 0; i--) {
              const message = response.messages[i];

              if (
                message?.from?.toLowerCase() ==
                chatTokenGeneratorData?.clientUserName.toLowerCase()
              ) {
                const messageElement = document.createElement("li");
                messageElement.className = "alignmentTwo";

                const paragraphElement = document.createElement("p");
                paragraphElement.className = "align-left";
                paragraphElement.style.maxWidth = "50%";
                paragraphElement.style.overflowWrap = "break-word";
                paragraphElement.style.background = colors.primaryColor;
                paragraphElement.textContent = message.msg;

                const date = new Date(message.time * 1000);
                let hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, "0");
                const amPm = hours >= 12 ? "PM" : "AM";
                hours = hours % 12;
                hours = hours ? hours : 12;
                const timeString = hours + ":" + minutes + " " + amPm;
                const timestampElement = document.createElement("div");
                timestampElement.className = "timestampReceive";
                timestampElement.textContent = timeString;
                timestampElement.style.fontSize = "0.7em";
                timestampElement.style.marginLeft = "10px";

                timestampElement.style.color = "white";

                paragraphElement.appendChild(timestampElement);
                messageElement.appendChild(paragraphElement);

                document
                  .getElementById("received-log")
                  .appendChild(messageElement);
              }

              setTimeout(function () {
                const receivedLog = document.getElementById("scrollLog");
                receivedLog.scrollTop = receivedLog.scrollHeight;
              }, 5);

              if (
                message?.from?.toLowerCase() ==
                chatTokenGeneratorData?.lawyerUserName?.toLowerCase()
              ) {
                const messageElement = document.createElement("li");
                messageElement.className = "alignment";

                const paragraphElement = document.createElement("p");
                paragraphElement.className = "align-right";
                paragraphElement.style.background = colors.primaryColor;
                paragraphElement.style.overflowWrap = "break-word";
                paragraphElement.style.maxWidth = "50%";
                paragraphElement.textContent = message.msg;

                const date = new Date(message.time * 1000);
                let hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, "0");
                const amPm = hours >= 12 ? "PM" : "AM";
                hours = hours % 12;
                hours = hours ? hours : 12;
                const timeString = hours + ":" + minutes + " " + amPm;
                const timestampElement = document.createElement("div");
                timestampElement.className = "timestamp";
                timestampElement.textContent = timeString;
                timestampElement.style.fontSize = "0.7em";
                timestampElement.style.marginLeft = "10px";
                timestampElement.style.color = "white";

                paragraphElement.appendChild(timestampElement);
                messageElement.appendChild(paragraphElement);

                document
                  .getElementById("received-log")
                  .appendChild(messageElement);
              }

              setTimeout(function () {
                const receivedLog = document.getElementById("scrollLog");
                receivedLog.scrollTop = receivedLog.scrollHeight;
              }, 5);
            }
          }
        })
        .catch((error) => {
          console.log("Failed to retrieve history messages:", error);
        });

        let valueInLowerCase=chatTokenGeneratorData?.clientUserName?.toLowerCase()

      let option = {
        usernames: [valueInLowerCase],
      };
      conn.subscribePresence(option).then((res) => {
        console.log(res);
      });
    },

    onTextMessage: (message) => {
      if (message) {
        if (message.from == chatTokenGeneratorData?.lawyerUserName) {
          console.log("sents", message);
        } else {
          setReceivedMessage(message.msg);
          setReceivedMsgId(message.id);
        }
      }
    },

    onTokenExpired: (params) => {
      console.log("token gone", params);
    },

    onMultiDeviceEvent: (message) => {
      console.log(message);
    },

    onOffline: () => {
      console.log("offline");
    },

    onError: (error) => {
      console.log(conn);

      if (conn.logOut == true) {
        conn.close();
      }
    },
  });

  conn.addEventHandler("MESSAGES", {
    onPresenceStatusChange: (msg) => {
      msg.forEach((obj) => {
        const status = obj.statusDetails;
        const userId = obj.userId.toLowerCase();

        if (chatTokenGeneratorData?.clientUserName?.toLowerCase() == userId) {
          status.forEach((statusObj) => {
            const statusVal = statusObj.status;
            if (statusVal == 1) {
              setClientOnline(true);
            } else if (statusVal == 0) {
              setClientOnline(false);
            }
          });
        }
      });
    },
  });

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length,
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  useEffect(() => {
    if (receivedMessage) {
      const messageElement = document.createElement("li");
      messageElement.className = "alignmentTwo";

      const paragraphElement = document.createElement("p");
      paragraphElement.className = "align-left";
      paragraphElement.style.background = colors.primaryColor;
      paragraphElement.textContent = receivedMessage;

      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeString = hours + ":" + minutes + " " + amPm;
      const timestampElement = document.createElement("div");
      timestampElement.className = "timestampReceive";
      timestampElement.textContent = timeString;
      timestampElement.style.fontSize = "0.7em";
      timestampElement.style.marginLeft = "10px";

      paragraphElement.appendChild(timestampElement);
      messageElement.appendChild(paragraphElement);

      document.getElementById("received-log").appendChild(messageElement);

      setTimeout(function () {
        const receivedLog = document.getElementById("scrollLog");
        receivedLog.scrollTop = receivedLog.scrollHeight;
      }, 5);
    }
  }, [receivedMsgId]);

  useEffect(() => {

    if (orderStatusUpdationCode?.status?.code == 1000) {
      setConnect(true);
      
      conn.close();
      
      navigate("/requests");
      window.location.reload();
     
      
    }

    if(orderStatusUpdationCode?.status?.code !== 1000){

      setShouldAddBeforeUnload(true);

    }

  }, [orderStatusUpdationCode]);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
    shouldAddBeforeUnload &&
      currentLocation.pathname !== nextLocation.pathname
  );


  useEffect(() => {
    if (!shouldAddBeforeUnload){
      
      return  

    } else{

      const handleBeforeUnload = (event) => {
          event.preventDefault();
          const confirmationMessage = "Are you sure you want to reload? Your chat data may not be saved!";
          event.returnValue = confirmationMessage;
          return confirmationMessage;
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
          
      };
    }


}, [shouldAddBeforeUnload]);

  useEffect(() => {
    const checkConnection = () => {
      const status = conn.isOpened();
      setIsConnectionOpen(status);
    };
    const interval = setInterval(checkConnection, 1000);
    return () => clearInterval(interval);
  }, []);



 



  useEffect(() => {
    if (chatTokenGeneratorData) {
      conn.open({
        user: chatTokenGeneratorData?.lawyerUserName,
        agoraToken: chatTokenGeneratorData?.userAppToken,
      });
    }
  }, [chatTokenGeneratorData]);

  useEffect(() => {
    const payload = {
      appointmentId: id,
    };

    dispatch(chatTokenGenerator(payload));
    dispatch(fetchSessionDetails({ orderId: id }));
  }, []);

  return (
    <div className="d-flex flex-row w-100 h-100">
      <div className="col-lg-8">
        <div
          style={{
            height: "90vh",
            paddingBottom: "20px",
            width: "100%",
            borderRadius: "5px",
          }}
          className="d-flex flex-column justify-content-end"
        >
          <div
            style={{ maxHeight: "90%", overflow: "auto" }}
            className={`container-fluid d-flex flex-column gap-3 `}
            id="scrollLog"
          >
            <ul
              className="d-flex flex-column gap-2 justify-content-end "
              style={{ paddingLeft: "0px" }}
              id="received-log"
            ></ul>
          </div>

          <div style={{ height: "10%", padding: "10px" }} className="w-100">
            <form
              onSubmit={handleMessageSubmit}
              style={{ width: "100%" }}
              className="d-flex flex-row"
            >
              <div style={{ width: "100%", position: "relative" }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  id="peerMessage"
                  placeholder="Write something"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "5px",
                    paddingRight: "90px", 
                  }}
                />
                <button
                  id="myButton"
                  style={{
                    position: "absolute",
                    right: "5px", 
                    top: "5px", 
                    height: "40px", 
                    border: `2px solid ${colors.primaryColorLighterShade}`,
                    background: "none",
                    color: colors.primaryColor,
                    borderRadius: "5px",
                  }}
                >
                  Send
                </button>
              </div>
            </form>
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
            className="d-flex flex-column justify-content-center align-items-center gap-3 container-fluid"
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
                  onlineStatusImage={clientOnline ? iconGreen : iconRed}
                  fifthIconExplanationText={clientOnline ? "Online" : "Offline"}
                />
              </div>

              <div className="d-flex flex-row justify-content-center align-items-end w-100 h-100">
                <ReusableTextButton
                  buttonName={"End session"}
                  backgroundColor={colors.primaryColor}
                  color={"white"}
                  onClick={() => setEndPopper(true)}
                />
              </div>
            </ReusablePageScrollEncloser>
          </div>
        </div>
      </div>

      {connect && <Loader />}
      {endPopper && (
        <ReusableNextTogglePopper
          message={"Are you sure you want to end the session"}
          buttonOneName={t("Cancel")}
          buttonTwoName={t("Confirm")}
          buttonOneClick={() => setEndPopper(false)}
          buttonTwoClick={handleLogoutClick}
          buttonWidth={"30%"}
        />
      )}
      {blocker.state === "blocked" ? (
        <ReusableNextTogglePopper
          message={"Are you sure you want to leave the session"}
          buttonOneName={t("Cancel")}
          buttonTwoName={t("Confirm")}
          buttonOneClick={() => blocker.reset()}
          buttonTwoClick={handleLogoutClick}
          buttonWidth={"30%"}
        />
      ):null}
    </div>
  );
};

export default ChatInterface;
