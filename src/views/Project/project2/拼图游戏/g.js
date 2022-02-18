var imgConfig = {
    dom: document.querySelector(".content"),
    width: 400,
    height: 400,
    H: 3,
    L: 3,
    isW: false,
    imgUrl: "url(img/1.png)"
}
imgConfig.boxW = imgConfig.width / imgConfig.L;
imgConfig.boxH = imgConfig.height / imgConfig.H;

/**
 *1
 */
function innit() {

    /**
     * 游戏开始准备
     */
    function contentStyle() {
        imgConfig.dom.style.border = "1px solid pink";
        imgConfig.dom.style.height = `${imgConfig.height}px`;
        imgConfig.dom.style.width = `${imgConfig.width}px`;
        imgConfig.dom.style.position = "relative";
    }
    contentStyle()
        /**
         * 方块数组
         */
    var block = [];
    /**
     * 
     * @param {*} i 
     * @param {*} n 
     */
    function Block(i, n, isHidden) {
        this.dom = document.createElement("div");
        this.dom.style.width = imgConfig.boxW + "px";
        this.dom.style.height = imgConfig.boxH + "px";
        this.isHidden = isHidden;
        this.dom.style.cursor = "pointer";
        // this.dom.style.transition = ".5s";
        this.dom.style.position = "absolute";
        this.dom.style.top = i * imgConfig.boxH + "px";
        this.dom.style.left = n * imgConfig.boxW + "px";
        this.dom.style.background = `${imgConfig.imgUrl} -${this.dom.style.left} -${this.dom.style.top}`;
        this.corretX = this.dom.style.left;
        this.corrutY = this.dom.style.top;
        if (!isHidden) {
            this.dom.style.display = "none";
        }
        this.show = function() {
            imgConfig.dom.appendChild(this.dom);
        }
        this.show()


    }
    for (var i = 0; i < imgConfig.H; i++) {
        for (var n = 0; n < imgConfig.L; n++) {
            var isHidden = true;
            if (i === imgConfig.L - 1 && n === imgConfig.H - 1) {
                isHidden = false;

            }
            block.push(new Block(i, n, isHidden))
        }
    }

    function exchange(i, n) {
        var left = i.dom.style.left;
        var top = i.dom.style.top;
        i.dom.style.left = n.dom.style.left;
        i.dom.style.top = n.dom.style.top;
        n.dom.style.left = left;
        n.dom.style.top = top;
        i.show();
        n.show();
    }

    function getRandom(i, n) {
        return Math.floor(Math.random() * (n - i + 1) + i)
    }

    function sort() {
        for (var i = 0; i < block.length - 1; i++) {
            exchange(block[i], block[getRandom(0, imgConfig.H * imgConfig.L - 2)])
        }
    }
    sort()
    var inVisibleBlock = block.find(function(e) {
        return !e.isHidden
    });

    block.forEach(function(ele) {
        ele.dom.onclick = function() {

            exchange(ele, inVisibleBlock);
            isWin();
            // if (Math.abs(parseInt(ele.dom.style.left) - parseInt(inVisibleBlock.dom.style.left)) === parseInt(imgConfig.boxW) && inVisibleBlock.dom.style.top === ele.dom.style.top ||
            //     Math.abs(parseInt(ele.dom.style.top) - parseInt(inVisibleBlock.dom.style.top)) === parseInt(imgConfig.boxW) && inVisibleBlock.dom.style.left === ele.dom.style.left
            // ) {
            //     exchange(ele, inVisibleBlock);
            //     isWin();
            // }
        }
    })

    function isWin() {
        var arr = block.filter(function(ele) {
            return find(ele.dom.style.left, ele.corretX) && find(ele.dom.style.top, ele.corrutY)
        })
        if (arr.length === 10 - 1) {
            imgConfig.isW = true;
            //游戏结束，去掉所有边框
            block.forEach(function(b) {
                b.dom.style.display = "block";
            });
        }


    }

    function find(i, n) {
        return parseInt(i) === parseInt(n);
    }
}
innit()