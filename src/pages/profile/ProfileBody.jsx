import React, { useContext, useState } from "react";
import {
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  BsArrowDownCircle,
} from "react-icons/bs";
import CreatePost from "../../components/createpost/CreatePost";
import Feed from "../../components/feed/Feed";
import About from "../../components/profile/about/About";
import { PostContext } from "../../context/postContext";
const ProfileBody = ({ idparam, userId, socket }) => {
    const [page, setPage] = useState(2);
    const [isLoadedAll, setIsLoadedAll] = useState(false);
    const {getPostByUser, postState: {postLoading}} = useContext(PostContext)
    const onLoadMore = async () => {
      const response = await getPostByUser({id: idparam, page });
      if (response.posts.length === 0) setIsLoadedAll(true);
      setPage(prev => prev + 1);
    };
    return (
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <About />
        </Grid>
        <Grid item xs={12} sm={12} md={8} style={{ paddingTop: 0 }}>
          {/* return form create post if profile is current user */}.
          {idparam === userId ? <CreatePost /> : ""}
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
              <p>Hết mất rồi!</p>
            )}
          </div>
        </Grid>
      </Grid>
    );
  };

  export default ProfileBody;