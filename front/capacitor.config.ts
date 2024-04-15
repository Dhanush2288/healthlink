import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'template_22',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },

  "plugins": {
    "GoogleAuth": {
      "clientId": "your-client-id",
      "scopes": ["email", "profile", "openid", "https://www.googleapis.com/auth/fitness.activity.read"],
      "forceCodeForRefreshToken": true
    }
  }

};

export default config;
