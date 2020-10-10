import ext from "./ext";

function calc(n) {
    let ret = '50%';
    if (n) {
        ret = '50%-(' + n + ')';
        ret = ret.replace(/\s*-\s*/g, ' - ')
            .replace(/\s*\+\s*/g, ' + ')
            .replace(/\(\s*\-\s+/g, '(-')           //e.g: must change (- 100px) to (-100px)
            .replace(/\(\s*\+\s+/g, '(')
        ;
        ret = 'calc(' + ret + ')'
    }
    return ret;
}

//距离中心的水平偏移量 x
ext('x', function (gif) {
    let x = gif.arg.x;
    let $dom = gif.$dom;
    $dom.css('right', calc(x));
});

//距离中心的垂直偏移量 y
ext('y', function (gif) {
    let y = gif.arg.y;
    let $dom = gif.$dom;console.log('y', y);
    $dom.css('bottom', calc(y));
});
