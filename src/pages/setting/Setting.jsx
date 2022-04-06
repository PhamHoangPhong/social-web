import {
  Avatar,
  FormControl,
  Grid,
  Select,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsGear, BsCamera } from "react-icons/bs";
import { WrapperSettingStyled } from "./SettingStyled";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
const Input = styled("input")({
  display: "none",
});
const Setting = () => {
  const {
    authState: { user },
    updateUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dataUpdate, setDataUpdate] = useState({
    username: "",
    homeTown: "",
    relationship: "",
    desc: "",
  });
  const { username, homeTown, relationship, desc } = dataUpdate;
  const [alert, setAlert] = useState(null)

  const onHandleUpdate = (e) => {
    setDataUpdate({ ...dataUpdate, [e.target.name]: e.target.value });
  };
  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    const usernameUpdate = username ? username : user?.username
    const descUpdate = desc ? desc : user?.desc
    const homeTownUpdate = homeTown ? homeTown : user?.homeTown
    const relationshipUpdate = relationship ? relationship : user?.relationship
    const data = {
      username: usernameUpdate,
      desc: descUpdate,
      homeTown: homeTownUpdate,
      relationship: parseInt(relationshipUpdate),
    };
    const response = await updateUser({ id: user?._id, data });
    setDataUpdate({
      username: "",
      homeTown: "",
      relationship: "",
      desc: "",
    });
    if (response.success) {
      setAlert({ severity: "success", content: response.message });
      setTimeout(() => {
        setAlert(null);
        navigate(`/profile/${user?._id}/about`);
      }, 2000)
    }
  };
  return (
    <WrapperSettingStyled>
      <AlertMessage info={alert} />
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          sx={{ display: { sm: "none", md: "block" } }}
        ></Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box className="setting-box">
            <Box className="setting-box__title">
              <BsGear style={{ fontSize: "23px", color: "var(--bg-box)" }} />
              <p>Account Details</p>
            </Box>
            <Box className="setting-box__body">
              <Box className="setting-box__body-info">
                <label
                  htmlFor="icon-button-file"
                  className="setting-box__body-info--uploadbtn"
                >
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    style={{ background: "var(--color-primary-light)" }}
                  >
                    <BsCamera style={{ color: "var(--bg-box)" }} />
                  </IconButton>
                </label>
                <Avatar
                  src={
                    user?.profilePicture
                      ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                      : ""
                  }
                  sx={{ width: 120, height: 120 }}
                />
                <p>{user?.username}</p>
                <small>{user?.email}</small>
              </Box>
              <FormControl className="setting-box__body-form" fullWidth>
                <form onSubmit={onSubmitUpdate}>
                  <div>
                    <TextField
                      className="setting-box__body-form--input"
                      label="Tên người dùng"
                      variant="outlined"
                      name="username"
                      value={username}
                      onChange={onHandleUpdate}
                    />
                    <TextField
                      className="setting-box__body-form--input"
                      label="Quê quán"
                      variant="outlined"
                      name="homeTown"
                      value={homeTown}
                      onChange={onHandleUpdate}
                    />
                  </div>
                  <div>
                    <Select
                      className="setting-box__body-form--input"
                      value={relationship}
                      label="Giới tính"
                      name="relationship"
                      onChange={onHandleUpdate}
                      inputProps={{ "aria-label": "Without label" }}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Chọn giới tính</em>
                      </MenuItem>
                      <MenuItem value={0}>Nam</MenuItem>
                      <MenuItem value={1}>Nữ</MenuItem>
                    </Select>
                    <TextField
                      className="setting-box__body-form--input"
                      label="Mô tả"
                      variant="outlined"
                      value={desc}
                      name="desc"
                      onChange={onHandleUpdate}
                    />
                  </div>
                  <div className="setting-box__body-form--btn">
                    <Button
                      type="submit"
                      style={{ height: "50px" }}
                      variant="contained"
                    >
                      Lưu thông tin
                    </Button>
                  </div>
                </form>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          sx={{ display: { sm: "none", md: "block" } }}
        ></Grid>
      </Grid>
    </WrapperSettingStyled>
  );
};

export default Setting;
