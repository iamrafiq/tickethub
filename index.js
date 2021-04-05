"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = "https://jsonplaceholder.typicode.com/todos/1";
axios_1["default"].get(url).then(function (responce) {
    var todo = responce.data;
    var id = todo.Id;
    var title = todo.Title;
    var finished = todo.Finished;
    console.log("\n    The todo with id: " + id + "\n    Has a title of :" + title + "\n    Is it finished :" + finished + "\n    ");
    console.log(responce.data);
});
