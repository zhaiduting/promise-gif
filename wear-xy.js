import gif from "./gif";

gif.use({
    defaultOptions: {
        x: 0, y: 0,
    }
});

function calc(n) {
    n = n.replace(/\s*-\s*/g, ' - ')
        .replace(/\s*\+\s*/g, ' + ')
        .replace(/\(\s*\-\s+/g, '(-')           //e.g: must change (- 100px) to (-100px)
        .replace(/\(\s*\+\s+/g, '(')
    ;
    n = 'calc(' + n + ')';
    return n;
}

//距离中心的水平偏移量 x
gif.wear({
    key: 'x',
    handler(obj) {
        let x = obj.options.x;
        let $dom = obj.$dom;
        let left = $dom.css('left');
        $dom.css('left', calc(left + x));
    }
});

//距离中心的垂直偏移量 y
gif.wear({
    key: 'y',
    handler(obj) {
        let y = obj.options.y;
        let $dom = obj.$dom;
        let top = $dom.css('top');
        $dom.css('top', calc(top + y));
    }
});
