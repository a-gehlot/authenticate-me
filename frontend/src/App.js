import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
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
