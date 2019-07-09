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

    setSuitEnabled(flag){
        this.suitBig.enabled = flag;
        this.suitSmall.enabled = flag;
    },

    setEnabled(flag){
        this.node.enabled = flag;
    },
    
    setCardVal(val){
        if(!val){
            return;
        }
        if(val == 74 || val == 75){
            this.setSuitEnabled(false);
            this.num.getComponent(cc.Sprite).spriteFrame = cardsAtlas.getSpriteFrame(val + "");
            return;
        }
        this.setSuitEnabled(true);
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
