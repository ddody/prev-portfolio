var wWidth = $(window).width();
var btn = $("#btn");


$(document).ready(function () {
    secHt();
    boxResize();

    btn.click(function () {
        nav();
    });
    $(".overlay .list .item a").click(function () {
        nav();
    });
    initialization();
});

$(window).resize(function () {
    secHt();
    boxResize();
});

var anchors = ['home', 'ttm', 'akp', 'akis', 'akc', 'ak', 'jeju', 'hotels', 'samsung_newsroom', 'samsung_b2b', 'samsung_event', 'samsung_cebit', 'yoon', 'giant'];
var titleName = ['^', '>', '*', '_', '-', '=', '.', '!', '?', '&', '#', '@', '+', '%'];
var idx = 0;

function initialization() {
    $('#container').fullpage({
        anchors: anchors,
        navigation: true,
        navigationPosition: 'right',
        responsiveWidth: 1025,
        responsiveHeight: 650,
        onLeave: function (index, nextIndex, direction) {
            if (direction == "down") {
                idx = index;
            } else {
                idx = nextIndex - 1;
            }
            $("#logo h1 a span").text(titleName[idx]);
        }
    });
}

function disableS() {
    $(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function (e) {
        e.preventDefault();
        return;
    });

    $(window).on("keydown.disableScroll", function (e) {
        var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        for (var i = 0; i < eventKeyArray.length; i++) {
            if (e.keyCode === eventKeyArray[i]) {
                e.preventDefault();
                return;
            }
        }
    });
}

function secHt() {
    var wHeight = $(window).height();
    var wWidth = $(window).innerWidth();
    var secH01 = $("#section0").height();
    var titleHeight = $("#title_header").height();
    var homeTitle = $(".home_title .table");

    var query = Modernizr.mq('(max-width:1024px)');
    if (query) {
        if (secH01 < wHeight / 2) {
            homeTitle.css("height", (wHeight / 2) - titleHeight);
        }
    } else {
        homeTitle.css("height", "100%");
    }
}

function boxResize() {
    var boxW = $(".sec_img").width();
    var ratio = parseFloat(9 / 14).toFixed(3);
    var boxH = Math.floor(boxW * ratio);
    $(".sec_img").height(boxH);
}

var title = [];
var title_sec = [];
var article = $(".article");
article.each(function (idx, el) {
    title[idx] = article.eq(idx).find("h3").text();
    title_sec[idx] = article.eq(idx).find("h4").text();
});

var list = $(".overlay .table .list");
for (var i = 0; i < title.length; i++) {
    var listItem;
    listItem = "<div class='item item" + (i + 1) + "'><a href=#" + anchors[i + 1] + ">00" + (i + 1) + " - " + title[i] + " — " + title_sec[i] + "</a></div>";
    list.append(listItem);
}

function nav() {
    if (btn.hasClass("closed")) {
        btn.removeClass("closed");
        $(window).off(".disableScroll");
        $(".overlay").stop().animate({
            "text-indent": "1.2",
            "opacity": "0"
        }, {
                step: function (now, fx) {
                    $(this).css({
                        transform: "matrix(" + now + ", 0, 0, " + now + ", 0, 0)"
                    });
                },
                complete: function () {
                    $(this).css({
                        display: "none"
                    });
                }
            }, 200);
    } else {
        btn.addClass("closed");
        disableS();
        $(".overlay").stop().animate({
            "text-indent": "1",
            "opacity": "1"
        }, {
                step: function (now, fx) {
                    $(this).css({
                        transform: "matrix(" + now + ", 0, 0, " + now + ", 0, 0)"
                    });
                }
            }, 200).css("display", "block");
    }
}

var r = [58, 148, 34, 251, 224, 45, 58, 148, 34, 251, 224, 45, 124], g = [53, 114, 0, 220, 224, 35, 53, 114, 0, 220, 224, 35, 188], b = [63, 42, 128, 210, 224, 117, 63, 42, 128, 210, 224, 117, 182];

list.find(".item a").hover(function () {
    var n = $(this).parent().index();
    $(".overlay").css({
        "background-color": "rgb(" + r[n] + ", " + g[n] + ", " + b[n] + ")"
    });
});
