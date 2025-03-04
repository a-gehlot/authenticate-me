import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import * as sessionActions from "./store/session"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <Router>
      <Navigation
        sessionUser={useSelector((state) => state.session.user)}
        logout={() => dispatch(sessionActions.logoutUser())}
      />
      <Switch>
        {/*Home Route*/}
        <Route exact path="/">
          <h1>Hello from App</h1>
        </Route>

        {/*Login Route*/}
        <Route path="/login">
          <LoginFormPage />
        </Route>
        {/*Signup Route*/}
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
