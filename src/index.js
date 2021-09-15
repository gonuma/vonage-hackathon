import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';
import { SERVER_BASE_URL, API_KEY, SESSION_ID, TOKEN, SECRET } from "./config";

function renderApp(credentials) {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App credentials={credentials} />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if (API_KEY && TOKEN && SESSION_ID) {
  renderApp({
    apiKey: API_KEY,
    sessionId: SESSION_ID,
    token: TOKEN,
    secret: SECRET,
  });
} else {
  fetch(SERVER_BASE_URL + "/session")
    .then((data) => data.json())
    .then(renderApp)
    .catch((err) => {
      console.error("Failed to get session credentials", err);
      alert(
        "Failed to get opentok sessionId and token. Make sure you have updated the config.js file."
      );
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
