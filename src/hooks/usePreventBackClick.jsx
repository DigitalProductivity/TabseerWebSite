import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePreventBack = (setBackClickPopper) => {
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      if (typeof setBackClickPopper == "function") {
        setBackClickPopper(true);
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [ location]);
};

export default usePreventBack;
