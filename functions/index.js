const FirebaseConfig = require('./FirebaseConfig');;
const jabberapi = require('./jabber-api');
const functions = FirebaseConfig.functions;
const firestore = FirebaseConfig.firestore;
const storageBucket = FirebaseConfig.storageBucket;
const admin = FirebaseConfig.admin

exports.api = functions.https.onRequest(jabberapi); //api will be the path of jabber api