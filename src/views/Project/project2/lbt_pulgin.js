(function() {
    $.fn.extend({
        swiper: function(option) {

            var defaultOption = {
                autoPlay: true,
                playStyle: "fadeout",
                isDots: true,
                isBtn: true,
                direction: 2000,
                imgarr: [],
                width: this.width(),
                height: this.height()
            }

            option = Object.assign({}, defaultOption, option);
            var obj = new Lbtswiper(option, this);
            //初始化
            obj.init();
            return this;
        }

    })

    function Lbtswiper(option, _this) {
        this.autoPlay = option.autoPlay;
        this.wrap = _this || $("body");
        this.playStyle = option.playStyle;
        this.isBtn = option.isBtn;
        this.direction = option.direction;
        this.isDots = option.isDots;
        this.imgarr = option.imgarr;
        this.width = option.width;
        this.height = option.height;
        this.dotswidth = option.dotswidth;
        this.dotheight = option.dotheight;
        this.btnwidth = option.btnwidth;
        this.nowIndex = 0;
        this.nub = this.imgarr.length;
        this.backIndex = 0;
        this.timerId = null;
        this.aotutimerId = null;
    }


    Lbtswiper.prototype.init = function() {
        var obj = initEle.call(this);
        initcss.call(this);
        initclick.call(this);

        function initEle() {
            var wrap = $("<div class='swiper-block'></div>")
            var uL = $("<ul class='swiper-ul'></ul>");
            if (this.isDots) {
                var divDots = $("<div class='swiper-dots'></div>");
                this.imgarr.forEach(function(ele, i) {
                    divDots.append("<span class='swiper-dots-span' dataset=" + i + "><span>")
                });
            }
            for (var i = 0; i < this.imgarr.length; i++) {
                uL.append("<li class='swiper-li'><a class= " + i + "><img src=" + this.imgarr[i] + "></a></li>");
            }
            if (this.playStyle !== "fadeout") {
                var li = uL.children();
                var firstLi = li[0].cloneNode(true);
                var prentLi = li[li.length - 1].cloneNode(true);
                uL[0].appendChild(firstLi);
                uL[0].insertBefore(prentLi, li[0]);
            }

            wrap.append(uL, divDots);
            if (this.isBtn) {
                wrap.append("<i class='swiper-icon-left iconfont icon-black'></i>");
                wrap.append("<i class='swiper-icon-right iconfont icon-next'></i>");
            }

            this.wrap.append(wrap);

            return {
                w: $(".swiper-block", this.wrap),
                ul: $(".swiper-block .swiper-ul", this.wrap),
                li: $(".swiper-block .swiper-ul li", this.wrap),
                leftbtn: $(".swiper-block .swiper-icon-right", this.wrap),
                i: $(".swiper-block i", this.wrap),
                rightbtn: $(".swiper-block .swiper-icon-left", this.wrap),
                dots: $(".swiper-block .swiper-dots .swiper-dots-span", this.wrap),
                dotsdiv: $(".swiper-block .swiper-dots", this.wrap)
            }
        }

        /**
         * 初始化结构ui
         */
        function initcss() {
            $(".swiper-ul li img", this.wrap).css({
                width: this.width,
                height: this.height,
            });
            $(".swiper-ul li a", this.wrap).css({
                fontSize: 0
            })
            obj.w.css({
                overflow: "hidden",
                height: this.height,
                width: this.width,
                position: "relative",
                cursor: "pointer"
            });
            //动画类型不同容器宽度有所不同
            if (this.playStyle !== "fadeout") {
                obj.ul.css({
                    width: (this.imgarr.length + 2) * this.width,
                    height: this.height,
                    left: -this.width
                });
                obj.li.css({
                    float: "left",

                });
            } else {
                for (var i = 0; i < this.imgarr.length; i++) {
                    $(obj.li[i]).css({
                        display: "none"
                    });
                }
                $(obj.li[this.nowIndex]).css({
                    display: "block"
                })
                obj.li.css({
                    position: "absolute",
                    left: 0,
                    top: 0
                });
            }
            obj.ul.css({
                height: this.height,
                listStyle: "none",
                margin: 0,
                padding: 0,
                position: "absolute",
                top: 0
            });
            //是否展示按钮
            if (this.isBtn) {
                obj.rightbtn.css({
                    top: this.height / 2,
                    left: 0,
                    borderRadius: "0px 20px 20px 0",
                    padding: "10px 10px 10px 0"
                });
                obj.i.css({
                    position: "absolute",
                    transform: "translatey(-50%)",
                    fontSize: this.btnwidth + "px",
                    background: "rgba(0,0,0,.1)",
                })
                obj.leftbtn.css({
                    right: 0,
                    top: this.height / 2,
                    borderRadius: "20px 0 0 20px",
                    padding: "10px 0 10px 10px"
                })
            }


            //展示小圆点
            if (this.isDots) {
                obj.dots.css({
                    width: this.dotswidth,
                    height: this.dotheight,
                    background: "rgba(0,0,0,.1)",
                    borderRadius: "50px",
                    margin: "0px 10px",
                    float: "left"
                });
            }
            if (this.isDots) {
                obj.dotsdiv.css({
                    position: "absolute",
                    // border: "1px solid pink",
                    left: this.width / 2,
                    transform: "translatex(-50%)",
                    bottom: 50,
                })
            }
        }

        //初始化效果
        function initclick() {
            var self = this;
            self.autoPlay && (self.aotutimerId = setInterval(function() {
                playStyle(self.playStyle, "left");
            }, self.direction));

            /**
             * 自动播放时调用的函数
             * @param {String} isautoPlay 是否自动播放
             * @param {} dirction 方向
             */
            function playStyle(isautoPlay, dirction) {
                if (isautoPlay == "fadeout") {
                    upIndex.call(self, dirction);
                    fadeout.call(self);
                    changeDot.call(self);
                } else if (isautoPlay == "animate") {
                    upIndex.call(self, dirction);
                    animateChange.call(self, dirction)
                    changeDot.call(self);
                }
            }

            /**
             * 动画函数
             * @param {String} dirction  方向
             * @param {Function} cb 动画完成的回调
             */
            function animateChange(dirction, cb) {
                clearInterval(this.timerId);
                this.timerId = null;
                var left = parseFloat(obj.ul.position().left) + self.width;
                var currentDistance = this.nowIndex * -this.width;
                var distance = 16;
                var onedistance = Math.ceil(300 / distance); //运动多少次
                var current;
                if (left > currentDistance) {
                    if (dirction == "left") {
                        current = -Math.abs(currentDistance - left);
                    } else {
                        current = this.nub * this.width - Math.abs(currentDistance - left);
                    }
                } else {
                    if (dirction == "left") {
                        current = this.nub * this.width - Math.abs(left - currentDistance);
                        current = -current;
                    } else {
                        current = Math.abs(left - currentDistance);
                    }
                }
                // 总距离  总时间 16 
                var oncedistance = parseFloat(current) / onedistance;
                var nub = 0;
                var currentL = left - self.width;
                this.timerId = setInterval(function() {
                    currentL += oncedistance;
                    nub++;
                    obj.ul.css({
                        left: currentL
                    })

                    if (currentL > -self.width) {
                        currentL = -(self.nub + 1) * self.width
                    }
                    if (currentL < -(self.nub + 1) * self.width) {
                        currentL = -self.width
                    }
                    if (nub == onedistance) {
                        obj.ul.css({
                            left: currentDistance - self.width
                        });
                        clearInterval(self.timerId);
                        self.timerId = null;
                    }
                }, distance)
            }

            /**
             * 
             * @param {String} dirction 方向
             * 更新index值 
             */
            function upIndex(dirction) {
                if (dirction == "left") {
                    this.backIndex = this.nowIndex;
                    this.nowIndex++;
                    if (this.nowIndex > this.nub - 1) {
                        this.nowIndex = 0;
                    }
                } else {
                    this.backIndex = this.nowIndex;
                    this.nowIndex--;
                    if (this.nowIndex < 0) {
                        this.nowIndex = this.nub - 1;
                    }
                }
            }

            /**
             * 淡入淡出动画
             */
            function fadeout() {
                $(obj.li[this.backIndex]).fadeOut("500");
                $(obj.li[this.nowIndex]).fadeIn("500");
            }

            /**
             * 切换小圆点样式
             */
            function changeDot() {
                obj.dots.each(function(i, ele) {
                    $(ele).css({
                        border: "none",
                        padding: "0",
                        background: "rgba(0,0,0,.1)"
                    });
                })

                $(obj.dots[this.nowIndex]).css({
                    border: "3px solid #ccc",
                    background: "#fff",
                    padding: "-2px",
                    backgroundClip: "padding-box",
                    backgroundOragin: "padding-box",
                    transform: "translatey(-50%)"
                })
            }

            /**
             * 切换事件
             */
            obj.leftbtn.on("click", function() {
                playStyle(self.playStyle, "left");
            });

            /**
             * 切换事件
             */
            obj.rightbtn.on("click", function() {
                playStyle(self.playStyle, "right");
            });

            /**
             * 鼠标移入暂停
             */
            obj.w.on("mouseenter", function() {
                clearInterval(self.aotutimerId);
            });

            /**
             * 移除开始播放
             */
            obj.w.on("mouseleave", function() {
                if (!self.autoPlay) {
                    return;
                }
                self.aotutimerId = setInterval(function() {
                    playStyle(self.playStyle, "left");
                }, self.direction);
            });

            /**
             * 小圆点切换事件
             */
            obj.dotsdiv.on("click", function(e) {
                if (e.target.tagName == "SPAN") {
                    self.backIndex = self.nowIndex;
                    var p = $(e.target).attr("dataset") > self.nowIndex ? "left" : "right";
                    self.nowIndex = $(e.target).attr("dataset");
                    changeDot.call(self);
                    if (self.playStyle == "fadeout") {
                        fadeout.call(self);
                    } else {
                        animateChange.call(self, p);
                    }
                }
            })
        }
    }
}())