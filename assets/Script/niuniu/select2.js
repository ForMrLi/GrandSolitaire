// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        help:cc.Node,
        his:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onHideClick();
    },

    onHideClick () {
        this.help.active = false;
        this.his.active = false;
    },

    onBackClick () {
        console.log("onClick --> 返回主页面");
        cc.director.loadScene("main");
    },

    onSelectItemClick () {
        // console.log("onClick --> 进入二级界面的选择房间界面");
        console.log("onClick --> 进入游戏界面");
        // cc.director.loadScene("niuniuGame");
    },

    onHelpClick () {
        console.log("onHelpClick --> ");
        this.help.active = true;
        this.his.active = false;
    },

    onHisClick () {
        console.log("onHelpClick --> ");
        this.help.active = false;
        this.his.active = true;
    },

    // update (dt) {},
});
