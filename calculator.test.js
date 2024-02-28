const Calculator = require('./calculator');
let nums;
let calc;

beforeAll(() => {
    nums = [17, 36, 94, 1, 20, 85, 13, 41, 7, 68, 53, 17, 70];
    calc = new Calculator(nums);
});

describe("calculator", function(){

    test('find the average of an array of numbers', () => {
        expect(calc.mean()).toEqual('40.15');
    });
    
    test('find the midpoint of an array of numbers', () => {
        expect(calc.median()).toEqual('36.00');
    });

    test('find the most frequent number in a array of numbers', () => {
        expect(calc.mode()).toEqual('17.00');
    });

    test('return null / return calculator messages', () => {
        n = [17, 36, 94, 1, 20, 85, 'n', 41, 7, 68, 53, 17, 70];
        c = new Calculator(n);
        expect(c.mean()).toBeNull();
        expect(c.msg).toEqual({'msg': 'n is not a number'});
        expect(c.median()).toBeNull();
        n = [];
        c = new Calculator(n);
        expect(c.mode()).toBeNull();
        expect(c.msg).toEqual({'msg': 'numbers are required'});
    });

});
