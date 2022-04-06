import React, { useContext, useEffect, useRef } from "react";
import { Grid, Box, LinearProgress } from "@mui/material";
import friendImg from "../../asset/img/friend.jpg";
import HighlightUser from "../../pages/home/HighlightUser";
import { BsFillBrightnessAltHighFill } from "react-icons/bs";
import { UserContext } from "../../context/userContext";
const RightBar = () => {
  const {
    getAllUsers,
    userState: { users, userLoading },
  } = useContext(UserContext);
  //ref for warning missing dependency
  const ref = useRef();
  ref.current = getAllUsers;
  useEffect(() => ref.current(), []);
  return (
    <>
      <Box className="leftbar__title">
        <BsFillBrightnessAltHighFill
          style={{ color: "var(--color-warning)", fontSize: "35px" }}
        />
        <p style={{ marginLeft: "10px", marginTop: "4px" }}>
          Kết nối, cùng nhau trải nghiệm
        </p>
      </Box>
      <Box className="leftbar__header">
        <p>Experience</p>
        <img className="leftbar__header-img" src={friendImg} alt="friend img" />
      </Box>
      <Box className="leftbar__title">
        <p>NGƯỜI DÙNG NỔI BẬT</p>
      </Box>
      <Grid style={{ marginTop: "10px" }} container spacing={1}>
        {userLoading ? (
          <Box sx={{ width: "100%" }} style={{ padding: "20px" }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            {users.map((user, index) => {
              if (index <= 3) {
                return <HighlightUser user={user} key={user?._id} />
              } else return ''
            })}
          </>
        )}
      </Grid>
    </>
  );
};

export default RightBar;
