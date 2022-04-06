import React, { useContext } from "react";
import {
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
const UserMenu = ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
  menuIcon,
}) => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  return (
    <IconButton>
      <Tooltip title="Open settings">
        <Avatar
          onClick={handleOpenUserMenu}
          alt="Remy Sharp"
          src={
            user?.profilePicture
              ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
              : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
          }
        />
      </Tooltip>
      <Menu
        className="menu"
        sx={{ mt: "50px", width: 320, maxWidth: "100%" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box style={{ padding: "15px" }}>
          <Typography
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "var(--color-gray-shade)",
            }}
            textAlign="left"
          >
            {user?.username}
          </Typography>
        </Box>
        <Divider />
        <Link to={`/profile/${user?._id}`}>
          <MenuItem style={{ padding: "17px" }} onClick={handleCloseUserMenu}>
            <Avatar
              src={
                user?.profilePicture
                  ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                  : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
              }
              sx={{ width: 50, height: 50 }}
            />
            <div style={{ lineHeight: "normal" }}>
              <p
                style={{
                  fontSize: ".9rem",
                  color: "var(--color-navy)",
                }}
              >
                {user?.username}
              </p>
              <small
                style={{
                  fontSize: ".7rem",
                  color: "var(--color-gray-shade)",
                }}
              >
                Tài khoản hiện tại
              </small>
            </div>
          </MenuItem>
        </Link>
        {menuIcon.map((item) => {
          return (
            <Link to={item.path} key={item.id}>
              <MenuItem
                key={item.id}
                style={{
                  padding: "17px 160px 17px 19px",
                  color: "var(--color-navy)",
                }}
                onClick={() => handleCloseUserMenu(item.path)}
              >
                <Box style={{ paddingRight: "17px" }}>{item.icon}</Box>
                <div style={{ lineHeight: "normal" }}>
                  <p
                    style={{
                      fontSize: ".9rem",
                      color: "var(--color-navy)",
                    }}
                  >
                    {item.title}
                  </p>
                  <small
                    style={{
                      fontSize: ".7rem",
                      color: "var(--color-gray-shade)",
                    }}
                  >
                    {item.desc}
                  </small>
                </div>
              </MenuItem>
            </Link>
          );
        })}
      </Menu>
    </IconButton>
  );
};

export default UserMenu;
