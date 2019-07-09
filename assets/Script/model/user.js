
cc.Class({
    extends: cc.EventTarget,

    properties: {
        uid: 0,
        nick: null,
        avatar: null,
        gender: 0,
        token: null,

        // 当前所在牌桌
        tid: 0,
        kind: null,
    },

    // onLoad () {},

    updateInfo: function(data) {
        logger.log('update current user', data);
        if (!data) return;
        if (undefined !== data.token) this.token = data.token;
        if (data.id) this.id = data.id;
        if (data.nick) this.nick = data.nick;
        if (data.avatar) this.avatar = data.avatar;
        if (data.gender) this.gender = data.gender;
        if (undefined !== data.tid) this.tid = data.tid;
        if (data.kind) this.kind = data.kind;
        this.emit('updated');
    },

    refresh: function() {
        if (!this.token) return;
    },

});
