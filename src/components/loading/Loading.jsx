import React, {useEffect, useContext} from "react";
import lottie from "lottie-web";
import loadingJson from "../../asset/json/loading.json";
import { AuthContext } from "../../context/authContext";
import { LoadingStyled } from "./LoadingStyled";
const Loading = () => {
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    if (authState.isLoading) {
      lottie.loadAnimation({
        container: document.querySelector("#loading-icon"),
        animationData: loadingJson,
        loop: true,
      });
    }
    return () => lottie.destroy();
  }, [authState.isLoading]);
  return <LoadingStyled className="loading" id="loading-icon"></LoadingStyled>;
};

export default Loading;
