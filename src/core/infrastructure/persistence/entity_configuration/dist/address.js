"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var addressSchema = new mongoose_1.Schema({
    streetNo: { type: Number },
    street: { type: String },
    city: { type: mongoose_1.Schema.Types.ObjectId, ref: 'City' },
    extraDetails: { type: String },
    phone: { type: String }
});
