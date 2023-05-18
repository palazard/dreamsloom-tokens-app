import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 

  // First we have to create and AuthClient.
  const authClient = await AuthClient.create();

  if (authClient.isAuthenticated()){
    handleAuthenticated(authClient);
  } else {
      // Call authClient.login(...) to login with Internet Identity. This will open a new tab
      // with the login prompt. The code has to wait for the login process to complete.
      // We can either use the callback functions directly or wrap in a promise.
      await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => handleAuthenticated(authClient),
    });
  }

  async function handleAuthenticated(authClient) {
    ReactDOM.render(<App />, document.getElementById("root"));
  }

}

init();


