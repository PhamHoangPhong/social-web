import React, { useContext, useState } from "react";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ggIcon from "../../asset/img/icon-gg.png";
import fbIcon from "../../asset/img/icon-fb.png";
import { BsEnvelope, BsLock } from "react-icons/bs";
import { AuthContext } from "../../context/authContext";
import AlertMessage from "../AlertMessage";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const onHandleLogin = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };
  const onSubmitLogin = async (event) => {
    event.preventDefault();
    const response = await login({ email, password });
    if (!response.success) {
      setAlert({ severity: "error", content: response.message });
      setTimeout(() => {
        setAlert(null)
      }, 3000);
    } else window.location.reload();
    setInputValue({
      email: "",
      password: "",
    });
    
  };
  return (
    <>
      <Box>
        <Typography className="auth-left__header" variant="h4">
          Đăng nhập <br /> tài khoản của bạn
        </Typography>
        <form className="auth-left__form" onSubmit={onSubmitLogin}>
          <AlertMessage info={alert} />
          <TextField
            id="outlined-start-adornment"
            label="Email"
            variant="outlined"
            className="auth-left__form-input"
            type="text"
            name="email"
            onChange={onHandleLogin}
            value={email}
            InputProps={{
              endAdornment: (
                <BsEnvelope className="auth-left__form-icon iconSize" />
              ),
            }}
          />
          <TextField
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            className="auth-left__form-input"
            type="password"
            name="password"
            value={password}
            onChange={onHandleLogin}
            InputProps={{
              endAdornment: (
                <BsLock className="auth-left__form-icon iconSize" />
              ),
            }}
          />
          <Button type="submit" className="auth-left__form-btn" variant="contained">
            Đăng nhập
          </Button>
        </form>
        <p className="auth-left__text">
          Bạn không có tài khoản?
          <Link
            to="/register"
            style={{
              marginLeft: "5px",
              color: "var(--color-primary)",
              fontWeight: "bold",
            }}
          >
            <span variant="text">Đăng ký</span>
          </Link>
        </p>
      </Box>
      <Box className="auth-left__footer">
        <p>Hoặc, Đăng nhập với tài khoản mạng xã hội</p>
        <Button
          startIcon={<img src={ggIcon} width={40} height={40} alt="ggIcon" />}
          className="auth-left__footer-btn"
          style={{
            background: "var(--color-primary)",
            position: "relative",
          }}
          variant="contained"
        >
          Đăng nhập với Google
        </Button>
        <Button
          startIcon={<img src={fbIcon} width={40} height={40} alt="fbIcon" />}
          className="auth-left__footer-btn"
          style={{ background: "var(--color-info)" }}
          variant="contained"
        >
          Đăng nhập với Facebook
        </Button>
      </Box>
    </>
  );
};

export default Login;
