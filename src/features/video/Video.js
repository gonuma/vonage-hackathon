import React from "react";
import { useState } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

import { Grid, Box } from "@material-ui/core";

export default class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connection: "Connecting",
      publishVideo: true,
    };

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: "Connected" });
      },
      sessionDisconnected: () => {
        this.setState({ connection: "Disconnected" });
      },
      sessionReconnected: () => {
        this.setState({ connection: "Reconnected" });
      },
      sessionReconnecting: () => {
        this.setState({ connection: "Reconnecting" });
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log("User denied access to media source");
      },
      streamCreated: () => {
        console.log("Publisher stream created");
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log("Subscriber video enabled");
      },
      videoDisabled: () => {
        console.log("Subscriber video disabled");
      },
    };
  }

  onSessionError = (error) => {
    this.setState([error]);
  };

  onPublish = () => {
    console.log("Publish Success");
  };

  onPublishError = (error) => {
    this.setState([error]);
  };

  onSubscribe = () => {
    console.log("Subscribe Success");
  };

  onSubscribeError = (error) => {
    this.setState([error]);
  };

  toggleVideo = () => {
    this.setState((state) => ({
      publishVideo: !state.publishVideo,
    }));
  };

  render() {
    const sessionId = this.props.sessionId;
    const token = this.props.token;
    const apiKey = this.props.apiKey;
    const { error, connection, publishVideo } = this.state;

    return (
      <>
        {/* <div id="sessionStatus">Session Status: {connection}</div>
        {error ? (
          <div className="error">
          <strong>Error:</strong> {error}
        </div> */}
        {/* ) : null} */}
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <Box
            component="div"
            maxHeight="85vh"
            overflow="auto"
            className="vidContainer"
          >
            <Grid
              container
              justifyContent="space-evenly"
              alignContent="center"
              direction="column"
              spacing={1}
            >
              <Grid item>
                <button id="videoButton" onClick={this.toggleVideo}>
                  {publishVideo ? "Disable" : "Enable"} Video
                </button>
                <OTPublisher
                  properties={{ publishVideo, height: "14vh", width: "11vw" }}
                  onPublish={this.onPublish}
                  onError={this.onPublishError}
                  eventHandlers={this.publisherEventHandlers}
                />
              </Grid>
              <Grid item>
                <OTStreams>
                  <OTSubscriber
                    properties={{ height: "14vh", width: "11vw" }}
                    onSubscribe={this.onSubscribe}
                    onError={this.onSubscribeError}
                    eventHandlers={this.subscriberEventHandlers}
                  />
                </OTStreams>
              </Grid>
            </Grid>
          </Box>
        </OTSession>
      </>
    );
  }
}
