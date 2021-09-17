import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Landing from "./Landing";
import Room from "./Room";
import { fetchFiles } from "./slices/userSlice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import "./app.css";
import MenuAppBar from "./components/Navbar";
import { fetchWorkspaces, fetchAllUsers, setUser } from "./slices/userSlice";
import { fetchUsersInWorkspaces } from "./slices/workspacesSlice";
import { fetchAllFiles } from "./slices/filesSlice";

export const ApiKeyContext = React.createContext();

function App(props) {
  const { credentials } = props;
  // const sessionId = props.location.aboutProps.sessionId;
  // const token = props.location.aboutProps.token;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const workspaces = useSelector((state) => state.workspaces)
  const files = useSelector((state) => state.files)

  useEffect(() => {
    dispatch(fetchAllFiles())
    dispatch(fetchAllUsers())
    dispatch(setUser(1)) // TEMP
    dispatch(fetchWorkspaces())
    dispatch(fetchFiles())
    dispatch(fetchUsersInWorkspaces())
  }, []);

  const clickHandler = () => {
    console.log(user)
    console.log(workspaces)
    console.log(files)
  }

  return (

    <ApiKeyContext.Provider value={credentials}>
      <Router>
        <div className="App">
          <header>

            <MenuAppBar />

          </header>
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
