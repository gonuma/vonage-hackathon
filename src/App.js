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
import MenuAppBar from "./components/Navbar";

import { Grid } from "@material-ui/core";

export const ApiKeyContext = React.createContext();

function App(props) {
  const { credentials } = props;
  // const sessionId = props.location.aboutProps.sessionId;
  // const token = props.location.aboutProps.token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  return (
    <ApiKeyContext.Provider value={credentials}>
      <Router>
        <Grid container>
          {/* <div className="App"> */}
          {/* <header>
          </header>  */}
          <Grid item xs={12}>
            <MenuAppBar />
          </Grid>
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
          {/* </div> */}
        </Grid>
      </Router>
    </ApiKeyContext.Provider>
  );
}

export default App;
