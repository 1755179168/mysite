import Mock from "mockjs";
import obj from "@/img.js";
Mock.mock('/api/project', "get", {
    code: 0,
    msg: "",
    data: [{
            id: "@uuid",
            name: "3d轮播图",
            imgUrl: obj.png1,
            url: 'http://82.157.62.8/project/3D轮播图/'
        },
        {
            id: "@uuid",
            name: "3d旋转魔方",
            imgUrl: obj.png2,
            url: 'http://82.157.62.8/project/Monica的图片方块/'
        },
        {
            id: "@uuid",
            name: "节奏大师",
            imgUrl: obj.png3,
            url: 'http://82.157.62.8/project/别踩白块/'
        },
        {
            id: "@uuid",
            name: "浪漫爱心",
            imgUrl: obj.png4,
            url: 'http://82.157.62.8/project/浪漫3D心/'
        },
        {
            id: "@uuid",
            name: "拼图小游戏",
            imgUrl: obj.png5,
            url: 'http://82.157.62.8/project/拼图游戏/'
        },
        {
            id: "@uuid",
            name: "扫雷",
            imgUrl: obj.png6,
            url: 'http://82.157.62.8/project/经典扫雷/'
        },
        {
            id: "@uuid",
            name: "淘宝放大镜",
            imgUrl: obj.png7,
            url: 'http://82.157.62.8/project/淘宝放大镜/'
        },
        {
            id: "@uuid",
            name: "小羊肖恩",
            imgUrl: obj.png8,
            url: 'http://82.157.62.8/project/小羊肖恩/'
        },
        {
            id: "@uuid",
            name: "雨天特效",
            imgUrl: obj.png9,
            url: 'http://82.157.62.8/project/雨天特效/'
        },
        {
            id: "@uuid",
            name: "c3特效",
            imgUrl: obj.png10,
            url: 'http://82.157.62.8/project/星空特效/'
        },
        {
            id: "@uuid",
            name: "jq浪漫",
            imgUrl: obj.png11,
            url: 'http://82.157.62.8/project/jQuery的浪漫/'
        },
        {
            id: "@uuid",
            name: "js平底锅打灰太狼",
            imgUrl: obj.png12,
            url: 'http://82.157.62.8/project/js 锅打灰太狼/'
        },
    ],
});