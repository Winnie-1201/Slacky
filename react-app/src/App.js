import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import LandingLoggedIn from "./components/LandingLoggedIn";
import HomeMain from "./components/HomeMain/HomeMain";
import Footer from "./components/Footer/Footer";
import DirectMessage from "./components/DMs/DerectMessage";
import ChannelMessagePage from "./components/ChannelMessagePage";
import NavBarLoggedIn from "./components/NavBarLoggedIn";

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
      {/* {user && <LandingLoggedIn user={user}></LandingLoggedIn>} */}

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
        <Route path="/groups/:groupId">
          {/* <LandingLoggedIn user={user} /> */}
          <DirectMessage />
          {/* <SocketTest /> */}
        </Route>
        <ProtectedRoute path="/channels/:channelId">
          <ChannelMessagePage />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
