import React, { useContext, useEffect, useRef } from "react";
import { SRLWrapper } from "simple-react-lightbox";
import {
  Avatar,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  LinearProgress,
} from "@mui/material";
import { AllMediaStyled } from "./AllMediaStyed";
import { UserContext } from "../../context/userContext";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
const AllMedia = () => {
  const {
    getAllUsers,
    userState: { users, userLoading },
  } = useContext(UserContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  //ref for warning missing dependency
  const ref = useRef();
  ref.current = getAllUsers;
  useEffect(() => ref.current(), []);
  if (userLoading)
    return (
      <Box sx={{ width: "100%" }} style={{ padding: "20px" }}>
        <LinearProgress />
      </Box>
    );
  else
    return (
      <AllMediaStyled>
        <SRLWrapper>
          <Box className="title">
            <p>(Mọi người)</p>
          </Box>
          <ImageList cols={4} gap={10} rowHeight="auto">
            {users.map((userMap) => (
              <ImageListItem className="card-author" key={userMap?._id}>
                <img
                  src={
                    userMap?.coverPicture
                      ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${userMap?.coverPicture}`
                      : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/nocover2.jpg`
                  }
                  className="card-author__img"
                  alt="imagepost"
                />
                <ImageListItemBar
                  title={
                    <Box className="flex-around">
                      <div className="card-author__box">
                        <Avatar
                          src={
                            userMap?.profilePicture
                              ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${userMap?.profilePicture}`
                              : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                          }
                        />
                        <div className="card-author__box-info">
                          <p>{userMap?.username}</p>
                          <small>{userMap?.followers.length} followers</small>
                        </div>
                      </div>
                      {userMap?.followers.includes(user?._id) ? (
                        <Link to={`/profile/${userMap?._id}`}>
                          <Button
                            className="flex-around__btn"
                            variant="contained"
                            color="success"
                          >
                            Đã Follow
                          </Button>
                        </Link>
                      ) : (
                        <Link to={`/profile/${userMap?._id}`}>
                          {userMap?._id === user?._id ? (
                            ""
                          ) : (
                            <Button
                              className="flex-around__btn"
                              variant="contained"
                              color="error"
                            >
                              Chưa Follow
                            </Button>
                          )}
                        </Link>
                      )}
                    </Box>
                  }
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </SRLWrapper>
      </AllMediaStyled>
    );
};

export default AllMedia;
