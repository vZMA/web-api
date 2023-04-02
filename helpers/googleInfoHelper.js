// Helper class to communicate with Google API  

import axios from "axios";

export function etGoogleClientInfo() {
    const googleClientId = process.env.GOOGLE_AUTH_CLIENT_ID;

    return googleClientId;
  };

export function getGoogleClientSecret() {
    const googleClientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;

    return googleClientSecret;
  };