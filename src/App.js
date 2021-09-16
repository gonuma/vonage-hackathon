import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Landing from "./Landing";
import Room from "./Room";
import { fetchAllFiles } from "./slices/filesSlice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import "./app.css";
import { WorkspaceSetup } from "./features/workspaceSetup/WorkspaceSetup";
import { fetchWorkspaces, fetchFiles } from "./slices/userSlice";

export const ApiKeyContext = React.createContext();

function App(props) {
  const { credentials } = props;
  // const sessionId = props.location.aboutProps.sessionId;
  // const token = props.location.aboutProps.token;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchWorkspaces())
    dispatch(fetchFiles())
  }, []);

  // useEffect(() => {
    
  // }, [user.workspaces]);

  return (
    <ApiKeyContext.Provider value={credentials}>
      <Router>
        <div className="App">
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Landing credentials={credentials} />}
            />
            <Route
              exact
              path="/room"
              component={Room}
              credentials={credentials}
            />
          </Switch>
        </div>
      </Router>
    </ApiKeyContext.Provider>
  );
}

export default App;
