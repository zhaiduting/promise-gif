/**
 * Created by zhaiduting@163.com, 2019-3-15
 *
 * The default usage is as follow
 *     promiseInstance.gif()
 * Or with configuration
 *     promiseInstance.gif({width: '3rem', height: '3rem', src: 'xx.gif'})
 * Debug with log
 *     promiseInstance.gif({log: true})
 * Can be called multiple times
 *     axios.get(xxx).gif().then(res=>axios.post(xxx)).gif().then(xxx)
 *
 * Can also adjust the position by x or y
 *     promiseInstance.gif({width: '100px', height: '100px', x: '-21.8%+50px', y: '11.8%-50px', src: 'xx.gif'})
 *
 * Or put gif in a box by box-selector, the box must be relative
 *     promiseInstance.gif({box: '#sample2-box'})
 */

let $= window.jQuery|| window.$;

let x=0, y=0;                   //图片默认居中显示，可以通过给x或y传值的办法调整最终的显示位置
let width='30px', height='30px';
let gif='data:image/gif;base64,R0lGODlhLAAsAPYsACQkJDs7O3l5eQDY/zzh/0zj/1Lk/1fl/5nv/53w/6Hw/6Tx/8H1/8T1/8r2/+H6//n5+fv+//7+/4CAgCsrKwPY/1/m/4WFhYuLi4fs/4ns/42NjeT6//f39zAwMJKSks/3/0jj/1rl/0vj/xXb/z09PRjb/+78/xvc/+z8/zY2NgzZ/y4uLkBAQGHm/2no/2zo/3rq/6zy/7Tz/9v5//T9/wnZ/3Xp/5Pu//L9/y3e/2Xn/5bu/9H3/9f4//Ly8p2dnX5+foHr/6nx/5WVlUVFRZqampzv/0hISHZ2dk9PT6Kior71/9/6/7r0/zPf/zbg/3Lp/37r/4Ps/4/t/+j7/1JSUlRUVHFxcampqdP4/zMzM3Nzc3t7e4ODg2xsbB7c/6ysrLGxsaLw/+/v7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAsACwCAAEAKQApAAAG/0CWcEgsCk8ai0VzMjqfUCJHVKgWRI+odpuxVkeZrfh58I5GhrGa+LWODkVGAWUqMNbG7vkbHmYGgIEaUREMCgoNEkUPInsjWEMMgZMDDVAMCJkIlkUnGUoZKUQElIEhUAqaCAtrpYEkUAmqCq2uAytQDaoOa6SuBFARDgsLiWsMFa6ceGIapYPManImdXfR19jZ2tvcT0hKTCwQGwEBGxDdLFNeWBgA7wAY6V1eBRkq8AAq6WX1Bvjw9nXr5+WAO3jyutH7AgbCBRUBLqDrxsgNpHRGPIFqgrGjx48gQ6brsKFECQyK8EgAQcxBSigX8n1gBmKXFgr5BK5JpSnBzTqczHhm8hlFQL4LzHRpsgalwwQPHiQaGVfunBEJDRQkMJbt4LuEIQG+0wlSrD6RLLzGQ+swgAqpeIIAACH5BAkKAB4ALAIAAgAqACgAAAf/gB6Cg4SFghEMCQkNEoaOj5CGDAiUCA6RmJmDCZUICpqgkJyVC6GmhQ6dPYYcQgYGUhyZP0kAFEEdhhIOQ0OrhQ8GBSMFBQY0mAIAywAYp1PF0QUxkRLMywGnB9LFBpEQFNctpxbcBQeYG9dApzjmGpgSREhI7Kc5LsXEFjmn/jUIYLzg0c+fwYMIEypcaFABgQo2CMhgGMnCgIsYb3joIIACiwkQKB7BSHLADGXMnDHUURLjiHDMsi2U0BIjCZjYGNKsOcAEhmtGKBLgWQDChiL1KHpoUKFlBR9KDWkoWQFBVEcORpBAcQDq1a9gw4r1UCXDgQNTZGHqEIQFiwshZk092EbM2ANMtZhdOJWB2wgh1XACkBlqm7QR3iBJEEwY1IERkKOhizTh2oZTVCDXHQEvUocNJVoQaVQIkSJGhXKUi2YhhcJJlS6lprJjB5UTC0dR+jTWg24EpXqnqvRr7K5exU8FAgAh+QQJCgATACwBAAIAKQAqAAAH/4ATgoOEhYM/WAAUQRCGjo+QhV8AlAAYkZiZExIslQAlmqGPHp4topESkBeeS4+NmmSTABevhBJGSlZZjoiUArWPspQfp4ICnheREJ6fxROdlQHKFJ5FzqSVppEYnmHOH6yYt0pXYs6CS7m75+zt7u/w8fLz9MURTAgIDKnz9whH+ybgy4fAAb2B+RxISEAQwYJ5Eho6nKCg4cN5Eh82IJjAB72NBD1K6CFDBo16I0uerMeypcuXMN01iVHAgIYUzppIqZmhSiQtBgoILXAApygaQYceOAEpyoihBUZQORVjxFOhIzI8igAVqwtH/ApJ6BrVwlayBXYUUqBjwAACM2FsoTX7SAjZBIREuN07AAahDGQRQKoi4mraCIPG8OUbV9AJC4Zd1Ih0gscOGAoQD2q72O0IQpVfwEig2VmEzntNtETtFkzLEKxFtHRQoXOFHi551N67YghMGi+eQIHxoFggACH5BAkKACMALAEAAgAqACkAAAf/gCOCg4SFhEtKSkYSho2Oj4ZAAJMAG5CXmIMtlAAsmZ+PAZwUjKCmgxOcSaeNEiAyQyClhB1Bk0kdjUBKSEQQmCAIwgggrEucGJgLwwgLrEWcHpgJzAmsopyzjgzMDKwXnAKYEgwJCQ3anxAXLBS4rPDx8vP09fb38BEKUTBHNfiOcuwoQLCAhRwAESlixKNgQQ34JFH6MMKCQ4IG8G2i5EnExQIG0snDNokChAwfY+BLRWkVhwMODTzAB8EWgCQ/BHEQQjBGE4BAgwodeorGiydPdvQgKiiBjQFQB1TAQdRHhahYHZzyIUOGD5GECmDFGsKUD2ZaH43FWsHUEGYKViCtxQrW0bJhCeqOIDB3gA5CNfb1+1fIATMmkJz0HTJIoEMXCAmRE+YkwqUba3cQangRoiEJegvNgHL1iTNCFi8eYOrxY2h6KC+qJPoy5kymO3veNhUIACH5BAkKABYALAEAAAApACoAAAf/gBaCg4SFhRERhoqLjIpNNwUFN02NlZYWDwYjkQUGD5eghlIFm5wxoYyIigacnAaohgs6AwM6C4UHrZEHsIQvtMADL4Q8pZw4iqqNMsHBMoM5Lq0uOYdOCAhONYwEzcAEhBEKNzcK24UM2NhMjN7ANqgJ6tjt7gMkqAvzCowF9gWoesxzwMhHBW8VfMBqMkOGwkYKbASzkaAXKhowCBCAQcOix48gQ6ZKJNLSo0iTShaCAEHQA12eVFr4gQUAACw/Ruk6pVKATZsCWMGUyeInABW5Wo3gpVKF0RY8dI1AphKIUSDRWu2oJjPLlStZBNUYV+6czLNo06pdK1OCSLeWWSIwwcaAJCoIPgFw+VEpnboGvSYYFVBJnjp+sDwYpVB4X68ARrdUAjFPyyKWi6z+/GDJhwyHimjaxKkoixUlS0TmBcpWUNGfKlpbcPqzhWzNNoHItuAVbK9AACH5BAUKABQALAIAAAAoACoAAAf/gBSCg4SFgjIjJiYjMoaOj5CDNwOUlTeRmJEzlZwDM5mghQSdlQShpxSklTaooaqUrK2CHFIGBkIchKOqpoMcQrZSuY8cBgXHBQYPg5uqn4IPxiPHBjSPUtPIBVOEUqQZhFPaxzGP48cHhTMjKCgjDYUH5waP8uMWqBbn6Y4a5ziocJzT8CiHPmQucqDK4UKbhROQciB4AQNBDVk1EMB4gUChrI8gQ4ocSbKkSUMRGChQwCDCSQopV7Z0gKAmAgcvadpskMAmggQvff5U4FNBUJsJFOisifPk0gQOJDhYsCDqS6kLhlh9ybWr169gw57s0EWFigkQZEGYoMKDgA6RUoIAmAvAi6wJdAEIiKQibwlZJfKq4CtYVl+6LCLhpbtB1oa8EyJB2BAgwAUJhjoIaPvWkAQilTekDYkhL4awLPImBnt4boCwjxmHndyihehWgQAAOw==';
let defaultConfig= {
    width, height, src: gif,
    x, y,
};

let gif_timer;
let gif_count;
let gif_id= 'zhaiduting-promise-gif';

function close(gif, log, data) {
    gif_count--;
    if(gif_count <= 0){
        gif_timer= setTimeout(()=>{
            gif.hide();
            gif_count= 0;
        }, 200);
    }
    if(log)
        console.log(log, data);
}

function calc(n) {
    let ret= '50%';
    if(n){
        ret= '50%-('+ n+ ')';
        ret= ret.replace(/-/g, ' - ')
            .replace(/\+/g, ' + ')
            .replace(/\)/g, ' ) ')
            .replace(/\(/g, ' ( ')
            .replace(/\(\s*\-\s+/g, ' ( -')     //e.g: must change ( - 100px ) to ( -100px )
        ;
        ret= 'calc('+ ret+ ')'
    }
    return ret;
}

export default function(arg) {
    arg= typeof arg === 'object'? $.extend({}, defaultConfig, arg): defaultConfig;
    clearTimeout(gif_timer);

    let gif= $('#'+ gif_id);
    if(!gif.length){
        gif= $(
            '<div id="'+gif_id+'" style="bottom:50%;right:50%;display:none">'+
                '<img style="position:absolute;width:100%;height:100%;bottom:-50%;right:-50%">'+
            '</div>'
        ).css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
        });
        gif_count= 0;
    }else if(typeof gif_count !== 'number'){
        gif_count= 0;                                               // fix a bug caused by pjax
    }
    gif_count++;

    if(arg.box){                                                    //装进盒子里！
        $(arg.box).append(gif.css('position', 'absolute'))
    }else{
        $(document.body).append(gif.css('position', 'fixed'));
    }

    if(gif.is(':hidden')){
        gif.children('img').prop('src', arg.src);
        gif.css({
            width: arg.width,
            height: arg.height,
            bottom: calc(arg.y),
            right: calc(arg.x)
        }).show();
    }

    let log= arg.log;
    return this.then(res=> {
        log= log? 'Resolved': false;
        close(gif, log, res);
        return res;
    }).catch(err=> {
        log= log? 'Rejected': false;
        close(gif, log, err);
        return Promise.reject(err);
    });
}
