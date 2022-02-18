import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
    code: 0,
    msg: "",
    data: {
        avatar: "https://img0.baidu.com/it/u=1409752026,3304245085&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        siteTitle: "我的个人空间",
        github: "https://github.com/DuYi-Edu",
        qq: "1755179168",
        qqQrCode: "https://img2.baidu.com/it/u=4120188170,2473861720&fm=253&fmt=auto&app=138&f=JPG?w=500&h=500",
        weixin: "18280632051",
        weixinQrCode: "https://img0.baidu.com/it/u=3288420829,1082757869&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
        mail: "1755179168@qq.com",
        icp: "黑ICP备17001719号",
        githubName: "bangbangji",
        favicon: "https://img0.baidu.com/it/u=1409752026,3304245085&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    },
});