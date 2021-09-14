import React from "react";
import { useState } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

export default function Video(props) {
  const { credentials } = props;

  const { apiKey, sessionId, token } = credentials;

  const [error, setError] = useState(null);
  const [connection, setConnection] = useState("Connecting");
  const [publishVideo, setPublishVideo] = useState(true);

  const sessionEventHandler = {
    sessionConnected: () => {
      setConnection("Connected");
    },
    sessionDisconnected: () => {
      setConnection("Disconnected");
    },
    sessionReconnected: () => {
      setConnection("Reconnected");
    },
    sessionReconnecting: () => {
      setConnection("Reconnecting");
    },
  };

  const publisherEventHandlers = {
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

  const subscriberEventHandlers = {
    videoEnabled: () => {
      console.log("Subscriber video enabled");
    },
    videoDisabled: () => {
      console.log("Subscriber video disabled");
    },
  };

  const onSessionError = (error) => {
    setError(error);
  };

  const onPublish = () => {
    console.log("Publish Success");
  };

  const onPublishError = (error) => {
    setError(error);
  };

  const onSubscribe = () => {
    console.log("Subscribe Success");
  };

  const onSubscribeError = (error) => {
    setError(error);
  };

  const toggleVideo = () => {
    setPublishVideo(!publishVideo);
  };

  return (
    <div>
      <div id="sessionStatus">Session Status: {connection}</div>
      {error ? (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      ) : null}
      <OTSession
        apiKey={apiKey}
        sessionId={sessionId}
        token={token}
        onError={this.onSessionError}
        eventHandlers={this.sessionEventHandlers}
      >
        <button id="videoButton" onClick={this.toggleVideo}>
          {publishVideo ? "Disable" : "Enable"} Video
        </button>
        <OTPublisher
          properties={{ publishVideo, width: 50, height: 50 }}
          onPublish={this.onPublish}
          onError={this.onPublishError}
          eventHandlers={this.publisherEventHandlers}
        />
        <OTStreams>
          <OTSubscriber
            properties={{ width: 100, height: 100 }}
            onSubscribe={this.onSubscribe}
            onError={this.onSubscribeError}
            eventHandlers={this.subscriberEventHandlers}
          />
        </OTStreams>
      </OTSession>
    </div>
  );
}
