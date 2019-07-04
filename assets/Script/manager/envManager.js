let EnvManager = {};

(function() {
  let hosts = [
    'http://qn.imbackr.com',
    'https://qns.imbackr.com',
    'https://qnh.imbackr.com',
  ];

  let host = hosts[0];
  let updating;
  
  EnvManager.update = function() {
    if (CONFIG.test) return;
    if (updating) return;
    
    updating = true;

    requestConfig(function(err, json) {
      updating = false;
      if (!json || err) return;

      if (json.api) {
        CONFIG.base_url = json.api;
      }

      if (json.host && json.port) {
        CONFIG.host = json.host;
        CONFIG.port = json.port;
      }
    });
  };

  function switchHost() {
    let idx = hosts.indexOf(host);
    let i = idx + 1;
    if (i >= hosts.length || i < 0) {
      i = 0;
    }
    host = hosts[i];
  }

  function requestConfig(callback) {
    if (!CONFIG.game_id || !callback) return;
    let url = host + '/c/' + CONFIG.game_id + '.json?' + Date.now();
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.timeout = 30 * 1000;
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
        return;
      }

      var json;
      if (xhr.status == 200) {
        var response = xhr.responseText;
        try {
          json = JSON.parse(response);
        } catch(e) {}
      }

      callback(!json, json);
    };

    function onError(e) {
      switchHost();
      setTimeout(function() {
        requestConfig(callback);
      }, 1000);
    }

    xhr.ontimeout = onError;
    xhr.onerror = onError;
    xhr.send();
  }
})();
