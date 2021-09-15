import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Workspace } from "./features/workspace/Workspace";
import Landing from "./features/Landing/Landing";
import { fetchAllFiles } from "./slices/filesSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";

function App(props) {
  const { credentials } = props;
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
            path="/workspace"
            exact
            render={() => <Workspace credentials={credentials} />}
          />
          <Route path="/workspace/:sessionId" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
