import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/profile/Profile";
import About from "../components/profile/about/About";
import Friends from "../components/profile/friends/Friends";
import Media from "../components/profile/media/Media";
import AllMedia from "../pages/media/AllMedia";
import Followings from "../components/profile/friends/Followings";
import Setting from "../pages/setting/Setting";
import UnfollowingFriend from "../pages/friends/UnfollowingFriend";
import Message from "../pages/message/Message";
const RouteLanding = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />}>
            <Route path="/profile/:id/about" element={<About />} />
            <Route path="/profile/:id/friend" element={<Friends />} />
            <Route path="/profile/:id/picture" element={<Media />} />
            <Route path="/profile/:id/following" element={<Followings />} />
          </Route>
          <Route path="/search" />
          <Route path="/friends" element={<UnfollowingFriend />} />
          <Route path="/media" element={<AllMedia />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/message" element={<Message />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteLanding;
