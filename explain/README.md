<html lang="en"><head>
    <meta charset="UTF-8">
    <title></title>
<style id="system" type="text/css">h1,h2,h3,h4,h5,h6,p,blockquote {    margin: 0;    padding: 0;}body {    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, sans-serif;    font-size: 13px;    line-height: 18px;    color: #737373;    margin: 10px 13px 10px 13px;}a {    color: #0069d6;}a:hover {    color: #0050a3;    text-decoration: none;}a img {    border: none;}p {    margin-bottom: 9px;}h1,h2,h3,h4,h5,h6 {    color: #404040;    line-height: 36px;}h1 {    margin-bottom: 18px;    font-size: 30px;}h2 {    font-size: 24px;}h3 {    font-size: 18px;}h4 {    font-size: 16px;}h5 {    font-size: 14px;}h6 {    font-size: 13px;}hr {    margin: 0 0 19px;    border: 0;    border-bottom: 1px solid #ccc;}blockquote {    padding: 13px 13px 21px 15px;    margin-bottom: 18px;    font-family:georgia,serif;    font-style: italic;}blockquote:before {    content:"C";    font-size:40px;    margin-left:-10px;    font-family:georgia,serif;    color:#eee;}blockquote p {    font-size: 14px;    font-weight: 300;    line-height: 18px;    margin-bottom: 0;    font-style: italic;}code, pre {    font-family: Monaco, Andale Mono, Courier New, monospace;}code {    background-color: #fee9cc;    color: rgba(0, 0, 0, 0.75);    padding: 1px 3px;    font-size: 12px;    -webkit-border-radius: 3px;    -moz-border-radius: 3px;    border-radius: 3px;}pre {    display: block;    padding: 14px;    margin: 0 0 18px;    line-height: 16px;    font-size: 11px;    border: 1px solid #d9d9d9;    white-space: pre-wrap;    word-wrap: break-word;}pre code {    background-color: #fff;    color:#737373;    font-size: 11px;    padding: 0;}@media screen and (min-width: 768px) {    body {        width: 748px;        margin:10px auto;    }}</style><style id="custom" type="text/css"></style></head>
<body marginheight="0"><h1>717电商商城（vue框架）</h1>
<h2>项目介绍</h2>
<h3>1、项目背景描述</h3>
<pre><code>  *此平台是是一个手机版的网上大型的购物平台，囊括了基本全部类型的商品，为用户提供了便捷的shopping方式，不同于其他的购物平台的是，本平台无需注册账号就可浏览。</code></pre>
<h3>2、项目所需技术</h3>
<pre><code>  *在这一整套项目中所用到的技术有node、vue、vuex这几项，主要以vue为主，vuex为辅的一套技术。此项目是在vue搭建的脚手架中完成的，这样会使代码清晰，逻辑明了，后期有助于管理、维护。在数据方面，所有的数据采用的是vuex管理，这样有助于模块与模块之间的数据通信，也有助于性能的优化。</code></pre>
<h3>3、项目主要效果（注：与列表4一一对应）</h3>
<pre><code>  *主页的商品列表采用的下拉加载的方式加载，而且图片的加载方式是懒加载

  *主页刚进来的购物车的收藏件数

  *主页的图片轮播与活动项的轮播

  *分类页的数据的渲染

  *购物车的数据绑定

  *购物车页的运算

  *结算页的数据绑定

  *地址的添加</code></pre>
<h3>4、项目主要效果的实现（注：与列表3一一对应）</h3>
<pre><code>  *商品列表的下拉加载的实现是使用的iscroll的事件触发来请求数据的，这里的一个难点就是怎么样可以控制让浏览器不需一次把所有的商品请求到，可以在达到条件的第一次首先否决了这个条件，然后在数据成功渲染之后，再次开启事件。而图片的懒加载运用v-lazyload这一指令就可实现

  *在刚进来的时候的购物车的收藏件数则需要用到localStorage这一本地存储来实现，在每次页面点击收藏商品的时候把该商品加到本地存储中去

  *在图片的轮播和活动的轮播可以直接使用swiper这个插件来实现

  *在分类页数据渲染方面主要的就是数据的切换，在点击数据的时候根据ID寻找所需的数据

  *在购物车的数据渲染的上面最核心的就是需要数据的合理管理，购物车的数据采用的是vuex单独的此页面数据集合，然后使的这个数据的集合和本地存储链接起来，这样会更好的双向数据绑定。

  *购物车页的运算主要还是依托与数据，商品的状态和商品的数量都在数据中有所体现，这也就可以很好的体现出是以数据为驱动的一个项目

  *结算页的做法大致和购物车页是一致的，都用vuex管理数据。

  *地址的添加主要涉及到3级联动的城市渲染，数据主要是以code码来区分城市的级别，很好的做到code码的截取匹配就可以做到城市的渲染。</code></pre>
<h3>5、项目中遇到的难点</h3>
<pre><code>  *在首页的下拉加载中，需要用到的是Scroll事件，而在事件绑定的过程中，按照常规的绑定方法，是不生效的。最终使用的是DOM2级的添加事件的方法，可以成功绑定。

  *在添加购物车的时候，需要做到排重的效果，意思就是添加的时候如果遇到购物车已经存在该商品则无需继续添加。主要就是判断商品的ID与已添加的商品ID对比就可以实现。

  *在购物车的商品运算中，主要涉及到的是选中与否，每个商品的状态也是放在了数据里面，这样可以在每次运算的时候可以得到哪些商品是被选中的，可以更好的运算出总的价格。

  *还有在删除购物车商品的时候，也会用到数据的状态值，在购物车里面的这么多操作数据，这就会体现出vuex管理数据的方便之处。封装一个弹出框的插件，在成功回调函数里执行删除。

  *在添加地址的页面，首先是正常的三级联动的数据渲染，难点是在地址存储的列表页怎么有效的分开默认与非默认的地址，意思是每次打开页面默认地址被选中，在添加页如勾选默认则替换原默认项，如未勾选的话默认项不变，每次打开页面还是该默认项。</code></pre>
<h3>6、项目总结</h3>
<h6>从这一整套项目中可以看的出来，对于vue来说，脚手架的搭建是非常的方便以及有条理性的，可以分开管理各个部分的一些比如：组件、数据等。这样有助于后期的维护以及管理。还有另外一个技术点个人觉得是最主要的那就是vuex的集中管理数据，因为这是一个以数据为驱动的一个项目，根据数据的变动页面而发生变动，在vuex中的数据可以被每个组件拿到，这样就会减去数据传递的麻烦，而且操作数据之后也会使得页面连锁的发生变化。此项目使得我对于vuex、vue脚手架这些技术的运用更加的得当。</h6>
<p>Edit By <a href="http://mahua.jser.me">MaHua</a></p>
</body></html>