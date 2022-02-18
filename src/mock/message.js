import Mock from "mockjs";
import qs from "querystring";

Mock.mock("/api/message", "post", {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickname: "@cname",
        content: "@cparagraph(1, 10)",
        createDate: Date.now(),
        "avatar|1": [
            "http://82.157.62.8/project/img/avatar1.jpg",
            "http://82.157.62.8/project/img/avatar2.jpg",
            "http://82.157.62.8/project/img/avatar3.jpg",
            "http://82.157.62.8/project/img/avatar4.jpg",
        ],
    },
});

Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function(options) {
    const query = qs.parse(options.url);

    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            total: 52,
            [`rows|${query.limit || 10}`]: [{
                id: "@guid",
                nickname: "@cname",
                content: "@cparagraph(1, 10)",
                createDate: Date.now(),
                "avatar|1": [
                    "http://82.157.62.8/project/img/avatar1.jpg",
                    "http://82.157.62.8/project/img/avatar2.jpg",
                    "http://82.157.62.8/project/img/avatar3.jpg",
                    "http://82.157.62.8/project/img/avatar4.jpg"
                ],
            }, ],
        },
    });
});