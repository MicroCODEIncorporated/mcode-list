// MicroCODE: define this module's name for  our 'mcode-log' package
const MODULE_NAME = 'examples.js';
const list = require('./index.js');
const mcode = require('mcode-log');

let list1 = [1, 2, 3, 4, 5, 0];
let list2 = ['one', 'two', 'three', 'four', 'five', 'default'];
let list3 = [false, true, false, true, false, false];
let list4 = [
    {key: 1, property: 'ONE'},
    {key: 2, property: 'TWO'},
    {key: 3, property: 'THREE'},
    {key: 4, property: 'FOUR'},
    {key: 5, property: 'FIVE'},
    {key: 0, property: 'DEFAULT'}];

let list5 = [function1, function2, function3, function4, function5, functionDefault];
let list6 = [functionArg1, functionArg2, functionArg3, functionArg4, functionArg5, functionArgDefault];

let key = null;
let value = null;

// 1) straight swap of two values...

key = 3;
value = list.swap(key, list1, list2);  // value = 'three'
mcode.info(`list1, list2 - key:${key}, value:${value}`, MODULE_NAME);

key = 6;
value = list.swap(key, list1, list2);  // value = 'default'
mcode.info(`list1, list2 - key:${key}, value:${value}`, MODULE_NAME);

key = 0;
value = list.swap(key, list1, list2);  // value = 'default'
mcode.info(`list1, list2 - key:${key}, value:${value}`, MODULE_NAME);

// 2) the same lists can be used the other way around...

key = 'three';
value = list.swap(key, list2, list1);  // value = 3
mcode.info(`list2, list1 - key:${key}, value:${value}`, MODULE_NAME);

key = 'six';
value = list.swap(key, list2, list1);  // value = 0
mcode.info(`list2, list1 - key:${key}, value:${value}`, MODULE_NAME);

key = function2;
value = list.swap(key, list5, list2);  // value = two
mcode.info(`list5, list2 - key:${mcode.logifyObject(key)}, value:${value}`, MODULE_NAME);

// 3) any two lists on the same subject(i.e.: the same length) can be used...

key = 3;
value = list.swap(key, list1, list3);  // value = false
mcode.info(`list1, list3 - key:${key}, value:${value}`, MODULE_NAME);

key = 'three';
value = list.swap(key, list2, list4);  // value = { key: 4, property: FOUR }
mcode.info(`list2, list3 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

// 4) any list can be used to call a function in another list...

key = 3;
value = list.call(key, list1, list5);  // value = 'function3() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

key = 99;
value = list.call(key, list1, list5);  // value = 'functionDefault() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

// 4) any list can be used to call a function in another list with a varible # of params...

key = 1;
value = list.call(key, list1, list6, ['param1']);  // value = 'functionArg3() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

key = 3;
value = list.call(key, list1, list6, ['param1', 'param2', 'param3']);  // value = 'functionArg3() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

key = 5;
value = list.call(key, list1, list6, ['param1', 'param2', 'param3', 'param4', 'param5']);  // value = 'functionArg5() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

key = 99;
value = list.call(key, list1, list6, ['param1', 'param2', 'param3']);  // value = 'functionArgDefault() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

function function1([])
{
    return 'function1() was called.';
}

function function2()
{
    return 'function2() was called.';
}

function function3()
{
    return 'function3() was called.';
}

function function4()
{
    return 'function4() was called.';
}

function function5()
{
    return 'function5() was called.';
}

function functionDefault()
{
    return 'functionDefault() was called.';
}


function functionArg1(params)
{
    const args = JSON.stringify(params).replace(/"/g, "'");
    return `functionArg1() called, with params: ${args}`;
}

function functionArg2(params)
{
    const args = JSON.stringify(params).replace(/"/g, "'");
    return `functionArg2() called, with params: ${args}`;
}

function functionArg3(params)
{
    // convert params to a string with " truned to '...
    const args = JSON.stringify(params).replace(/"/g, "'");
    return `functionArg3() called, with params: ${args}`;
}

function functionArg4(params)
{
    const args = JSON.stringify(params).replace(/"/g, "'");
    return `functionArg4() called, with params: ${args}`;
}

function functionArg5(params)
{
    const args = JSON.stringify(params).replace(/"/g, "'");
    return `functionArg5() called, with params: ${args}`;
}

function functionArgDefault()
{
    return 'functionArgDefault() was called.';
}