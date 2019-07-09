var myUtils = {

    playEffect:function (audio, loop, volume) {
        if(!__G.sound){return;}
        loop = loop || false;
        volume = volume || 1;
        cc.loader.loadRes(audio,cc.AudioClip, function(err,clip){
            if(err){
                cc.log("播放音频出错:",err);
                return;
            }
            var audioUid = cc.audioEngine.playEffect (clip,loop,volume);
            cc.audioEngine.setFinishCallback(audioUid, function () {
                cc.loader.release(clip);
            });
        });
    },

    playMusic:function (audio, loop, volume) {
        if(!__G.music){return;}
        loop = loop || false;
        volume = volume || 1;
        cc.loader.loadRes(audio,cc.AudioClip, function(err,clip){
            if(err){
                cc.log("播放音频出错:",err);
                return;
            }
            var audioUid = cc.audioEngine.playMusic (clip,loop,volume);
            cc.audioEngine.setFinishCallback(audioUid, function () {
                cc.loader.release(clip);
            });
        });
    },

    stopAudio:function (audio) {
        cc.audioEngine.stop(audio);
    },

    pauseAudio (audio) {
        cc.audioEngine.pause(audio);
    },

    resumeAudio (audio) {
        if(!__G.sound){return;}
        cc.audioEngine.resume(audio);
    },

    shake:function () {
        if(!__G.shake){return;}
    },

    loadPerfab(data){
        cc.loader.loadRes(data.name, function (err, prefab) {
            var node = cc.instantiate(prefab);
            if(data.callback){
                data.callback(node);
            }
        })
    },

    loadAni(data){
        cc.loader.loadRes(data.name, function (err, clip) {
            if(data.callback){
                data.callback(clip);
            }
        })
    },

    loadDragonBones(data){
        cc.loader.loadRes(data.name, dragonBones.DragonBonesAsset, function (err, asset) {
            if(data.callback){
                data.callback(asset);
            }
        })
    },

    rangeNum:function (min,max) {
        var range = max - min;
        var rand = Math.random();
        var num = min + Math.round(rand * range); //四舍五入
        return num;
    },

    subStrToArray(str,len) {
        var arr = [];
        var str1;
        var str2;
        while(true){
            str2 = "";
            if(str.length - (arr.length + 1) * len >  0){
                str1 = str.substr(arr.length * len,len);
                for(var s of str1){
                    str2 += s + "\n"
                }
                arr.push(str2);
            }else{
                str1 = str.substr(arr.length * len);
                for(var s of str1){
                    str2 += s + "\n"
                }
                arr.push(str2);
              break;
            }
        }
        return arr;
    },

    formatNumber(num){
        var arr = ["","K","M","B","T","aa","bb","cc","dd","ee","ff","gg","hh","ii","jj","kk"];
        num = parseFloat(num);
        num = Math.floor(num);
        var len = (num + "").length;
        var index = (num + "").indexOf("e+");
        if(index > 0){
            len = (num + "").substr(index+2)
            len = parseInt(len)+ 1
        }
        var s;
        if(len <= 3){
            s = num;
        }else{
            var subLen = len % 3;
            if(subLen == 0){
                subLen = 3;
            }
            s = (num + "").replace(".","")
            s = s.substr(0,subLen) + arr[parseInt((len -1)/3)];
        }
        return s
    },

    formatNumberToFixed(num){
        var arr = ["","K","M","B","T","aa","bb","cc","dd","ee","ff","gg","hh","ii","jj","kk"];
        num = parseFloat(num);
        num = Math.floor(num);
        var len = (num + "").length;
        var index = (num + "").indexOf("e+");
        if(index > 0){
            len = (num + "").substr(index+2)
            len = parseInt(len)+ 1
        }
        var s;
        if(len <= 3){
            s = num;
        }else{
            var subLen = len % 3;
            if(subLen == 0){
                subLen = 3;
            }
            s = (num + "").replace(".","")
            num = s.substr(0,subLen + 2);
            num = num / 100;
            s = num + arr[parseInt((len -1)/3)];
        }
        return s
    },

    formatNumberToFixed1(num){
        var arr = ["","K","M","B","T","aa","bb","cc","dd","ee","ff","gg","hh","ii","jj","kk"];
        num = parseFloat(num);
        num = Math.floor(num);
        var len = (num + "").length;
        var index = (num + "").indexOf("e+");
        if(index > 0){
            len = (num + "").substr(index+2)
            len = parseInt(len)+ 1
        }
        var s;
        if(len <= 3){
            s = num;
        }else{
            var subLen = len % 3;
            if(subLen == 0){
                subLen = 3;
            }
            s = (num + "").replace(".","")
            num = s.substr(0,subLen + 1);
            num = num / 10;
            s = num + arr[parseInt((len -1)/3)];
        }
        return s
    },

    numberChange(num) {
        var txt;
        txt=num+"";
       if(num>=10000&&num<1000000){
        txt=(num/1000).toFixed(2)+"K";
       }else if(num>=1000000&&num<100000000){
        txt=(num/1000000).toFixed(2)+"M"
       }else if(num>=100000000){
        txt=(num/100000000).toFixed(2)+"B";
       }

       return txt;
    },

    isInDay:function (time,day){
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var daySec = 86400000;
        return date.getTime() + daySec - time <= daySec * day
    },
    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒
     */
    sec_to_time(s) {
        return [parseInt(s / 60 / 60), parseInt(s / 60 % 60), parseInt(s % 60)].join(":")
            .replace(/\b(\d)\b/g, "0$1");
    },
    /**
     * 时间转为秒
     * @param time 时间(00:00:00)
     * @returns {string} 时间戳（单位：秒）
     */
    time_to_sec(time) {
        var s = '';

        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];

        s = Number(hour*3600) + Number(min*60) + Number(sec);

        return s;
    }

}
module.exports = myUtils;
