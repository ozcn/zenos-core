
var Colu = require('colu');

var _core = function(conf) {
  var core = {};
  var colu_private_seed = conf['colu_private_seed'];

  var settings = {
    apiKey: apiKey,
    network: 'mainnet',
    privateSeed: null
  }

  var colu = new Colu(settings)
  colu.on('connect', function () {
      // Your code here
  })

  colu.init()
  return core;
};

module.exports = _core;
