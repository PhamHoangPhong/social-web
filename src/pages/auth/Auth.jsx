import React, { useContext } from "react";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import logo from "../../asset/img/logo.png";
import authBgr from "../../asset/img/login-bg4.png";
import { WrapperAuthStyled } from "./AuthStyled";
import { AuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Auth = ({ authRoute }) => {
  const { authState } = useContext(AuthContext);
  
  let authentication = (
    <>
      {authRoute === "login" && <Login />}
      {authRoute === "register" && <Register />}
    </>
  );
  let body;
  if (authState.isLoading) {
    body = <Loading />;
  } else if (authState.isAuthenticated) {
    return <Navigate to="/" />;
  } else
    body = (
      <Grid className="auth" container spacing={0}>
        <Grid
          className="auth-right"
          item
          xs={12}
          md={5}
          sm={12}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Box className="auth-right__logo">
            <img src={logo} width={70} height={70} alt="logo" />
            <p>kiba.</p>
          </Box>
          <img
            className="auth-right__bgr"
            width={400}
            height={400}
            src={authBgr}
            alt="auth-background"
          />
        </Grid>
        <Grid
          className="auth-left"
          item
          xs={12}
          md={7}
          sm={12}
          justifyContent="center"
          alignItems="center"
        >
          <Box style={{ width: "350px" }}>{authentication}</Box>
        </Grid>
      </Grid>
    );

  return <WrapperAuthStyled>
    {body}
  </WrapperAuthStyled>;
};

export default Auth;
