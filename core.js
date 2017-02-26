
var Colu = require('colu');
var Firebase = require('firebase');

var _core = function(conf) {
  var core = {};
  var colu_private_seed = conf['colu_private_seed'];

  var colu_settings = {
    apiKey: conf['api_key'],
    network: 'mainnet',
    privateSeed: null
  };

  var firebase_config = {
    apiKey: conf['firebase_apiKey'],
    authDomain: conf['firebase_authDomain'],
    databaseURL: conf['firebase_databaseURL'],
    storageBucket: conf['firebase_storageBucket'],
    messagingSenderId: conf['firebase_messagingSenderId']
  };

  // 参照
  core.firebase = Firebase.initializeApp(firebase_config);
  core.colu = new Colu(colu_settings);

  return core;
};

module.exports = _core;
