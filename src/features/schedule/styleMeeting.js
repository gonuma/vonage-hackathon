import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../materialUI/theme";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
// import { mergeClasses } from "@material-ui/styles";

const colors = theme.palette;
const useStyles = makeStyles({
  container: {
    background: colors.primary.main,
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 120,
    padding: "0 30px",
  },
  font: {
    marginTop: "10px",
    color: "white",
  },
  button: {
    color: "black",
    backgroundColor: colors.secondary.main,
  },
});

export default function Meeting(props) {
  const meeting = props.meeting;
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <div>
        <p t={2} className={classes.font}>
          {meeting.title}
        </p>
        <p t={2} className={classes.font}>
          {meeting.time}
        </p>
        <Button className={classes.button} variant="contained">
          Join
        </Button>
      </div>
    </Box>
  );
}
