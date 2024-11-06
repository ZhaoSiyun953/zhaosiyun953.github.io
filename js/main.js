
function changeNumber(selector, num, percent, suffix) {
    let _suffix = suffix || ""
    let str = "" + parseInt(num * percent) + _suffix
    $(selector).text(str)
    $(selector).attr("text", str)
}

function changeNumByPercent(p) {
    changeNumber(".info-1", 5, p, "+")
    changeNumber(".info-2", 20, p, "+")
    changeNumber(".info-3", 7, p)
}

$("#contact-btn").on("click", function() {
    $("#contactDialog").modal({
        show: true
    })
})

window.onbeforeunload = function() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0;
}

function initBanner() {
    let noneItem = $(".banner .item-none")
    let item1 = $(".banner .item-1")
    let item2 = $(".banner .item-2")
    for(let i = 0; i < 6; i++) {
        noneItem.append(getBannerItems())
        item1.append(getBannerItems())
        item2.append(getBannerItems())
    }
    setTimeout(function() {
        let width = $(".banner .item-1").width()
        console.log("banner width: ", width)
        $(":root").css("--banner-anmi-width", "-" + (width/2)+"px")
        $(":root").css("--banner-anmi-width2", (width/2)+"px")
    }, 1000)
}

function getBannerItems() {
    return "<div class=\"span-layer\"><span class=\"text\">Design</span><img src=\"images/Star.png\" alt=\"\"/></div>\n" +
        "<div class=\"span-layer\"><span class=\"text\">Create</span><img src=\"images/Star.png\" alt=\"\"/></div>\n" +
        "<div class=\"span-layer\"><span class=\"text\">Develope</span><img src=\"images/Star.png\" alt=\"\"/></div>\n";
}

initBanner()

$(document).ready(function(){
    let height = $(".ab-title").height()
    let numObj = {n: 0}
    console.log("height: ", height)
    changeNumByPercent(0)
    $(".right-info").css({"opacity": 0})

    //动画时间轴
    let tl = gsap.timeline()
    tl.fromTo(".top-circle.portrait-circle",
            {alpha: 0, x: "100%", y: "100%"},
            {alpha: 1, x: 0, y: 0, duration: 2, delay: 1})
        .fromTo(".bottom-circle.portrait-circle",
            {alpha: 0, x: "-100%", y: "-100%"},
            {alpha: 1, x: 0, y: 0, duration: 2}, "<")
        .fromTo(".star-l1",
            {alpha: 0, x: 102, y: 23},
            {alpha: 1, x: 0, y: 0, duration: 2}, "<")
        .fromTo(".star-l2",
            {alpha: 0, x: 127},
            {alpha: 1, x: 0, duration: 2}, "<")
        .fromTo(".star-l3",
            {alpha: 0, x: 162, y: -101},
            {alpha: 1, x: 0, y: 0, duration: 2}, "<")
        .fromTo(".star-r1",
            {alpha: 0, x: -80, y: 15},
            {alpha: 1, x: 0, y: 0, duration: 2}, "<")
        .fromTo(".portrait", {y: "100%"}, {y: 0, duration: 2}, "<")
        .fromTo(".portrait-layer", { x: "-50%", scale: 1.2 }, { x: 0, scale: 1, duration: 3 })
        .fromTo(".navbar", {y: "-100%"}, {y: 0, duration: 2}, "<")
        .fromTo(".h-l1, .h-l2, .h-l3, .banner", {y: "100%"}, {y: 0, duration: 2, autoAlpha: 1}, "<")
        .fromTo(".left-imgs .img-bg", {alpha: 0}, {alpha: 1, duration: 2}, "<")
        .fromTo(".left-imgs .img-pic", {y: "100%"}, {y: 0, duration: 2}, "<")
        .fromTo(".ab-title", {y: "100%"}, {y: 0, duration: 2, scrollTrigger: ".ab-title",
            onStart: ()=> { $(".right-info").css({"opacity": 1})},
            // onComplete: () => { $("html").css('overflow-y', 'scroll') }
        }, "<")
        .to(numObj, {n: 100, duration: 1.5, ease: "none",
            onUpdate: function() {
                let current = numObj.n
                let p = current / 100;
                changeNumByPercent(p)
            }}, "<")
        .to(".star-l1", {x: "100%", y: "100%", repeat: -1, yoyo: true, duration: 6}, "<")
        .to(".star-l2", {x: "-100%", repeat: -1, yoyo: true, duration: 4.5}, "<")
        .to(".star-l3", {x: "100%", y: "-100%", repeat: -1, yoyo: true, duration: 5}, "<")
        .to(".star-r1", {x: "100%", y: "-100%", repeat: -1, yoyo: true, duration: 5.5}, "<")

    setTimeout(() => $("html").css('overflow-y', 'scroll'), 5000)

    $("#contactDialog").on('hidden.bs.modal', function() {
        $("#full-name").val("")
        $("#email").val("")
        $("#message").val("")
    })

    //发送消息
    let isSendingMsg = false
    $("#send-btn").click(function() {
        if(isSendingMsg) {
            alert("Message is sending now, please wait")
            return
        }
        let name = $("#full-name").val()
        let email = $("#email").val()
        let message = $("#message").val()
        let checkList = [
            {key: "name", value: name, maxLen: 20, tips: "Your Full Name"},
            {key: "email", value: email, maxLen: 50, tips: "Your Email Address"},
            {key: "message", value: message, maxLen: 300, tips: "The Message"}
        ]
        for(idx in checkList) {
            let item = checkList[idx]
            if(!item.value) {
                alert("Please input " + item.tips)
                return
            }
            if(item.value.length > item.maxLen) {
                alert("Input text length too long, must below " + item.maxLen + " letters");
                return
            }
        }

        isSendingMsg = true
        $.ajax({
            url: "/add-message",
            method: "POST",
            data: { name, email, message },
            success: function() {
                isSendingMsg = false
                $("#contactDialog").modal('hide')
                alert("Send success")
            },
            error: function(e) {
                isSendingMsg = false
                alert("There were some errors")
            }
        })
    })
})
