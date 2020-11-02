import gif from "./gif";

gif.use({
    defaultOptions: {
        box: document.body
    }
});

//把 gif 装进盒子里，参数为 jquery 能识别的选择器，例如 box: '#box-id'
gif.wear({
    key: 'box',
    handler(obj) {
        let box = obj.options.box;
        let $dom = obj.$dom;
        if (box === document.body)
            $(box).append($dom.css('position', 'fixed'));
        else
            $(box).first().append($dom.css('position', 'absolute'));
    }
});
