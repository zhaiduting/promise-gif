import gif from "./gif";

gif.use({
    defaultOptions: {
        width: '30px', height: '30px',
    }
});

gif.wear({
    key: 'width',
    handler(obj) {
        let width = obj.options.width;
        let $dom = obj.$dom;
        $dom.css('width', width);
    }
});

gif.wear({
    key: 'height',
    handler(obj) {
        let height = obj.options.height;
        let $dom = obj.$dom;
        $dom.css('height', height);
    }
});
