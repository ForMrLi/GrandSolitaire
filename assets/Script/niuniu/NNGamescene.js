cc.Class({
    extends: cc.Component,

    properties: {
        netManager:null,
        messageReceiver:null,
        creceiveFun:null,
    },

    // use this for initialization
    onLoad: function () {
        let routes = window.niuniu.routes;
        let netManager = window.netManager;
        let messageReceiver = window.messageReceiver;
        let keys = Object.keys(routes);
  
        let fun = function(msg) {
          // logger.log(event, msg);
          messageReceiver.receive(event, msg);
        }
        this.creceiveFun = fun;
        
        for (let key of keys) {
          let event = routes[key];
          if (this[event]) {
            netManager.on(event, fun);
          }
        }
      },
  
      onDestroy(){
        let routes = window.niuniu.routes;
        let netManager = window.netManager;
        
        let keys = Object.keys(routes);
        for (let key of keys) {
          let event = routes[key];
          if (this[event]) {
            netManager.off(event, this.creceiveFun);
          }
        }
        super.onDestroy();
      },

    start () {

    },

    // update (dt) {},
});
