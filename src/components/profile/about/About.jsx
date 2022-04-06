import React, { useContext } from "react";
import {
  BsGenderFemale,
  BsPinMapFill,
  BsPersonCheck,
  BsPersonPlus,
} from "react-icons/bs";
import { Box, Divider } from "@mui/material";
import { AboutStyled } from "./AboutStyled";
import { UserContext } from "../../../context/userContext";
const About = () => {
  const {userState: {userSelected}} = useContext(UserContext)
  const returnRelationship = (data) => {
    if (data === 0) {
      return "Nam"
    } else if (data === 1) return "Nữ"
  }
  return (
    <AboutStyled>
      <Box className="profile__body-desc">
        <Box className="profile__body-desc--header">
          <p className="p-style" style={{marginBottom: '15px'}}>Mô tả</p>
          <small className="small-style">
            {userSelected?.desc ? userSelected?.desc : 'Chưa cập nhật thông tin cá nhân'}
          </small>
        </Box>
        <Divider style={{ marginBottom: "10px" }} />
        <Box className="profile__body-desc--info">
          <BsGenderFemale
            style={{ fontSize: "22px", color: "var(--color-gray-shade)" }}
          />
          <div className="profile__body-desc--info-ml">
            <p className="p-style">Giới tính</p>
            <small className="small-style">{userSelected?.relationship ? returnRelationship(userSelected.relationship) : 'Chưa xác định'}</small>
          </div>
        </Box>
        <Box className="profile__body-desc--info">
          <BsPinMapFill
            style={{ fontSize: "22px", color: "var(--color-gray-shade)" }}
          />
          <div className="profile__body-desc--info-ml">
            <p className="p-style">Quê quán</p>
            <small className="small-style">
              {userSelected?.homeTown ? userSelected.homeTown : 'Chưa xác định'}
            </small>
          </div>
        </Box>
        <Box className="profile__body-desc--info">
          <BsPersonCheck
            style={{ fontSize: "22px", color: "var(--color-gray-shade)" }}
          />
          <div className="profile__body-desc--info-ml">
            <p className="p-style">Đang theo dõi</p>
            <small className="small-style">{userSelected?.followers.length} followers</small>
          </div>
        </Box>
        <Box className="profile__body-desc--info">
          <BsPersonPlus
            style={{ fontSize: "22px", color: "var(--color-gray-shade)" }}
          />
          <div className="profile__body-desc--info-ml">
            <p className="p-style">Theo dõi</p>
            <small className="small-style">{userSelected?.following.length} followings</small>
          </div>
        </Box>
      </Box>
    </AboutStyled>
  );
};

export default About;
