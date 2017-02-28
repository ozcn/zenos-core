
var _slack = function(core, conf) {

  var token = conf['slack_token'];
  var teamID = conf['slack_teamid'];
  var userEntryExpr = new RegExp('<@(U[0-9A-Z]+)\\|([a-z]+)>', 'g');

  /**
   * genErrorResponsePayload() returns an
   * Object
   *
   * @param  msg
   * @return  element
   */
  var genErrorResponsePayload = function(msg) {
    return {
      text: msg,
      color: 'danger',
      attachments: [
        {
          text: msg
        }
      ]
    };
  };
  var getUserIDFromTokenizedEntry = function(entry) {
    var res = userEntryExpr.exec(entry);
    if (res === null) {
      return res;
    }
    return res[1];
  };
  var listUserID = function(text) {
    var mo = text.match(userEntryExpr);
    if (mo === null) {
      return [];
    }
    return mo.map(getUserIDFromTokenizedEntry);
  };
  var commands = {
    ping: function(req, res, next) {
      return res.send('pong');
    },
    send: function(req, res, next) {
      resolveSlackUserID();
      // TODO: implement
    },
    send_to_address: function(req, res, next) {
      // TODO: implement
    },
    create_wallet: function(req, res, next) {
      // TODO: implement
    },
    wallets: function(req, res, next) {
      // TODO: implement
    },
    current_amount: function(req, res, next) {
      // TODO: implement
    }
  };
  var parseCommand = function(text) {

  };

  /**
   * resolveSlackUserID resolves wallet address by slack user id.
   * callback function is called cb(null, {id: id, address: address})
   * when id successfully resolved, cb(error, null) otherwise.
   *
   * @param id
   * @param cv
   * @return  null
   */
  var resolveSlackUserID = function(id, cb) {
    try {
      // Slackユーザーが存在するかを確認
      var slackUserRef = core.firebase.database().ref('slack_users/' + id);

      return slackUserRef.on('value', function(snapshot) {
        var slackUser = snapshot.val();

        // ユーザーが存在しない場合に作成する
        if (slackUser == null) {
          core.colu.on('connect', function () {
            var address = core.colu.hdwallet.getAddress();

            // IDとアドレスをセット
            slackUserRef.set({
              'id': id,
              'address': address
            });
          });

          core.colu.init();
        }

        return slackUser;
      });
    } catch (e) {
      return cb(e, null);
    }
  };

  var _slack = function(req, res, next) {
    if (req.body.command !== '/zenos') {
      return res.json(genErrorResponsePayload('unknwon command'));
    }
    if (req.body.team_id !== teamID) {
      return res.json(genErrorResponsePayload('invalid request'));
    }
    if (req.body.token !== token) {
      return res.json(genErrorResponsePayload('invalid request'));
    }
    console.log(req.body);
    return res.send('OK');
  };

  return _slack;
};

module.exports = _slack;
