class Calculator {
    constructor(nums) {
        this.nums = nums
        this.msg;
    }
      
    // find the average of a set of numbers
    mean(){
        try {
            if(this.isError()) return null;
            // reduce array values into total and divide by array length
            return (this.nums.reduce((accumulator, currentValue) => accumulator + 
                currentValue, 0) / this.nums.length).toFixed(2);;
        } catch (err) {
            this.msg = err.message;
            return null;
        }
    }

    // find the midpoint of a set of numbers
    median(){
        try {
            if(this.isError()) return null;
            // find midpoint of array
            let mid = Math.floor(this.nums.length / 2);
            // sort array values lowest to greatest
            this.nums.sort((a,b) => a - b);
            // return array value with index of midpoint or
            // if array length is even: return sum of mid array values divided by two
            return (this.nums.length % 2 != 0 ? this.nums[mid] : (this.nums[mid - 1] + 
                this.nums[mid]) / 2).toFixed(2);
        } catch (err) {
            this.msg = err.message;
            return null;
        }
    }

    // find the most frequent number in a set of numbers
    mode(){
        try {
            if(this.isError()) return null;
            let compare = 0;
            let max;
            // sort numbers greatest to lowest
            this.nums.sort((a,b) => b - a);
            // use reduce to create object to keep tabs of array value frequency
            // key => array value : value => number of times occured
            this.nums.reduce((acc, val) => {
                if(val in acc) acc[val]++;
                else acc[val] = 1;
                if (acc[val] > compare) { 
                    compare = acc[val]; 
                    max = val;
                }
                return acc;
            }, {});
            return max.toFixed(2);
        } catch (err) {
            this.msg = err.message;
            return null;
        }
    }

    // check if array contains all numbers or is empty
    isError(){
        let arr, val;
        if(this.nums.length === 0) { this.msg = { msg: 'numbers are required' }; return true; }
        arr = this.nums.map(item => { if(isNaN(item)) val = item; return Number(item); });
        if(val) { this.msg = { msg: `${val} is not a number` }; return true; }
        this.nums = arr;
        return null;
    }
}

module.exports = Calculator;