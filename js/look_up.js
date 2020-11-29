var dataUrl = "/love_sufe/data/7dayscp_2020_12.csv";
var dataUrlBackup = "/love_sufe/data/7dayscp_2020_12.csv";
var w = window.innerWidth;

function warning() {
    alert("该功能仍待开发");
}

function initdata() {
    var user_id = document.getElementById('id_right').value;
    var user_wechat = document.getElementById('name_right').value;
    var v = document.getElementById('vanish');
    var l = document.getElementById('look_up');
    //console.log(v)
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function(res) {
            var chartData = res;
            var datalist1 = [];
            var datalist2 = [];
            var Data = [];
            var relArr = chartData.split("\n");
            //console.log(relArr);
            if (!$.isEmptyObject(relArr) && relArr.length > 1) {
                for (var key = 1, len = relArr.length; key < len; key++) {
                    var values = relArr[key];
                    if (!$.isEmptyObject(values)) {
                        //console.log(values);
                        var obj = {};
                        var objArr = values.split(",");
                        obj["id"] = objArr[0]
                        obj["name"] = objArr[1];
                        obj["wechat_1"] = objArr[2];
                        obj["cp_id"] = objArr[3];
                        obj["wechat_2"] = objArr[4];
                        obj["att1"] = objArr[5];
                        obj["att2"] = objArr[6];
                        obj["att3"] = objArr[7];
                        obj["att4"] = objArr[8];
                        obj["att5"] = objArr[9];
                        obj["att6"] = objArr[10];
                        if (!$.isEmptyObject(objArr)) {
                            Data.push(obj);
                        }
                    }
                }
            }

            for (var i in Data) {
                var id = Data[i].id;
                var name = Data[i].name;
                var cp_id = Data[i].cp_id;
                var wechat_2 = Data[i].wechat_2;
                var att1 = Data[i].att1;
                var att2 = Data[i].att2;
                var att3 = Data[i].att3;
                var att4 = Data[i].att4;
                var att5 = Data[i].att5;
                var att6 = Data[i].att6;
                datalist1[id] = [];
                datalist2[id] = [];
                datalist1[id].push({
                    name: name,
                    cp_id: cp_id,
                    wechat: wechat_2
                });
                datalist2[id].push({
                    wechat: wechat_2,
                    att1: att1,
                    att2: att2,
                    att3: att3,
                    att4: att4,
                    att5: att5,
                    att6: att6,
                });
            }


            for (var i in Data) {
                //console.log(Data[i].id);
                //console.log(Data[i].name);
                //验证身份
                if (user_id == Data[i].id && user_wechat == Data[i].wechat_1) {
                    var html1 = "";
                    var html2 = "";

                    html1 += '<div class="index_card__3l_i4 index_displayCard__1-3Kb"><div class="index_displayCardTitle__L0l1S">' +
                        '<a href="#"><i class="fa fa-heartbeat"></i></a>' +
                        '匹配信息</div><div class="index_displayCardContent__3J3lN"><div class="Item_formItem__1u0yT"><div class="Item_formItemLabel__21cKJ">' +
                        '您的组号</div><div class="Item_formItemContent__ByW4i"><div class="index_formInputGroupContent__1ERpf"><div class="index_formInputGroupInputWrapper__3icys"><div class="index_inputWrapper__Du7MC index_default__3LVnT">' +
                        '<input type="text" class="index_input__JggqB" value="' + Data[i].cp_id + '" readonly="" style="text-align:start" autocomplete="on"></div></div></div></div>' +
                        '<div class="Item_formItemErrorMessage__1fmbI"></div></div><div class="Item_formItem__1u0yT"><div class="Item_formItemLabel__21cKJ">' +
                        '匹配到的微信号</div><div class="Item_formItemContent__ByW4i"><div class="index_formInputGroupContent__1ERpf"><div class="index_formInputGroupInputWrapper__3icys">' +
                        '<div class="index_inputWrapper__Du7MC index_default__3LVnT">' +
                        '<input type="text" class="index_input__JggqB" value="' + Data[i].wechat_2 + '" readonly="" style="text-align:start" autocomplete="on"></div></div></div></div>' +
                        '<div class="Item_formItemErrorMessage__1fmbI"></div></div></div></div>';
                    html2 += '<div class="Item_formItemLabel__21cKJ">' +
                        '匹配信息</div><div class="Item_formItemContent__ByW4i"><div class="index_formInputGroupContent__1ERpf"><div class="index_formInputGroupInputWrapper__3icys"><div class="index_inputWrapper__Du7MC index_default__3LVnT">' +
                        '<input type="text" class="index_input__JggqB" value="由于' + Data[i].wechat_2 + '，' + '" readonly="" style="text-align:start" autocomplete="on"></div><div class="index_inputWrapper__Du7MC index_default__3LVnT">' +
                        '<input type="text" class="index_input__JggqB" value="' + '很抱歉' + Data[i].cp_id + '。' + '" readonly="" style="text-align:start" autocomplete="on">' + '</div></div></div></div>' +
                        '<div class="Item_formItemErrorMessage__1fmbI"></div></div><div class="Item_formItem__1u0yT">';
                    if (Data[i].cp_id == "本期暂无配对") {
                        v.innerHTML = html2;
                    } else {
                        l.innerHTML = html1;
                        v.innerHTML = '';
                    }

                    return;
                }
            }
            alert("学号微信号有误");
            return;
        },
        error: function(res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.dataUrlBackup;
                $.ajax(this);
            }
        }
    });
}