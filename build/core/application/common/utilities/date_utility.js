"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateUtility {
    static getUTCNow = () => {
        return new Date(new Date().toISOString());
    };
}
exports.default = DateUtility;
//# sourceMappingURL=date_utility.js.map