
let netManager = {
  connectorHost:"",
  connectorPort:0,
  uid:0,
  token:"",

  on: function(event, cb) {
    pomelo.on(event, cb);
  },
  
  off: function(event, cb) {
    pomelo.off(event, cb);
  },

  removeAllListeners: function() {
    pomelo.removeAllListeners();
  },

  entryRoom: function(_d, cb) {
    this.send('room.roomHandler.entryRoom', {
      gameType: _d.gameType,
      roomType: _d.roomType
    }, cb);
  },

  leave: function(cb) {
    this.send('room.roomHandler.leaveRoom', {}, cb);
  },

  send: function(route, msg, cb) {
    if (!pomelo.isConnected()) {
      cb && cb({
        code: 0,
        msg: '未连接'
      });
    }

    pomelo.request(route, msg, function(data) {
      logger.log(route, msg, data);
      cb && cb(data);
    });
  },

  disconnect: function() {
    pomelo.disconnect(true);
  },

  /**
   * 
   * @param cb 连接成功后回调
   */
  connect: function(opts, cb) {
    pomelo.disconnect(true);

    opts = opts || {};
    if (!opts.queryEntry && this.connectorHost && this.connectorPort) {
      this.connectConnector(this.connectorHost, this.connectorPort, cb);
      return;
    }

    opts = window._.extend({}, dtb.config.gameServer, opts);
    console.log(opts);
    
    let self = this;
    pomelo.init(opts, function() {
      pomelo.request('gate.gateHandler.queryEntry', {
        uid: this.uid
      }, function(data) {
        pomelo.disconnect(true);

        if (data.code != 200) {
          cb(data);
          return;
        }

        self.connectConnector(data.host, data.port, cb);
      });
    });
  },

  connectConnector: function(host, port, cb) {
    logger.log('connect to connector', host, port);
    pomelo.init({
      host: host,
      port: port,
    }, function() {
      connectorHost = host;
      connectorPort = port;
      cb();
    });
  },


  onKick: function(msg) {
    let self = this;
    console.log("onKick",msg);
    self.disconnect();
    // DialogAlert.show('提示', '账号在其他设备登录\n是否继续登录？', {
    //   okTitle: '继续登录',
    //   cancelTitle: false,
    //   callback: function(flag) {
    //     if (flag) {
    //       self.connect();
    //     } else {
    //       self.leaveRoom(true);
    //     }
    //   }
    // });
  },

  login: function(cb) {
    pomelo.request("connector.entryHandler.entry", {
      token: this.token,
    }, (data) => {
      logger.log('loged in', data.msg);
      cb(data);
    });
  }
}
module.exports = netManager;
