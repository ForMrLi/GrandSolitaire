cc.Class({
    extends: cc.Component,

    properties: {
        num:cc.Sprite,
        suitSmall:cc.Sprite,
        suitBig:cc.Sprite,
        back:cc.Sprite,
        // back: {
        //     default: null,        
        //     type: cc.Sprite, 
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.back.enabled = false;
    },

    setBack(flag){
        this.back.enabled = flag;
    },

    setSuitVisible(flag){
        this.suitBig.node.active = flag;
        this.suitSmall.node.active = flag;
    },

    setVisible(flag){
        this.node.active = flag;
    },
    
    setCardVal(val){
        if(!val){
            return;
        }
        if(val == 74 || val == 75){
            this.setSuitEnabsetSuitVisibleled(false);
            this.num.getComponent(cc.Sprite).spriteFrame = cardsAtlas.getSpriteFrame(val + "");
            return;
        }
        this.setSuitVisible(true);
        let v = val%20;
        let suit = parseInt(val / 20);
        this.num.getComponent(cc.Sprite).spriteFrame = cardsAtlas.getSpriteFrame(v + "");
        this.suitSmall.getComponent(cc.Sprite).spriteFrame = cardsAtlas.getSpriteFrame(suit + "cs");
        this.suitBig.getComponent(cc.Sprite).spriteFrame = cardsAtlas.getSpriteFrame(suit + "cb");
    },

    // start () {

    // },

    // update (dt) {},
});
