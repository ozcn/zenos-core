
var Colu = require('colu');
var Firebase = require('firebase');

var _core = function(conf) {
  var core = {};

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
  var firebase = Firebase.initializeApp(firebase_config);
  var colu = new Colu(colu_settings);
  core.firebase = firebase;
  core.colu = colu;

  core.getFirebaseRefVal = function(route, cb) {
    try {
      var ref = firebase.database().ref(route);
      var ret = {ref: ref};
      return ref.on('value', function(ss) {
        ret.val = ss.val()
        return cb(null, ret);
      });
    } catch (e) {
      return cb(e, null);
    }
  };

  core.getColuHDWallet = function(cb) {
    try {
      colu.on('connect', function() {
        return cb(null, colu.hdwallet.getAddress());
      });
      colu.init();
    } catch (e) {
      return cb(e, null);
    }
  };

  return core;
};

module.exports = _core;
