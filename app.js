const express = require("express");
const ExpressError = require("./expressError");

const app = express();

function parseNums(nums) {
    if (!nums) throw new ExpressError("Nums are required", 400);
    return nums.split(",").map(num => {
        if (isNaN(Number(num))) {
            throw new ExpressError(`${num} is not a number`, 400);
        }
        return Number(num);
    });
}

app.get("/mean", function mean(req, res, next) {
    try {
        const nums = parseNums(req.query.nums);
        const sum = nums.reduce((acc, curr) => acc + curr, 0);
        const value = sum / nums.length;
        res.status(200).json({ "operation": "mean", "value": value });
    } catch (e) {
        return next(e);
    }
});

app.get("/median", function median(req, res, next) {
    try {
        const nums = parseNums(req.query.nums);
        nums.sort((a, b) => a - b);
        const half = Math.floor(nums.length / 2);
        const value = nums.length % 2 !== 0 ? nums[half] : (nums[half - 1] + nums[half]) / 2;
        res.status(200).json({ "operation": "median", "value": value });
    } catch (e) {
        return next(e);
    }
});

app.get("/mode", function mode(req, res, next) {
    try {
        const nums = parseNums(req.query.nums);
        const modeMap = {};
        let maxEl = nums[0], maxCount = 1;
        nums.forEach(num => {
            modeMap[num] = (modeMap[num] || 0) + 1;
            if (modeMap[num] > maxCount) {
                maxEl = num;
                maxCount = modeMap[num];
            }
        });
        res.status(200).json({ "operation": "mode", "value": maxEl });
    } catch (e) {
        return next(e);
    }
});

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found!", 404);
    next(e);
});

app.use((error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message;
    res.status(status).json({ error: { message, status } });
});
module.exports = app;
app.listen(3000, () => {
    console.log("App on port 3000");
});
