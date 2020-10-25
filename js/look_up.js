var dataUrl = "/love_sufe/data/7dayscp_2020_11.csv";
var dataUrlBackup = "/love_sufe/data/7dayscp_2020_11.csv";
var w = window.innerWidth;

function initdata() {
    var user_id = document.getElementById('id_right');
    var user_name = document.getElementById('name_right');
    console.log(user_id.values);
    console.log(user_id.values);
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
                datalist1[id].push({
                    id: id,
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


            for (var i in Data) {
                if (user_id == Data[i].id && user_name == Data[i].name) {
                    var parent = document.getElementById("right");
                    var child = document.getElementById("vanish");
                    parent.removeChild(child);
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