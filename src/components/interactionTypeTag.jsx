import React from "react";
import { iconChat, iconNullData, iconPhone, iconVideoChat } from "../assets/images";
import { useTranslation } from "react-i18next";


function InteractionTypeTag(props) {
  let iconSrc;
  let content;
  let height = "20px";
  let width = "20px";

  const {t}=useTranslation();

    switch(props.interactionType){

      case 1:
        iconSrc = iconChat;
        content = t("Chat");
      break;

      case 3:
        iconSrc = iconVideoChat;
        content = t("VideoCall");
      break;

      case 2:
        iconSrc = iconPhone;
        content = t("AudioCall");
      break;

      case 0:
        iconSrc=iconNullData;
        content=t("NoData");
        break;

    }
  

  
  return (
    <div>
      

        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center">
            <img src={iconSrc} style={{ height: "auto", width:props.interactionTypeIconWidth || "40px" }} />
          </div>

          <p style={{ fontSize:props.fontSize || "15px", margin: 0 }}>{content}</p>
        </div>


 
      
      
    </div>
  );
}

export default InteractionTypeTag;
