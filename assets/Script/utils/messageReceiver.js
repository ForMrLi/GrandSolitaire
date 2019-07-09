(function() {
    let MessageReceiver = function(gameScene) {
      this.gameScene = gameScene;
      this.messages = [];
      this.next = next.bind(this);
    };
  
    let proto = MessageReceiver.prototype;
  
    proto.clean = function() {
      clearTimeout(this._handler);
      this.messages = [];
    };
  
    proto.destroy = function() {
      this.clean();
      this._invalid = true;
    };
  
    proto.receive = function(route, msg) {
      if (this._invalid) return;
      logger.log('MR', route, msg);
      this.messages.push([route, msg]);
      this.invoke();
    };
  
    proto.delay = function(delay) {
      clearTimeout(this._handler);
      this._delaying = true;
      this._handler = setTimeout(function() {
        this.next();
      }.bind(this), delay || 50);
    };
  
    function next() {
      this._delaying = false;
      this.job = null;
      this.invoke();
    };
  
    proto.invoke = function() {
      if (this.job) return;
  
      this.job = this.messages.shift();
  
      if (this.job) {
        let route = this.job[0];
        let msg = this.job[1];
  
        if (!this.gameScene || !this.gameScene[route]) {
          return this.next();
        }
  
        logger.log('MR call', route);
        this.gameScene[route].call(this.gameScene, msg);
  
        if (!this._delaying) {
          this.delay(50);
        }
      }
    };
  
  })();
  