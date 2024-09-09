// MicroCODE: define this module's name for  our 'mcode' package
const MODULE_NAME = 'index.test.js';
const list = require('./index.js');
const mcode = require('mcode-log');

// LISTs
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

let radixFlags = ["^b", "^o", "^d", "^h", "^x", "^c", "2#", "7#", "10#", "16#", "^?"];
let radixNames = ["Binary", "Octal", "Decimal", "Hexidecimal", "Hex", "BCD", "Binary", "Octal", "Decimal", "Hex", "Decimal"];
let radixConverters = [fromBinary, fromOctal, fromDecimal, fromHex, fromHex, fromBcd, fromBinary, fromOctal, fromDecimal, fromHex, fromDecimal];

// FUNCTIONs
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

function fromBinary()
{
    return 'fromBinary() was called.';
}

function fromOctal()
{
    return 'fromOctal() was called.';
}

function fromDecimal()
{
    return 'fromDecimal() was called.';
}

function fromHex()
{
    return 'fromHex() was called.';
}

function fromBcd()
{
    return 'fromBcd() was called.';
}

// temporary vars
let key = null;
let value = null;

// T E S T S
// 1) simple swap of two values...
describe('mcode.swap_simple', () =>
{
    it('mcode.swap()--list.swap() here--should swap and log test messages.', () =>
    {
        // Create a spy on console.log
        const consoleSpy = jest.spyOn(console, 'log');

        key = 3;
        value = list.swap(key, list1, list2);  // value = 'three'
        mcode.info(`list1, list2 - key:${key}, value:${value}`, MODULE_NAME);

        key = 6;
        value = list.swap(key, list1, list2);  // value = 'default'
        mcode.info(`list1, list2 - key:${key}, value:${value}`, MODULE_NAME);

        key = 0;
        value = list.swap(key, list1, list2);  // value = 'default'
        mcode.info(`list1, list2 - key:${key}, value:${value}`, MODULE_NAME);

        // Check that console.log was called with the expected message
        expect(consoleSpy.mock.calls).toEqual(
            expect.arrayContaining([
                expect.arrayContaining([expect.stringContaining("list1, list2 - key:3, value:three")]),
                expect.arrayContaining([expect.stringContaining("list1, list2 - key:6, value:default'")]),
                expect.arrayContaining([expect.stringContaining("list1, list2 - key:0, value:default'")])
            ])
        );

        // Restore the original console.log function
        consoleSpy.mockRestore();
    });
});

// 2) reverse swap of two values...
describe('mcode.swap_reverse', () =>
{
    it('mcode.swap()--list.swap() here--should swap and log test messages', () =>
    {
        // Create a spy on console.log
        const consoleSpy = jest.spyOn(console, 'log');

        key = 'three';
        value = list.swap(key, list2, list1);  // value = 3
        mcode.info(`list2, list1 - key:${key}, value:${value}`, MODULE_NAME);

        key = 'six';
        value = list.swap(key, list2, list1);  // value = 0
        mcode.info(`list2, list1 - key:${key}, value:${value}`, MODULE_NAME);

        key = function2;
        value = list.swap(key, list5, list2);  // value = two
        mcode.info(`list5, list2 - key:${mcode.logifyObject(key)}, value:${value}`, MODULE_NAME);

        // Check that console.log was called with the expected message
        expect(consoleSpy.mock.calls).toEqual(
            expect.arrayContaining([
                expect.arrayContaining([expect.stringContaining(`list2, list1 - key:three, value:3`)]),
                expect.arrayContaining([expect.stringContaining(`list2, list1 - key:six, value:0`)]),
                expect.arrayContaining([expect.stringContaining(`list5, list2 - key:"ƒ function2", value:two`)]),
            ])
        );

        // Restore the original console.log function
        consoleSpy.mockRestore();
    });
});

//  3) any two lists on the same subject (i.e.: the same length) can be used...
describe('mcode.swap_anything', () =>
{
    it('mcode.swap()--list.swap() here--should swap and log test messages', () =>
    {
        // Create a spy on console.log
        const consoleSpy = jest.spyOn(console, 'log');

        key = 3;
        value = list.swap(key, list1, list3);  // value = false
        mcode.info(`list1, list3 - key:${key}, value:${value}`, MODULE_NAME);

        key = 'three';
        value = list.swap(key, list2, list4);  // value = { key: 3, value: false }
        mcode.info(`list2, list4 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

        // Check that console.log was called with the expected message
        expect(consoleSpy.mock.calls).toEqual(
            expect.arrayContaining([
                expect.arrayContaining([expect.stringContaining(`list1, list3 - key:3, value:false`)]),
                expect.arrayContaining([expect.stringContaining(`list2, list4 - key:three, value:`)]),
                expect.arrayContaining([expect.stringContaining(`key`)]),
                expect.arrayContaining([expect.stringContaining(`3`)]),
                expect.arrayContaining([expect.stringContaining(`property`)]),
                expect.arrayContaining([expect.stringContaining(`THREE`)]),
            ])
        );

        // Restore the original console.log function
        consoleSpy.mockRestore();
    });
});

//  4) any list can be used to call a function in another list...
describe('mcode.call_functions', () =>
{
    it('mcode.call()--list.call() here--should call the corresponding function from list5.', () =>
    {
        // Create a spy on console.log
        const consoleSpy = jest.spyOn(console, 'log');

        key = 3;
        value = list.call(key, list1, list5);  // value = 'function3() was called.'
        mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

        key = 99;
        value = list.call(key, list1, list5);  // value = 'functionDefault() was called.'
        mcode.info(`list1, list5 - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

        // Check that console.log was called with the expected message
        expect(consoleSpy.mock.calls).toEqual(
            expect.arrayContaining([
                expect.arrayContaining([expect.stringContaining(`list1, list5 - key:3, value:"function3() was called."`)]),
                expect.arrayContaining([expect.stringContaining(`list1, list5 - key:99, value:"functionDefault() was called."`)]),
            ])
        );

        // Restore the original console.log function
        consoleSpy.mockRestore();
    });
});

//  5) any list can be used to call a function in another list with a custom search function to pick the matching key...
describe('mcode.callif_functions', () =>
{
    it('mcode.callif()--list.callif() here--should call the corresponding function from radixConverters.', () =>
    {
        // Create a spy on console.log
        const consoleSpy = jest.spyOn(console, 'log');

        key = "^o17777";
        value = list.callif(key, radixFlags, radixConverters, (key, radix) => key.includes(radix));  // value = 'fromOctal() was called.'
        mcode.info(`radixFlags, radixConverters - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

        key = "16#ACDF";
        value = list.callif(key, radixFlags, radixConverters, (key, radix) => key.includes(radix));  // value = 'fromOctal() was called.'
        mcode.info(`radixFlags, radixConverters - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

        key = "12345";
        value = list.callif(key, radixFlags, radixConverters, (key, radix) => key.includes(radix));  // value = 'fromOctal() was called.'
        mcode.info(`radixFlags, radixConverters - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

        key = "^c139";
        value = list.swapif(key, radixFlags, radixNames, (key, radix) => key.includes(radix));  // value = 'BCD'
        mcode.info(`radixFlags, radixNames - key:${key}, value:${JSON.stringify(value)}`, MODULE_NAME);

        // Check that console.log was called with the expected message
        expect(consoleSpy.mock.calls).toEqual(
            expect.arrayContaining([
                expect.arrayContaining([expect.stringContaining(`radixFlags, radixConverters - key:^o17777, value:"fromOctal() was called."`)]),
                expect.arrayContaining([expect.stringContaining(`radixFlags, radixConverters - key:16#ACDF, value:"fromHex() was called."`)]),
                expect.arrayContaining([expect.stringContaining(`radixFlags, radixConverters - key:12345, value:"fromDecimal() was called."`)]),
                expect.arrayContaining([expect.stringContaining(`radixFlags, radixNames - key:^c139, value:"BCD"`)]),
            ])
        );

        // Restore the original console.log function
        consoleSpy.mockRestore();
    });
});
