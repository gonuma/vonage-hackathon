import axios from "axios";
import React, { useState, useEffect } from "react";
import Meeting from "./styleMeeting";

const Schedule = () => {
  //   const [meetings, setMeetings] = useState();
  //   const Box = Hook();
  const meetings = [
    { id: 1, title: "meeting1", time: "12:00" },
    { id: 2, title: "meeting2", time: "14:00" },
  ];
  //   useEffect(() => {
  // axios.get("endpoint here", function (req, res) {
  //   setMeetings("meetingsdatafromDB");
  // });
  //   });
  return (
    <div className="schedule">
      {meetings.map((meeting) => {
        return <Meeting meeting={meeting} />;
      })}
    </div>
  );
};

export default Schedule;
