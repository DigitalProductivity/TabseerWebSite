import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import colors from "../assets/constants/colors";

const ReusableDropdown = (props) => {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    const isRTL = i18n.dir() == "rtl";
    setIsRTL(isRTL);
  }, [i18n.dir()]);

  return (
    <div className="d-flex flex-column gap-2 w-100">
      <p
        className="m-0"
        style={{
          fontSize: props.labelFontSize || "15px",
          color: props.color || "black",
        }}
      >
        {props.labelName}
      </p>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue || ""}
        rules={props.rules}
        render={({ field, fieldState, formState }) => (
          <div style={{ position: "relative", width: "100%" }}>
            <select
              {...field}
              style={{
                width: props.selectWidth||"100%",
                height: props.selectHeight || "45px",
                border: `2px solid ${colors.secondaryColorLighterShade}`,
                borderRadius: "5px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              <option value="" disabled hidden>
                {t("PleaseSelectOption")}
              </option>
              {props.mappingOptionValues?.map((option, index) => (
                <option
                  key={index}
                  value={
                    option?.sectorId ||
                    option?.sessionPeriodId ||
                    option?.radioButtonMapId||
                    option?.sessionMappingValueId ||
                    option?.noonId ||
                    option?.date ||
                    option?.consultationId ||
                    option?.availabilityStatusValue ||
                    option?.timeId ||
                    option?.value ||
                    option?.languageId ||
                    option?.problemId ||
                    option?.orderStatus ||
                    option?.paymentId ||
                    option?.serviceTypeValue ||
                    option?.clientUuid ||
                    option?.genderValue ||
                    option?.serviceId ||
                    option
                  }
                >
                  {option?.sectorName ||
                    option?.sessionPeriodName ||
                    option?.sessionMappingValue ||
                    option?.radioButtonMapId||
                    option?.date ||
                    option?.noonName ||
                    option?.availabilityValue ||
                    option?.consultationName ||
                    option?.timeValue ||
                    option?.option ||
                    option?.language ||
                    option?.problem ||
                    option?.orderName ||
                    option?.paymentName ||
                    option?.serviceType ||
                    option?.name ||
                    option?.label ||
                    option?.serviceName ||
                    option}
                </option>
              ))}
            </select>
            {field.value && (
              <button
                onClick={() => {
                  field.onChange({ target: { value: "", name: field.name } });
                }}
                style={{
                  position: "absolute",
                  top: "33%",
                  right: isRTL ? "" : "25px",
                  left: isRTL ? "25px" : "",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "10px",
                }}
              >
                &#x2715;
              </button>
            )}
          </div>
        )}
        disabled={props.isDisabled || false}
      />
    </div>
  );
};

export default ReusableDropdown;
