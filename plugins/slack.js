
var _slack = function(core, conf) {

  var token = conf['slack_token'];
  var teamID = conf['slack_teamid'];
  var genErrorResponsePayload = function(msg) {
    return {
      text: msg,
      color: 'danger',
      attachments: [
        {
          text: msg
        }
      ]
    }
  };
  var _slack = function(req, res, next) {
    if (req.body.command !== '/zenos') {
      return res.json(genErrorResponsePayload('unknwon command'))
    }
    if (req.body.team_id !== teamID) {
      return res.json(genErrorResponsePayload('invalid request'))
    }
    if (req.body.token !== token) {
      return res.json(genErrorResponsePayload('invalid request'))
    }

    console.log(req.body);
    return res.send('OK');
  }

  return _slack;
};

module.exports = _slack;
