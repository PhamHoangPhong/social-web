import React, { useContext, useState } from "react";
import {
  BsPersonCheck,
  BsMessenger,
  BsGear,
  BsArrowDownCircle,
} from "react-icons/bs";
import { CircularProgress, Grid, IconButton } from "@mui/material";
import CreatePost from "../../components/createpost/CreatePost";
import RightBar from "../../components/rightbar/RightBar";
import { WrapperHomeStyled } from "./HomeStyled";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../context/authContext";
import { PostContext } from "../../context/postContext";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Home = () => {
  const socket = useOutletContext();
  const [page, setPage] = useState(2);
  const [isLoadedAll, setIsLoadedAll] = useState(false);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    getPostTimeLine,
    postState: { postLoading },
  } = useContext(PostContext);
  const {userState: {userOnline}} = useContext(UserContext)

  const settingListIcon = [
    {
      id: "1",
      name: "Bạn bè",
      title: "112 following",
      path: `/profile/${user?._id}/following`,
      icon: <BsPersonCheck />,
    },
    {
      id: "2",
      name: "Tin nhắn",
      title: "",
      path: "/message",
      icon: <BsMessenger />,
    },
    {
      id: "3",
      name: "Cài đặt",
      title: "",
      path: "/setting",
      icon: <BsGear />,
    },
  ];
  const onLoadMore = async () => {
    const response = await getPostTimeLine({ page });
    if (response.posts.length === 0) setIsLoadedAll(true);
    setPage((prev) => prev + 1);
  };
  return (
    <WrapperHomeStyled>
      <Grid container spacing={3}>
        <Grid
          className="rightbar"
          item
          xs={12}
          md={3}
          sm={12}
          lg={3}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Sidebar settingListIcon={settingListIcon} userOnline={userOnline} />
        </Grid>
        <Grid item xs={12} md={3} sm={12} lg={3}></Grid>
        <Grid className="midbar" item xs={12} md={6} sm={12} lg={6}>
          <CreatePost />
          <Feed socket={socket} />
          <div className="load-more">
            {!isLoadedAll ? (
              !postLoading ? (
                <IconButton onClick={onLoadMore}>
                  <BsArrowDownCircle />
                </IconButton>
              ) : (
                <CircularProgress />
              )
            ) : (
              <p>Follow để xem nhiều hơn nhé!</p>
            )}
          </div>
        </Grid>
        <Grid
          className="leftbar"
          item
          xs={12}
          md={3}
          sm={12}
          lg={3}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <RightBar />
        </Grid>
      </Grid>
    </WrapperHomeStyled>
  );
};

export default Home;
