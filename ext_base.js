import space from "./space";
import ext from "./ext";

//使用不同的 id 创建不同的 gif 动画
ext('id', function (gif) {
    let id = gif.arg.id;
    let $dom = $('#' + id);
    if (!$dom.length) {
        $dom = $(
            '<div id="' + id + '" style="bottom:50%;right:50%;display:none;visibility:hidden;">' +
            '<img style="position:absolute;width:100%;height:100%;bottom:-50%;right:-50%;visibility:visible;">' +
            '</div>'
        ).css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
        });
    }
    gif.$dom = $dom;
});

//使用 time 控制图片显示的时间，单位毫秒
ext('time', function (gif) {
    let time = gif.arg.time;
    let $dom = gif.$dom;
    $dom.data(space + 'time', time);
});

//把 gif 装进盒子里，参数为 jquery 能识别的选择器，例如 box: '#box-id'
ext('box', function (gif) {
    let box = gif.arg.box;
    let $dom = gif.$dom;
    if(box === document.body)
        $(box).append($dom.css('position', 'fixed'));
    else
        $(box).first().append($dom.css('position', 'absolute'));
});

//图片的 src 也可以是 base64 编码
ext('src', function (gif) {
    let src = gif.arg.src;
    let $dom = gif.$dom;
    $dom.children('img').prop('src', src);
});

ext('width', function (gif) {
    let width = gif.arg.width;
    let $dom = gif.$dom;
    $dom.css('width', width);
});

ext('height', function (gif) {
    let height = gif.arg.height;
    let $dom = gif.$dom;
    $dom.css('height', height);
});
