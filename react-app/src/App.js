import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import LandingLoggedIn from "./components/_DONOTUSE/LandingLoggedIn";
import HomeMain from "./components/HomeMain/HomeMain";
import DirectMessage from "./components/DMs/DerectMessage";
import ChannelMessagePage from "./components/ChannelMessagePage";
import NavBarLoggedIn from "./components/NavBarLoggedIn";

import AddDmPage from "./components/DMs/AddDmPage";
import DmDraftPage from "./components/DMs/DmDraftPage";
import SearchMessages from "./components/SearchMessage/SearchMessage";
import AddDm from "./components/DMs/AddDm";

import AllChannels from "./components/Channels/AllChannels";
import { getAllChannel } from "./store/channels";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllChannel());
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {!user && (
        <Route path="/" exact={true}>
          <NavBar />
          <HomeMain></HomeMain>
        </Route>
      )}

      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/groups/all-dms" exact={true}>
          <AddDmPage />
        </Route>
        <Route path="/groups/draft/:receiverId" exact={true}>
          <DmDraftPage />
        </Route>
        <Route path="/groups/:groupId">
          {/* <LandingLoggedIn user={user} /> */}
          <DirectMessage />
          {/* <SocketTest /> */}
        </Route>
        <ProtectedRoute path="/channels/:channelId">
          <ChannelMessagePage />
        </ProtectedRoute>
        <ProtectedRoute path={["/search/:keyword", "/search"]}>
          <SearchMessages />
        </ProtectedRoute>
        <ProtectedRoute path="/browse-channels">
          <AllChannels />
        </ProtectedRoute>
        {/* <ProtectedRoute >
           <Redirect to='/channels/1'></Redirect>
        </ProtectedRoute> */}
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
