const router = require("express").Router();
const knex=require("../models/connection")

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '424503699626-m0i5m711lp2ulhmdf5efr597dq32rfjo.apps.googleusercontent.com';  // Make sure to set this in your .env file
const CLIENT_SECRET = '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';  // Make sure to set this in your .env file
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback'; // Adjust based on your setup

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

let createConversation = async (req, res) => {
    try {
        const { token } = req.body;  // Assume your front-end sends the auth code as 'token'
        const { tokens } = await client.getToken(token);  // Exchange auth code for tokens
        client.setCredentials(tokens);

        // Optionally, get user info
        const oauth2 = google.oauth2({
            auth: client,
            version: 'v2'
        });
        const userInfo = await oauth2.userinfo.get();

        // Here you can save tokens to the user's session or a database
        // For demonstration, let's send user info back to the client
        res.json({
            success: true,
            data: userInfo.data,
            tokens: tokens  // Be cautious about sending tokens to client; might not be necessary
        });
    } catch (error) {
        console.error('Error during Google auth:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
  };

  module.exports = {
    createConversation,
    
  };
  