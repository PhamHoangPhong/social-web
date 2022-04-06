import { Grid, Box, Avatar, Button } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { BsPersonPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { FriendStyled } from "./FriendStyled";
import Loading from "../../loading/Loading";
const Followings = () => {
  const { id } = useParams();
  const {
    userState: { userFollowings, userLoading },
    getUserFollowings,
  } = useContext(UserContext);

  //ref for warning missing dependency getUserFollowings
  const ref = useRef();
  ref.current = getUserFollowings;
  useEffect(() => ref.current(id), [id]);

  if (userLoading) return <Loading />;
  else
    return (
      <FriendStyled>
        <Box className="friends__header">
          <p>Followings (112k)</p>
        </Box>
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: "20px" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}
          >
            {userFollowings.map((user) => {
              return (
                <Grid item xs={2} sm={3} md={3} key={user._id}>
                  <Box className="friends__info">
                    <Avatar
                      alt="user"
                      src={
                        user?.profilePicture
                          ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                          : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                      }
                      sx={{ width: 76, height: 76 }}
                    />
                    <div className="friends__info-name">
                      <p>{user?.username}</p>
                      <small>{user?.email}</small>
                    </div>
                    <Link to={`/profile/${user?._id}`}>
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
    );
};

export default Followings;
