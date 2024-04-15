const router = require("express").Router();
const knex=require("../models/connection")
//new conv

let createConversation = async (payload) => {
  try {
    console.log(knex('users'));
 
    // console.log(insretdata,"asd");
     return knex;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
//get conv of a user

let getconverstionuser = async (payload) => {
  try {
 
    return r
  } catch (err) {
    console.log(err);
    throw err;
  }
};
// get conv includes two userId

let getconverstionusersec = async (payload) => {
  try {
 
    return conversation;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createConversation,
  getconverstionuser,
  getconverstionusersec,
};
