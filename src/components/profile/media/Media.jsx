import React, { useContext, useEffect, useRef, useState } from "react";
import { SRLWrapper } from "simple-react-lightbox";
import {
  Box,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { MediaListStyled } from "./MediaStyled";
import { PostContext } from "../../../context/postContext";
import { UserContext } from "../../../context/userContext";
import { useParams } from "react-router-dom";
import { BsArrowDownCircle } from "react-icons/bs";

const Media = () => {
  const [page, setPage] = useState(2);
  const [isLoadedAll, setIsLoadedAll] = useState(false);
  const {
    postState: { posts, postLoading },
    getPostByUser,
  } = useContext(PostContext);
  const {
    userState: { userSelected },
  } = useContext(UserContext);
  const { id } = useParams();
  const ref = useRef();
  ref.current = getPostByUser;
  useEffect(() => {
    if (window.location.reload) {
      ref.current({ id, page: 1 });
    }
  }, [id]);
  const onLoadMore = async () => {
    const response = await getPostByUser({ id, page });
    if (response.posts.length === 0) setIsLoadedAll(true);
    setPage((prev) => prev + 1);
  };
  return (
    <SRLWrapper>
      <MediaListStyled>
        <Box className="title">
          <p>Ảnh</p>
        </Box>
        <ImageList variant="masonry" cols={3} gap={10} rowHeight="auto">
          {posts.map((post, index) => {
            if (post.photoUrl.length > 0) {
              const img = post.photoUrl.map((url, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${process.env.REACT_APP_PUBLIC_FOLDER}feed/${url}?w=248&fit=crop&auto=format`}
                    alt="imagepost"
                    loading="lazy"
                  />
                </ImageListItem>
              ));
              return img;
            } else return "";
          })}
          {userSelected && (
            <>
              <ImageListItem>
                <img
                  src={`${process.env.REACT_APP_PUBLIC_FOLDER}profile/${userSelected?.profilePicture}`}
                  alt="imagepost"
                />
              </ImageListItem>
              <ImageListItem>
                <img
                  src={`${process.env.REACT_APP_PUBLIC_FOLDER}profile/${userSelected?.coverPicture}`}
                  alt="imagepost"
                />
              </ImageListItem>
            </>
          )}
        </ImageList>
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
            <p>Het mat roi!</p>
          )}
        </div>
      </MediaListStyled>
    </SRLWrapper>
  );
};

export default Media;
