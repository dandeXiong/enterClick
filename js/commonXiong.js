var configJS = { apiRootPath: "/swd-web" }; //JS 配置参数

//获取URL上的Get 参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return null;
}
//t1:提示语，t2:显示时间，t3:true/false 成功提示/失败提示， url:提示后的跳转地址，或者执行的函数，top:距离顶部的距离
function tooltip(t1, t2, t3, url, top) {
    $body = $('body');
    t1 = t1 != undefined ? t1 : '哎呀，出错啦 ！';
    t2 = t2 != undefined ? parseInt(t2) : 2500;
    url = url != undefined ? url : null;
    top = top != undefined ? top : "300";
    var tip = '<div class="HTooltip_extend shake animated" style="width:280px;padding:10px;text-align:center;background-color:#D84C31;color:#fff;position:fixed;top:' + top + 'px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">' + t1 + '</div>';
    if (t3) { tip = '<div class="HTooltip_extend fadeIn animated" style="width:280px;padding:10px;text-align:center;background-color:#5cb85c;color:#fff;position:fixed;top:' + top + 'px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">' + t1 + '</div>'; }
    //$('.HTooltip').remove();
    $body.stop().append(tip);
    if (url != null) {
        if ($.isFunction(url)) {
            setTimeout(function() {
                $('.HTooltip_extend').remove();
                url();
            }, t2);
        } else {
            setTimeout(function() {
                $('.HTooltip_extend').remove();
                window.location.href = url;
            }, t2);
        }
    } else {
        setTimeout(function() { $('.HTooltip_extend').remove(); }, t2);
    }
}

function ctnHtmlReplace(ctnBox, tip, html) {
    var tipDefault = "没有搜索到相关信息哦~ ";
    tip = tip != undefined ? tip : tipDefault;
    var noMsg = "<div class=\"noMsgShow\">  " + tip + "   </div>  "; //默认替换内容
    html = html != undefined ? html : noMsg;
    $(ctnBox).html(html);
}


//ajax 登录验证跳转,只做登录的错误拦截验证 ，其他非 1 的状态码，由调用改方法的后续的JS进行处理
function loginAjaxCheck(data, checkType) {
    checkType = checkType != undefined ? checkType : 'user'; //承运商（express），供应商(provider)，服务商(SP)，  普通用户(user)，
    var gotoUrl;
    switch (checkType) {
        case "express":
            gotoUrl = "/login/toExpressLogin.do";
            break;
        case "provider":
            gotoUrl = "/login/toProviderLogin.do";
            break;
        case "SP":
            gotoUrl = "/login/toSPLogin.do";
            break;
        case "user":
            gotoUrl = "/tuser/tuserLogin.do";
            break;
    }
    gotoUrl = configJS.apiRootPath + gotoUrl;

    //返回的格式正确，并且状态码 不为 1
    if (data.status != undefined && data.status != 1) {
        if (data.status == 404001) {
            tooltip("登录超时，请重新登录", 2500, false, gotoUrl);
            return false;
        }
    }
    return true;
}
//回车键操作回调
function enterClick(callback) {
    document.onkeydown = function(e) {
        if (!e) e = window.event;
        if ((e.keyCode || e.which) == 13) {
            if (typeof callback === "function") {
                callback();
            }
        }
    }
}
//回车键处理,如果页面中只有一个表单，回车直接调用方法，可在页面中自定义 enterClickRe() 方法。默认回车键处理以表单分组判断提交
$(document).ready(function() {
    enterClick(function() {
        var elementClick = $(document.activeElement).parents(".formGroupParent").attr("data-enterClick");
        if (elementClick) {
            $("." + elementClick).click();
        } else {
            if (typeof enterClickRe === "function") { //页面自定义方法
                enterClickRe();
            }
        }
    })
})