import { Grid, Button, Box, Avatar } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { FriendStyled } from "../../components/profile/friends/FriendStyled";
import { UserContext } from "../../context/userContext";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
const UnfollowingFriend = () => {
  const {
    userState: { userUnfollowings, userLoading },
    getUserUnfollowings,
  } = useContext(UserContext);
  const {authState: {user}} = useContext(AuthContext)
  //ref for warning missing dependency getUserFollowings
  const ref = useRef();
  ref.current = getUserUnfollowings;
  useEffect(() => ref.current(), []);
  if (userLoading) return <Loading />;
  else
    return (
      <div
        style={{
          marginTop: "56px",
          padding: "20px 35px",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <FriendStyled>
          <Box className="friends__header">
            <p>Bạn có thể biết</p>
          </Box>
          <Box sx={{ flexGrow: 1 }} style={{ marginTop: "20px" }}>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
            >
              {userUnfollowings.filter(u => u._id !== user._id).map((userMap) => {
                return (
                  <Grid item xs={2} sm={3} md={3} key={userMap?._id}>
                    <Box className="friends__info">
                      <Avatar
                        alt="user"
                        src={
                          userMap?.profilePicture
                            ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${userMap?.profilePicture}`
                            : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                        }
                        sx={{ width: 76, height: 76 }}
                      />
                      <div className="friends__info-name">
                        <p>{userMap?.username}</p>
                        <small>{userMap?.email}</small>
                      </div>
                      <Link to={`/profile/${userMap?._id}`}>
                        <Button
                          className="friends__info-btn"
                          startIcon={<BsPersonPlus />}
                          variant="contained"
                        >
                          Truy cập
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </FriendStyled>
      </div>
    );
};

export default UnfollowingFriend;
