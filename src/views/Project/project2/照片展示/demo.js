function init() {
    addImg();
}
init();
var flag = true;
var len, img;
// 在html结构中插入图片
function addImg() {
    // 通过for循环添加50张图片
    for (var i = 0; i < 50; i++) {
        // 随机获得图片src
        var src = Math.floor(Math.random() * 10);
        // 将创建得图片插入到imgBox中
        $('.imgBox').append('<img src="./pic/' + src + '.jpg" alt="">')
    }
    // 点击事件
    bindEvent();
}
function bindEvent() {
    img = $('img');
    len = $('img').length;
    $('.btn').on('click', function () {
        //为btn点击加上锁  如果动画正在进行中不能继续点击
        if (!flag) {
            return;
        }
        // 完成运动图片的数量
        var endNum = 0;
        // 正在进行动画中将flag置为false
        flag = false;
        // 第一个运动环节 将每一张图片延迟不同时间进行缩小显示
        for (var i = 0; i < len; i++) {
            // 立即执行函数   解决闭包问题
            (function (i) {
                // 利用setTimeout延迟,延迟时间为随机的时间，所以进行动画为每一张图片随机变换动画
                setTimeout(function () {
                    // 每一张图片调用运动函数  monition为封装运动函数
                    monition(img[i], '1s', function () {
                        // 第一个运动缩小  为从倍数1缩小到0
                        $(this).css('transform', 'scale(0)')
                    }, function () {
                        // 每一张图片缩小后  回调函数 放大回到原位置  同时透明度为0 即放大回到原位是看不到图片的
                        monition(this, '1s', function () {
                            $(this).css({
                                'transform': 'scale(1)',
                                'opacity': 0
                            })
                        }, function () {
                            // 记录所有图片完成个数
                            endNum++;
                            // 如果所有的图片都完成前两阶段运动  执行最后图片展示     
                            if (endNum == len) {
                                show();
                            }
                        })
                    })
                }, Math.random() * 1000);
            })(i)
        }
    })
};
// 最终全部展示图片
function show() {
    // allEnd  计数
    var allEnd = 0;
    for (var i = 0; i < len; i++) {
        $(img[i]).css({
            'transition': '',
            // 先将图片向后移动一段距离作为旋转半径   旋转一圈
            'transform': 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)'
        });
        (function (i) {
            setTimeout(function () {
                // 最后一个动画环节  旋转一圈回到原位
                self.monition(img[i], '2s', function () {
                    // 透明度为1  旋转一圈
                    $(this).css({
                        'opacity': 1,
                        'transform': 'rotateY(-360deg) translateZ(0)',
                    })
                }, function () {
                    // 记录所完成运动的图片数量
                    allEnd++;
                    // 记录完成图片数量  设置flag   所有图片运动结束  flag置为true
                    if (allEnd == len) {
                        flag = true;
                    }
                })
            }, Math.random() * 1000);
        })(i)
    }
}
// 封装运动函数
function monition(dom, time, doFun, cb) {
    // 将每一个传入的dom元素设置过渡动画
    $(dom).css('transition', time);
    // 每一张图片执行当前传入函数 doFun
    doFun.call(dom);
    // 当前每一张图片绑定多个动画  所以加锁控制当前动画结束
    var called = true;
    // 当所有图片运动完之后将锁打开   transitionend事件为监听当前transition结束 
    $(dom).on('transitionend', function () {
        if (called) {
            // 当前动画结束执行回调函数 cb存在  执行cb
            cb && cb.call(dom);
            called = false; 
        }
    })
}