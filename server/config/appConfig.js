// config/database.js
module.exports = {
    mongoUrl : 'mongodb://localhost/gitlogin',
    gitCallbackURL: 'http://localhost:3000/auth/github/callback',
    gitClientSecret: 'EnterClientSecretHere',
    gitClientID: 'EnterClientIDHere'
};
