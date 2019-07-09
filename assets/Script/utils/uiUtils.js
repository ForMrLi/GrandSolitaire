var uiUtils = {
    createAnimation(data){
        var node = data.node;
        if(!node){
            node = new cc.Node();
        }
        node.addComponent(cc.Sprite);
        var animation = node.addComponent(cc.Animation);
        var frameName = "";
        this.cacheAtlas({
            name:data.atlasName,
            callback:(atlas)=>{
                var frames = [];
                for(let i = 1; i <= data.num; i++){
                    frameName = data.frameName + (i > 9 ? "" + i : "0" + i);
                    frames.push(atlas.getSpriteFrame(frameName));
                }
                var clip = cc.AnimationClip.createWithSpriteFrames(frames, data.num);
                clip.name = data.animationName;
                clip.wrapMode = data.wrapMode;
                clip.speed = data.speed || 1;
                animation.addClip(clip);
                if(data.callback){
                    data.callback(node,animation);
                }
            }
        })
    },
    //"hudieAnim-tutorial10"

    cacheAtlas:function(data){
        if(!data.name){
            // if(data.errCallBack){
            //     data.errCallBack();
            // }
            return
        }
        if(window[data.name + "Atlas"]){
            if(data.callback){
                data.callback();
            }
        }else{
            cc.loader.loadRes(data.name, cc.SpriteAtlas, function (err, atlas) {
                window[data.name + "Atlas"] = atlas;
                if(data.callback){
                    data.callback(atlas);
                }
            });
        }
    },
    loadPerfab(data){
        cc.loader.loadRes(data.name, function (err, prefab) {
            if(!err){
                var node = cc.instantiate(prefab);
                if(data.callback){
                    data.callback(node);
                }
            }
        })
    },
    releaseAtlas(data){
        window[data.name] = null;
        cc.loader.release(data.texture);
    },
    releasePrefab(data){
        cc.loader.release(data.prefab);
        var deps = cc.loader.getDependsRecursively(data.name);
        cc.loader.release(deps);
    },
    cutTexture(frame,index){
        index = index || 1;
        var rect = frame.getRect().clone();
        if(frame.isRotated()){
            rect.width = frame.getRect().height;
            rect.height = frame.getRect().width;
        }
        rect.width = rect.width/2; 
        rect.height = rect.height/2;
        switch(index){
            case 2:
                rect.x +=rect.width;
            break;
            case 3:
                rect.y +=rect.height;
            break;
            case 4:
                rect.x +=rect.width;
                rect.y +=rect.height;
            break;
        }
        return new cc.SpriteFrame(frame.getTexture(),rect);
    },
    updateHead (data) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var url = data.url;
            var head = data.head;
            var headBorder = data.headBorder;
            if(!url || url.length < 5){
                head.active = false;
                if(headBorder){
                    headBorder.active = false;
                }
                return
            }
            let image = wx.createImage();
            image.onload =  function() {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                head.active = true;
                if(headBorder){
                    headBorder.active = true;
                }
                if(head && head.parent && head.getComponent(cc.Sprite)){
                    head.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                }

            };
            image.src = url;
        }
    },
    //弹框 msg
    toast(data){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.showToast({
                title: data.msg,
                icon: data.icon || 'none',
                duration: data.duration || 2000
            })
        }
    },
    systemTip(text,timer){
        if(!text){return}
        this.showDialog({
            dialogName:"systemTip",
            ctrlName:"SystemTipCtrl",
            data:{text:text,timer:timer},
        });
    },
    promptBox(data){
        this.showDialog({
            dialogName:"tishi",
            ctrlName:"PromptBoxCtrl",
            data:data,
        });
    },
    chestBox(data){
        this.showDialog({
            dialogName:"chetesTips",
            ctrlName:"ChetesTishiCtrl",
            data:data,
        });
    },
    showDialog:function (data) {
        if(!data.dialogName || !data.ctrlName){return;}
        var dialog = cc.find("Canvas/" + data.dialogName);
        if(dialog){
            if(dialog.active){
                return;
            }
            dialog.getComponent(data.ctrlName).show(data.data);
            return;
        }
        cc.find("Canvas/loading").active = true;
        this.loadPerfab({name:data.dialogName,
            callback:function(node){
                cc.find("Canvas").addChild(node,98);
                node.getComponent(data.ctrlName).show(data.data);
                cc.find("Canvas/loading").active = false;
            }
        });
    },
    replaceSceneAnim(type, node) {
        switch (type || 0) {
            case 1:
                break;
            default:
                break;
        }
    }
}
module.exports = uiUtils;