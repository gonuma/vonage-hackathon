import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../materialUI/theme";
import Box from "@material-ui/core/Box";
// import { mergeClasses } from "@material-ui/styles";

const colors = theme.palette;
const useStyles = makeStyles({
  container: {
    background: colors.secondary.main,
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 120,
    padding: "0 30px",
  },
  font: {
    color: "white",
  },
  button: {
    color: "black",
    backgroundColor: colors.primary.main,
  },
});

export default function Meeting(props) {
  const meeting = props.meeting;
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <div>
        <p className={classes.font}>{meeting.title}</p>
        <p className={classes.font}>{meeting.time}</p>
        <button className={classes.button}>Join room</button>
      </div>
    </Box>
  );
}
