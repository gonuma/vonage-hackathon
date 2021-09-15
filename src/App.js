import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Landing from "./Landing";
import Room from "./Room";
import { fetchAllFiles } from "./slices/filesSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";

function App(props) {
  const { credentials } = props;
  // const sessionId = props.location.aboutProps.sessionId;
  // const token = props.location.aboutProps.token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Landing credentials={credentials} />}
          />
          <Route
            path="/room"
            exact
            render={() => <Room credentials={credentials} />}
          />
          <Route
            path="/room/:sessionId"
            render={() => <Room credentials={credentials} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
