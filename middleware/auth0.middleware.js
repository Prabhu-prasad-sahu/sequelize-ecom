const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'zyDRMKNp12MfUPEVAOpkZOYeSu0xYJR3',
    issuerBaseURL: 'https://dev-w1wf4yqbypttgeab.us.auth0.com'
};

module.exports = config;