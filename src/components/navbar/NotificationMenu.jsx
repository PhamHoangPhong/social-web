import React, { useContext } from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  IconButton,
  Button,
  Badge,
} from "@mui/material";
import { BsBell } from "react-icons/bs";
import { PostContext } from "../../context/postContext";
const NotificationMenu = ({
  anchorElNotification,
  handleCloseNotification,
  handleOpenNotification,
}) => {
  const { notification, setNotification } = useContext(PostContext);
  const clearNotification = () => {
    setNotification([])
    handleCloseNotification()
  }
  return (
    <IconButton
      size="medium"
      aria-label="show 17 new notifications"
      className="navbar__right-icon"
      
    >
      <Badge badgeContent={notification.length} color="error">
        <BsBell onClick={handleOpenNotification} className="iconSize" />
      </Badge>
      <Menu
        className="menu"
        sx={{ mt: "50px", width: 320, maxWidth: "100%" }}
        id="menu-notification"
        anchorEl={anchorElNotification}
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
        open={Boolean(anchorElNotification)}
        onClose={handleCloseNotification}
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
            Thông báo
          </Typography>
        </Box>
        <Divider />
        {notification.map((data, index) => (
          <MenuItem
            style={{ padding: "17px 160px 17px 19px" }}
            onClick={handleCloseNotification}
            key={index}
          >
            <div style={{ lineHeight: "normal" }}>
              <p
                style={{
                  fontSize: ".9rem",
                  color: "var(--color-navy)",
                }}
              >
                Có biến
              </p>
              <small
                style={{
                  fontSize: ".7rem",
                  color: "var(--color-gray-shade)",
                }}
              >
                {data.notification}
              </small>
            </div>
          </MenuItem>
        ))}
        <Button style={{marginLeft: '15px'}} variant="contained" size="small" onClick={clearNotification}>Clear</Button>
      </Menu>
    </IconButton>
  );
};

export default NotificationMenu;
