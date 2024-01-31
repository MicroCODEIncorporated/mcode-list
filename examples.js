// MicroCODE: define this module's name for  our 'list-log' package
const moduleName = 'examples.js';
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

let key = null;
let value = null;

// 1) straight swap of two values...

key = 3;
value = list.swap(key, list1, list2);  // value = 'three'
mcode.info(`list1, list2 - key:${key}, value:${value}`, moduleName );

key = 6;
value = list.swap(key, list1, list2);  // value = 'default'
mcode.info(`list1, list2 - key:${key}, value:${value}`, moduleName );

key = 0;
value = list.swap(key, list1, list2);  // value = 'default'
mcode.info(`list1, list2 - key:${key}, value:${value}`, moduleName );

// 2) the same lists can be used the other way around...

key = 'three';
value = list.swap(key, list2, list1);  // value = 3
mcode.info(`list2, list1 - key:${key}, value:${value}`, moduleName );

key = 'six';
value = list.swap(key, list2, list1);  // value = 0
mcode.info(`list2, list1 - key:${key}, value:${value}`, moduleName );

// 3) any two lists on the same subject(i.e.: the same length) can be used...

key = 3;
value = list.swap(key, list1, list3);  // value = false
mcode.info(`list1, list3 - key:${key}, value:${value}`, moduleName );

key = 'three';
value = list.swap(key, list2, list4);  // value = { key: 4, property: FOUR }
mcode.info(`list2, list3 - key:${key}, value:${JSON.stringify(value)}`, moduleName );

// 4) any list can be used to call a function in another list...

key = 3;
value = list.call(key, list1, list5);  // value = 'function3() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, moduleName );

key = 99;
value = list.call(key, list1, list5);  // value = 'functionDefault() was called.'
mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, moduleName );

function function1()
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