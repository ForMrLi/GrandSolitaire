//send
// login:               'login',                  // 登陆
// getGameListByType:   'getGameListByType',      // 获取指定游戏房间列表
// entryRoom:           'entryRoom',              // 进入房间
// userBet:             'userBet',                // 玩家下注
// leaveRoom:           'leaveRoom',              // 玩家离开
// userOnBanker:        'userOnBanker',           // 玩家申请上庄
// userOutBanker:       'userOutBanker',          // 玩家申请下庄

//receiver routes
let routes = {
    onGameStart:        'onGameStart',          // 开始游戏
    onBet:              'onBet',                // 其它玩家下注
    roundOver:          'roundOver',            // 结束游戏
    onBankerList:       'onBankerList',         // 庄家列表
  
};
// _.extend(routes, window.routes);

window.niuniu.routes = routes;
