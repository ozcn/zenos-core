
var config = {
  slackToken: null
};

try
{
  var f = require('./.config.json');
  Object.keys(f).forEach(function(d)
  {
    config[d] = f[d];
  });
}
catch (e)
{
}

module.exports = config;
