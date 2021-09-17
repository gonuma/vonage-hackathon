import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button, Box, Spacing } from "@material-ui/core";

import theme from "../../materialUI/theme";
import { ThemeProvider } from "@material-ui/core";

import { setCurrentFile, setCurrentGroup } from "../../slices/filesSlice";

export default function SessionControl(props) {
  const { credentials } = props;
  const workspace = useSelector((state) => state.files.all);

  const user = useSelector((state) => state.user);
  const files = useSelector((state) => state.files);
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState([]);

  const VonageVideo = require("opentok");
  const vonageVideo = new VonageVideo(credentials.apiKey, credentials.secret);

  const generateId = async () => {
    await vonageVideo.createSession((err, session) => {
      const token = vonageVideo.generateToken(session.sessionId);
      axios
        .post(
          `/api/workspaces/${workspace[0].workspaceId}/${session.sessionId}`
        )
        .then(() => {
          // const temp = rooms
          // console.log(rooms);
          rooms.push({ token: token, id: session.sessionId });
          setRooms([...rooms]);
          // console.log(rooms);
        })
        .then((res) => res);
      // .then((res) => console.log(res));
    });
  };

  const dbScraper = () => {
    axios.get(`/api/workspaces`).then((res) => {
      for (const session of res.data) {
        if (session.sessionId !== null) {
          rooms.push({
            token: vonageVideo.generateToken(session.sessionId),
            id: session.sessionId,
          });
        }
      }
      setRooms([...rooms]);
    });
  };

  useEffect(() => {
    dbScraper();
  }, []);

  const setFiles = (workspace) => {
    const filtered = files.all.filter(
      (file) => file.workspaceId === workspace.id
    );
    console.log("hello");
    console.log(filtered);
    dispatch(setCurrentGroup(filtered));
    if (filtered.length === 0) dispatch(setCurrentFile(null));
    else dispatch(setCurrentFile(filtered[0]));
  };

  const roomListUpdater = () => {
    if (!user.workspaces) {
      return null;
    } else {
      return user.workspaces.map((workspace) => {
        // console.log(room.token);
        // console.log(room.id);
        return (
          <Link
            to={{
              pathname: `/room`,
              aboutProps: {
                token: workspace.token,
                sessionId: workspace.sessionId,
              },
            }}
          >
            <h4>{workspace.name}</h4>
            <Box mb={1 / 5}>
              <Button
                color="secondary"
                variant="contained"
                disableElevation={true}
                size="medium"
                onClick={(e) => setFiles(workspace)}
              >
                Join Room
              </Button>
            </Box>
            <br />
          </Link>
        );
      });
    }
  };

  useEffect(() => {
    roomListUpdater();
  }, [rooms]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Box mt={1} mb={2}>
        <Button
          color="primary"
          variant="contained"
          width={1}
          size="large"
          onClick={() => generateId()}
        >
          Make Room
        </Button>
      </Box> */}
      <Box
        mt={1}
        // style={{ overflowY: "auto" }}
      >
        {roomListUpdater()}
      </Box>
    </ThemeProvider>
  );
}
