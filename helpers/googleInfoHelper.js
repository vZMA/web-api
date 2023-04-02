// Helper class to communicate with Google API  

import axios from "axios";

export default {
  // Method utilizing access token from OAuth middle ware to retrieve user data needed to process a login from VATSIM API.
  async getGoogleClientInfo() {
    const googleClientId = process.env.GOOGLE_AUTH_CLIENT_ID;

    return googleClientId;
  },
  async getGoogleClientSecret() {
    const googleClientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;

    return googleClientSecret;
  },
}
