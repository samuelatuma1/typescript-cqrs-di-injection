"use strict";
exports.__esModule = true;
exports.upload = void 0;
var multer_1 = require("multer");
var storage = multer_1["default"].diskStorage({ destination: 'uploads/', filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        var extArray = file.mimetype.split("/");
        var extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    }
});
exports.upload = multer_1["default"]({ storage: storage });
