const admin = require('firebase-admin');
let serviceAccount = require('./chatcorp-34e5b-firebase-adminsdk-6x3kh-1bedfe4bb0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin.firestore();