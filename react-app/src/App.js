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
import SocketTest from "./components/SocketTest";
import LandingLoggedIn from "./components/LandingLoggedIn";
import ChannelMessagePage from "./components/ChannelMessagePage";

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
        <>
          <NavBar />
          <Route path="/" exact={true}>
            <img src="https://previews.us-east-1.widencdn.net/preview/48045879/assets/asset-view/a57a6ee3-fb80-45b4-8b0e-c84837ec5649/thumbnail/eyJ3IjoyMDQ4LCJoIjoyMDQ4LCJzY29wZSI6ImFwcCJ9?Expires=1670788800&Signature=hYtfOYqF4Bf68tSHrI3oxXyd5M~liqCBs9aE2Ch6CUXcIoo2Sv5eaPJSnkDfPW5kzuOFWUn-m1iMFfRG5z0Zvf7Rs3ZG7t4E5e7wmJAjGsmDafHvpkolDgb4ULARMcKaFcWLdTpDgnz69E2thz1Z59nZB2ioVDkMIJK5Cz8LhRBHRLLAh6bfEkG4sKuw8tmv9TG5gkm88GWSe~ktZlpIzGc-EcMyABKYyGD0I51e2VOCvR7KNvUMNTUJNcCKZ-A2QSyh7wV~SxaNOmGDwKzJG9AD1HVlpUqeKNxXCZjZC7TU-4EOu1t0e5EofABUaEWoiLXaFuFFtczJz4gEQeq-iA__&Key-Pair-Id=APKAJM7FVRD2EPOYUXBQ"></img>
          </Route>
        </>
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
        <Route path="/chat">
          <SocketTest />
        </Route>
        <ProtectedRoute path="/message/channels/:channelId">
          <ChannelMessagePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
