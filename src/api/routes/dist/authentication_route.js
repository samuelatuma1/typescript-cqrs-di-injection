"use strict";
exports.__esModule = true;
var express_1 = require("express");
var program_1 = require("../program");
var authentication_controller_1 = require("../controllers/authentication_controller");
var authenticationRoute = express_1.Router();
var authController = program_1.iocContainer.resolve(authentication_controller_1["default"]);
authenticationRoute.post('/permissions', function (req, res, next) { return authController.createPermission(req, res, next); });
exports["default"] = authenticationRoute;
