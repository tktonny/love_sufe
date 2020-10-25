var dataUrl = "/love_sufe/data/7dayscp_2020_11.csv";
var dataUrlBackup = "/love_sufe/data/7dayscp_2020_11.csv";
var w = window.innerWidth;

function warning() {
    alert("该功能仍待开发");
}

function initdata() {
    var user_id = document.getElementById('id_right').value;
    var user_name = document.getElementById('name_right').value;

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
            //验证身份
            console.log(user_id);
            console.log(user_name);

            for (var i in Data) {
                //console.log(Data[i].id);
                //console.log(Data[i].name);
                if (user_id == Data[i].id && user_name == Data[i].name) {
                    var html = "";
                    html += '<div class="item">\n' +
                        '            <h1 style="color:#ebedf4; text-align: center;">CP匹配结果</h1><br>\n' +
                        '            <div style="height: 20px;"></div>\n' +
                        '            <div style="background: rgba(0, 0, 0, 0.5);border: none;padding: 12px 15px;margin: 8px 0;width: 100%;outline: none;">' +
                        Data[i].id +
                        '            </div>\n' +
                        '            <div style="height: 20px;"></div>\n' +
                        '            <div style="background: rgba(0, 0, 0, 0.4);border: none;padding: 12px 15px;margin: 8px 0;width: 100%;outline: none;">' +
                        Data[i].name +
                        '            </div>\n' +
                        '            <div style="background: rgba(0, 0, 0, 0.3);border: none;padding: 12px 15px;margin: 8px 0;width: 100%;outline: none;">' +
                        Data[i].wechat_2 +
                        '            </div>\n' +
                        '        </div>';
                    document.getElementById('vanish').innerHTML = html;
                    return;
                }
            }
            alert("学号姓名有误");
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