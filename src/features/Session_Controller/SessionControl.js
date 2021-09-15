import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
          {/* <button onClick={(e) => (window.location.href = `/room/${room.id}`)}> */}
          Join Room
          {/* </button> */}
        </Link>
      );
    });
  };

  useEffect(() => {
    roomListUpdater();
  }, [rooms]);

  return (
    <div>
      <button
        onClick={() => {
          generateId();
          // console.log(rooms);
        }}
      >
        Generate ID
      </button>
      {roomListUpdater()}
    </div>
  );
}
