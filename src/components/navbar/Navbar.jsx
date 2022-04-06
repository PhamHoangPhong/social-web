import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Avatar, Grid, Box } from "@mui/material";
import { WrapperNavbarStyled } from "./NavbarStyled";
import { Link, useLocation } from "react-router-dom";
import {
  BsMessenger,
  BsCardImage,
  BsPersonCircle,
  BsPersonPlus,
  BsHouse,
  BsSearch,
  BsPencilSquare,
  BsBoxArrowLeft,
} from "react-icons/bs";
import UserMenu from "./UserMenu";
import NotificationMenu from "./NotificationMenu";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";
import debounce from "lodash/debounce";

const styles = {
  customizeToolbar: {
    minHeight: 56,
    background: "var(--bg-box)",
    color: "var(--color-gray-shade)",
    boxShadow: "0px 10px 10px -10px rgba(0, 0, 0, 0.15)"
  },
};

const Navbar = () => {
  const [isShowResult, setIsShowResult] = useState(false);
  const boxSearchRef = useRef(null);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    userState: { usersSearch },
    searchUser,
  } = useContext(UserContext);

  const iconNavbarCenter = [
    {
      id: "home",
      path: "/",
      icon: <BsHouse className="iconSize" />,
    },
    {
      id: "profile",
      path: `/profile/${user?._id}`,
      icon: <BsPersonCircle className="iconSize" />,
    },
    {
      id: "newfriends",
      path: "/friends",
      icon: <BsPersonPlus className="iconSize" />,
    },
    {
      id: "allmedia",
      path: "/media",
      icon: <BsCardImage className="iconSize" />,
    },
  ];
  const menuIcon = [
    {
      id: "asfse",
      path: "/setting",
      icon: <BsPencilSquare className="iconSize" />,
      title: "Chỉnh sửa thông tin",
      desc: "Thay đổi thông tin cá nhân",
    },
    {
      id: "oijwoiio",
      path: "/login",
      icon: <BsBoxArrowLeft className="iconSize" />,
      title: "Đăng xuất",
      desc: "Đăng xuất khỏi tài khoản",
    },
  ];
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);

  const handleOpenNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = async (pathname) => {
    if (pathname === "/login") {
      logout();
    }
    setAnchorElUser(null);
  };
  const clickOutSideRef = (boxSearchRef) => {
    document.addEventListener("mousedown", (e) => {
      if (boxSearchRef.current && !boxSearchRef.current.contains(e.target)) {
        setIsShowResult(false);
      }
    });
  };
  useEffect(() => {
    clickOutSideRef(boxSearchRef);
  }, [boxSearchRef]);

  //handle search delay
  const sendQuery = (query) => {
    // Call API
    searchUser(query);
  };

  const delayedSearch = useMemo(() => debounce((q) => sendQuery(q), 600), []);

  const onHandleSearch = (e) => {
    delayedSearch(e.target.value);
  };

  return (
    <WrapperNavbarStyled sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0} className="navbar">
        <Toolbar style={styles.customizeToolbar}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={4} sm={12} className="navbar__left">
              <div className="navbar__left-logo">
                <img
                  src="https://friendkit.cssninja.io/assets/img/logo/friendkit-bold.svg"
                  width={34}
                  height={34}
                  sx={{ mr: 2 }}
                  alt="logo"
                />
              </div>
              <div className="navbar__center">
                {iconNavbarCenter.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`navbar__center-icon ${
                        item.path === pathname ? "active" : ""
                      }`}
                    >
                      {item.icon}
                    </Link>
                  );
                })}
              </div>
            </Grid>
            <Grid
              item
              sx={{ display: { xs: "none", md: "block" } }}
              xs={4}
              md={4}
              sm={4}
              className="navbar__input"
            >
              <form className="navbar__left-search">
                <BsSearch
                  style={{ position: "absolute", left: "10px", top: "11px" }}
                />
                <input
                  onFocus={() => setIsShowResult(true)}
                  onChange={onHandleSearch}
                  placeholder="Tìm kiếm"
                />
                {isShowResult && (
                  <Box
                    ref={boxSearchRef}
                    className="navbar__left-search--result"
                  >
                    {usersSearch.map((user) => (
                      <Link
                        to={`/profile/${user?._id}`}
                        key={user?._id}
                        onClick={() => setIsShowResult(false)}
                      >
                        <div className="navbar__left-search--item">
                          <Avatar
                            src={
                              user?.profilePicture
                                ? `${process.env.REACT_APP_PUBLIC_FOLDER}profile/${user?.profilePicture}`
                                : `${process.env.REACT_APP_PUBLIC_FOLDER}profile/noimg.jpg`
                            }
                          />
                          <div style={{ marginLeft: "15px" }}>
                            <p>{user?.username}</p>
                            <small>{user?.followers.length} followers</small>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </Box>
                )}
              </form>
            </Grid>
            <Grid item xs={12} md={4} sm={12} className="navbar__right">
              <div sx={{ display: { xs: "none", md: "flex" } }}>
                <Link to="/message">
                  <IconButton
                    className="navbar__right-icon"
                    size="medium"
                    aria-label="show 4 new mails"
                  >
                    <BsMessenger className="iconSize" />
                  </IconButton>
                </Link>
                <NotificationMenu
                  anchorElNotification={anchorElNotification}
                  handleCloseNotification={handleCloseNotification}
                  handleOpenNotification={handleOpenNotification}
                />
                <UserMenu
                  anchorElUser={anchorElUser}
                  handleOpenUserMenu={handleOpenUserMenu}
                  handleCloseUserMenu={handleCloseUserMenu}
                  menuIcon={menuIcon}
                />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </WrapperNavbarStyled>
  );
};

export default Navbar;
