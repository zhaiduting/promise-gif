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
 * Or put gif in a box by box-selector, the box position must be relative
 *     promiseInstance.gif({box: '#sample2-box'})
 *
 * The above are all single cases, which can be converted into multiple by different id
 *     promiseInstance.gif({box: '#sample2-box', id: 'gif-center-aligned'})
 *     promiseInstance.gif({box: '#sample2-box', id: 'gif-left-aligned', x: '-50%+15px'})
 *
 * Show the gif forever
 *     promiseInstance.gif({time: false})
 *
 * Can be extended by ext(), e.g:
 *     Promise.prototype.gif= require('@zhaiduting/promise-gif').default;
 *     Promise.prototype.gif.ext('pin', function (gif) {
 *          console.log('pin:', gif.arg.pin);
 *     });
 *     promiseInstance.gif({pin: 'pin-ext'})
 */

import gif from './gif';
import './wear-id';
import './wear-box';
import './wear-img';
import './wear-size';

import pxy from '@zhaiduting/wear-pin-xy';

gif.use(pxy());

export default gif.grow;
