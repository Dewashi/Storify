/**
 *
 * Authentication.js
 * INCOMPLETE
 * Defines authentication middleware.
 * Original Author: Antonion Erdeljac (github.com/AntonioErdeljac)
 * Group : Odin's Army
 * Initial commit/file creation by Tehara Moonemalle - ID: 879459, Septmeber 29, 2019
 */


const jwt = require("express-jwt");

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
    required: jwt({
        secret: 'top_secret_string',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'top_secret_string',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

module.exports = auth;
