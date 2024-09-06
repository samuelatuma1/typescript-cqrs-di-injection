"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RandomUtility {
    static newGuid = () => {
        return (0, uuid_1.v4)();
    };
}
exports.default = RandomUtility;
//# sourceMappingURL=random_utility.js.map