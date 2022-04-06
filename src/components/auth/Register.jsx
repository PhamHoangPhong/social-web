import React, { useContext, useState } from "react";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { BsEnvelope, BsLock, BsPersonCircle } from "react-icons/bs";
import { AuthContext } from "../../context/authContext";
import AlertMessage from "../AlertMessage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = inputValue;
  const onHandleRegister = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    const data = {
      username,
      email,
      password
    }
    if (password !== confirmPassword) {
      setAlert({ severity: "error", content: "Password của bạn không khớp" });
    } else {
      const response = await register(data);
      try {
        if (!response.success) {
          setAlert({ severity: "error", content: response.message });
          setTimeout(() => setAlert(null), 3000);
        } else {
          setAlert({ severity: "success", content: response.message });
          setTimeout(() => {
            setAlert(null);
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setInputValue({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <Box>
      <Typography className="auth-left__header" variant="h4">
        Tạo ngay <br /> tài khoản của bạn
      </Typography>
      <form className="auth-left__form" onSubmit={onSubmitRegister}>
        <AlertMessage info={alert} />
        <TextField
          id="outlined-start-adornment"
          type="text"
          label="Tên người dùng"
          name="username"
          variant="outlined"
          className="auth-left__form-input"
          onChange={onHandleRegister}
          value={username}
          InputProps={{
            endAdornment: <BsPersonCircle className="auth-left__form-icon" />,
          }}
        />
        <TextField
          id="outlined-start-adornment"
          type="text"
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          className="auth-left__form-input"
          onChange={onHandleRegister}
          InputProps={{
            endAdornment: (
              <BsEnvelope className="auth-left__form-icon iconSize" />
            ),
          }}
        />
        <TextField
          name="password"
          type="password"
          id="outlined-basic"
          label="Mật khẩu"
          variant="outlined"
          className="auth-left__form-input"
          value={password}
          onChange={onHandleRegister}
          InputProps={{
            endAdornment: <BsLock className="auth-left__form-icon iconSize" />,
          }}
        />
        <TextField
          type="password"
          name="confirmPassword"
          id="outlined-basic"
          label="Nhập lại mật khẩu"
          variant="outlined"
          value={confirmPassword}
          className="auth-left__form-input"
          onChange={onHandleRegister}
          InputProps={{
            endAdornment: <BsLock className="auth-left__form-icon iconSize" />,
          }}
        />
        <Button
          type="submit"
          className="auth-left__form-btn"
          variant="contained"
        >
          Đăng ký
        </Button>
      </form>
      <p className="auth-left__text">
        Bạn đã có tài khoản?
        <Link
          to="/login"
          style={{
            marginLeft: "5px",
            color: "var(--color-primary)",
            fontWeight: "bold",
          }}
        >
          <span variant="text">Đăng nhập</span>
        </Link>
      </p>
    </Box>
  );
};

export default Register;
