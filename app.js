const express = require('express');
const Calculator = require('./calculator');
const ExpressError = require('./expressError');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

async function writeJson(data) {
    let msg;
    await fs.promises.writeFile('results.json', String(JSON.stringify(data)), () => {})
    .then(() => msg = 'data written to results.json')
    .catch(() => msg = 'error writing data to file');
    return msg;
}

app.get('/mean', function (req, res, next) {
    try {
        if (!req.query || !req.query.nums) 
            throw new ExpressError('missing/invalid querystring {nums}', 400);
        let calc = new Calculator(req.query.nums.replace(' ', '').split(','));
        let data = calc.mean();
        if (!data && data !== 0) throw new ExpressError(calc.msg, 400);
        return res.send({ operation: 'mean', value: data });
    } catch (e) {
        next(e);
    }
});

app.get('/median', function (req, res, next) {
    try {
        if (!req.query || !req.query.nums) 
            throw new ExpressError('missing/invalid querystring {nums}', 400);
        let calc = new Calculator(req.query.nums.replace(' ', '').split(','));
        let data = calc.median();
        if (!data && data !== 0) throw new ExpressError(calc.msg, 400);
        return res.send({ operation: 'median', value: data });
    } catch (e) {
        next(e);
    }
});

app.get('/mode', function (req, res, next) {
    try {
        if (!req.query || !req.query.nums) 
            throw new ExpressError('missing/invalid querystring {nums}', 400);
        let calc = new Calculator(req.query.nums.replace(' ', '').split(','));
        let data = calc.mode();
        if (!data && data !== 0) throw new ExpressError(calc.msg, 400);
        return res.send({ operation: 'mode', value: data });
    } catch (e) {
        next(e);
    }
});

app.get('/all', async function (req, res, next) {
    try {
        if (!req.query || !req.query.nums) 
            throw new ExpressError('missing/invalid querystring {nums}', 400);
        let calc = new Calculator(req.query.nums.replace(' ', '').split(','));
        let mean = calc.mean();
        let median = calc.median();
        let mode = calc.mode();
        if (!mean && mean !== 0 &&
            !median && median !== 0 &&
            !mode && mode !== 0) 
            throw new ExpressError(calc.msg, 400);
        let data = { operation: 'all', mean, median, mode }
        if(req.query.save && req.query.save === 'true')
            data.save = await writeJson(data);
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

// default 404 error
app.use((req, res, next) => {
    let err = new ExpressError("Page Not Found", 404)
    next(err);
});

// error handler
app.use(function (err, req, res, next) { 
    // set default vals
    let status = err.status || 500;
    let message = err.msg;
    return res.status(status).json({
      error: { message, status }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});