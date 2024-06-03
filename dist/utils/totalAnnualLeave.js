"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalAnnualLeave = void 0;
function totalAnnualLeave(data) {
    let total = 0;
    data.map((item) => {
        const startDate = new Date(item.starting_date).getTime();
        const endDate = new Date(item.end_date).getTime();
        const difference = endDate - startDate;
        total += difference;
    });
    return Math.round(total / (1000 * 3600 * 24)) + 1;
}
exports.totalAnnualLeave = totalAnnualLeave;
