import React from "react";
import { BsHeartFill, BsFillCheckCircleFill } from "react-icons/bs";
import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
const HighlightUser = ({ user }) => {
  return (
    <Grid item xs={12} md={12} sm={12} lg={6} style={{display: 'flex', justifyContent: 'center'}}>
      <Link to={`/profile/${user?._id}`}>
        <Box className="leftbar__user">
          <Box className="leftbar__user-info">
            <BsFillCheckCircleFill style={{ color: "var(--color-success)" }} />
            <p>{user?.username}</p>
          </Box>
          <img
            className="leftbar__user-img"
            width={160}
            height={210}
            src={
              user?.profilePicture
                ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
            }
            alt="user"
          />
        </Box>
        <Box className="leftbar__follow">
          <BsHeartFill style={{ color: "var(--color-gray-shade)" }} />
          <p>{user?.followers.length} followers</p>
        </Box>
      </Link>
    </Grid>
  );
};

export default HighlightUser;
