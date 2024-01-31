// #region  F I L E
// <copyright file="mcode-list/index.js" company="MicroCODE Incorporated">Copyright © 2022-2024 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  M O D U L E

// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Shared Function Library
 *      Module:   modules (node_modules/mcode-list/index.js)
 *      Project:  MicroCODE MERN Applications
 *      Customer: Internal+MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     January 2022-2024
 *      Author:   Timothy McGuire
 *
 *      MIT License: MicroCODE.mcode-list
 *
 *      Copyright (c) 2022-2024 Timothy McGuire, MicroCODE, Inc.
 *
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 *
 *      The above copyright notice and this permission notice shall be included in all
 *      copies or substantial portions of the Software.
 *
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *      SOFTWARE.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE's Common JavaScript functions for list processing.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Course: Professional Certificate in Coding: Full Stack Development with MERN
 *
 *      2. LADDERS® source code: MACRO-11, MACRO-32, C#, and JavaScript.
 *
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:    Description:
 *
 *  30-Jan-2024   TJM-MCODE  {0001}   New module for common reusable JavaScript list processing functions.
 *
 *
 *
 * NOTE: This module follow's MicroCODE's JavaScript Style Guide and Template JS file, see:
 *
 *       o  https://github.com/MicroCODEIncorporated/JavaScriptSG
 *       o  https://github.com/MicroCODEIncorporated/TemplatesJS
 *
 */

// #endregion

// #region  I M P O R T S

const log = require('mcode-log');

// #endregion

// #region  T Y P E S

// #endregion

// #region  I N T E R F A C E S

// #endregion

// #region  C O N S T A N T S, F U N C T I O N S – P U B L I C

const theme = process.env.THEME || 'dark'; // default to dark mode
const mode = process.env.NODE_ENV || 'development'; // default to development mode
const packageJson = require('./package.json');

// @ts-ignore TS6133 - standard module definition for 'debug' logging
const moduleName = 'mcode-list.js';

/**
 * @namespace mcode
 * @desc mcode namespace containing functions and constants.
 */
const mcode = {

    /**
     * @func ready
     * @memberof mcode
     * @desc Logs a message to the Console when the module is loaded to show version.
     */
    ready: function ()
    {
        mcode.log(`MicroCODE ${moduleName} v${packageJson.version} is loaded, mode: ${mode}, theme: ${theme}.`, moduleName, 'success');
    },

    /**
     * @func swap
     * @memberof mcode
     * @desc Swaps a 'key' from a 'source' list with a 'value' in a 'destination' list.
     * @api public
     * @param {any} key a JavaScript value viewed as a 'key' in the 'source' list.
     * @param {any[]} keys a JavaScript array of values viewed as 'keys' in the 'source' list.
     * @param {any[]} values a JavaScript array of values viewed as 'values' in the 'destination' list.
     * @returns {any} the value from the 'destination' list corresponding to the 'key' in the 'source' list.
     *
     * @example
     *     let list1 = [1, 2, 3, 4, 5, 0];
     *     let list2 = ['one', 'two', 'three', 'four', 'five', 'default'];
     *     let list3 = [false, true, false, true, false, false];
     *     let list4 = [{ key: 1, property: ONE },
     *                  { key: 2, property: TWO },
     *                  { key: 3, property: THREE },
     *                  { key: 4, property: FOUR },
     *                  { key: 5, property: FIVE },
     *                  { key: 0, property: DEFAULT }];
     *
     *     let key = null;
     *     let value = null;
     *
     *  1) straight swap of two values...
     *
     *     key = 3;
     *     value = mcode.swap(key, list1, list2);  // value = 'three'
     *
     *     key = 6;
     *     value = mcode.swap(key, list1, list2);  // value = 'default'
     *
     *     key = 0;
     *     value = mcode.swap(key, list1, list2);  // value = 'default'
     *
     *  2) the same lists can be used the other way around...
     *
     *     key = 'three';
     *     value = mcode.swap(key, list2, list1);  // value = 3
     *
     *     key = 'six';
     *     value = mcode.swap(key, list2, list1);  // value = 0
     *
     *  3) any two lists on the same subject (i.e.: the same length) can be used...
     *
     *    key = 3;
     *    value = mcode.swap(key, list1, list3);  // value = false
     *
     *    key = 'three';
     *    value = mcode.swap(key, list2, list4);  // value = { key: 4, property: FOUR }
     *
     *
     *   ...seems simple enough, but keep in mind that the 'key' and 'value' in the lists can be any JavaScript value, including:
     *
     *   - a number
     *   - a string
     *   - a boolean
     *   - an object
     *   - a function
     *   - a class
     *   - a module
     *   - a BigInt
     *   - a Promise
     *   - an Array
     *   - a JSON object
     *   - null
     *   - undefined
     *     etc.
     *
     */
    swap: function (key, keys, values)
    {
        // ensure the source and destination lists are the same length
        if (keys.length !== values.length)
        {
            log.error(`The 'keys' and 'values' lists are not the same length, keys.length:${keys.length} !== values.length:${values.length}`, moduleName);

            return null;
        }

        // get the index of the key in the source list
        let index = keys.indexOf(key);
        let value = null;

        // if the 'key' is not in the source list, return the 'default' value from the end of the destination list
        if (index === -1)
        {
            value = values[values.length - 1];
        }
        else
        {
            // swap for corresponding value in destination list
            value = values[index];
        }

        return value;
    },

    /**
     * @func call
     * @memberof mcode
     * @desc Calls a function from a 'destination' list using a 'key' index found in a 'source' list.
     * @api public
     * @param {any} key a JavaScript value viewed as a 'key' in the 'source' list.
     * @param {any[]} keys a JavaScript array of values viewed as 'keys' in the 'source' list.
     * @param {any[]} values a JavaScript array of values viewed as 'values' in the 'destination' list.
     * @returns {any} the value from the function in 'destination' list corresponding to the 'key' in the 'source' list.
     *
     * @example
     *      let keys = [1, 2, 3, 4, 5, null];
     *      let values = [function1, function2, function3, function4, function5, default];
     *      let key = 3;
     *      let value = mcode.swap(key, keys, values);  // value = (return value of function3)
     */
    call: function (key, keys, values)
    {
        // ensure the source and destination lists are the same length
        if (keys.length !== values.length)
        {
            log.error(`The 'keys' and 'values' lists are not the same length, keys.length:${keys.length} !== values.length:${values.length}`, moduleName);

            return null;
        }

        // get the index of the key in the source list
        let index = keys.indexOf(key);
        let value = null;

        // if the 'key' is not in the source list, return the 'default' value from the end of the destination list
        if (index === -1)
        {
            value = values[values.length - 1]();
        }
        else
        {
            // swap for corresponding value in destination list
            value = values[index]();
        }

        return value;
    },
};

// #endregion

// #region  M E T H O D - E X P O R T S

// Export as Common JS (CJS) code -- NOTE: Build as CommonJS Module for NodeJS Version v16.7.0
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
{
    // In a Node.js environment export mcode directly
    module.exports = mcode;
}
else
{
    // In a browser environment, attach mcode to the window object
    window.mcode = mcode;
}

// #endregion

// #endregion
// #endregion