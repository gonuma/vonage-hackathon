import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button, Box, Spacing } from "@material-ui/core";

export default function SessionControl(props) {
  const { credentials } = props;
  const workspace = useSelector((state) => state.files.all);

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

  const roomListUpdater = () => {
    return rooms.map((room) => {
      // console.log(room.token);
      // console.log(room.id);
      return (
        <Link
          to={{
            pathname: `/room`,
            aboutProps: {
              token: room.token,
              sessionId: room.id,
            },
          }}
        >
          <Box mb={1 / 5}>
            <Button variant="contained" disableElevation={true} size="medium">
              Join Room
            </Button>
          </Box>
          <br />
        </Link>
      );
    });
  };

  useEffect(() => {
    roomListUpdater();
  }, [rooms]);

  return (
    <div>
      <Box mb={2}>
        <Button
          variant="contained"
          width={1}
          size="large"
          onClick={() => generateId()}
        >
          Make Room
        </Button>
      </Box>
      <div>{roomListUpdater()}</div>
    </div>
  );
}
